import { ChevronRight, Frame, Mail, MapPin, Phone } from "lucide-react";
import { serviceAreas } from "../lib/content";
import Image from "next/image";

/*
 * Footer is intentionally a server component — no motion, no state,
 * pure markup. Keeps the client bundle smaller.
 */

export function Footer() {
  return (
    <footer className="bg-slate-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-stone-50 text-slate-900">
                <Image width={500} height={500} src={"/logo.jpg"} alt={"E.D Remodeling logo"} loading={"eager"} className={"object-cover rounded-full"}/>

              </div>
              <span className="font-display text-lg font-semibold text-stone-50">
                E.D. Window Installations
              </span>
            </div>
            <p className="mt-5 font-serif text-sm leading-relaxed text-stone-400">
              Family-owned since 1998. Detail-obsessed window installation
              for homeowners who notice the difference.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.22em] text-stone-50 uppercase">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent-300" />
                <a href="tel:+15555550123" className="hover:text-stone-50">
                  (555) 555-0123
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent-300" />
                <a
                  href="mailto:ed@edswindows.com"
                  className="hover:text-stone-50"
                >
                  ed@edswindows.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
                <span>
                  100 Main Street
                  <br />
                  Maplewood, NJ 07040
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.22em] text-stone-50 uppercase">
              Service Areas
            </h4>
            <ul className="mt-5 grid grid-cols-2 gap-y-2 text-sm">
              {serviceAreas.map((town) => (
                <li key={town}>{town}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.22em] text-stone-50 uppercase">
              Hours
            </h4>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Mon – Fri</span>
                <span className="text-stone-400">7am – 6pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-stone-400">8am – 2pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-stone-400">Closed</span>
              </li>
            </ul>
            <a
              href="#quote"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-accent-500 px-5 py-2.5 text-sm font-semibold text-stone-50 transition-colors duration-300 hover:bg-accent-600"
            >
              Get a Quote
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-stone-50/10 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}&nbsp;E.D. Window Installations, LLC.
            All rights reserved.
          </p>
          <p>NJ HIC #13VH-XXXXXXXX · Licensed · Bonded · Insured</p>
        </div>
      </div>
    </footer>
  );
}
