import { Dna, Dumbbell, Shield } from 'lucide-react';
import FadeContent from '@/components/FadeContent';

const benefits = [
  {
    icon: Dna,
    title: 'Poder Probiótico',
    description:
      'Lactobacillus bulgaricus coloniza tu intestino y restaura el equilibrio de tu microbioma. Ideal para problemas digestivos crónicos, hinchazón y SII.',
  },
  {
    icon: Dumbbell,
    title: 'Recuperación Muscular',
    description:
      '15g de proteína de alta biodisponibilidad por tarro. Sin aditivos ni polvos sintéticos. El snack post-entreno que tu cuerpo realmente absorbe.',
  },
  {
    icon: Shield,
    title: 'Defensas Naturales',
    description:
      'Fortalece tu sistema inmune desde el intestino. Estudios demuestran que L. bulgaricus aumenta la producción de inmunoglobulina A (IgA).',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative z-10 py-24 lg:py-32 bg-white">
      <div className="section-container">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              Por qué elegirnos
            </span>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4">
              Puro, natural y poderoso
            </h2>
            <p className="text-xl lg:text-2xl text-muted">
              Cada tarro es fermentado y colado a mano en Tenerife con cultivos auténticos de Bulgaria.
            </p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <FadeContent key={benefit.title} blur duration={1000} delay={i * 150}>
              <div className="group relative p-8 rounded-3xl border border-border bg-background hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <benefit.icon size={28} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-lg text-muted leading-relaxed">{benefit.description}</p>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
