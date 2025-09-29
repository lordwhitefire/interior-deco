// app/components/Footer.tsx
import React from 'react';
import { Link } from '@remix-run/react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

/* string → component map */
const ICON_MAP = {
  Mail,
  Phone,
  MapPin,
} as Record<string, React.ElementType>;

/* ----------  fallback data  ---------- */
const fallbackFooter: FooterData = {
  logo: 'https://lordwhitefire.github.io/interior-deco-assets/images/logo-white.png',
  description: 'Transforming spaces into stunning, functional environments that reflect your unique style and personality.',
  social: [
    { name: 'Facebook',  url: 'https://facebook.com' },
    { name: 'Twitter',   url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn',  url: 'https://linkedin.com' }
  ],
  sections: [
   
    {
      title: 'Company',
      links: [
        { label: 'Our Team',      url: '/team' },
        { label: 'FAQ',           url: '/faq' },
        { label: 'Testimonials',  url: '/testimonials' },
        { label: 'Projects',      url: '/projects' },
        { label: 'Blog',          url: '/blog' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Interior Design', url: '/services/interior-design' },
        { label: 'Home Staging',    url: '/services/home-staging' },
        { label: 'Consultation',    url: '/services/consultation' },
        { label: 'Project Management', url: '/services/project-management' }
      ]
    },
    {
      title: 'Contact Info',
      links: [
        { label: 'info@interiordecorators.com', url: 'mailto:info@interiordecorators.com', icon: 'Mail' },
        { label: '+1 (555) 123-4567',           url: 'tel:+15551234567',                 icon: 'Phone' },
        { label: '123 Design Street, Creative City', url: '#',                           icon: 'MapPin' }
      ]
    }
  ],
  copyright: '© 2024 Interior Decorators Inc. All rights reserved.',
  legal: [
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' }
  ]
};

/* ----------  types  ---------- */
type FooterData = {
  logo: string;
  description: string;
  social: { name: string; url: string }[];
  sections: {
    title: string;
    links: { label: string; url: string; icon?: keyof typeof ICON_MAP }[];
  }[];
  copyright: string;
  legal: { label: string; url: string }[];
};

export default function Footer({ data }: { data?: FooterData }) {
  const { logo, description, social, sections, copyright, legal } = data || fallbackFooter;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Interior Decorators" className="h-10 w-auto" loading="lazy" />
            </Link>
            <p className="mt-4 text-gray-300 text-sm">{description}</p>
            <div className="flex space-x-4 mt-6">
              {social.map((s) => {
                const Icon = s.name === 'Facebook' ? Facebook : s.name === 'Twitter' ? Twitter : s.name === 'Instagram' ? Instagram : Linkedin;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={s.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => {
                  const Icon = link.icon ? ICON_MAP[link.icon] : null;
                  return (
                    <li key={link.label}>
                      <Link
                        to={link.url}
                        className="text-gray-300 hover:text-white text-sm flex items-center gap-2 transition-colors"
                      >
                        {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>{copyright}</p>
          <nav aria-label="Legal links" className="flex space-x-4 mt-4 sm:mt-0">
            {legal.map((l) => (
              <Link key={l.label} to={l.url} className="hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}