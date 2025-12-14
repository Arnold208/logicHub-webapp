import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { IconCalendar, IconCheck } from '@tabler/icons-react';
import imgHardware from '../../assets/images/service_hardware_dev_1765723694180.png';

export const ServiceHardware = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative bg-gradient-to-br from-primary via-teal-600 to-teal-800 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Hardware Product Development</h1>
                    <p className="text-xl max-w-2xl mx-auto text-emerald-100 mb-8">
                        We help innovators transform sketches into functional, market-ready hardware products.
                    </p>
                    <Link to="/appointment">
                        <Button size="lg" variant="white">
                            <IconCalendar className="mr-2 h-5 w-5" />
                            Discuss Your Project
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">End-to-End Development Support</h2>
                            <p className="text-gray-600 mb-4 text-lg">
                                Building hardware is hard. We make it easier. From initial CAD design to electronics integration and casing, our team guides you through the entire product lifecycle.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                {['Industrial Design (CAD)', 'PCB Design & Assembly', 'Enclosure Prototyping', 'Design for Manufacturing', 'Testing & Validation'].map((item, i) => (
                                    <div key={i} className="flex items-center text-gray-700">
                                        <IconCheck className="h-5 w-5 text-purple-600 mr-2" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2 relative h-80 rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={imgHardware}
                                alt="Hardware Prototype"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
