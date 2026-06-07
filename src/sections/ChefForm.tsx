import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { submitLead, isEmail } from '@/lib/leads';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all';

export default function ChefForm() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [weeklyVolumeKg, setWeeklyVolumeKg] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = name.trim().length >= 2 && restaurant.trim().length >= 2 && isEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitLead({ channel: 'b2b', name, restaurant, email, phone, weeklyVolumeKg, message });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('form.error'));
    }
  };

  if (status === 'success') {
    return (
      <div id="chef-form" className="max-w-lg mx-auto rounded-3xl border border-border bg-background p-10 text-center shadow-xl shadow-primary/5 scroll-mt-20">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-2xl font-semibold text-foreground">{t('form.success')}</h3>
      </div>
    );
  }

  return (
    <form
      id="chef-form"
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto rounded-3xl border border-border bg-background p-8 lg:p-10 shadow-xl shadow-primary/5 space-y-5 scroll-mt-20"
    >
      <h3 className="font-heading text-2xl font-semibold text-foreground">{t('chefs.formTitle')}</h3>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">{t('form.restaurant')}</label>
        <input type="text" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} required className={inputClass} />
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
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t('form.phone')} <span className="text-muted font-normal">({t('form.optional')})</span>
        </label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">{t('form.volume')}</label>
        <input
          type="text"
          value={weeklyVolumeKg}
          onChange={(e) => setWeeklyVolumeKg(e.target.value)}
          placeholder={t('chefs.volume')}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t('form.message')} <span className="text-muted font-normal">({t('form.optional')})</span>
        </label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={inputClass} />
      </div>

      {status === 'error' && (
        <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-700">
          {errorMsg || t('form.error')}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === 'loading' ? (
          <><Loader2 size={20} className="animate-spin" />{t('form.sending')}</>
        ) : (
          <><Send size={20} />{t('form.send')}</>
        )}
      </button>
    </form>
  );
}
