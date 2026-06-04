export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  youtubeUrl: string
  difficulty: 'Fácil' | 'Medio' | 'Difícil'
  prepTime: string
  calories: string
  tags: string[]
}

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Smoothie de Proteína Post-Entreno',
    description:
      'El batido perfecto después del gimnasio. Yogurt búlgaro, plátano, avena y miel. 25g de proteína natural para recuperación muscular óptima.',
    image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=800&h=500&fit=crop',
    youtubeUrl: 'https://www.youtube.com/results?search_query=smoothie+proteina+yogur+batido+post+entreno',
    difficulty: 'Fácil',
    prepTime: '5 min',
    calories: '320 kcal',
    tags: ['Post-entreno', 'Alta proteína', 'Batido'],
  },
  {
    id: '2',
    title: 'Tzatziki Auténtico Búlgaro',
    description:
      'La receta original de los Balcanes. Yogurt búlgaro espeso, pepino fresco, ajo y eneldo. Acompañamiento perfecto para carnes, pescados o como dip saludable.',
    image: 'https://images.unsplash.com/photo-1777199264017-84af9308a41f?w=800&h=500&fit=crop',
    youtubeUrl: 'https://www.youtube.com/results?search_query=tzatziki+receta+autentica+yogur+bulgaro',
    difficulty: 'Fácil',
    prepTime: '10 min',
    calories: '120 kcal',
    tags: ['Entrante', 'Saludable', 'Mediterráneo'],
  },
  {
    id: '3',
    title: 'Mousse de Yogurt con Miel y Nueces',
    description:
      'Postre indulgente pero saludable. Textura aireada de yogurt búlgaro con miel cruda de Tenerife y nueces tostadas. Solo 3 ingredientes, resultado de restaurante.',
    image: 'https://images.unsplash.com/photo-1633893215271-f7e1fca081ad?w=800&h=500&fit=crop',
    youtubeUrl: 'https://www.youtube.com/results?search_query=mousse+yogur+miel+nueces+postre+saludable',
    difficulty: 'Medio',
    prepTime: '15 min',
    calories: '280 kcal',
    tags: ['Postre', 'Sin horno', 'Gourmet'],
  },
]
