export interface Athlete {
  id: string
  name: string
  sport: string
  image: string
  quote: string
  stats: string
}

export const athletes: Athlete[] = [
  {
    id: '1',
    name: 'María G.',
    sport: 'Triatleta',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&h=800&fit=crop',
    quote: 'Mi recuperación post-entreno cambió por completo. El yogurt búlgaro es mi secreto.',
    stats: '3x Ironman 70.3',
  },
  {
    id: '2',
    name: 'Carlos R.',
    sport: 'Culturista',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=800&fit=crop',
    quote: '15g de proteína natural. Sin aditivos. Mi masa magra subió un 8% en un año.',
    stats: 'Campeón Regional',
  },
  {
    id: '3',
    name: 'Elena V.',
    sport: 'Corredora',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop',
    quote: 'Mi digestión nunca había estado tan fuerte. Cero problemas en maratón.',
    stats: 'Maratón Berlin 2:45',
  },
]
