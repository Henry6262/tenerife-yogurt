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
  {
    id: '4',
    slug: 'protein-fruehstueck-joghurt',
    title: {
      de: 'Das Protein-Frühstück, das wirklich satt macht',
      en: 'The protein breakfast that actually keeps you full',
    },
    excerpt: {
      de: 'Gesiebtes kiselo mlyako liefert fast doppelt so viel Protein wie normales Joghurt — und hält den Hunger stundenlang fern. Warum das deinen Morgen verändert.',
      en: 'Strained kiselo mlyako delivers nearly twice the protein of regular yogurt — and keeps hunger away for hours. Why it changes your morning.',
    },
    content: {
      de: `Die meisten Frühstücke lassen dich um zehn Uhr wieder hungrig zurück. Süsses Joghurt mit Fruchtboden ist im Grunde Dessert: viel Zucker, wenig Protein, schneller Crash.

Gesiebtes kiselo mlyako dreht das um. Durch das Sieben (2:1) verdoppelt sich der Proteingehalt auf natürliche Weise — ohne Pulver, ohne Zusätze. Ein Becher liefert dir den Eiweissschub, der den Blutzucker stabil hält und den Hunger bis zum Mittag zähmt.

### Warum Protein sättigt

Eiweiss verlangsamt die Magenentleerung und dämpft das Hungerhormon Ghrelin. Kombiniert mit den lebendigen Kulturen, die deinen Darm pflegen, bekommst du nicht nur Sättigung, sondern auch Verdauung im Gleichgewicht.

### So baust du dein Frühstück

- **Pur** mit ein paar Walnüssen und einem Löffel Honig.
- **Herzhaft** mit Olivenöl, Salz und Gurke — die bulgarische Art.
- **Als Bowl** mit Beeren und Leinsamen statt zuckrigem Müesli.

Wer morgens echtes Protein isst, isst tagsüber weniger. Mit einem Krava-Abo steht dein Frühstück jede Woche frisch vor der Tür — kein Schlepppen, kein Zucker, kein Crash.`,
      en: `Most breakfasts leave you hungry again by ten. Sweet fruit-bottom yogurt is essentially dessert: lots of sugar, little protein, a fast crash.

Strained kiselo mlyako flips that. Straining (2:1) naturally doubles the protein content — no powder, no additives. One pot gives you the protein hit that keeps blood sugar steady and tames hunger until noon.

### Why protein keeps you full

Protein slows gastric emptying and dampens the hunger hormone ghrelin. Combined with the live cultures that nurture your gut, you get not just satiety but balanced digestion.

### How to build your breakfast

- **Plain** with a few walnuts and a spoon of honey.
- **Savoury** with olive oil, salt and cucumber — the Bulgarian way.
- **As a bowl** with berries and flaxseed instead of sugary granola.

Eat real protein in the morning and you eat less all day. With a Krava subscription your breakfast arrives fresh each week — no carrying, no sugar, no crash.`,
    },
    category: { de: 'Ernährung', en: 'Nutrition' },
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&h=500&fit=crop',
    keywords: ['protein breakfast', 'strained yogurt', 'satiety', 'low sugar', 'kiselo mlyako'],
    datePublished: '2026-06-04',
    author: 'Krava',
  },
  {
    id: '5',
    slug: 'kiselo-mlyako-fuer-restaurants',
    title: {
      de: 'Warum Zürcher Küchenchefs auf echtes kiselo mlyako setzen',
      en: 'Why Zürich chefs choose real kiselo mlyako',
    },
    excerpt: {
      de: 'Stabil in der Pfanne, dicht am Teller, sauber im Geschmack — warum gesiebtes Joghurt in professionellen Küchen besser funktioniert als jede stabilisierte Ware.',
      en: 'Stable in the pan, dense on the plate, clean on the palate — why strained yogurt outperforms any stabilised product in professional kitchens.',
    },
    content: {
      de: `In einer professionellen Küche zählt jedes Detail — auch das Joghurt. Stabilisierte Industrieware gerinnt unter Hitze, wässert auf dem Teller und schmeckt flach. Für anspruchsvolle Köche ist das ein Problem.

### Stabil unter Hitze

Echtes gesiebtes kiselo mlyako enthält kein Pektin und keine Stärke — und trotzdem trennt es sich nicht. Sein konzentriertes Protein bleibt in warmen Saucen, Dips und Aufläufen stabil. Kein Gerinnen, kein Wässern.

### Dichte ohne Tricks

Die samtige Textur kommt allein aus dem Sieben (2:1). Das bedeutet eine verlässliche Konsistenz von Charge zu Charge — entscheidend, wenn ein Gericht jeden Abend gleich aussehen und schmecken muss.

### Sauberer Geschmack als Bühne

Die klare, frische Säure von Lactobacillus bulgaricus trägt Kräuter, Knoblauch und Olivenöl, ohne sie zu überdecken. Vom Tzatziki bis zum Dessert bleibt der Eigengeschmack rein.

### So arbeiten wir mit Restaurants

Wir liefern in der Region Zürich in Gastronomie-Gebinden, mit verlässlichem Rhythmus und voller Rückverfolgbarkeit. Schreib uns über unser Chef-Portal — wir bringen ein Muster vorbei und du entscheidest am Teller.`,
      en: `In a professional kitchen every detail counts — including the yogurt. Stabilised industrial product curdles under heat, weeps on the plate and tastes flat. For serious chefs that is a problem.

### Stable under heat

Real strained kiselo mlyako contains no pectin and no starch — and still it does not split. Its concentrated protein stays stable in warm sauces, dips and bakes. No curdling, no weeping.

### Density without tricks

The velvet texture comes from straining alone (2:1). That means reliable consistency batch to batch — crucial when a dish must look and taste the same every night.

### Clean flavour as a stage

The clear, fresh acidity of Lactobacillus bulgaricus carries herbs, garlic and olive oil without masking them. From tzatziki to dessert, the character stays pure.

### How we work with restaurants

We deliver across the Zürich area in hospitality formats, on a reliable rhythm and with full traceability. Reach us through our chef portal — we will bring a sample and you decide on the plate.`,
    },
    category: { de: 'Gastronomie', en: 'Hospitality' },
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop',
    keywords: ['restaurant yogurt', 'foodservice', 'heat stable', 'b2b', 'zurich gastronomy'],
    datePublished: '2026-06-06',
    author: 'Krava',
  },
];
