import { Link } from 'react-router-dom';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

export const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-gray-300 pt-16 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/assets/images/logo.png"
                alt="LogicHub 3D"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400">
              Professional 3D printing and modelling services in Ghana. Turning your ideas into reality with precision and quality.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/services/3d-printing" className="hover:text-primary transition-colors">
                  3D Printing
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/laser-cutting" className="hover:text-primary transition-colors">Laser Cutting</Link>
              </li>
              <li>
                <Link to="/services/woodworking" className="hover:text-primary transition-colors">Woodworking</Link>
              </li>
              <li>
                <Link to="/services/hardware-development" className="hover:text-primary transition-colors">Product Dev</Link>
              </li>
              <li>
                <Link to="/services/incubation" className="hover:text-primary transition-colors">Incubation</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact LogicHub</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <IconMapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>One Airport Square, Airport City, Accra, Ghana</span>
              </li>
              <li className="flex items-center space-x-2">
                <IconPhone className="h-5 w-5 text-primary" />
                <span>+233 24 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <IconMail className="h-5 w-5 text-primary" />
                <span>info@logichub3d.com.gh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} LogicHub 3D. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
