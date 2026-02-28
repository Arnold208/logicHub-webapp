import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  IconArrowRight,
  IconPrinter,
  IconCut,
  IconTree,
  IconCpu,
  IconRocket,
  IconBulb,
  IconUpload,
  IconClipboardList,
  IconCalendar,
  IconLogin,
  IconUserPlus,
  IconShieldCheck,
  IconBolt,
  IconUsers,
  IconStar,
  IconCheck,
} from '@tabler/icons-react';

import img3DPrint from '../assets/images/service_3d_printing_1765723641692.png';
import imgLaser from '../assets/images/service_laser_cutting_1765723660296.png';
import imgWood from '../assets/images/service_woodworking_1765723676354.png';
import imgHardware from '../assets/images/service_hardware_dev_1765723694180.png';
import imgIoT from '../assets/images/service_iot_robotics_1765723715509.png';
import imgIncubation from '../assets/images/service_incubation_1765723732071.png';

const services = [
  {
    title: '3D Printing',
    description: 'Professional FDM printing for prototypes, architectural models, and functional production parts.',
    image: img3DPrint,
    link: '/services/3d-printing',
    icon: IconPrinter,
    badge: 'Most Popular',
  },
  {
    title: 'Laser Cutting & Engraving',
    description: 'High-precision cutting and engraving for wood, acrylic, leather, and more.',
    image: imgLaser,
    link: '/services/laser-cutting',
    icon: IconCut,
  },
  {
    title: 'Woodworking & CNC',
    description: 'CNC-assisted fabrication for custom furniture, architectural builds, and creative structures.',
    image: imgWood,
    link: '/services/woodworking',
    icon: IconTree,
  },
  {
    title: 'Hardware Development',
    description: 'From concept to functional prototype — CAD, PCB design, enclosures, and manufacturing support.',
    image: imgHardware,
    link: '/services/hardware-development',
    icon: IconCpu,
  },
  {
    title: 'IoT & Robotics',
    description: 'Advanced embedded systems, microcontroller programming, sensor integration, and AI automation.',
    image: imgIoT,
    link: '/services/iot-robotics',
    icon: IconRocket,
  },
  {
    title: 'Incubation & Support',
    description: 'Mentorship, workspace access, and go-to-market strategy for hardware startups.',
    image: imgIncubation,
    link: '/services/incubation',
    icon: IconBulb,
  },
];

const stats = [
  { label: 'Projects Completed', value: '500+' },
  { label: 'Happy Clients', value: '200+' },
  { label: 'Service Offerings', value: '6' },
  { label: 'Years in Operation', value: '5+' },
];

const whyUs = [
  {
    icon: IconShieldCheck,
    title: 'Quality Guaranteed',
    description: 'Industry-leading precision with every project. We stand behind our work with a full quality guarantee.',
  },
  {
    icon: IconBolt,
    title: 'Fast Turnaround',
    description: 'Most orders are completed within 3–5 business days. Urgent timelines? We accommodate.',
  },
  {
    icon: IconUsers,
    title: 'Expert Team',
    description: 'Our engineers and designers are specialists in fabrication, embedded systems, and product development.',
  },
];

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-primary-900/80 to-primary-800/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest uppercase text-primary-300 mb-6">
              <IconStar className="h-3 w-3" />
              Ghana's Premier Innovation Hub
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              Where Ideas Become{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-cyan-300">
                Real Products
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              LogicHub is Accra's innovation hub — providing 3D printing, laser cutting, CNC woodworking, hardware development, IoT, and incubation services under one roof.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-400 text-white shadow-lg shadow-primary-900/30">
                  Explore All Services
                  <IconArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/appointment">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <IconCalendar className="mr-2 h-5 w-5" />
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Account Dashboard / Onboarding Strip ── */}
      {user ? (
        <section className="bg-primary-50 border-b border-primary-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-0.5">Welcome back</p>
                <h2 className="text-2xl font-bold text-gray-900">Hello, {user.name} 👋</h2>
                <p className="text-sm text-gray-500 mt-1">Your one account gives you access to all LogicHub services.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/upload">
                  <Button size="sm" className="flex items-center gap-2">
                    <IconUpload className="h-4 w-4" />
                    Upload & Print
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button size="sm" variant="secondary" className="flex items-center gap-2">
                    <IconClipboardList className="h-4 w-4" />
                    My Orders
                  </Button>
                </Link>
                <Link to="/appointment">
                  <Button size="sm" variant="secondary" className="flex items-center gap-2">
                    <IconCalendar className="h-4 w-4" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary-200 uppercase tracking-widest mb-0.5">One Account, All Services</p>
                <h2 className="text-xl font-bold">Sign up once, access 3D printing, laser cutting, CNC, IoT & more.</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                  {['Free to join', 'Instant quotes', 'Track all your orders', 'Consultation booking'].map(f => (
                    <span key={f} className="flex items-center gap-1 text-sm text-primary-100">
                      <IconCheck className="h-3.5 w-3.5 text-primary-300" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link to="/signup">
                  <Button size="md" className="bg-primary-500 text-white hover:bg-primary-600 font-semibold border border-primary-600">
                    <IconUserPlus className="mr-2 h-4 w-4" />
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="md" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    <IconLogin className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Services Grid ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-3">
                What We Do
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Services</h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Everything you need to go from idea to market-ready product, all in one place.
              </p>
            </div>
            <Link
              to="/services"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              View all services <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} to={service.link} className="block group">
                <Card className="h-full p-0 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-gray-100">
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative bg-gray-100">
                    {service.badge && (
                      <div className="absolute top-3 left-3 z-20 bg-primary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        {service.badge}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <service.icon className="h-4 w-4 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-400 group-hover:text-primary-600 transition-colors">
                      Learn more <IconArrowRight className="h-4 w-4" />
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

      {/* ── Why LogicHub ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-3">
              Our Promise
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose LogicHub?</h2>
            <p className="text-lg text-gray-600">
              We combine cutting-edge equipment with domain expertise so you can focus on building, not worrying.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map((item) => (
              <div key={item.title} className="text-center p-8 rounded-2xl border border-gray-100 hover:border-primary-100 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 mb-5">
                  <item.icon className="h-7 w-7 text-primary-600 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-4">
                Our Mission
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-5">
                Empowering African Innovators to Build the Future
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We provide the tools, expertise, and community needed to bridge the gap between imagination and execution. Whether you are a student, entrepreneur, or professional, LogicHub is your launchpad.
              </p>
              <ul className="space-y-3">
                {[
                  'Access professional fabrication tools',
                  'Work alongside a community of engineers & designers',
                  'Get mentorship from industry experts',
                  'Take your idea from sketch to market-ready product',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-700">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <IconCheck className="h-3 w-3 text-primary-600" />
                    </div>
                    <span className="text-base">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/appointment">
                  <Button size="lg">
                    Talk to Our Team
                    <IconArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={img3DPrint}
                  alt="LogicHub workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100 max-w-xs">
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-500">projects helped from idea to product</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            Have an idea you want to build?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Book a free consultation with our team. We'll help you find the best path from concept to product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointment">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-400 text-white px-8 shadow-lg">
                <IconCalendar className="mr-2 h-5 w-5" />
                Book a Free Consultation
              </Button>
            </Link>
            {!user && (
              <Link to="/signup">
                <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-white">
                  <IconUserPlus className="mr-2 h-5 w-5" />
                  Create Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
