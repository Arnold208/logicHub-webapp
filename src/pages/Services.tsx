import { Link } from 'react-router-dom';
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
    IconCheck,
} from '@tabler/icons-react';
import imgPrinting from '../assets/images/service_3d_printing_1765723641692.png';
import imgLaser from '../assets/images/service_laser_cutting_1765723660296.png';
import imgWood from '../assets/images/service_woodworking_1765723676354.png';
import imgHardware from '../assets/images/service_hardware_dev_1765723694180.png';
import imgIot from '../assets/images/service_iot_robotics_1765723715509.png';
import imgIncubation from '../assets/images/service_incubation_1765723732071.png';

const services = [
    {
        id: '3d-printing',
        icon: IconPrinter,
        title: '3D Printing Service',
        description:
            'High-quality FDM printing for prototypes, architectural models, and end-use parts. Upload your design and get an instant quote online.',
        link: '/services/3d-printing',
        features: ['Instant online quotes', 'PLA, ABS, PETG materials', 'Fast turnaround', 'Design optimization support'],
        cta: 'Start Printing',
        accentColor: 'text-primary-600',
        accentBg: 'bg-primary-50',
        image: imgPrinting,
    },
    {
        id: 'laser-cutting',
        icon: IconCut,
        title: 'Laser Cutting & Engraving',
        description:
            'Precision cutting and engraving for acrylic, wood, leather, and paper. Perfect for branding, signage, and intricate custom designs.',
        link: '/services/laser-cutting',
        features: ['Acrylic, wood, leather', 'High precision ±0.1mm', 'Custom signage & branding', 'Batch production runs'],
        cta: 'Get Started',
        accentColor: 'text-red-600',
        accentBg: 'bg-red-50',
        image: imgLaser,
    },
    {
        id: 'woodworking',
        icon: IconTree,
        title: 'Woodworking & CNC',
        description:
            'Full-service woodworking shop with CNC capabilities for furniture, architectural elements, and custom structures.',
        link: '/services/woodworking',
        features: ['CNC routing', 'Custom furniture', 'Architectural models', 'Joinery & finishing'],
        cta: 'Visit Workshop',
        accentColor: 'text-amber-700',
        accentBg: 'bg-amber-50',
        image: imgWood,
    },
    {
        id: 'hardware-development',
        icon: IconCpu,
        title: 'Hardware Development',
        description:
            'End-to-end support for building physical products. From CAD design to electronics enclosure, prototyping, and functional testing.',
        link: '/services/hardware-development',
        features: ['CAD & industrial design', 'PCB design & assembly', 'Enclosure prototyping', 'DFM & testing'],
        cta: 'Discuss Project',
        accentColor: 'text-purple-600',
        accentBg: 'bg-purple-50',
        image: imgHardware,
    },
    {
        id: 'iot-robotics',
        icon: IconRocket,
        title: 'IoT & Robotics',
        description:
            'Advanced technical support for Internet of Things, embedded systems, robotics platforms, and AI integration at the edge.',
        link: '/services/iot-robotics',
        features: ['Microcontrollers & SBCs', 'Sensor & wireless integration', 'AI / ML at the edge', 'Automation systems'],
        cta: 'Build a Prototype',
        accentColor: 'text-cyan-600',
        accentBg: 'bg-cyan-50',
        image: imgIot,
    },
    {
        id: 'incubation',
        icon: IconBulb,
        title: 'Incubation & Support',
        description:
            'Strategic guidance, workspace, and mentorship for hardware startups. We help you refine your model and prepare for market.',
        link: '/services/incubation',
        features: ['Expert mentorship', 'Workspace access', 'Technical resources', 'Investor network'],
        cta: 'Apply Now',
        accentColor: 'text-green-700',
        accentBg: 'bg-green-50',
        image: imgIncubation,
    },
];

export const Services = () => {
    return (
        <div className="min-h-screen bg-white">

            {/* Page Header */}
            <section className="bg-gray-50 border-b border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-4">
                        Everything Under One Roof
                    </span>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Our Services</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        LogicHub offers a comprehensive suite of fabrication and development services to take your ideas from concept to reality.
                    </p>
                </div>
            </section>

            {/* Services List */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {services.map((service, idx) => (
                        <Card key={service.id} className="p-0 overflow-hidden border border-gray-100">
                            <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* Image */}
                                <div className="md:w-2/5 relative min-h-[260px]">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gray-900/10" />
                                </div>

                                {/* Content */}
                                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-10 h-10 rounded-xl ${service.accentBg} flex items-center justify-center`}>
                                            <service.icon className={`h-5 w-5 ${service.accentColor}`} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                                    </div>
                                    <p className="text-base text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                                        {service.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2.5 text-sm text-gray-700">
                                                <IconCheck className={`h-4 w-4 flex-shrink-0 ${service.accentColor}`} />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <Link to={service.link}>
                                            <Button className={`group`}>
                                                {service.cta}
                                                <IconArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gray-950 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Not Sure Where to Start?</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Book a free consultation and we'll match you with the right service for your project.
                    </p>
                    <Link to="/appointment">
                        <Button size="lg" className="bg-primary-500 hover:bg-primary-400 text-white px-8">
                            Book Free Consultation
                            <IconArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    );
};
