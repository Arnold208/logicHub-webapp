import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { IconRocket } from '@tabler/icons-react';
import imgIncubation from '../../assets/images/service_incubation_1765723732071.png';

export const ServiceIncubation = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative bg-gradient-to-br from-primary via-teal-600 to-teal-800 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Startups & Incubation</h1>
                    <p className="text-xl max-w-2xl mx-auto text-emerald-100 mb-8">
                        We don't just help you build products; we help you build companies.
                    </p>
                    <a href="mailto:incubation@logichub.com">
                        <Button size="lg" variant="white">
                            <IconRocket className="mr-2 h-5 w-5" />
                            Apply for Incubation
                        </Button>
                    </a>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12 text-gray-900">How We Support Founders</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: 'Mentorship', desc: 'Guidance from experienced engineers and founders.', img: imgIncubation },
                            { title: 'Resources', desc: 'Access to premium tools, office space, and connectivity.', img: imgIncubation },
                            { title: 'Development', desc: 'Technical support to get your MVP to market faster.', img: imgIncubation },
                            { title: 'Network', desc: 'Connections to investors, partners, and early customers.', img: imgIncubation }
                        ].map((item, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-xl h-48 shadow-lg">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 text-left">
                                    <h3 className="text-lg font-bold mb-1 text-white">{item.title}</h3>
                                    <p className="text-gray-200 text-xs">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-gray-50 p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-4">Crafted Climate</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                            "LogicHub's incubation program was instrumental in taking our climate-tech solution from a university project to a field-tested product."
                        </p>
                        <Link to="/" className="text-green-700 font-semibold hover:underline">Read Success Story on Home</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
