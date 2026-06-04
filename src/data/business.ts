export const BUSINESS = {
  name: 'Yogurt Búlgaro Artesanal Tenerife',
  shortName: 'Yogurt Búlgaro',
  tagline: '4.000 años de tradición en cada tarro',
  location: 'Santa Cruz de Tenerife, Islas Canarias',
  deliveryAreas: ['Santa Cruz', 'La Laguna'],
  phone: '', // WhatsApp number, e.g. '+34622123456'
  email: 'hola@yogurtbulgaro-tenerife.com',
  website: 'https://yogurtbulgaro-tenerife.com',
  social: {
    instagram: '', // e.g. 'https://instagram.com/yogurtbulgarotenerife'
    youtube: '',   // e.g. 'https://youtube.com/@yogurtbulgarotenerife'
    whatsapp: '',  // e.g. 'https://wa.me/34622123456'
    tiktok: '',    // e.g. 'https://tiktok.com/@yogurtbulgarotenerife'
  },
  prices: {
    oneTime: 10,
    subscription: 8,
    subscriptionPeriod: 'sem',
    currency: '€',
  },
  product: {
    jarSize: '450g',
    jarsPerPack: 4,
    proteinPerJar: '15g',
  },
} as const;
