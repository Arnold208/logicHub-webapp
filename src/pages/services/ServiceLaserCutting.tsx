import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { IconCalendar, IconMail } from '@tabler/icons-react';
import imgLaser from '../../assets/images/service_laser_cutting_1765723660296.png';

export const ServiceLaserCutting = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative bg-gradient-to-br from-primary via-teal-600 to-teal-800 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Laser Cutting & Engraving</h1>
                    <p className="text-xl max-w-2xl mx-auto text-emerald-100 mb-8">
                        Precision fabrication for branding, signage, prototypes, and custom designs.
                    </p>
                    <Link to="/appointment">
                        <Button size="lg" variant="white">
                            <IconCalendar className="mr-2 h-5 w-5" />
                            Book a Session
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">Precision and Versatility</h2>
                            <p className="text-gray-600 mb-4 text-lg">
                                Our high-power laser cutters can slice through wood, acrylic, leather, and fabric with incredible accuracy.
                                Whether you need intricate engravings for branding or precise cuts for assembly, we deliver professional results.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {[
                                    { title: 'Acrylic', img: imgLaser },
                                    { title: 'Wood', img: imgLaser },
                                    { title: 'Leather', img: imgLaser },
                                    { title: 'Models', img: imgLaser }
                                ].map((item, i) => (
                                    <div key={i} className="group relative overflow-hidden rounded-xl h-32">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <span className="text-white font-bold">{item.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={imgLaser}
                                alt="Laser Cutting Service"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Start Your Project</h2>
                    <p className="text-gray-600 mb-8">
                        We offer both service-based fabrication and machine access for members.
                        Contact us for a custom quote or to schedule machine time.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/appointment">
                            <Button>Book Consultation</Button>
                        </Link>
                        <a href="mailto:services@logichub.com">
                            <Button variant="outline">
                                <IconMail className="mr-2 h-5 w-5" />
                                Request Quote
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};
