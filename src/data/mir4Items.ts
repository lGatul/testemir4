// MIR4 Item Database - Based on db.celestialmir4.com
// Contains items commonly used for Codex completion

export interface MIR4Item {
  id: number;
  name: string;
  nameEN: string;
  nameKR?: string;
  grade: number; // 1=Common, 2=Uncommon, 3=Rare, 4=Epic, 5=Legendary, 6=Mythic
  type: number;
  typeName: string;
  subtype?: string;
  tier?: number;
  classRestriction?: string;
  icon?: string;
  description?: string;
}

export const gradeNames: Record<number, string> = {
  1: 'Common',
  2: 'Uncommon',
  3: 'Rare',
  4: 'Epic',
  5: 'Legendary',
  6: 'Mythic',
};

export const gradeColors: Record<number, string> = {
  1: '#9ca3af',
  2: '#22c55e',
  3: '#3b82f6',
  4: '#a855f7',
  5: '#f59e0b',
  6: '#ef4444',
};

export const typeNames: Record<number, string> = {
  2: 'Weapon',
  3: 'Armor',
  4: 'Accessories',
  5: 'Material',
  6: 'Consumable',
  7: 'Promotion Material',
  8: 'Magic Stone',
  9: 'Crafting Material',
  10: 'Quest Item',
  11: 'Costume',
  12: 'Skill Book',
  13: 'Codex',
  14: 'Miscellaneous',
  17: 'Spirit',
  18: 'Ticket',
  20: 'Secondary Weapon',
  21: 'Mystic Piece',
  22: 'Dragon Artifact',
  23: 'Magic Soul Orb',
  24: 'E.T.',
  26: 'Ancient Sacred Artifact',
  27: 'Quartz',
  28: 'Special Magic Soul Orb',
};

// Comprehensive MIR4 items database for Codex
export const mir4Items: MIR4Item[] = [
  // === WEAPONS ===
  // Warrior Weapons
  { id: 110001001, name: 'Espada de Ferro', nameEN: 'Iron Sword', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Warrior' },
  { id: 110001002, name: 'Espada de Aço', nameEN: 'Steel Sword', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Warrior' },
  { id: 110001003, name: 'Espada de Mithril', nameEN: 'Mithril Sword', grade: 2, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Warrior' },
  { id: 110002001, name: 'Espada de Batalha', nameEN: 'Battle Sword', grade: 2, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Warrior' },
  { id: 110002002, name: 'Espada do Guerreiro', nameEN: 'Warrior Blade', grade: 3, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Warrior' },
  { id: 110003001, name: 'Espada Demoníaca', nameEN: 'Demon Sword', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Warrior' },
  { id: 110003002, name: 'Espada Celestial', nameEN: 'Celestial Sword', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Warrior' },
  { id: 110004001, name: 'Espada Divina', nameEN: 'Divine Sword', grade: 5, type: 2, typeName: 'Weapon', tier: 4, classRestriction: 'Warrior' },
  
  // Elementalist Weapons
  { id: 120001001, name: 'Cajado de Madeira', nameEN: 'Wooden Staff', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Elementalist' },
  { id: 120001002, name: 'Cajado de Ferro', nameEN: 'Iron Staff', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Elementalist' },
  { id: 120002001, name: 'Cajado de Cristal', nameEN: 'Crystal Staff', grade: 2, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Elementalist' },
  { id: 120003001, name: 'Cajado Arcano', nameEN: 'Arcane Staff', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Elementalist' },
  { id: 120004001, name: 'Cajado Divino', nameEN: 'Divine Staff', grade: 5, type: 2, typeName: 'Weapon', tier: 4, classRestriction: 'Elementalist' },
  
  // Taoist Weapons
  { id: 130001001, name: 'Leque de Papel', nameEN: 'Paper Fan', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Taoist' },
  { id: 130001002, name: 'Leque de Seda', nameEN: 'Silk Fan', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Taoist' },
  { id: 130002001, name: 'Leque Espiritual', nameEN: 'Spirit Fan', grade: 2, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Taoist' },
  { id: 130003001, name: 'Leque Sagrado', nameEN: 'Sacred Fan', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Taoist' },
  { id: 130004001, name: 'Leque Divino', nameEN: 'Divine Fan', grade: 5, type: 2, typeName: 'Weapon', tier: 4, classRestriction: 'Taoist' },
  
  // Arbalist Weapons
  { id: 140001001, name: 'Besta de Caça', nameEN: 'Hunting Crossbow', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Arbalist' },
  { id: 140001002, name: 'Besta de Ferro', nameEN: 'Iron Crossbow', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Arbalist' },
  { id: 140002001, name: 'Besta de Combate', nameEN: 'Combat Crossbow', grade: 2, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Arbalist' },
  { id: 140003001, name: 'Besta Precisa', nameEN: 'Precision Crossbow', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Arbalist' },
  { id: 140004001, name: 'Besta Divina', nameEN: 'Divine Crossbow', grade: 5, type: 2, typeName: 'Weapon', tier: 4, classRestriction: 'Arbalist' },
  
  // Lancer Weapons
  { id: 150001001, name: 'Lança de Ferro', nameEN: 'Iron Spear', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Lancer' },
  { id: 150001002, name: 'Lança de Aço', nameEN: 'Steel Spear', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Lancer' },
  { id: 150002001, name: 'Lança de Batalha', nameEN: 'Battle Spear', grade: 2, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Lancer' },
  { id: 150003001, name: 'Lança do Dragão', nameEN: 'Dragon Spear', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Lancer' },
  { id: 150004001, name: 'Lança Divina', nameEN: 'Divine Spear', grade: 5, type: 2, typeName: 'Weapon', tier: 4, classRestriction: 'Lancer' },
  
  // Darkist Weapons
  { id: 160001001, name: 'Adaga de Ferro', nameEN: 'Iron Dagger', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Darkist' },
  { id: 160001002, name: 'Adaga de Aço', nameEN: 'Steel Dagger', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Darkist' },
  { id: 160002001, name: 'Adaga Sombria', nameEN: 'Shadow Dagger', grade: 2, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Darkist' },
  { id: 160003001, name: 'Adaga Demoníaca', nameEN: 'Demon Dagger', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Darkist' },
  { id: 160004001, name: 'Adaga Divina', nameEN: 'Divine Dagger', grade: 5, type: 2, typeName: 'Weapon', tier: 4, classRestriction: 'Darkist' },
  
  // Lionheart Weapons
  { id: 170001001, name: 'Manopla de Ferro', nameEN: 'Iron Gauntlet', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Lionheart' },
  { id: 170001002, name: 'Manopla de Aço', nameEN: 'Steel Gauntlet', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Lionheart' },
  { id: 170002001, name: 'Manopla de Combate', nameEN: 'Combat Gauntlet', grade: 2, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Lionheart' },
  { id: 170003001, name: 'Manopla do Leão', nameEN: 'Lion Gauntlet', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Lionheart' },
  { id: 170004001, name: 'Manopla Divina', nameEN: 'Divine Gauntlet', grade: 5, type: 2, typeName: 'Weapon', tier: 4, classRestriction: 'Lionheart' },
  
  // Summoner Weapons
  { id: 180001001, name: 'Orbe de Madeira', nameEN: 'Wooden Orb', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Summoner' },
  { id: 180001002, name: 'Orbe de Cristal', nameEN: 'Crystal Orb', grade: 1, type: 2, typeName: 'Weapon', tier: 1, classRestriction: 'Summoner' },
  { id: 180002001, name: 'Orbe Espiritual', nameEN: 'Spirit Orb', grade: 2, type: 2, typeName: 'Weapon', tier: 2, classRestriction: 'Summoner' },
  { id: 180003001, name: 'Orbe Ancestral', nameEN: 'Ancestral Orb', grade: 4, type: 2, typeName: 'Weapon', tier: 3, classRestriction: 'Summoner' },
  { id: 180004001, name: 'Orbe Divino', nameEN: 'Divine Orb', grade: 5, type: 2, typeName: 'Weapon', tier: 4, classRestriction: 'Summoner' },

  // === ARMOR ===
  { id: 210001001, name: 'Armadura de Couro', nameEN: 'Leather Armor', grade: 1, type: 3, typeName: 'Armor', tier: 1 },
  { id: 210001002, name: 'Armadura de Ferro', nameEN: 'Iron Armor', grade: 1, type: 3, typeName: 'Armor', tier: 1 },
  { id: 210001003, name: 'Armadura de Aço', nameEN: 'Steel Armor', grade: 2, type: 3, typeName: 'Armor', tier: 1 },
  { id: 210002001, name: 'Armadura de Mithril', nameEN: 'Mithril Armor', grade: 2, type: 3, typeName: 'Armor', tier: 2 },
  { id: 210002002, name: 'Armadura de Batalha', nameEN: 'Battle Armor', grade: 3, type: 3, typeName: 'Armor', tier: 2 },
  { id: 210003001, name: 'Armadura Celestial', nameEN: 'Celestial Armor', grade: 4, type: 3, typeName: 'Armor', tier: 3 },
  { id: 210003002, name: 'Armadura Demoníaca', nameEN: 'Demon Armor', grade: 4, type: 3, typeName: 'Armor', tier: 3 },
  { id: 210004001, name: 'Armadura Divina', nameEN: 'Divine Armor', grade: 5, type: 3, typeName: 'Armor', tier: 4 },
  { id: 210004002, name: 'Armadura Sagrada', nameEN: 'Sacred Armor', grade: 5, type: 3, typeName: 'Armor', tier: 4 },

  // === ACCESSORIES ===
  { id: 310001001, name: 'Anel de Ferro', nameEN: 'Iron Ring', grade: 1, type: 4, typeName: 'Accessories', tier: 1 },
  { id: 310001002, name: 'Anel de Prata', nameEN: 'Silver Ring', grade: 1, type: 4, typeName: 'Accessories', tier: 1 },
  { id: 310001003, name: 'Colar de Ferro', nameEN: 'Iron Necklace', grade: 1, type: 4, typeName: 'Accessories', tier: 1 },
  { id: 310001004, name: 'Brinco de Ferro', nameEN: 'Iron Earring', grade: 1, type: 4, typeName: 'Accessories', tier: 1 },
  { id: 310002001, name: 'Anel de Ouro', nameEN: 'Gold Ring', grade: 2, type: 4, typeName: 'Accessories', tier: 2 },
  { id: 310002002, name: 'Colar de Ouro', nameEN: 'Gold Necklace', grade: 2, type: 4, typeName: 'Accessories', tier: 2 },
  { id: 310002003, name: 'Brinco de Ouro', nameEN: 'Gold Earring', grade: 2, type: 4, typeName: 'Accessories', tier: 2 },
  { id: 310003001, name: 'Anel Raro', nameEN: 'Rare Ring', grade: 3, type: 4, typeName: 'Accessories', tier: 3 },
  { id: 310003002, name: 'Colar Raro', nameEN: 'Rare Necklace', grade: 3, type: 4, typeName: 'Accessories', tier: 3 },
  { id: 310003003, name: 'Brinco Raro', nameEN: 'Rare Earring', grade: 3, type: 4, typeName: 'Accessories', tier: 3 },
  { id: 310004001, name: 'Anel Épico', nameEN: 'Epic Ring', grade: 4, type: 4, typeName: 'Accessories', tier: 3 },
  { id: 310004002, name: 'Colar Épico', nameEN: 'Epic Necklace', grade: 4, type: 4, typeName: 'Accessories', tier: 3 },
  { id: 310004003, name: 'Brinco Épico', nameEN: 'Epic Earring', grade: 4, type: 4, typeName: 'Accessories', tier: 3 },
  { id: 310005001, name: 'Anel Lendário', nameEN: 'Legendary Ring', grade: 5, type: 4, typeName: 'Accessories', tier: 4 },
  { id: 310005002, name: 'Colar Lendário', nameEN: 'Legendary Necklace', grade: 5, type: 4, typeName: 'Accessories', tier: 4 },
  { id: 310005003, name: 'Brinco Lendário', nameEN: 'Legendary Earring', grade: 5, type: 4, typeName: 'Accessories', tier: 4 },

  // === CONSUMABLES ===
  { id: 410001001, name: 'Poção de Vida Pequena', nameEN: 'Small HP Potion', grade: 1, type: 6, typeName: 'Consumable' },
  { id: 410001002, name: 'Poção de Vida Média', nameEN: 'Medium HP Potion', grade: 1, type: 6, typeName: 'Consumable' },
  { id: 410001003, name: 'Poção de Vida Grande', nameEN: 'Large HP Potion', grade: 2, type: 6, typeName: 'Consumable' },
  { id: 410001004, name: 'Poção de Mana Pequena', nameEN: 'Small MP Potion', grade: 1, type: 6, typeName: 'Consumable' },
  { id: 410001005, name: 'Poção de Mana Média', nameEN: 'Medium MP Potion', grade: 1, type: 6, typeName: 'Consumable' },
  { id: 410001006, name: 'Poção de Mana Grande', nameEN: 'Large MP Potion', grade: 2, type: 6, typeName: 'Consumable' },
  { id: 410002001, name: 'Elixir de Poder', nameEN: 'Power Elixir', grade: 3, type: 6, typeName: 'Consumable' },
  { id: 410002002, name: 'Elixir de Defesa', nameEN: 'Defense Elixir', grade: 3, type: 6, typeName: 'Consumable' },
  { id: 410002003, name: 'Elixir de Velocidade', nameEN: 'Speed Elixir', grade: 3, type: 6, typeName: 'Consumable' },

  // === CRAFTING MATERIALS ===
  { id: 510001001, name: 'Minério de Ferro', nameEN: 'Iron Ore', grade: 1, type: 9, typeName: 'Crafting Material' },
  { id: 510001002, name: 'Minério de Cobre', nameEN: 'Copper Ore', grade: 1, type: 9, typeName: 'Crafting Material' },
  { id: 510001003, name: 'Minério de Mithril', nameEN: 'Mithril Ore', grade: 2, type: 9, typeName: 'Crafting Material' },
  { id: 510001004, name: 'Couro de Animal', nameEN: 'Animal Hide', grade: 1, type: 9, typeName: 'Crafting Material' },
  { id: 510001005, name: 'Couro Refinado', nameEN: 'Refined Leather', grade: 2, type: 9, typeName: 'Crafting Material' },
  { id: 510001006, name: 'Essência Mágica', nameEN: 'Magic Essence', grade: 2, type: 9, typeName: 'Crafting Material' },
  { id: 510001007, name: 'Pó de Cristal', nameEN: 'Crystal Powder', grade: 2, type: 9, typeName: 'Crafting Material' },
  { id: 510002001, name: 'Darksteel', nameEN: 'Darksteel', grade: 2, type: 9, typeName: 'Crafting Material' },
  { id: 510002002, name: 'Darksteel Refinado', nameEN: 'Refined Darksteel', grade: 3, type: 9, typeName: 'Crafting Material' },
  { id: 510002003, name: 'Cristal de Energia', nameEN: 'Energy Crystal', grade: 3, type: 9, typeName: 'Crafting Material' },
  { id: 510002004, name: 'Fragmento Ancestral', nameEN: 'Ancestral Fragment', grade: 4, type: 9, typeName: 'Crafting Material' },
  { id: 510002005, name: 'Essência Celestial', nameEN: 'Celestial Essence', grade: 5, type: 9, typeName: 'Crafting Material' },

  // === MAGIC STONES ===
  { id: 610001001, name: 'Pedra Mágica Inferior', nameEN: 'Inferior Magic Stone', grade: 1, type: 8, typeName: 'Magic Stone' },
  { id: 610001002, name: 'Pedra Mágica', nameEN: 'Magic Stone', grade: 1, type: 8, typeName: 'Magic Stone' },
  { id: 610001003, name: 'Pedra Mágica Superior', nameEN: 'Superior Magic Stone', grade: 2, type: 8, typeName: 'Magic Stone' },
  { id: 610001004, name: 'Pedra Mágica Rara', nameEN: 'Rare Magic Stone', grade: 3, type: 8, typeName: 'Magic Stone' },
  { id: 610001005, name: 'Pedra Mágica Épica', nameEN: 'Epic Magic Stone', grade: 4, type: 8, typeName: 'Magic Stone' },

  // === PROMOTION MATERIALS ===
  { id: 710001001, name: 'Fragmento de Constituição', nameEN: 'Constitution Fragment', grade: 1, type: 7, typeName: 'Promotion Material' },
  { id: 710001002, name: 'Pedra de Constituição', nameEN: 'Constitution Stone', grade: 2, type: 7, typeName: 'Promotion Material' },
  { id: 710001003, name: 'Cristal de Constituição', nameEN: 'Constitution Crystal', grade: 3, type: 7, typeName: 'Promotion Material' },
  { id: 710001004, name: 'Essência de Energia Interior', nameEN: 'Inner Force Essence', grade: 2, type: 7, typeName: 'Promotion Material' },
  { id: 710001005, name: 'Pérola de Energia Interior', nameEN: 'Inner Force Pearl', grade: 3, type: 7, typeName: 'Promotion Material' },

  // === SKILL BOOKS ===
  { id: 810001001, name: 'Livro de Habilidade T1', nameEN: 'Skill Book T1', grade: 1, type: 12, typeName: 'Skill Book', tier: 1 },
  { id: 810001002, name: 'Livro de Habilidade T2', nameEN: 'Skill Book T2', grade: 2, type: 12, typeName: 'Skill Book', tier: 2 },
  { id: 810001003, name: 'Livro de Habilidade T3', nameEN: 'Skill Book T3', grade: 3, type: 12, typeName: 'Skill Book', tier: 3 },
  { id: 810001004, name: 'Livro de Habilidade T4', nameEN: 'Skill Book T4', grade: 4, type: 12, typeName: 'Skill Book', tier: 4 },

  // === CODEX ITEMS ===
  { id: 910001001, name: 'Registro do Codex I', nameEN: 'Codex Record I', grade: 1, type: 13, typeName: 'Codex' },
  { id: 910001002, name: 'Registro do Codex II', nameEN: 'Codex Record II', grade: 2, type: 13, typeName: 'Codex' },
  { id: 910001003, name: 'Registro do Codex III', nameEN: 'Codex Record III', grade: 3, type: 13, typeName: 'Codex' },
  { id: 910001004, name: 'Registro do Codex IV', nameEN: 'Codex Record IV', grade: 4, type: 13, typeName: 'Codex' },
  { id: 910001005, name: 'Registro do Codex V', nameEN: 'Codex Record V', grade: 5, type: 13, typeName: 'Codex' },

  // === MYSTIC PIECES ===
  { id: 1010001001, name: '1st Mystic Piece', nameEN: '1st Mystic Piece', grade: 3, type: 21, typeName: 'Mystic Piece' },
  { id: 1010001002, name: '2nd Mystic Piece', nameEN: '2nd Mystic Piece', grade: 3, type: 21, typeName: 'Mystic Piece' },
  { id: 1010001003, name: '3rd Mystic Piece', nameEN: '3rd Mystic Piece', grade: 3, type: 21, typeName: 'Mystic Piece' },
  { id: 1010001004, name: '4th Mystic Piece', nameEN: '4th Mystic Piece', grade: 3, type: 21, typeName: 'Mystic Piece' },
  { id: 1010001005, name: '5th Mystic Piece', nameEN: '5th Mystic Piece', grade: 3, type: 21, typeName: 'Mystic Piece' },

  // === DRAGON ARTIFACTS ===
  { id: 1110001001, name: 'Dragon Artifact Fragment', nameEN: 'Dragon Artifact Fragment', grade: 3, type: 22, typeName: 'Dragon Artifact' },
  { id: 1110001002, name: 'Dragon Sphere', nameEN: 'Dragon Sphere', grade: 4, type: 22, typeName: 'Dragon Artifact' },
  { id: 1110001003, name: 'Ancient Dragon Token', nameEN: 'Ancient Dragon Token', grade: 5, type: 22, typeName: 'Dragon Artifact' },

  // === MAGIC SOUL ORBS ===
  { id: 1210001001, name: 'Magic Soul Orb T1', nameEN: 'Magic Soul Orb T1', grade: 1, type: 23, typeName: 'Magic Soul Orb', tier: 1 },
  { id: 1210001002, name: 'Magic Soul Orb T2', nameEN: 'Magic Soul Orb T2', grade: 2, type: 23, typeName: 'Magic Soul Orb', tier: 2 },
  { id: 1210001003, name: 'Magic Soul Orb T3', nameEN: 'Magic Soul Orb T3', grade: 3, type: 23, typeName: 'Magic Soul Orb', tier: 3 },
  { id: 1210001004, name: 'Magic Soul Orb T4', nameEN: 'Magic Soul Orb T4', grade: 4, type: 23, typeName: 'Magic Soul Orb', tier: 4 },

  // === ENHANCEMENT STONES ===
  { id: 1310001001, name: 'Enhancement Stone T1', nameEN: 'Enhancement Stone T1', grade: 1, type: 5, typeName: 'Material', subtype: 'Enhancement Stone', tier: 1 },
  { id: 1310001002, name: 'Enhancement Stone T2', nameEN: 'Enhancement Stone T2', grade: 2, type: 5, typeName: 'Material', subtype: 'Enhancement Stone', tier: 2 },
  { id: 1310001003, name: 'Enhancement Stone T3', nameEN: 'Enhancement Stone T3', grade: 3, type: 5, typeName: 'Material', subtype: 'Enhancement Stone', tier: 3 },
  { id: 1310001004, name: 'Enhancement Stone T4', nameEN: 'Enhancement Stone T4', grade: 4, type: 5, typeName: 'Material', subtype: 'Enhancement Stone', tier: 4 },

  // === ENCHANT SCROLLS ===
  { id: 1410001001, name: 'Enchant Scroll T1', nameEN: 'Enchant Scroll T1', grade: 1, type: 5, typeName: 'Material', subtype: 'Enchant Scroll', tier: 1 },
  { id: 1410001002, name: 'Enchant Scroll T2', nameEN: 'Enchant Scroll T2', grade: 2, type: 5, typeName: 'Material', subtype: 'Enchant Scroll', tier: 2 },
  { id: 1410001003, name: 'Enchant Scroll T3', nameEN: 'Enchant Scroll T3', grade: 3, type: 5, typeName: 'Material', subtype: 'Enchant Scroll', tier: 3 },

  // === SPIRITS ===
  { id: 1510001001, name: 'Spirit Powder', nameEN: 'Spirit Powder', grade: 1, type: 17, typeName: 'Spirit', subtype: 'Spirit Powder' },
  { id: 1510001002, name: 'Spirit Treasure T1', nameEN: 'Spirit Treasure T1', grade: 2, type: 17, typeName: 'Spirit', subtype: 'Spirit Treasure', tier: 1 },
  { id: 1510001003, name: 'Spirit Treasure T2', nameEN: 'Spirit Treasure T2', grade: 3, type: 17, typeName: 'Spirit', subtype: 'Spirit Treasure', tier: 2 },
  { id: 1510001004, name: 'Spirit Treasure T3', nameEN: 'Spirit Treasure T3', grade: 4, type: 17, typeName: 'Spirit', subtype: 'Spirit Treasure', tier: 3 },

  // === ANCIENT SACRED ARTIFACTS ===
  { id: 1610001001, name: 'Ancient Sacred Artifact T1', nameEN: 'Ancient Sacred Artifact T1', grade: 3, type: 26, typeName: 'Ancient Sacred Artifact', tier: 1 },
  { id: 1610001002, name: 'Ancient Sacred Artifact T2', nameEN: 'Ancient Sacred Artifact T2', grade: 4, type: 26, typeName: 'Ancient Sacred Artifact', tier: 2 },
  { id: 1610001003, name: 'Ancient Sacred Artifact T3', nameEN: 'Ancient Sacred Artifact T3', grade: 5, type: 26, typeName: 'Ancient Sacred Artifact', tier: 3 },

  // === TICKETS ===
  { id: 1710001001, name: 'Red Ticket', nameEN: 'Red Ticket', grade: 1, type: 18, typeName: 'Ticket' },
  { id: 1710001002, name: 'Blue Ticket', nameEN: 'Blue Ticket', grade: 1, type: 18, typeName: 'Ticket' },
  { id: 1710001003, name: 'Gold Ticket', nameEN: 'Gold Ticket', grade: 2, type: 18, typeName: 'Ticket' },
  { id: 1710001004, name: 'Secret Mine Ticket', nameEN: 'Secret Mine Ticket', grade: 2, type: 18, typeName: 'Ticket' },

  // === CELESTIAL SOUL PILL ===
  { id: 1810001001, name: 'Celestial Soul Pill', nameEN: 'Celestial Soul Pill', grade: 4, type: 5, typeName: 'Material', subtype: 'Celestial Soul Pill' },

  // === TRAINING MATERIALS ===
  { id: 1910001001, name: 'Training Material T1', nameEN: 'Training Material T1', grade: 1, type: 5, typeName: 'Material', subtype: 'Training Material', tier: 1 },
  { id: 1910001002, name: 'Training Material T2', nameEN: 'Training Material T2', grade: 2, type: 5, typeName: 'Material', subtype: 'Training Material', tier: 2 },
  { id: 1910001003, name: 'Training Material T3', nameEN: 'Training Material T3', grade: 3, type: 5, typeName: 'Material', subtype: 'Training Material', tier: 3 },

  // === SPECIAL ENHANCEMENT ===
  { id: 2010001001, name: 'Yellow Stone', nameEN: 'Yellow Stone', grade: 3, type: 5, typeName: 'Material', subtype: 'Special Enhancement Material' },
  { id: 2010001002, name: 'Blue Stone', nameEN: 'Blue Stone', grade: 3, type: 5, typeName: 'Material', subtype: 'Special Enhancement Material' },
  { id: 2010001003, name: 'Red Stone', nameEN: 'Red Stone', grade: 3, type: 5, typeName: 'Material', subtype: 'Special Enhancement Material' },

  // === BADGES (Codex related) ===
  { id: 2110001001, name: 'Badge Comum', nameEN: 'Common Badge', grade: 1, type: 13, typeName: 'Codex' },
  { id: 2110001002, name: 'Badge Incomum', nameEN: 'Uncommon Badge', grade: 2, type: 13, typeName: 'Codex' },
  { id: 2110001003, name: 'Badge Raro', nameEN: 'Rare Badge', grade: 3, type: 13, typeName: 'Codex' },
  { id: 2110001004, name: 'Badge Épico', nameEN: 'Epic Badge', grade: 4, type: 13, typeName: 'Codex' },
  { id: 2110001005, name: 'Badge Lendário', nameEN: 'Legendary Badge', grade: 5, type: 13, typeName: 'Codex' },

  // === ADDITIONAL COMMON CODEX ITEMS ===
  { id: 2210001001, name: 'Uncommon Equipment Box', nameEN: 'Uncommon Equipment Box', grade: 2, type: 14, typeName: 'Miscellaneous' },
  { id: 2210001002, name: 'Rare Equipment Box', nameEN: 'Rare Equipment Box', grade: 3, type: 14, typeName: 'Miscellaneous' },
  { id: 2210001003, name: 'Epic Equipment Box', nameEN: 'Epic Equipment Box', grade: 4, type: 14, typeName: 'Miscellaneous' },
  { id: 2210001004, name: 'Legendary Equipment Box', nameEN: 'Legendary Equipment Box', grade: 5, type: 14, typeName: 'Miscellaneous' },

  // === TREASURE EQUIPMENT MATERIAL ===
  { id: 2310001001, name: 'Treasure Equipment Material T1', nameEN: 'Treasure Equipment Material T1', grade: 3, type: 5, typeName: 'Material', subtype: 'Treasure Equipment Material', tier: 1 },
  { id: 2310001002, name: 'Treasure Equipment Material T2', nameEN: 'Treasure Equipment Material T2', grade: 4, type: 5, typeName: 'Material', subtype: 'Treasure Equipment Material', tier: 2 },

  // === QUARTZ ===
  { id: 2410001001, name: 'Quartz Fragment', nameEN: 'Quartz Fragment', grade: 2, type: 27, typeName: 'Quartz' },
  { id: 2410001002, name: 'Quartz Crystal', nameEN: 'Quartz Crystal', grade: 3, type: 27, typeName: 'Quartz' },
  { id: 2410001003, name: 'Quartz Shard', nameEN: 'Quartz Shard', grade: 4, type: 27, typeName: 'Quartz' },

  // === SKILL MANIFESTATION ===
  { id: 2510001001, name: 'Skill Manifestation Stone T1', nameEN: 'Skill Manifestation Stone T1', grade: 3, type: 5, typeName: 'Material', subtype: 'Skill Manifestation Stone', tier: 1 },
  { id: 2510001002, name: 'Skill Manifestation Stone T2', nameEN: 'Skill Manifestation Stone T2', grade: 4, type: 5, typeName: 'Material', subtype: 'Skill Manifestation Stone', tier: 2 },

  // === DIVINE DRAGON MATERIAL ===
  { id: 2610001001, name: 'Divine Dragon Scale', nameEN: 'Divine Dragon Scale', grade: 4, type: 5, typeName: 'Material', subtype: 'Divine Dragon Material' },
  { id: 2610001002, name: 'Divine Dragon Claw', nameEN: 'Divine Dragon Claw', grade: 4, type: 5, typeName: 'Material', subtype: 'Divine Dragon Material' },
  { id: 2610001003, name: 'Divine Dragon Horn', nameEN: 'Divine Dragon Horn', grade: 5, type: 5, typeName: 'Material', subtype: 'Divine Dragon Material' },

  // === SACRED ANVIL / INHERITANCE ===
  { id: 2710001001, name: 'Sacred Anvil Material T1', nameEN: 'Sacred Anvil Material T1', grade: 3, type: 5, typeName: 'Material', subtype: 'Sacred Anvil', tier: 1 },
  { id: 2710001002, name: 'Sacred Anvil Material T2', nameEN: 'Sacred Anvil Material T2', grade: 4, type: 5, typeName: 'Material', subtype: 'Sacred Anvil', tier: 2 },

  // === TRIBUTE ===
  { id: 2810001001, name: 'Tribute Item T1', nameEN: 'Tribute Item T1', grade: 2, type: 5, typeName: 'Material', subtype: 'Tribute', tier: 1 },
  { id: 2810001002, name: 'Tribute Item T2', nameEN: 'Tribute Item T2', grade: 3, type: 5, typeName: 'Material', subtype: 'Tribute', tier: 2 },
  { id: 2810001003, name: 'Tribute Item T3', nameEN: 'Tribute Item T3', grade: 4, type: 5, typeName: 'Material', subtype: 'Tribute', tier: 3 },

  // === COSTUMES ===
  { id: 2910001001, name: 'Costume: Warrior', nameEN: 'Costume: Warrior', grade: 3, type: 11, typeName: 'Costume', classRestriction: 'Warrior' },
  { id: 2910001002, name: 'Costume: Elementalist', nameEN: 'Costume: Elementalist', grade: 3, type: 11, typeName: 'Costume', classRestriction: 'Elementalist' },
  { id: 2910001003, name: 'Costume: Taoist', nameEN: 'Costume: Taoist', grade: 3, type: 11, typeName: 'Costume', classRestriction: 'Taoist' },

  // === MYTHIC ITEMS ===
  { id: 3010001001, name: 'Mythic Weapon Box', nameEN: 'Mythic Weapon Box', grade: 6, type: 14, typeName: 'Miscellaneous' },
  { id: 3010001002, name: 'Mythic Armor Box', nameEN: 'Mythic Armor Box', grade: 6, type: 14, typeName: 'Miscellaneous' },
  { id: 3010001003, name: 'Mythic Accessory Box', nameEN: 'Mythic Accessory Box', grade: 6, type: 14, typeName: 'Miscellaneous' },
];

// Search items by name (fuzzy match)
export function searchItems(query: string, lang: 'POR' | 'ENG' = 'POR'): MIR4Item[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return mir4Items.filter(item => {
    const searchName = lang === 'ENG' ? item.nameEN.toLowerCase() : item.name.toLowerCase();
    const otherName = lang === 'ENG' ? item.name.toLowerCase() : item.nameEN.toLowerCase();
    
    return (
      searchName.includes(normalizedQuery) ||
      otherName.includes(normalizedQuery) ||
      item.id.toString().includes(normalizedQuery) ||
      item.typeName.toLowerCase().includes(normalizedQuery) ||
      (item.subtype && item.subtype.toLowerCase().includes(normalizedQuery))
    );
  });
}

// Find items by grade
export function getItemsByGrade(grade: number): MIR4Item[] {
  return mir4Items.filter(item => item.grade === grade);
}

// Find items by type
export function getItemsByType(type: number): MIR4Item[] {
  return mir4Items.filter(item => item.type === type);
}

// Generate GIVEITEM command
export function generateCommand(itemId: number, quantity: number = 1): string {
  return `GIVEITEM ${itemId} ${quantity}`;
}

// Generate all commands for multiple items
export function generateMultipleCommands(items: { id: number; quantity: number }[]): string[] {
  return items.map(item => generateCommand(item.id, item.quantity));
}
