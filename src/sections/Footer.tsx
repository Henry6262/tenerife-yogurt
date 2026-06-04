import { MapPin, Phone, Mail, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/data/business';

const footerLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Historia', href: '#story' },
  { label: 'Beneficios', href: '#benefits' },
  { label: 'Precios', href: '#pricing' },
  { label: 'Recetas', href: '#recipes' },
  { label: 'Atletas', href: '#athletes' },
  { label: 'Hacer pedido', href: '#order' },
];

export default function Footer() {
  const { social, email, location, name, shortName } = BUSINESS;

  return (
    <footer className="bg-foreground text-white/80">
      <div className="section-container py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🥛</span>
              <span className="font-heading font-bold text-xl text-white">{name}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
              El auténtico yogurt búlgaro, fermentado con <em>Lactobacillus bulgaricus</em> y elaborado
              a mano en Tenerife. {BUSINESS.tagline}.
            </p>
            <div className="flex items-center gap-4">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              )}
              {social.whatsapp && (
                <a
                  href={social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Enlaces</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                {location}
              </li>
              {BUSINESS.phone && (
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <Phone size={16} className="shrink-0 text-primary" />
                  <a href={`tel:${BUSINESS.phone}`} className="hover:text-primary transition-colors">
                    {BUSINESS.phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="shrink-0 text-primary" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {shortName} Tenerife. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/40">
            Hecho a mano con ❤️ en Tenerife
          </p>
        </div>
      </div>

      {/* SEO-rich footer text */}
      <div className="sr-only">
        <h2>Yogurt Búlgaro en Tenerife</h2>
        <p>
          Yogurt búlgaro artesanal elaborado en Tenerife con leche local y cultivos auténticos
          de Lactobacillus bulgaricus. Beneficios probióticos, alto en proteína, sin aditivos.
          Entrega a domicilio en Santa Cruz de Tenerife y La Laguna. Recetas, beneficios para
          deportistas, salud intestinal y microbioma.
        </p>
      </div>
    </footer>
  );
}
