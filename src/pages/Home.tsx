import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ImpactStory } from '../components/home/ImpactStory';
import {
  IconTools,
  IconRocket,
  IconPrinter,
  IconArrowRight,
  IconUsers
} from '@tabler/icons-react';

import img3DPrint from '../assets/images/service_3d_printing_1765723641692.png';
import imgLaser from '../assets/images/service_laser_cutting_1765723660296.png';
import imgWood from '../assets/images/service_woodworking_1765723676354.png';
import imgHardware from '../assets/images/service_hardware_dev_1765723694180.png';
import imgIoT from '../assets/images/service_iot_robotics_1765723715509.png';
import imgIncubation from '../assets/images/service_incubation_1765723732071.png';

export const Home = () => {
  const services = [
    {
      title: '3D Printing',
      description: 'Professional FDM printing for prototypes and production parts.',
      image: img3DPrint,
      link: '/services/3d-printing',
      color: 'blue'
    },
    {
      title: 'Laser Cutting',
      description: 'Precision cutting and engraving for various materials.',
      image: imgLaser,
      link: '/services/laser-cutting',
      color: 'red'
    },
    {
      title: 'Woodworking',
      description: 'CNC-assisted fabrication for functional and creative builds.',
      image: imgWood,
      link: '/services/woodworking',
      color: 'amber'
    },
    {
      title: 'Product Development',
      description: 'From concept to functional prototype with expert guidance.',
      image: imgHardware,
      link: '/services/hardware-development',
      color: 'purple'
    },
    {
      title: 'IoT & Robotics',
      description: 'Advanced support for electronics, embedded systems, and AI.',
      image: imgIoT,
      link: '/services/iot-robotics',
      color: 'cyan'
    },
    {
      title: 'Incubation',
      description: 'Mentorship and support to turn your idea into a business.',
      image: imgIncubation,
      link: '/services/incubation',
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Where Ideas Become <span className="text-primary-300">Real Products</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
              LogicHub is a makerspace and innovation hub that empowers you to turn concepts into prototypes, and prototypes into market-ready solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Our Services
                  <IconArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services/3d-printing">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <IconPrinter className="mr-2 h-5 w-5" />
                  3D Printing Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary-600 font-bold tracking-wide uppercase text-sm">Our Mission</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4 tracking-tight">
              Empowering Innovators to Build the Future
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              We provide the tools, expertise, and community needed to bridge the gap between imagination and execution.
              Whether you are a student, entrepreneur, or creative, LogicHub is your launchpad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <IconTools className="h-8 w-8 text-gray-900 mx-auto mb-4 stroke-[1.5]" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Build & Prototype</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Access professional fabrication tools to create functional prototypes.</p>
            </div>
            <div className="p-6">
              <IconRocket className="h-8 w-8 text-gray-900 mx-auto mb-4 stroke-[1.5]" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Launch & Scale</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Get support in product refinement, manufacturing, and business strategy.</p>
            </div>
            <div className="p-6">
              <IconUsers className="h-8 w-8 text-gray-900 mx-auto mb-4 stroke-[1.5]" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Community</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Connect with engineers, designers, and mentors in a collaborative space.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-xl">Everything you need to go from idea to product, all under one roof.</p>
            </div>
            <Link to="/services" className="hidden md:flex items-center text-primary font-semibold hover:text-primary-hover">
              View all services <IconArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Link key={idx} to={service.link} className="block group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 overflow-hidden p-0">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-primary transition-colors">
                      Learn more <IconArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/services">
              <Button variant="secondary" fullWidth>View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Story */}
      <ImpactStory />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Have an idea you want to build?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Book a consultation with our team to discuss your project and find the best way forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointment">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-8">
                Book a Consultation
              </Button>
            </Link>
            <Link to="/services/3d-printing">
              <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-white">
                Start 3D Printing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
