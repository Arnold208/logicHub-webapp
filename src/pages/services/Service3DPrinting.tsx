import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PrinterContext } from '../../context/PrinterContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
  IconUpload,
  IconCalendar,
  IconCube,
  IconUsers,
  IconClock,
  IconShield,
  IconStar,
  IconPrinter,
  IconCheck,
} from '@tabler/icons-react';
import imgPrinting from '../../assets/images/service_3d_printing_1765723641692.png';

export const Service3DPrinting = () => {
  const { printers, getAvailablePrinters } = useContext(PrinterContext);

  const materials = [
    {
      name: 'PLA',
      description: 'Perfect for prototypes and decorative items. Easy to print, biodegradable.',
      image: 'https://ditfjx9w4x3vl.cloudfront.net/assets/filaments/snapspeed.png',
      properties: ['Low warping', 'Eco-friendly', 'Great surface finish']
    },
    {
      name: 'ABS',
      description: 'Durable and heat-resistant. Ideal for functional parts and mechanical components.',
      image: 'https://ditfjx9w4x3vl.cloudfront.net/assets/materials/ABS-1.png',
      properties: ['High strength', 'Heat resistant', 'Impact resistant']
    },
    {
      name: 'TPU',
      description: 'Flexible and elastic material. Perfect for wearables, phone cases, and gaskets.',
      image: 'https://ditfjx9w4x3vl.cloudfront.net/assets/materials/High%20Flow%20TPU95.png',
      properties: ['Flexible', 'Abrasion resistant', 'Chemical resistant']
    },
  ];

  const ourPrinters = [
    {
      name: 'Snapmaker Artisan',
      description: '3-in-1 modular system with 3D printing, laser engraving, and CNC carving',
      image: 'https://ditfjx9w4x3vl.cloudfront.net/assets/artisan/2024-11-11-artisan/PC_web_Artisan.jpg',
      buildVolume: '400 x 400 x 400mm',
      features: ['Dual Extrusion', 'Auto Leveling', 'Modular Design']
    },
    {
      name: 'Bambu Lab X1 Carbon',
      description: 'High-speed professional 3D printer with AMS (Automatic Material System)',
      image: 'https://cdn1.bambulab.com/x1/x1Series-main-bg-v1-sm.png',
      buildVolume: '256 x 256 x 256mm',
      features: ['Multi-color printing', 'AI-powered', 'CoreXY kinematics']
    },
    {
      name: 'Snapmaker 2.0 A250',
      description: 'Versatile 3-in-1 fabrication platform for makers and creators',
      image: 'https://shop.snapmaker.com/cdn/shop/products/A250T.png?v=1765440190&width=1214',
      buildVolume: '230 x 250 x 235mm',
      features: ['3-in-1 functionality', 'Touchscreen', 'Quiet operation']
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Designer',
      text: 'LogicHub 3D transformed my prototypes into reality with incredible precision. Their team is professional and delivery is always on time.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Engineering Student',
      text: 'Affordable pricing and excellent quality. Perfect for my university projects. The online interface makes ordering so easy!',
      rating: 5,
    },
    {
      name: 'Kwame Mensah',
      role: 'Small Business Owner',
      text: 'I use LogicHub for custom parts in my business. The consistency and quality are unmatched. Highly recommend!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-primary via-teal-600 to-teal-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Transform Ideas Into Reality
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Professional 3D printing and modelling services. Upload your design, choose your material, and let us bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload">
                <Button size="lg" variant="white">
                  <IconUpload className="mr-2 h-5 w-5" />
                  Upload & Print Now
                </Button>
              </Link>
              <Link to="/appointment">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <IconCalendar className="mr-2 h-5 w-5" />
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Design',
                description: 'Upload your STL, OBJ, or 3MF file through our easy-to-use interface',
                image: imgPrinting,
              },
              {
                step: '2',
                title: 'Configure Print',
                description: 'Choose material, color, quality, and other print parameters',
                image: imgPrinting,
              },
              {
                step: '3',
                title: 'Get Quote',
                description: 'Receive instant pricing and estimated delivery time',
                image: imgPrinting,
              },
              {
                step: '4',
                title: 'We Print & Deliver',
                description: 'Your model is printed with precision and delivered to you',
                image: imgPrinting,
              },
            ].map((item, idx) => (
              <Card key={idx} hover className="overflow-hidden p-0 border-0 shadow-lg">
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-3">
                    Step {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Why Choose LogicHub 3D?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We combine cutting-edge technology with expert craftsmanship to deliver exceptional results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <IconShield className="h-12 w-12 text-gray-900 mx-auto mb-4 stroke-[1.5]" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600 leading-relaxed">Industry-leading precision with every print. We stand behind our work with a quality guarantee.</p>
            </Card>
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <IconClock className="h-12 w-12 text-gray-900 mx-auto mb-4 stroke-[1.5]" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Turnaround</h3>
              <p className="text-gray-600 leading-relaxed">Quick processing and delivery. Most orders completed within 3-5 business days.</p>
            </Card>
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <IconUsers className="h-12 w-12 text-gray-900 mx-auto mb-4 stroke-[1.5]" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">Our team of specialists is here to help with design optimization and technical questions.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Printer Availability</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Check out our available 3D printers and their current status
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ourPrinters.map((printer, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={printer.image}
                    alt={printer.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{printer.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{printer.description}</p>
                  <div className="text-xs text-gray-500">
                    <span className="font-semibold">Build Volume:</span> {printer.buildVolume}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Materials We Support</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from a variety of high-quality materials for your project
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((material, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{material.name}</h3>
                  <p className="text-gray-600 mb-4">{material.description}</p>
                  <ul className="space-y-2">
                    {material.properties.map((prop, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <IconCheck className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {prop}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-bold tracking-wide uppercase text-sm">State-of-the-Art Equipment</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Our Professional 3D Printers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With cutting-edge technology and industry-leading machines, we provide you with the best 3D printing services.
              Our state-of-the-art equipment ensures precision, reliability, and exceptional quality for every project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ourPrinters.map((printer, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={printer.image}
                    alt={printer.name}
                    className="w-full h-full object-contain p-6"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{printer.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{printer.description}</p>
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <span className="text-xs font-semibold text-primary uppercase">Build Volume</span>
                    <p className="text-sm text-gray-900 font-medium">{printer.buildVolume}</p>
                  </div>
                  <ul className="space-y-2">
                    {printer.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <IconCheck className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} hover>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <IconStar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Printer Availability</h2>
          <p className="text-center text-gray-600 mb-8">
            {getAvailablePrinters()} printer{getAvailablePrinters() !== 1 ? 's' : ''} available right now
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {printers.map((printer) => (
              <Card key={printer.id} className="text-center">
                <IconPrinter className="h-10 w-10 mx-auto mb-3 text-gray-700" />
                <h3 className="font-semibold text-gray-900 mb-2">{printer.name}</h3>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${printer.status === 'Idle'
                    ? 'bg-green-100 text-green-700'
                    : printer.status === 'Printing'
                      ? 'bg-blue-100 text-blue-700'
                      : printer.status === 'Busy'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {printer.status}
                </div>
                {printer.progress > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${printer.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{printer.progress}%</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Upload your 3D model today and see your ideas come to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                <IconUpload className="mr-2 h-5 w-5" />
                Start Your Project
              </Button>
            </Link>
            <Link to="/appointment">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <IconCalendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
