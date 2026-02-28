import { Link } from 'react-router-dom';
import { IconMail, IconPhone, IconMapPin, IconBrandLinkedin, IconBrandTwitter, IconBrandInstagram } from '@tabler/icons-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Services', href: '/services' },
  { label: 'Book Appointment', href: '/appointment' },
  { label: 'My Account', href: '/profile' },
];

const serviceLinks = [
  { label: '3D Printing', href: '/services/3d-printing' },
  { label: 'Laser Cutting & Engraving', href: '/services/laser-cutting' },
  { label: 'Woodworking & CNC', href: '/services/woodworking' },
  { label: 'Hardware Development', href: '/services/hardware-development' },
  { label: 'IoT & Robotics', href: '/services/iot-robotics' },
  { label: 'Incubation & Support', href: '/services/incubation' },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img src="/assets/images/logo.png" alt="LogicHub" className="h-9 w-auto brightness-200" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Ghana's premier innovation hub - empowering creators, entrepreneurs, and students to build the future with professional fabrication and development services.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <IconBrandLinkedin className="h-4 w-4 text-gray-300" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <IconBrandTwitter className="h-4 w-4 text-gray-300" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <IconBrandInstagram className="h-4 w-4 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <IconMapPin className="h-4 w-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Accra, Greater Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <IconPhone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+233302558653" className="hover:text-white transition-colors">
                  +233 302 558 653
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <IconMail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:business@afrilogicsolutions.com" className="hover:text-white transition-colors break-all">
                  business@afrilogicsolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} LogicHub by Afrilogic Solutions. All rights reserved.</p>
          <p>Built in Accra 🇬🇭 for innovators across Africa</p>
        </div>
      </div>
    </footer>
  );
};
