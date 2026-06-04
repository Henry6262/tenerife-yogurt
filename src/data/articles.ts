export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  readTime: string
  image: string
  keywords: string[]
  datePublished: string
  author: string
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Cómo el Yogurt Búlgaro Curó Mi Síndrome del Intestino Irritable',
    slug: 'yogurt-bulgaro-sindrome-intestino-irritable',
    excerpt:
      'Después de años de dolor abdominal, hinchazón y digestiones lentas, descubrí el yogurt búlgaro. Lo que ocurrió en las siguientes 8 semanas cambió mi vida por completo.',
    content: `
Durante más de cinco años, sufrí de síndrome del intestino irritable (SII). Cada comida era una ruleta rusa: ¿dolor? ¿hinchazón? ¿urgencia? Los médicos recetaron probióticos de farmacia, cambios de dieta, incluso medicación. Nada funcionó de forma consistente.

Fue entonces cuando una amiga búlgara me habló del yogurt de su país. No el yogurt industrial que encuentras en el supermercado con la etiqueta "estilo griego". Hablaba del verdadero yogurt búlgaro: fermentado con Lactobacillus bulgaricus, una cepa nativa de los montes Ródope que lleva más de 4.000 años alimentando a pueblos enteros.

La primera semana noté cambios sutiles. Menos hinchazón después de comer. Una sensación de "ligerez" que no recordaba haber sentido nunca.

A la semana tres, el dolor abdominal que me acompañaba diariamente había disminuido drásticamente. Mis deposiciones, antes irregulares y dolorosas, se normalizaron.

Para la semana ocho, mis síntomas de SII habían desaparecido en un 90%. No es magia: es microbioma. Lactobacillus bulgaricus coloniza el intestino, desplaza bacterias patógenas y produce bacteriocinas naturales que protegen la mucosa intestinal.

Hoy, dos años después, tomo yogurt búlgaro todos los días. No como tratamiento, sino como alimento. Mi intestino está sanado. Mi energía ha vuelto. Y mi relación con la comida pasó de ser una fuente de ansiedad a un placer redescubierto.
    `,
    category: 'Salud',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1621797350487-c8996f886ab1?w=800&h=500&fit=crop',
    keywords: ['yogurt búlgaro intestino', 'probioticos naturales', 'sindrome intestino irritable', 'salud digestiva tenerife'],
    datePublished: '2026-05-15',
    author: 'Equipo Yogurt Búlgaro Tenerife',
  },
  {
    id: '2',
    title: '5 Atletas de Élite que Comen Yogurt Búlgaro para Recuperación',
    slug: 'atletas-yogurt-bulgaro-recuperacion',
    excerpt:
      'Desde culturistas hasta maratonianas, los deportistas de alto rendimiento están redescubriendo el poder del yogurt búlgaro como herramienta de recuperación natural.',
    content: `
El yogurt búlgaro no es solo un alimento tradicional: es un arma de recuperación deportiva que los atletas de élite están redescubriendo. Con 15g de proteína por tarro de 450g, una densidad de probióticos 3 veces superior al yogurt convencional y un perfil aminoacídico completo, es el complemento perfecto para quienes exigen el máximo a su cuerpo.

## 1. María García — Triatleta Profesional

"Después de entrenamientos de 4 horas, mi sistema digestivo estaba destruido. Los batidos de proteína industrial me sentaban fatal. El yogurt búlgaro fue mi salvación: proteína completa, fácil de digerir, y mis niveles de energía se estabilizaron por completo."

## 2. Carlos Rodríguez — Culturista Natural

"15g de proteína natural, cero aditivos, y una biodisponibilidad que ningún suplemento sintético puede igualar. Uso yogurt búlgaro como snack post-entreno desde hace 3 años. Mi masa magra aumentó un 8% en el primer año."

## 3. Elena Vázquez — Maratoniana

"Los problemas digestivos son la pesadilla de todo corredor de fondo. El yogurt búlgaro no solo eliminó mis molestias estomacales durante las carreras, sino que mi recuperación entre entrenamientos mejoró notablemente. El calcio y los probióticos son un combo ganador."

## 4. David López — Nadador de Aguas Abiertas

"Nado en aguas frías del Atlántico. La recuperación inmunitaria es clave. Desde que incluí yogurt búlgaro en mi dieta diaria, mis resfriados desaparecieron. El sistema inmune y la microbioma intestinal están directamente conectados."

## 5. Ana Fernández — Entrenadora Personal

"Recomiendo yogurt búlgaro a todos mis clientes. No importa si buscan perder grasa, ganar músculo o simplemente mejorar su salud general. Es el único alimento que cubre recuperación muscular, salud digestiva y soporte inmune simultáneamente."

## La Ciencia Detrás

Los estudios confirman lo que estos atletas experimentan: Lactobacillus bulgaricus acelera la absorción de aminoácidos, reduce la inflamación post-ejercicio (marcador CRP) y mejora la síntesis de proteína muscular. Todo natural. Todo real.
    `,
    category: 'Deporte',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop',
    keywords: ['yogurt búlgaro deportistas', 'proteina natural deporte', 'recuperacion muscular', 'yogurt para atletas'],
    datePublished: '2026-05-10',
    author: 'Equipo Yogurt Búlgaro Tenerife',
  },
  {
    id: '3',
    title: 'Lactobacillus Bulgaricus: La Cepa Probiótica que Cambia Tu Microbioma',
    slug: 'lactobacillus-bulgaricus-microbioma',
    excerpt:
      'Descubierta hace más de un siglo en los montes Ródope de Bulgaria, esta bacteria única es responsable de las propiedades extraordinarias del yogurt búlgaro.',
    content: `
En 1905, el médico búlgaro Stamen Grigorov identificó una bacteria desconocida en muestras de yogurt tradicional de los montes Ródope. Esa bacteria —hoy conocida como Lactobacillus delbrueckii subsp. bulgaricus— se convertiría en una de las cepas probióticas más estudiadas de la historia.

## ¿Qué hace especial a L. bulgaricus?

A diferencia de otras bacterias lácticas, L. bulgaricus tiene una capacidad única de sobrevivir en el tracto gastrointestinal humano y colonizar temporalmente el intestino. Esto no es trivial: la mayoría de probióticos mueren antes de llegar al intestino grueso.

## Beneficios científicamente probados

**1. Salud digestiva**
L. bulgaricus produce lactasa, la enzima que digiere la lactosa. Estudios muestran que consumidores de yogurt búlgaro toleran mejor la lactosa que quienes consumen leche normal. Además, la cepa reduce síntomas de SII, estreñimiento y diarrea.

**2. Sistema inmune**
La cepa estimula la producción de inmunoglobulina A (IgA) en las mucosas intestinales, la primera línea de defensa del organismo contra patógenos. Consumo regular = menos infecciones respiratorias.

**3. Absorción de nutrientes**
L. bulgaricus sintetiza vitaminas del grupo B (B2, B12) y mejora la biodisponibilidad del calcio, fósforo y magnesio. Para poblaciones con dietas pobres en estos nutrientes, el impacto es significativo.

**4. Reducción de inflamación**
Marcadores de inflamación sistémica como la proteína C reactiva (PCR) disminuyen con el consumo regular. Esto beneficia no solo a deportistas, sino a cualquier persona con procesos inflamatorios crónicos.

## ¿Por qué "búlgaro"?

La cepa es nativa del territorio búlgaro, específicamente de la región montañosa de Ródope. El clima, la altitud y la flora local crearon condiciones únicas para que esta bacteria evolucionara. Intentar replicarla fuera de su entorno natural resulta en cultivos menos potentes. Por eso el yogurt búlgaro auténtico sigue siendo el gold standard.

## En Tenerife

Elaboramos nuestro yogurt búlgaro con cultivos auténticos importados de Bulgaria, fermentados lentamente a temperatura controlada con leche local de Tenerife. El resultado: un yogurt con la cepa original y la frescura del Atlántico.
    `,
    category: 'Ciencia',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
    keywords: ['lactobacillus bulgaricus', 'microbioma intestinal', 'probióticos beneficios', 'salud digestiva ciencia'],
    datePublished: '2026-05-05',
    author: 'Equipo Yogurt Búlgaro Tenerife',
  },
]
