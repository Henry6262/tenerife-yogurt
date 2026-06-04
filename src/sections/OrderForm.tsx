import { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import { BUSINESS } from '@/data/business';
import FadeContent from '@/components/FadeContent';

type OrderType = 'one-time' | 'subscription';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function OrderForm() {
  const [orderType, setOrderType] = useState<OrderType>('one-time');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = name.trim().length >= 2 && phone.trim().length >= 9 && address.trim().length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/yogurt-leads';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderType, name, phone, address, email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Error al enviar el pedido');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Algo salió mal. Inténtalo de nuevo.');
    }
  };

  const reset = () => {
    setStatus('idle');
    setName('');
    setPhone('');
    setAddress('');
    setEmail('');
    setErrorMsg('');
  };

  return (
    <section id="order" className="relative z-10 py-24 lg:py-32 bg-white">
      <div className="section-container">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              Haz tu pedido
            </span>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4">
              Tu yogurt te espera
            </h2>
            <p className="text-xl lg:text-2xl text-muted">
              Te contactamos por WhatsApp para confirmar la entrega. Pago seguro con Stripe.
            </p>
          </div>
        </FadeContent>

        <FadeContent blur duration={1000} delay={150}>
          <div className="max-w-lg mx-auto rounded-3xl border border-border bg-background p-8 lg:p-10 shadow-xl shadow-primary/5">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">¡Pedido recibido!</h3>
                <p className="text-muted mb-6">
                  Te escribiremos por WhatsApp en menos de 30 minutos para confirmar tu entrega.
                </p>
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                >
                  Hacer otro pedido
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Order type toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`cursor-pointer rounded-2xl border-2 p-4 text-center transition-all ${
                      orderType === 'one-time'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value="one-time"
                      checked={orderType === 'one-time'}
                      onChange={() => setOrderType('one-time')}
                      className="sr-only"
                    />
                    <div className="text-sm font-medium text-muted mb-1">Una vez</div>
                    <div className="text-2xl font-bold text-primary">{BUSINESS.prices.currency}{BUSINESS.prices.oneTime}</div>
                  </label>
                  <label
                    className={`cursor-pointer rounded-2xl border-2 p-4 text-center transition-all ${
                      orderType === 'subscription'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value="subscription"
                      checked={orderType === 'subscription'}
                      onChange={() => setOrderType('subscription')}
                      className="sr-only"
                    />
                    <div className="text-sm font-medium text-muted mb-1">Semanal</div>
                    <div className="text-2xl font-bold text-primary">
                      {BUSINESS.prices.currency}{BUSINESS.prices.subscription}<span className="text-base font-normal text-muted">/{BUSINESS.prices.subscriptionPeriod}</span>
                    </div>
                  </label>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Tu nombre"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="622 123 456"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Dirección de entrega
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Calle, número, barrio"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email <span className="text-muted font-normal">(opcional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-700">
                    {errorMsg || 'No se pudo enviar el pedido. Inténtalo de nuevo.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isValid || status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Hacer pedido — {orderType === 'one-time'
                        ? `${BUSINESS.prices.currency}${BUSINESS.prices.oneTime}`
                        : `${BUSINESS.prices.currency}${BUSINESS.prices.subscription}/${BUSINESS.prices.subscriptionPeriod}`}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted">
                  <ShieldCheck size={14} />
                  Pago seguro con Stripe. Te contactamos por WhatsApp antes de cobrar.
                </div>
              </form>
            )}
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
