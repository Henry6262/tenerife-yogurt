type L<T = string> = { de: T; en: T };

export interface Recipe {
  id: string;
  slug: string;
  title: L;
  description: L;
  image: string;
  difficulty: L;
  prepTime: string;
  tags: L<string[]>;
  ingredients: L<string[]>;
  method: L<string[]>;
}

export const recipes: Recipe[] = [
  {
    id: '1',
    slug: 'high-protein-breakfast-bowl',
    title: { de: 'High-Protein Frühstücks-Bowl', en: 'High-Protein Breakfast Bowl' },
    description: {
      de: 'Krava Daily, Beeren, Walnüsse und ein Faden Honig. Sauberes Protein für den Start in den Tag.',
      en: 'Krava Daily, berries, walnuts and a thread of honey. Clean protein to start the day.',
    },
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=500&fit=crop',
    difficulty: { de: 'Einfach', en: 'Easy' },
    prepTime: '5 min',
    tags: { de: ['Frühstück', 'Hohes Protein'], en: ['Breakfast', 'High protein'] },
    ingredients: {
      de: ['200 g Krava Daily', '1 Handvoll Beeren', '20 g Walnüsse', '1 TL lokaler Honig', '1 EL Leinsamen'],
      en: ['200 g Krava Daily', '1 handful of berries', '20 g walnuts', '1 tsp local honey', '1 tbsp flaxseed'],
    },
    method: {
      de: [
        'Krava Daily in eine Schale geben und glatt rühren.',
        'Beeren und Walnüsse darauf verteilen.',
        'Mit Leinsamen bestreuen und mit Honig beträufeln.',
        'Sofort servieren.',
      ],
      en: [
        'Spoon Krava Daily into a bowl and stir until smooth.',
        'Scatter berries and walnuts on top.',
        'Sprinkle with flaxseed and drizzle with honey.',
        'Serve immediately.',
      ],
    },
  },
  {
    id: '2',
    slug: 'authentic-balkan-tzatziki',
    title: { de: 'Authentisches Balkan-Tzatziki', en: 'Authentic Balkan Tzatziki' },
    description: {
      de: 'Die Originalrezeptur: gesiebtes Krava, Gurke, Knoblauch und Dill. Perfekt zu Fleisch oder als Dip.',
      en: 'The original recipe: strained Krava, cucumber, garlic and dill. Perfect with meat or as a dip.',
    },
    image: 'https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=800&h=500&fit=crop',
    difficulty: { de: 'Einfach', en: 'Easy' },
    prepTime: '15 min',
    tags: { de: ['Vorspeise', 'Balkan'], en: ['Starter', 'Balkan'] },
    ingredients: {
      de: ['400 g Krava Strained', '1 Salatgurke', '2 Knoblauchzehen', '1 EL Olivenöl', 'Frischer Dill', 'Salz'],
      en: ['400 g Krava Strained', '1 cucumber', '2 garlic cloves', '1 tbsp olive oil', 'Fresh dill', 'Salt'],
    },
    method: {
      de: [
        'Gurke grob reiben, salzen und 10 Minuten ziehen lassen, dann ausdrücken.',
        'Knoblauch fein hacken oder pressen.',
        'Krava Strained mit Gurke, Knoblauch, Olivenöl und Dill verrühren.',
        'Mit Salz abschmecken und gekühlt servieren.',
      ],
      en: [
        'Coarsely grate the cucumber, salt it, rest 10 minutes, then squeeze dry.',
        'Finely chop or press the garlic.',
        'Stir Krava Strained with cucumber, garlic, olive oil and dill.',
        'Season with salt and serve chilled.',
      ],
    },
  },
  {
    id: '3',
    slug: 'strained-labneh-spread',
    title: { de: 'Gesiebter Labneh-Aufstrich', en: 'Strained Labneh Spread' },
    description: {
      de: 'Krava Reserve mit Olivenöl, Zitrone und Kräutern — ein dichter, samtiger Aufstrich für die Festtafel.',
      en: 'Krava Reserve with olive oil, lemon and herbs — a dense, velvet spread for the feast table.',
    },
    image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&h=500&fit=crop',
    difficulty: { de: 'Mittel', en: 'Medium' },
    prepTime: '10 min',
    tags: { de: ['Mezze', 'Gourmet'], en: ['Mezze', 'Gourmet'] },
    ingredients: {
      de: ['300 g Krava Reserve', '2 EL Olivenöl extra vergine', '1 Spritzer Zitrone', 'Za’atar oder Thymian', 'Meersalz'],
      en: ['300 g Krava Reserve', '2 tbsp extra-virgin olive oil', 'A squeeze of lemon', "Za'atar or thyme", 'Sea salt'],
    },
    method: {
      de: [
        'Krava Reserve auf einen flachen Teller streichen.',
        'Mit Olivenöl und einem Spritzer Zitrone beträufeln.',
        'Mit Za’atar oder Thymian und Meersalz bestreuen.',
        'Mit warmem Fladenbrot servieren.',
      ],
      en: [
        'Spread Krava Reserve across a shallow plate.',
        'Drizzle with olive oil and a squeeze of lemon.',
        "Sprinkle with za'atar or thyme and sea salt.",
        'Serve with warm flatbread.',
      ],
    },
  },
  {
    id: '4',
    slug: 'post-workout-smoothie',
    title: { de: 'Post-Workout Smoothie', en: 'Post-Workout Smoothie' },
    description: {
      de: 'Krava Daily, Banane, Haferflocken und Honig. Schnelle Erholung mit natürlichem Protein.',
      en: 'Krava Daily, banana, oats and honey. Fast recovery with natural protein.',
    },
    image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=800&h=500&fit=crop',
    difficulty: { de: 'Einfach', en: 'Easy' },
    prepTime: '5 min',
    tags: { de: ['Post-Workout', 'Smoothie'], en: ['Post-workout', 'Smoothie'] },
    ingredients: {
      de: ['250 g Krava Daily', '1 reife Banane', '3 EL Haferflocken', '1 TL Honig', '150 ml Wasser oder Milch'],
      en: ['250 g Krava Daily', '1 ripe banana', '3 tbsp oats', '1 tsp honey', '150 ml water or milk'],
    },
    method: {
      de: [
        'Alle Zutaten in den Mixer geben.',
        'Glatt und cremig mixen.',
        'In ein hohes Glas füllen und sofort trinken.',
      ],
      en: [
        'Add all ingredients to the blender.',
        'Blend until smooth and creamy.',
        'Pour into a tall glass and drink immediately.',
      ],
    },
  },
];
