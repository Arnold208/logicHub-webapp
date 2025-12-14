import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
    IconArrowRight
} from '@tabler/icons-react';
import imgPrinting from '../assets/images/service_3d_printing_1765723641692.png';
import imgLaser from '../assets/images/service_laser_cutting_1765723660296.png';
import imgWood from '../assets/images/service_woodworking_1765723676354.png';
import imgHardware from '../assets/images/service_hardware_dev_1765723694180.png';
import imgIot from '../assets/images/service_iot_robotics_1765723715509.png';
import imgIncubation from '../assets/images/service_incubation_1765723732071.png';

export const Services = () => {
    const services = [
        {
            id: '3d-printing',
            title: '3D Printing Service',
            description: 'High-quality FDM and Resin printing for prototypes, architectural models, and end-use parts. Instant quotes available online.',
            link: '/services/3d-printing',
            features: ['Instant Online Quotes', 'PLA, ABS, PETG, Resin', 'Fast Turnaround', 'Design Optimization Support'],
            cta: 'Start Printing',
            color: 'blue',
            image: imgPrinting
        },
        {
            id: 'laser-cutting',
            title: 'Laser Cutting & Engraving',
            description: 'Precision cutting and engraving for acrylic, wood, leather, and paper. Perfect for branding, signage, and intricate designs.',
            link: '/services/laser-cutting',
            features: ['Acrylic, Wood, Leather', 'High Precision', 'Custom Signage', 'Rapid Prototyping'],
            cta: 'Learn More',
            color: 'red',
            image: imgLaser
        },
        {
            id: 'woodworking',
            title: 'Woodworking & CNC',
            description: 'Full-service woodworking shop with CNC capabilities for furniture, architectural elements, and custom structures.',
            link: '/services/woodworking',
            features: ['CNC Routing', 'Custom Furniture', 'Architectural Models', 'Joinery'],
            cta: 'Learn More',
            color: 'amber',
            image: imgWood
        },
        {
            id: 'hardware-development',
            title: 'Hardware Development',
            description: 'End-to-end support for building physical products. From CAD design to electronics enclosure and functional testing.',
            link: '/services/hardware-development',
            features: ['CAD Design', 'Enclosure Design', 'Prototyping', 'Manufacturing Support'],
            cta: 'Learn More',
            color: 'purple',
            image: imgHardware
        },
        {
            id: 'iot-robotics',
            title: 'IoT & Robotics',
            description: 'Advanced technical support for Internet of Things, embedded systems, robotics, and AI integration.',
            link: '/services/iot-robotics',
            features: ['Microcontrollers', 'Sensor Integration', 'AI/ML Models', 'Automation'],
            cta: 'Learn More',
            color: 'cyan',
            image: imgIot
        },
        {
            id: 'incubation',
            title: 'Incubation & Support',
            description: 'Strategic guidance for hardware startups. We help you refine your business model and get ready for market.',
            link: '/services/incubation',
            features: ['Mentorship', 'Workspace Access', 'Technical Resources', 'Go-to-Market Strategy'],
            cta: 'Apply Now',
            color: 'green',
            image: imgIncubation
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Services</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        LogicHub offers a comprehensive suite of fabrication and development services to bring your ideas to life.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {services.map((service) => (
                        <Card key={service.id} className="p-0 overflow-hidden hover:shadow-lg transition-shadow border-transparent">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3 relative min-h-[250px] md:min-h-full">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-${service.color}-900/10 mix-blend-multiply`}></div>
                                </div>

                                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-lg text-gray-600 mb-6">
                                        {service.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-center text-gray-700">
                                                <div className={`w-2 h-2 rounded-full bg-${service.color}-500 mr-3`}></div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <Link to={service.link}>
                                            <Button className={`bg-${service.color}-600 hover:bg-${service.color}-700`}>
                                                {service.cta}
                                                <IconArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
