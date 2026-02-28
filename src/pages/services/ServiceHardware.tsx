import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
    IconCalendar,
    IconCheck,
    IconArrowRight,
    IconCpu,
    IconVector,
    IconServer,
    IconPackage,
    IconFlask,
} from '@tabler/icons-react';
import imgHardware from '../../assets/images/service_hardware_dev_1765723694180.png';

const phases = [
    { icon: IconVector, title: 'Industrial Design (CAD)', desc: 'Mechanical design, 3D modeling, and design-for-manufacturing (DFM) reviews.' },
    { icon: IconServer, title: 'PCB Design & Assembly', desc: 'Schematic capture, layout, and SMT assembly for your electronics.' },
    { icon: IconPackage, title: 'Enclosure & Prototyping', desc: '3D-printed or CNC-milled enclosures that match the aesthetics of the final product.' },
    { icon: IconFlask, title: 'Testing & Validation', desc: 'Functional testing, environmental stress testing, and design validation reports.' },
];

const deliverables = [
    'Industrial Design sketches and 3D CAD models',
    'Bill of Materials (BOM)',
    'PCB Gerber files and assembly drawings',
    'Functional prototype units',
    'Design for Manufacturing (DFM) report',
    'Testing and validation documentation',
];

export const ServiceHardware = () => {
    return (
        <div className="min-h-screen bg-white">

            {/* Hero */}
            <section className="relative bg-gray-950 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${imgHardware})` }} />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-purple-900/40" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-purple-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5">
                            Product Development
                        </span>
                        <h1 className="text-5xl font-bold mb-5 leading-tight tracking-tight">
                            Hardware Product<br />Development
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            We help innovators transform sketches into functional, market-ready hardware products - from CAD to firmware to manufacturing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/appointment">
                                <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white">
                                    <IconCalendar className="mr-2 h-5 w-5" />
                                    Discuss Your Project
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

            {/* Development Phases */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full mb-3">
                            Our Process
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">End-to-End Development</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Building hardware is hard. We make it easier with a proven pipeline from concept to production.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {phases.map((phase) => (
                            <Card key={phase.title} className="text-center p-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 mb-5">
                                    <phase.icon className="h-7 w-7 text-purple-600 stroke-[1.5]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{phase.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{phase.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* What you get */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                            <img src={imgHardware} alt="Hardware development" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="inline-block text-xs font-bold tracking-widest uppercase text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full mb-4">
                                What You Receive
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 mb-5">
                                Complete Product Deliverables
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                At every milestone, you receive professional documentation and physical prototypes, so you always know where you stand.
                            </p>
                            <ul className="space-y-3">
                                {deliverables.map((d) => (
                                    <li key={d} className="flex items-start gap-3 text-gray-700">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                            <IconCheck className="h-3 w-3 text-purple-600" />
                                        </div>
                                        <span className="text-base">{d}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <Link to="/appointment">
                                    <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white">
                                        <IconCpu className="mr-2 h-5 w-5" />
                                        Start a Project
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-950 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">From Sketch to Shelf</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Let's turn your hardware idea into a product people can hold. Book a free project discussion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/appointment">
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white">
                                <IconCalendar className="mr-2 h-5 w-5" />
                                Free Project Consultation
                            </Button>
                        </Link>
                        <Link to="/services">
                            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-white">
                                <IconArrowRight className="mr-2 h-5 w-5" />
                                View All Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};
