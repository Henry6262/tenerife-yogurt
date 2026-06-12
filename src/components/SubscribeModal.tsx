import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, Loader2, ShieldCheck, Mail } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, fmtCHF, p } from '@/data/brand';
import { submitLead, isEmail } from '@/lib/leads';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all';

interface SubscribeModalProps {
  planId: string | null;
  onClose: () => void;
}

// Subscription lead capture: collects contact + delivery details for the
// chosen plan — no payment, we follow up to close.
export default function SubscribeModal({ planId, onClose }: SubscribeModalProps) {
  const { lang, t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const open = planId !== null;
  const plan = open ? BRAND.plans.find((pl) => pl.id === planId) : undefined;

  useEffect(() => {
    if (!open) return;
    setStatus('idle');
    setErrorMsg('');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || !plan) return null;

  const isValid = name.trim().length >= 2 && isEmail(email) && address.trim().length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitLead({ channel: 'subscription', plan: plan.id, name, email, phone, address });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('form.error'));
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t('subModal.title')}
    >
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-background border border-border shadow-2xl shadow-primary/10 animate-[modalIn_.25s_ease-out]">
        <button
          type="button"
          onClick={onClose}
          aria-label={t('order.close')}
          className="absolute top-4 right-4 p-2 rounded-full text-muted hover:text-foreground hover:bg-border/50 transition-colors"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center px-8 py-14">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
              {t('subModal.success')}
            </h3>
            <p className="text-muted text-sm mb-6">{t('subModal.successBody')}</p>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              {t('order.close')}
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <h3 className="font-heading text-2xl font-semibold text-foreground pr-8">
              {t('subModal.title')}
            </h3>
            <p className="text-sm text-muted mt-1.5 mb-6">{t('subModal.subtitle')}</p>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3.5 mb-6">
              <div>
                <div className="font-semibold text-foreground">{p(lang, plan.name)}</div>
                <div className="text-xs text-muted">{p(lang, plan.contents)}</div>
              </div>
              <div className="font-heading text-lg font-semibold text-foreground whitespace-nowrap">
                {fmtCHF(plan.price)}
                <span className="text-xs font-sans font-normal text-muted">{p(lang, plan.cadence)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-700">
                  {errorMsg || t('form.error')}
                </div>
              )}

              <button
                type="submit"
                disabled={!isValid || status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <><Loader2 size={20} className="animate-spin" />{t('form.sending')}</>
                ) : (
                  <><Mail size={20} />{t('subModal.submit')}</>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted">
                <ShieldCheck size={14} />
                {t('subModal.trust')}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
