import { Button } from '../ui/Button';
import { IconArrowRight } from '@tabler/icons-react';
import fullLogo from '../../assets/images/full_logo.png';

export const ImpactStory = () => {
    return (
        <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800/30 transform skew-x-12 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-emerald-950/30 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-emerald-800/50 rounded-full px-4 py-1.5 mb-6 border border-emerald-700">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-sm font-medium text-emerald-100">Incubated Success Story</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
                            Innovating for a <br />
                            <span className="text-emerald-400">Greener Future</span>
                        </h2>

                        <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                            LogicHub is proud to have incubated <strong>Crafted Climate</strong>, a pioneer in sustainable technology.
                            What started as a sketch in our co-working space is now a leading startup reducing carbon footprints.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://craftedclimate.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <Button size="lg" variant="white">
                                    Visit Crafted Climate
                                    <IconArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-video rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                            <img
                                src={fullLogo}
                                alt="Crafted Climate Logo"
                                className="max-w-[70%] max-h-[70%] object-contain filter drop-shadow-xl"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-500 rounded-full opacity-20 blur-xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
