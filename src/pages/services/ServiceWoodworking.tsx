import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { IconCalendar } from '@tabler/icons-react';
import imgWood from '../../assets/images/service_woodworking_1765723676354.png';

export const ServiceWoodworking = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative bg-gradient-to-br from-primary via-teal-600 to-teal-800 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Woodworking & CNC</h1>
                    <p className="text-xl max-w-2xl mx-auto text-emerald-100 mb-8">
                        Blend traditional craftsmanship with digital fabrication.
                    </p>
                    <Link to="/appointment">
                        <Button size="lg" variant="white">
                            <IconCalendar className="mr-2 h-5 w-5" />
                            Visit the Workshop
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">From Furniture to Fine Art</h2>
                        <p className="text-gray-600 text-lg">
                            LogicHub's woodworking shop is equipped with CNC routers, table saws, and hand tools to help you build everything from custom furniture to architectural prototypes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'CNC Routing', desc: 'Computer-controlled cutting for complex shapes and repeated patterns.', img: imgWood },
                            { title: 'Custom Furniture', desc: 'Design and build tables, shelves, and desks with professional guidance.', img: imgWood },
                            { title: 'Joinery & Assembly', desc: 'Learn traditional techniques or use modern fasteners for sturdy builds.', img: imgWood }
                        ].map((item, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-xl h-64 shadow-lg">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-gray-200 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
