import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
    IconCalendar,
    IconCheck,
    IconArrowRight,
    IconTool,
    IconRuler,
    IconLego,
    IconBrush,
} from '@tabler/icons-react';
import imgWood from '../../assets/images/service_woodworking_1765723676354.png';

const capabilities = [
    {
        icon: IconTool,
        title: 'CNC Routing',
        desc: 'Computer-controlled cutting for intricate shapes, repeated patterns, and production runs.',
    },
    {
        icon: IconLego,
        title: 'Custom Furniture',
        desc: 'Design and build tables, shelves, and desks with expert guidance at every step.',
    },
    {
        icon: IconRuler,
        title: 'Architectural Models',
        desc: 'Precision miniature structures for presentations, planning, and design reviews.',
    },
    {
        icon: IconBrush,
        title: 'Finishing & Joinery',
        desc: 'Traditional joinery techniques combined with modern finishes for durable, beautiful results.',
    },
];

const process = [
    { step: '01', title: 'Design & Planning', desc: 'Share your idea or CAD file. We review dimensions, materials, and feasibility.' },
    { step: '02', title: 'Material Selection', desc: 'We source the right timber, MDF, or plywood for your project requirements.' },
    { step: '03', title: 'CNC & Fabrication', desc: 'Your design is milled, cut, and shaped with precision on our CNC router.' },
    { step: '04', title: 'Assembly & Finishing', desc: 'Joinery, sanding, and finishes are applied to deliver a complete piece.' },
];

export const ServiceWoodworking = () => {
    return (
        <div className="min-h-screen bg-white">

            {/* Hero */}
            <section className="relative bg-gray-950 text-white py-24 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${imgWood})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-amber-900/40" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5">
                            Fabrication Services
                        </span>
                        <h1 className="text-5xl font-bold mb-5 leading-tight tracking-tight">
                            Woodworking<br />& CNC Fabrication
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Blending traditional craftsmanship with digital fabrication - from custom furniture to architectural models.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/appointment">
                                <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-white">
                                    <IconCalendar className="mr-2 h-5 w-5" />
                                    Visit the Workshop
                                </Button>
                            </Link>
                            <Link to="/services">
                                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                    <IconArrowRight className="mr-2 h-5 w-5" />
                                    All Services
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full mb-3">
                            Capabilities
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">From Furniture to Fine Art</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our workshop is equipped with CNC routers, table saws, and hand tools for everything from prototypes to finished products.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {capabilities.map((c) => (
                            <Card key={c.title} className="text-center p-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 mb-5">
                                    <c.icon className="h-7 w-7 text-amber-700 stroke-[1.5]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['CNC Routing', 'Custom Furniture', 'Joinery & Finish'].map((label, i) => (
                            <div
                                key={label}
                                className={`group relative overflow-hidden rounded-2xl shadow-lg ${i === 0 ? 'md:row-span-2 h-80 md:h-auto' : 'h-56'}`}
                            >
                                <img
                                    src={imgWood}
                                    alt={label}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{label}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">How It Works</h2>
                        <p className="text-lg text-gray-600 max-w-xl mx-auto">
                            A streamlined process from your idea to a finished piece.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {process.map((p) => (
                            <div key={p.step} className="relative">
                                <div className="text-5xl font-black text-gray-100 mb-3">{p.step}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-5">Why Build with LogicHub?</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Whether you're a student building your first project or a professional creating custom furniture, our workshop and team are here to make it happen.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Expert guidance throughout the design and build process',
                                    'Professional CNC machines for repeatable precision',
                                    'Access to power tools and hand tools',
                                    'Material sourcing support and guidance',
                                    'Suitable for one-off custom pieces and small batch runs',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-gray-700">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                            <IconCheck className="h-3 w-3 text-amber-700" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                            <img src={imgWood} alt="Woodworking at LogicHub" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-950 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Build Something?</h2>
                    <p className="text-xl text-gray-400 mb-10">Book a session at our woodworking workshop or talk to our team about your project.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/appointment">
                            <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-white">
                                <IconCalendar className="mr-2 h-5 w-5" />
                                Book Workshop Session
                            </Button>
                        </Link>
                        <Link to="/services">
                            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-white">
                                <IconArrowRight className="mr-2 h-5 w-5" />
                                All Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};
