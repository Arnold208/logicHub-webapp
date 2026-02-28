import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
    IconCalendar,
    IconMail,
    IconCheck,
    IconCut,
    IconArrowRight,
    IconShieldCheck,
    IconBolt,
    IconAdjustments,
} from '@tabler/icons-react';
import imgLaser from '../../assets/images/service_laser_cutting_1765723660296.png';

const materials = [
    {
        name: 'Acrylic',
        desc: 'Crystal-clear or colored panels for signage, displays, and custom parts.',
        properties: ['Clean polished edges', 'Various thicknesses', 'Multi-color options'],
    },
    {
        name: 'Wood',
        desc: 'MDF, plywood, and hardwoods for decorative panels, furniture, and models.',
        properties: ['Intricate grain detail', 'Ideal for signage', 'Engravable surfaces'],
    },
    {
        name: 'Leather & Fabric',
        desc: 'Soft materials for wearables, accessories, and branded merchandise.',
        properties: ['No fraying', 'Precise outlines', 'Custom patterns'],
    },
];

const capabilities = [
    { icon: IconCut, title: 'Precision Cutting', desc: '±0.1mm accuracy on any 2D shape or pattern.' },
    { icon: IconAdjustments, title: 'Deep Engraving', desc: 'Raster and vector engraving on flat and curved surfaces.' },
    { icon: IconBolt, title: 'Rapid Production', desc: 'Fast batch runs for branding kits, sets, and trophies.' },
    { icon: IconShieldCheck, title: 'Quality Check', desc: 'Every piece inspected before delivery or pickup.' },
];

export const ServiceLaserCutting = () => {
    return (
        <div className="min-h-screen bg-white">

            {/* Hero */}
            <section className="relative bg-gray-950 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgLaser})` }} />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-primary-900/60" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5">
                            Fabrication Services
                        </span>
                        <h1 className="text-5xl font-bold mb-5 leading-tight tracking-tight">
                            Laser Cutting &<br />Engraving
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Precision fabrication for branding, signage, prototypes, and custom designs across a wide range of materials.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/appointment">
                                <Button size="lg" className="bg-primary-500 hover:bg-primary-400 text-white">
                                    <IconCalendar className="mr-2 h-5 w-5" />
                                    Book a Session
                                </Button>
                            </Link>
                            <a href="mailto:services@logichub.com">
                                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                    <IconMail className="mr-2 h-5 w-5" />
                                    Request a Quote
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-3">
                            What We Offer
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">Precision and Versatility</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our high-power laser systems handle complex cuts and detailed engravings with professional-grade results.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {capabilities.map((cap) => (
                            <Card key={cap.title} className="text-center p-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 mb-5">
                                    <cap.icon className="h-7 w-7 text-primary-600 stroke-[1.5]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{cap.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{cap.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Materials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-3">
                            Materials
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">What We Can Cut</h2>
                        <p className="text-lg text-gray-600 max-w-xl mx-auto">
                            We support a wide range of materials - bring us your design and we'll match the right medium.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {materials.map((m) => (
                            <Card key={m.name} className="overflow-hidden p-0">
                                <div className="h-44 overflow-hidden">
                                    <img src={imgLaser} alt={m.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{m.name}</h3>
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{m.desc}</p>
                                    <ul className="space-y-1.5">
                                        {m.properties.map((p) => (
                                            <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                                                <IconCheck className="h-4 w-4 text-primary-600 flex-shrink-0" />
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Strip */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Acrylic Signage', 'Wood Panel', 'Custom Trophy', 'Leather Piece'].map((label) => (
                            <div key={label} className="group relative overflow-hidden rounded-xl h-40 shadow">
                                <img src={imgLaser} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                                    <span className="text-white text-sm font-semibold">{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-950 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Whether it's a one-off prototype or a production run, we're here to help. Reach out for a quote.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/appointment">
                            <Button size="lg" className="bg-primary-500 hover:bg-primary-400 text-white">
                                <IconCalendar className="mr-2 h-5 w-5" />
                                Book Consultation
                            </Button>
                        </Link>
                        <a href="mailto:services@logichub.com">
                            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-white">
                                <IconMail className="mr-2 h-5 w-5" />
                                Email Us
                            </Button>
                        </a>
                    </div>
                    <p className="mt-6 text-sm text-gray-500">
                        Or browse our other services →{' '}
                        <Link to="/services" className="text-primary-400 hover:text-primary-300 font-medium">
                            View All Services <IconArrowRight className="inline h-3 w-3" />
                        </Link>
                    </p>
                </div>
            </section>

        </div>
    );
};
