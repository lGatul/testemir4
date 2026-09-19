import { useState, useCallback, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { searchItems, generateCommand, mir4Items, gradeNames, gradeColors, typeNames, MIR4Item } from './data/mir4Items';

interface DetectedItem {
  item: MIR4Item;
  confidence: number;
  quantity: number;
  selected: boolean;
}

interface CommandBlock {
  id: string;
  command: string;
  itemName: string;
  timestamp: number;
}

function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'search' | 'commands'>('scanner');
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MIR4Item[]>([]);
  const [commandBlock, setCommandBlock] = useState<CommandBlock[]>([]);
  const [language, setLanguage] = useState<'POR' | 'ENG'>('POR');
  const [gradeFilter, setGradeFilter] = useState<number>(0);
  const [typeFilter, setTypeFilter] = useState<number>(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(async (imageData: string) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setDetectedItems([]);

    try {
      const worker = await createWorker('eng+por', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProcessingProgress(Math.round(m.progress * 100));
          }
        },
      });

      const { data: { text } } = await worker.recognize(imageData);
      await worker.terminate();

      // Parse text to find item names
      const lines = text.split('\n').filter(line => line.trim().length > 2);
      const foundItems: DetectedItem[] = [];

      for (const line of lines) {
        const cleanLine = line.trim().replace(/[^\w\sÀ-ÿ]/g, '').trim();
        if (cleanLine.length < 3) continue;

        const matches = searchItems(cleanLine, language);
        for (const match of matches.slice(0, 2)) {
          const existing = foundItems.find(fi => fi.item.id === match.id);
          if (!existing) {
            foundItems.push({
              item: match,
              confidence: calculateConfidence(cleanLine, match, language),
              quantity: 1,
              selected: true,
            });
          }
        }
      }

      // Remove duplicates and sort by confidence
      const uniqueItems = foundItems.filter((item, index, self) =>
        index === self.findIndex(t => t.item.id === item.item.id)
      ).sort((a, b) => b.confidence - a.confidence);

      setDetectedItems(uniqueItems);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
      setProcessingProgress(100);
    }
  }, [language]);

  const calculateConfidence = (text: string, item: MIR4Item, lang: 'POR' | 'ENG'): number => {
    const itemName = lang === 'ENG' ? item.nameEN.toLowerCase() : item.name.toLowerCase();
    const searchText = text.toLowerCase();
    
    // Exact match
    if (itemName === searchText) return 100;
    
    // Contains match
    if (itemName.includes(searchText) || searchText.includes(itemName)) {
      const longer = Math.max(itemName.length, searchText.length);
      const shorter = Math.min(itemName.length, searchText.length);
      return Math.round((shorter / longer) * 90);
    }
    
    // Word match
    const itemWords = itemName.split(' ');
    const searchWords = searchText.split(' ');
    const matchingWords = itemWords.filter(w => searchWords.some(sw => sw.includes(w) || w.includes(sw)));
    if (matchingWords.length > 0) {
      return Math.round((matchingWords.length / itemWords.length) * 75);
    }
    
    return 30;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setImage(imageData);
      processImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      let results = searchItems(query, language);
      
      if (gradeFilter > 0) {
        results = results.filter(item => item.grade === gradeFilter);
      }
      if (typeFilter > 0) {
        results = results.filter(item => item.type === typeFilter);
      }
      
      setSearchResults(results.slice(0, 50));
    } else {
      setSearchResults([]);
    }
  };

  const addToCommandBlock = (item: MIR4Item, quantity: number = 1) => {
    const newCommand: CommandBlock = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      command: generateCommand(item.id, quantity),
      itemName: language === 'ENG' ? item.nameEN : item.name,
      timestamp: Date.now(),
    };
    setCommandBlock(prev => [...prev, newCommand]);
  };

  const removeFromCommandBlock = (id: string) => {
    setCommandBlock(prev => prev.filter(cmd => cmd.id !== id));
  };

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const copyAllCommands = () => {
    const allCommands = commandBlock.map(cmd => cmd.command).join('\n');
    navigator.clipboard.writeText(allCommands);
  };

  const clearCommandBlock = () => {
    setCommandBlock([]);
  };

  const toggleItemSelection = (index: number) => {
    setDetectedItems(prev => prev.map((item, i) => 
      i === index ? { ...item, selected: !item.selected } : item
    ));
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    setDetectedItems(prev => prev.map((item, i) => 
      i === index ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const addSelectedToBlock = () => {
    detectedItems
      .filter(item => item.selected)
      .forEach(item => addToCommandBlock(item.item, item.quantity));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg">
              M4
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MIR4 Codex Helper
              </h1>
              <p className="text-xs text-gray-400">Auxiliar para completar o Codex</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">DB:</span>
            <a 
              href="https://db.celestialmir4.com/#database" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors"
            >
              celestialmir4.com
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="flex gap-1 bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'scanner' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            📷 Scanner de Imagem
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'search' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            🔍 Buscar Itens
          </button>
          <button
            onClick={() => setActiveTab('commands')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all relative ${
              activeTab === 'commands' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            📋 Comandos
            {commandBlock.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {commandBlock.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Scanner Tab */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="text-2xl">📷</span> Upload de Imagem
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Faça upload de um screenshot do seu inventário, codex ou qualquer tela com itens do MIR4. 
                    A ferramenta irá identificar os itens e gerar os comandos GIVEITEM.
                  </p>
                  
                  <div 
                    className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/60 transition-colors bg-gray-900/30"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {image ? (
                      <img src={image} alt="Uploaded" className="max-h-64 mx-auto rounded-lg" />
                    ) : (
                      <div className="space-y-3">
                        <div className="text-4xl">🖼️</div>
                        <p className="text-gray-400">Clique para selecionar uma imagem</p>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="mt-4 bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
                    <h4 className="text-sm font-medium text-purple-400 mb-2">💡 Dicas de uso:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Tire screenshots da tela do Codex ou inventário do jogo</li>
                      <li>• Imagens com fundo escuro e texto claro funcionam melhor</li>
                      <li>• O OCR funciona melhor com texto em inglês</li>
                      <li>• Use a aba "Buscar Itens" para encontrar manualmente</li>
                      <li>• Comandos no formato: <code className="text-green-400">GIVEITEM ID QNT</code></li>
                    </ul>
                  </div>

                  {isProcessing && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-400">Processando imagem...</span>
                        <span className="text-gray-400">{processingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${processingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-3">
                    <label className="text-sm text-gray-400">Idioma:</label>
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value as 'POR' | 'ENG')}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white"
                    >
                      <option value="POR">Português</option>
                      <option value="ENG">English</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Detected Items */}
              <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Itens Detectados
                  </h2>
                  {detectedItems.length > 0 && (
                    <button
                      onClick={addSelectedToBlock}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-sm font-medium hover:from-green-500 hover:to-emerald-500 transition-all"
                    >
                      Adicionar Selecionados →
                    </button>
                  )}
                </div>

                {detectedItems.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-3">🔎</div>
                    <p>Nenhum item detectado ainda.</p>
                    <p className="text-sm mt-1">Faça upload de uma imagem para começar.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {detectedItems.map((detected, index) => (
                      <div 
                        key={detected.item.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          detected.selected 
                            ? 'border-purple-500/50 bg-purple-500/10' 
                            : 'border-gray-700/50 bg-gray-900/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={detected.selected}
                          onChange={() => toggleItemSelection(index)}
                          className="w-4 h-4 rounded accent-purple-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span 
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ 
                                backgroundColor: `${gradeColors[detected.item.grade]}20`,
                                color: gradeColors[detected.item.grade]
                              }}
                            >
                              {gradeNames[detected.item.grade]}
                            </span>
                            <span className="text-sm font-medium truncate">
                              {language === 'ENG' ? detected.item.nameEN : detected.item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">ID: {detected.item.id}</span>
                            <span className="text-xs text-gray-600">•</span>
                            <span className="text-xs text-gray-500">{detected.item.typeName}</span>
                            <span className="text-xs text-gray-600">•</span>
                            <span className="text-xs text-green-400">{detected.confidence}% match</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={detected.quantity}
                            onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 1)}
                            className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-center"
                          />
                          <button
                            onClick={() => addToCommandBlock(detected.item, detected.quantity)}
                            className="p-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-colors"
                            title="Adicionar ao bloco de comandos"
                          >
                            ➕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🔍</span> Buscar no Banco de Dados
              </h2>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Buscar por nome, ID ou tipo..."
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <select
                  value={language}
                  onChange={(e) => { setLanguage(e.target.value as 'POR' | 'ENG'); handleSearch(searchQuery); }}
                  className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                >
                  <option value="POR">Português</option>
                  <option value="ENG">English</option>
                </select>
                <select
                  value={gradeFilter}
                  onChange={(e) => { setGradeFilter(Number(e.target.value)); handleSearch(searchQuery); }}
                  className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                >
                  <option value={0}>Todos os Grades</option>
                  <option value={1}>Common</option>
                  <option value={2}>Uncommon</option>
                  <option value={3}>Rare</option>
                  <option value={4}>Epic</option>
                  <option value={5}>Legendary</option>
                  <option value={6}>Mythic</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => { setTypeFilter(Number(e.target.value)); handleSearch(searchQuery); }}
                  className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                >
                  <option value={0}>Todos os Tipos</option>
                  {Object.entries(typeNames).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              <p className="text-sm text-gray-400 mb-4">
                Total: {mir4Items.length} itens no banco de dados • 
                {searchResults.length > 0 ? ` ${searchResults.length} resultados encontrados` : ' Digite para buscar'}
              </p>

              {/* Results Grid */}
              {searchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2">
                  {searchResults.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4 hover:border-purple-500/50 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ 
                            backgroundColor: `${gradeColors[item.grade]}20`,
                            color: gradeColors[item.grade]
                          }}
                        >
                          {gradeNames[item.grade]}
                        </span>
                        {item.tier && (
                          <span className="text-xs text-gray-500">Tier {item.tier}</span>
                        )}
                      </div>
                      <h3 className="font-medium text-sm mb-1">
                        {language === 'ENG' ? item.nameEN : item.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">{item.typeName}{item.subtype ? ` • ${item.subtype}` : ''}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-mono">ID: {item.id}</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => addToCommandBlock(item, 1)}
                            className="px-2 py-1 bg-purple-600/30 hover:bg-purple-600/50 rounded text-xs transition-colors"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => copyToClipboard(generateCommand(item.id, 1))}
                            className="px-2 py-1 bg-blue-600/30 hover:bg-blue-600/50 rounded text-xs transition-colors"
                          >
                            📋
                          </button>
                        </div>
                      </div>
                      {item.classRestriction && (
                        <p className="text-xs text-purple-400 mt-1">⚔️ {item.classRestriction}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-3">🔍</div>
                  <p>Nenhum item encontrado para "{searchQuery}"</p>
                  <p className="text-sm mt-1">Tente buscar por outro termo ou verifique o banco de dados completo em</p>
                  <a 
                    href="https://db.celestialmir4.com/#database" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    db.celestialmir4.com
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Commands Tab */}
        {activeTab === 'commands' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="text-2xl">📋</span> Bloco de Comandos
                  <span className="text-sm text-gray-400 font-normal">({commandBlock.length} comandos)</span>
                </h2>
                <div className="flex gap-2">
                  {commandBlock.length > 0 && (
                    <>
                      <button
                        onClick={copyAllCommands}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-sm font-medium hover:from-blue-500 hover:to-cyan-500 transition-all"
                      >
                        📋 Copiar Todos
                      </button>
                      <button
                        onClick={clearCommandBlock}
                        className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-sm font-medium transition-all"
                      >
                        🗑️ Limpar
                      </button>
                    </>
                  )}
                </div>
              </div>

              {commandBlock.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <div className="text-5xl mb-4">📝</div>
                  <p className="text-lg">Nenhum comando adicionado</p>
                  <p className="text-sm mt-2">Use o Scanner ou a Busca para encontrar itens e adicionar comandos aqui.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {commandBlock.map((cmd, index) => (
                    <div 
                      key={cmd.id}
                      className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50 group hover:border-purple-500/30 transition-all"
                    >
                      <span className="text-xs text-gray-500 w-8 text-center">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate">{cmd.itemName}</p>
                        <code className="text-sm text-green-400 font-mono">{cmd.command}</code>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => copyToClipboard(cmd.command, index)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            copiedIndex === index 
                              ? 'bg-green-600/50 text-green-300' 
                              : 'bg-purple-600/30 hover:bg-purple-600/50'
                          }`}
                        >
                          {copiedIndex === index ? '✓ Copiado' : '📋 Copiar'}
                        </button>
                        <button
                          onClick={() => removeFromCommandBlock(cmd.id)}
                          className="px-3 py-1.5 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-xs font-medium transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Commands Reference */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                  <span>⚡</span> Referência Rápida de Comandos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <code className="text-green-400 text-sm font-mono">GIVEITEM &lt;ID&gt; &lt;QNT&gt;</code>
                    <p className="text-xs text-gray-400 mt-2">Adiciona um item ao inventário</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <code className="text-green-400 text-sm font-mono">SETLEVEL &lt;LVL&gt;</code>
                    <p className="text-xs text-gray-400 mt-2">Define o nível do personagem</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <code className="text-green-400 text-sm font-mono">GIVECURRENCY &lt;TIPO&gt; &lt;QNT&gt;</code>
                    <p className="text-xs text-gray-400 mt-2">Adiciona moedas ao personagem</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <code className="text-green-400 text-sm font-mono">MAXQUEST</code>
                    <p className="text-xs text-gray-400 mt-2">Completa todas as quests</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <code className="text-green-400 text-sm font-mono">NEXTQUEST</code>
                    <p className="text-xs text-gray-400 mt-2">Avança para a próxima quest</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <code className="text-green-400 text-sm font-mono">KILLSELF</code>
                    <p className="text-xs text-gray-400 mt-2">Reseta posição do personagem</p>
                  </div>
                </div>

                <div className="mt-4 bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                  <h4 className="text-sm font-medium mb-2 text-purple-400">💰 Tipos de Moeda (GIVECURRENCY)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                    <span className="text-gray-400">2 - Copper</span>
                    <span className="text-gray-400">4 - Gold</span>
                    <span className="text-gray-400">6 - Mileage</span>
                    <span className="text-gray-400">11 - Energy</span>
                    <span className="text-gray-400">12 - Darksteel</span>
                    <span className="text-gray-400">17 - Clan Coins</span>
                    <span className="text-gray-400">18 - Speed-ups</span>
                    <span className="text-gray-400">19 - Dragon Jade</span>
                    <span className="text-gray-400">20 - Ancient Coins</span>
                    <span className="text-gray-400">23 - Dragonsteel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            MIR4 Codex Helper • Banco de dados baseado em{' '}
            <a 
              href="https://db.celestialmir4.com/#database" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              db.celestialmir4.com
            </a>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Ferramenta auxiliar para servidores privados de MIR4 • Use com responsabilidade
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
