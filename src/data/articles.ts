type L = { de: string; en: string };

export interface Article {
  id: string;
  slug: string;
  title: L;
  excerpt: L;
  content: L; // markdown
  category: L;
  readTime: string;
  image: string;
  keywords: string[];
  datePublished: string;
  author: string;
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'live-cultures-gut-health',
    title: {
      de: 'Warum Darmgesundheit mit lebendigen Kulturen beginnt',
      en: 'Why gut health starts with live cultures',
    },
    excerpt: {
      de: 'Lebendige Kulturen statt pasteurisierter Leere — was echtes kiselo mlyako von Industriejoghurt unterscheidet.',
      en: 'Live cultures over pasteurised emptiness — what real kiselo mlyako does that industrial yogurt cannot.',
    },
    content: {
      de: `Die meisten Joghurts im Schweizer Supermarktregal sind funktionell tot. Sie werden nach der Fermentation erneut erhitzt, um die Haltbarkeit zu verlängern — und töten dabei genau die Bakterien ab, die deinem Darm guttun.

Echtes bulgarisches kiselo mlyako geht den umgekehrten Weg. Es wird mit dem symbiotischen Duo **Lactobacillus bulgaricus** und **Streptococcus thermophilus** fermentiert und nie wieder über die Schwelle erhitzt, die diese Stämme abtötet. Was im Glas ankommt, ist lebendig.

### Was lebendige Kulturen leisten

Lebendige Milchsäurebakterien besiedeln den Darm, verdrängen pathogene Keime und produzieren natürliche Bacteriocine, die die Darmschleimhaut schützen. Sie spalten Laktose vor — weshalb viele Menschen mit leichter Laktoseintoleranz echtes Joghurt besser vertragen als Milch.

### Worauf du achten solltest

- **Keine zweite Erhitzung** nach der Fermentation.
- **Keine Stabilisatoren** wie Pektin oder Stärke — echte Textur kommt aus dem Protein, nicht aus dem Labor.
- **Kurze Zutatenliste:** Milch und Kultur. Mehr braucht es nicht.

Bei Krava sieben wir von Hand und kühlen durchgehend. Das Ergebnis ist dicht, lebendig und so, wie Joghurt seit 4.000 Jahren gedacht war.`,
      en: `Most yogurts on a Swiss supermarket shelf are functionally dead. They are re-heated after fermentation to extend shelf life — killing the very bacteria that are good for your gut.

Real Bulgarian kiselo mlyako does the opposite. It is fermented with the symbiotic duo **Lactobacillus bulgaricus** and **Streptococcus thermophilus**, and never re-heated past the threshold that kills those strains. What lands in the jar is alive.

### What live cultures do

Live lactic-acid bacteria colonise the gut, crowd out pathogens, and produce natural bacteriocins that protect the intestinal lining. They pre-digest lactose — which is why many people with mild lactose intolerance tolerate real yogurt better than milk.

### What to look for

- **No second heat treatment** after fermentation.
- **No stabilisers** like pectin or starch — real texture comes from protein, not a lab.
- **A short ingredient list:** milk and culture. Nothing else is needed.

At Krava we hand-strain and keep the cold chain unbroken. The result is dense, alive, and exactly what yogurt was meant to be for 4,000 years.`,
    },
    category: { de: 'Gesundheit', en: 'Health' },
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=500&fit=crop',
    keywords: ['gut health', 'probiotics', 'lactobacillus bulgaricus', 'kiselo mlyako', 'live cultures'],
    datePublished: '2026-05-20',
    author: 'Krava',
  },
  {
    id: '2',
    slug: 'kiselo-vs-greek-style',
    title: {
      de: 'Echtes kiselo mlyako vs. „Greek Style“',
      en: 'Authentic kiselo mlyako vs. "Greek style"',
    },
    excerpt: {
      de: 'Warum „griechischer Stil“ oft nur Marketing ist — und wie sich echte Tradition im Glas erkennen lässt.',
      en: 'Why "Greek style" is often just marketing — and how to spot real tradition in the jar.',
    },
    content: {
      de: `„Greek Style“ ist kein Herkunftsschutz, sondern ein Marketing-Label. Vieles, was so verkauft wird, ist mit Rahm angereichert, mit Stärke verdickt oder mit Pektin stabilisiert, um Dichte vorzutäuschen.

Echtes kiselo mlyako erreicht seine Dichte anders: durch **Sieben**. Wir lassen die Molke bei 2–4 °C durch sterilisiertes Tuch ablaufen, bis sich das Volumen halbiert (2:1). Was bleibt, ist konzentriertes Protein und ein samtiger Körper — ganz ohne Zusätze.

### Der Geschmack der Wahrheit

Lactobacillus bulgaricus erzeugt Acetaldehyd und Diacetyl: jene scharfe, saubere Säure, die echtes bulgarisches Joghurt unverwechselbar macht. Industrieware schmeckt oft flach und süsslich, weil die Fermentation früh gestoppt und mit Zucker kaschiert wird.

### Der Küchentest

Gib einen Löffel in eine heisse Pfanne. Echtes gesiebtes Joghurt bleibt stabil und trennt sich nicht — ein Grund, warum Küchenchefs es lieben. Stabilisierte Ware gerinnt und wässert.

Reinheit erkennt man nicht am Etikett, sondern am Verhalten im Glas und in der Pfanne.`,
      en: `"Greek style" is not a protected origin — it is a marketing label. Much of what is sold that way is enriched with cream, thickened with starch, or stabilised with pectin to fake density.

Real kiselo mlyako reaches density differently: by **straining**. We let the whey drain through sterilised cloth at 2–4 °C until the volume halves (2:1). What remains is concentrated protein and a velvet body — with no additives at all.

### The taste of truth

Lactobacillus bulgaricus produces acetaldehyde and diacetyl: that sharp, clean acidity that makes real Bulgarian yogurt unmistakable. Industrial product often tastes flat and sweetish because fermentation is stopped early and masked with sugar.

### The kitchen test

Drop a spoonful into a hot pan. Real strained yogurt stays stable and does not split — one reason chefs love it. Stabilised product curdles and weeps.

Purity is not something you read on a label. It is something the jar — and the pan — proves.`,
    },
    category: { de: 'Handwerk', en: 'Craft' },
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=800&h=500&fit=crop',
    keywords: ['greek yogurt', 'strained yogurt', 'kiselo mlyako', 'zero syneresis', 'additive free'],
    datePublished: '2026-05-25',
    author: 'Krava',
  },
  {
    id: '3',
    slug: 'sofia-to-zurich-supply-chain',
    title: {
      de: 'Von Sofia nach Zürich: unsere Lieferkette',
      en: 'From Sofia to Zürich: our supply chain',
    },
    excerpt: {
      de: 'Schweizer Bio-Rohmilch trifft original bulgarische Kulturen. Wie unser hybrider Weg Reinheit und Herkunft verbindet.',
      en: 'Swiss organic raw milk meets original Bulgarian cultures. How our hybrid path joins purity and provenance.',
    },
    content: {
      de: `Krava steht auf zwei Beinen: Schweizer Milch und bulgarische Seele.

### Die Milch bleibt lokal

Rohmilch über die Grenze zu bringen ist in der Schweiz stark reglementiert — und das ist gut so. Wir beziehen zertifizierte **Bio-Rohmilch** direkt von Familienhöfen im Kanton Zürich. Kurze Wege, volle Rückverfolgbarkeit, echtes Terroir.

### Die Kultur kommt aus Sofia

Was leicht und kostbar ist, reist mit: original gefriergetrocknete **Genesis-Kulturen** aus Sofia. Ein einziges Sachet beimpft mehrere Liter Milch und bewahrt die jahrtausendealte symbiotische Verbindung der Stämme.

### Warum hybrid?

Weil jede Komponente dort herkommt, wo sie am besten ist. Schweizer Milchwirtschaft gehört zu den saubersten der Welt; bulgarische Kulturen sind das authentische Herz von kiselo mlyako. Zusammen ergeben sie etwas, das es in keinem Regal gibt: „Schweizer Reinheit, bulgarische Seele.“`,
      en: `Krava stands on two legs: Swiss milk and Bulgarian soul.

### The milk stays local

Bringing raw milk across the border is heavily regulated in Switzerland — and rightly so. We source certified **organic raw milk** directly from family farms in Canton Zürich. Short distances, full traceability, real terroir.

### The culture comes from Sofia

What is light and precious travels with us: original freeze-dried **Genesis cultures** from Sofia. A single sachet inoculates several litres of milk and preserves the millennia-old symbiotic bond between the strains.

### Why hybrid?

Because each component comes from where it is best. Swiss dairy is among the cleanest in the world; Bulgarian cultures are the authentic heart of kiselo mlyako. Together they make something no shelf carries: "Swiss purity, Bulgarian soul."`,
    },
    category: { de: 'Herkunft', en: 'Provenance' },
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=500&fit=crop',
    keywords: ['supply chain', 'swiss organic milk', 'genesis cultures', 'sofia', 'zurich dairy'],
    datePublished: '2026-05-30',
    author: 'Krava',
  },
];
