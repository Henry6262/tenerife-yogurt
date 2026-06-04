import { Check, Sparkles } from 'lucide-react';
import { BUSINESS } from '@/data/business';
import FadeContent from '@/components/FadeContent';

const { currency, oneTime, subscription, subscriptionPeriod } = BUSINESS.prices;
const jarSize = BUSINESS.product.jarSize;
const jarsPerPack = BUSINESS.product.jarsPerPack;

const plans = [
  {
    name: 'Pack Único',
    price: `${currency}${oneTime}`,
    period: '',
    description: `${jarsPerPack} tarros de ${jarSize}`,
    features: [
      'Entrega gratis mañana',
      BUSINESS.deliveryAreas.join(' / '),
      'Pago seguro con Stripe',
      'Sin compromiso',
    ],
    popular: false,
    cta: 'Pedir ahora',
  },
  {
    name: 'Suscripción Semanal',
    price: `${currency}${subscription}`,
    period: `/${subscriptionPeriod}`,
    description: `${jarsPerPack} tarros cada semana · Ahorra ${Math.round((1 - subscription / oneTime) * 100)}%`,
    features: [
      'Todo lo del pack único',
      'Entrega automática semanal',
      'Pausa o cancela cuando quieras',
      'Precio preferente permanente',
    ],
    popular: true,
    cta: 'Suscribirme',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 py-24 lg:py-32 bg-gradient-to-b from-white to-background">
      <div className="section-container">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              Precios
            </span>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4">
              Elige tu pack
            </h2>
            <p className="text-xl lg:text-2xl text-muted">Entrega gratis en Santa Cruz y La Laguna.</p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <FadeContent key={plan.name} blur duration={1000} delay={i * 150}>
              <div
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'bg-foreground text-white border-2 border-primary shadow-lg shadow-primary/10'
                    : 'bg-white border border-border hover:shadow-primary/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                      <Sparkles size={14} />
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className={`text-sm font-medium mb-2 ${
                      plan.popular ? 'text-white/70' : 'text-muted'
                    }`}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span
                        className={`text-lg ${plan.popular ? 'text-white/70' : 'text-muted'}`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm mt-2 ${plan.popular ? 'text-white/70' : 'text-muted'}`}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check
                        size={18}
                        className={plan.popular ? 'text-primary' : 'text-accent'}
                      />
                      <span
                        className={`text-sm ${plan.popular ? 'text-white/90' : 'text-muted'}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#order"
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25'
                      : 'bg-background text-foreground border border-border hover:bg-foreground hover:text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
