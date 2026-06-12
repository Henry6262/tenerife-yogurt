import { useState } from 'react';
import { ClipboardList, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, fmtCHF } from '@/data/brand';
import { reservePreorder, isEmail, type Sku } from '@/lib/checkout';
import FadeContent from '@/components/FadeContent';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all';

export default function PreorderReserve({ embedded = false }: { embedded?: boolean } = {}) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [sku, setSku] = useState<Sku>('daily');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = name.trim().length >= 2 && isEmail(email) && address.trim().length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await reservePreorder({ name, email, phone, address, sku, quantity });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('form.error'));
    }
  };

  const reset = () => {
    setStatus('idle');
    setName('');
    setEmail('');
    setAddress('');
    setPhone('');
    setQuantity(1);
  };

  const body = (
        <FadeContent blur duration={1000} delay={150}>
          <div className="max-w-lg mx-auto rounded-3xl border border-border bg-background p-8 lg:p-10 shadow-xl shadow-primary/5">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                  {t('reserve.success')}
                </h3>
                <p className="text-muted text-sm mb-4">{t('reserve.successBody')}</p>
                <button
                  onClick={reset}
                  className="mt-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                >
                  {t('reserve.again')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t('form.product')}</label>
                    <select value={sku} onChange={(e) => setSku(e.target.value as Sku)} className={inputClass}>
                      {BRAND.products.map((pr) => (
                        <option key={pr.id} value={pr.id}>
                          {pr.name} — {fmtCHF(pr.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t('form.quantity')}</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(50, parseInt(e.target.value, 10) || 1)))}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('form.name')}</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('form.email')}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('form.address')}</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('form.phone')} <span className="text-muted font-normal">({t('form.optional')})</span>
                  </label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                </div>

                {status === 'error' && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-700">
                    {errorMsg || t('form.error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isValid || status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-foreground text-white font-semibold text-lg shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={20} className="animate-spin" />{t('form.sending')}</>
                  ) : (
                    <><ClipboardList size={20} />{t('reserve.submit')}</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted">
                  <ShieldCheck size={14} />
                  {t('reserve.trust')}
                </div>
              </form>
            )}
          </div>
        </FadeContent>
  );

  if (embedded) return body;

  return (
    <section id="reserve" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label text-primary">{t('reserve.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-4">
              {t('reserve.title')}
            </h2>
            <p className="text-lg text-muted">{t('reserve.subtitle')}</p>
          </div>
        </FadeContent>
        {body}
      </div>
    </section>
  );
}
