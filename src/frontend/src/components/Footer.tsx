import { Facebook, Instagram, Mail, Twitter } from "lucide-react";

const SOCIAL_ICONS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Facebook, label: "Facebook" },
];

const SHOP_LINKS = [
  "All Products",
  "Furniture",
  "Lighting",
  "Accessories",
  "New Arrivals",
  "Sale",
];
const COMPANY_LINKS = ["About Us", "Journal", "Careers", "Press", "Contact"];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-4">
              <span className="font-display font-extrabold text-2xl uppercase tracking-widest block">
                URBAN
              </span>
              <span className="font-display text-sm uppercase tracking-widest text-primary-foreground/60 block">
                ESTÚDIO
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Curated furniture and decor for modern living. Quality pieces that
              tell a story.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIAL_ICONS.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold uppercase tracking-widest text-sm mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {SHOP_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href="/"
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold uppercase tracking-widest text-sm mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {COMPANY_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href="/"
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold uppercase tracking-widest text-sm mb-4">
              Stay in Touch
            </h4>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Get the latest arrivals and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm px-3 py-2 rounded-none outline-none focus:border-accent"
              />
              <button
                type="button"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-3 py-2 transition-colors"
                aria-label="Subscribe"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>© {year} Urban Estúdio. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
