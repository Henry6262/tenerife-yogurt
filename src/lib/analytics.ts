// Marketing-pixel layer for Meta (Facebook + Instagram share one pixel) and
// TikTok. Inert until the corresponding VITE_* pixel id is set, so it ships
// safely and you flip it on by pasting ids into env.
//
// Canonical events are mapped to each platform's standard event name so the
// rest of the app fires one vocabulary: 'lead' | 'checkout' | 'purchase' | 'viewcontent'.

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...a: unknown[]) => void; push?: unknown };
    _fbq?: unknown;
    ttq?: any;
  }
}

const META_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const TIKTOK_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID as string | undefined;

let initialized = false;

function loadMeta(id: string) {
  if (window.fbq) return;
  const n: any = (window.fbq = function (...args: unknown[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  });
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
  window.fbq!('init', id);
  window.fbq!('track', 'PageView');
}

function loadTikTok(id: string) {
  if (window.ttq) return;
  const w = window as any;
  const t = 'ttq';
  const ttq = (w[t] = w[t] || []);
  ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
  ttq.setAndDefer = function (obj: any, m: string) {
    obj[m] = function () {
      obj.push([m].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  for (const m of ttq.methods) ttq.setAndDefer(ttq, m);
  ttq.load = function (e: string, opts?: any) {
    const url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
    ttq._i = ttq._i || {};
    ttq._i[e] = [];
    ttq._i[e]._u = url;
    ttq._t = ttq._t || {};
    ttq._t[e] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[e] = opts || {};
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = `${url}?sdkid=${e}&lib=${t}`;
    const first = document.getElementsByTagName('script')[0];
    first.parentNode!.insertBefore(s, first);
  };
  ttq.load(id);
  ttq.page();
}

/** Call once on app start. No-op for any platform whose id is unset. */
export function initAnalytics() {
  if (initialized) return;
  initialized = true;
  if (META_ID) loadMeta(META_ID);
  if (TIKTOK_ID) loadTikTok(TIKTOK_ID);
}

type CanonicalEvent = 'lead' | 'checkout' | 'purchase' | 'viewcontent';

const META_MAP: Record<CanonicalEvent, string> = {
  lead: 'Lead',
  checkout: 'InitiateCheckout',
  purchase: 'Purchase',
  viewcontent: 'ViewContent',
};
const TIKTOK_MAP: Record<CanonicalEvent, string> = {
  lead: 'SubmitForm',
  checkout: 'InitiateCheckout',
  purchase: 'CompletePayment',
  viewcontent: 'ViewContent',
};

export function track(event: CanonicalEvent, params: Record<string, unknown> = {}) {
  try {
    if (window.fbq) window.fbq('track', META_MAP[event], params);
    if (window.ttq) window.ttq.track(TIKTOK_MAP[event], params);
  } catch {
    /* never let analytics break the app */
  }
}

export function pageview() {
  try {
    if (window.fbq) window.fbq('track', 'PageView');
    if (window.ttq) window.ttq.page();
  } catch {
    /* no-op */
  }
}
