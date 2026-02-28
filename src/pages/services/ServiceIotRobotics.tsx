import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
    IconCalendar,
    IconCheck,
    IconArrowRight,
    IconCpu,
    IconWifi,
    IconRobot,
    IconBrandAndroid,
} from '@tabler/icons-react';
import imgIot from '../../assets/images/service_iot_robotics_1765723715509.png';

const specializations = [
    {
        icon: IconCpu,
        title: 'Embedded Systems',
        desc: 'Arduino, ESP32, STM32, Raspberry Pi, and custom PCB development for any application.',
    },
    {
        icon: IconWifi,
        title: 'IoT & Connectivity',
        desc: 'LoRa, WiFi, GSM/4G, BLE, Zigbee sensor networks for remote monitoring and control.',
    },
    {
        icon: IconRobot,
        title: 'Robotics',
        desc: 'Motion control systems, servo & stepper motor control, mechanical design, and automation.',
    },
    {
        icon: IconBrandAndroid,
        title: 'AI & Vision',
        desc: 'Edge ML, computer vision with OpenCV, object detection, and autonomous navigation.',
    },
];

const useCases = [
    'Smart agriculture monitoring systems',
    'Industrial automation and quality control',
    'Educational and competition robots',
    'Smart home and building management',
    'Remote environmental sensing',
    'Wearable health monitoring devices',
];

export const ServiceIotRobotics = () => {
    return (
        <div className="min-h-screen bg-white">

            {/* Hero */}
            <section className="relative bg-gray-950 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${imgIot})` }} />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-cyan-900/40" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-cyan-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5">
                            Advanced Technology
                        </span>
                        <h1 className="text-5xl font-bold mb-5 leading-tight tracking-tight">
                            IoT & Robotics<br />Development
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Build smart devices and automated systems with expert support in embedded systems, IoT connectivity, robotics, and AI.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/appointment">
                                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white">
                                    <IconCalendar className="mr-2 h-5 w-5" />
                                    Build a Prototype
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

            {/* Specializations */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-cyan-700 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-3">
                            Our Expertise
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">Advanced Technology Projects</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Whether you're building a smart sensor, an automated machine, or an AI-powered robot, our team has the expertise to bring it to life.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {specializations.map((s) => (
                            <Card key={s.title} className="text-center p-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 mb-5">
                                    <s.icon className="h-7 w-7 text-cyan-600 stroke-[1.5]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases + Image */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <span className="inline-block text-xs font-bold tracking-widest uppercase text-cyan-700 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-4">
                                What We've Built
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 mb-5">Real-World Applications</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Our lab has supported projects across agriculture, education, industry, and health. Here's what we regularly build:
                            </p>
                            <ul className="space-y-3">
                                {useCases.map((u) => (
                                    <li key={u} className="flex items-start gap-3 text-gray-700">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                                            <IconCheck className="h-3 w-3 text-cyan-600" />
                                        </div>
                                        <span className="text-base">{u}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <Link to="/appointment">
                                    <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white">
                                        <IconCpu className="mr-2 h-5 w-5" />
                                        Discuss Your Project
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {['Embedded Systems', 'Sensor Networks', 'Robotics', 'AI & Vision'].map((label) => (
                                <div key={label} className="group relative overflow-hidden rounded-2xl h-44 shadow-lg">
                                    <img src={imgIot} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                                        <span className="text-white text-sm font-semibold">{label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-950 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Build Smart?</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Bring your IoT or robotics project idea. Our engineers will help design, prototype, and validate your system.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/appointment">
                            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white">
                                <IconCalendar className="mr-2 h-5 w-5" />
                                Start a Project
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
