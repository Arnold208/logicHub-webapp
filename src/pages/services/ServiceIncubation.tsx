import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
    IconRocket,
    IconBulb,
    IconUsers,
    IconBriefcase,
    IconCheck,
    IconArrowRight,
    IconMail,
    IconStar,
} from '@tabler/icons-react';
import imgIncubation from '../../assets/images/service_incubation_1765723732071.png';
import craftedClimateLogo from '../../assets/images/craftedclimate_full_logo.png';

const pillars = [
    {
        icon: IconBulb,
        title: 'Mentorship',
        desc: 'Guidance from experienced engineers, founders, and industry experts who have built and shipped products.',
    },
    {
        icon: IconBriefcase,
        title: 'Workspace Access',
        desc: 'Dedicated desk space, high-speed internet, and access to all LogicHub fabrication tools and labs.',
    },
    {
        icon: IconRocket,
        title: 'Technical Support',
        desc: 'Hands-on development support - from prototyping to DFM - to get your MVP to market faster.',
    },
    {
        icon: IconUsers,
        title: 'Investor Network',
        desc: 'Connections to angel investors, partner organizations, and potential early customers in Ghana and beyond.',
    },
];

const benefits = [
    'Access to all LogicHub services at discounted rates',
    'Monthly 1-on-1 sessions with industry mentors',
    'Demo day with investors and industry leaders',
    'IP and business formation guidance',
    'Co-working space and meeting rooms',
    'Access to the LogicHub alumni network',
];

const testimonials = [
    {
        name: 'Ama Asante',
        role: 'Founder, AgroSense Ghana',
        text: "LogicHub's incubation program helped us go from a university prototype to a field-deployed IoT agriculture system in under a year.",
        rating: 5,
    },
    {
        name: 'Kofi Boateng',
        role: 'Co-founder, MediTrack',
        text: "The mentorship and technical resources at LogicHub were critical in getting our medical device through its first validation trials.",
        rating: 5,
    },
];

export const ServiceIncubation = () => {
    return (
        <div className="min-h-screen bg-white">

            {/* Hero */}
            <section className="relative bg-gray-950 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${imgIncubation})` }} />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-green-900/40" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5">
                            Startup Program
                        </span>
                        <h1 className="text-5xl font-bold mb-5 leading-tight tracking-tight">
                            Incubation &<br />Startup Support
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            We don't just help you build products - we help you build companies. Apply for our hardware incubation program.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="mailto:incubation@logichub.com">
                                <Button size="lg" className="bg-green-600 hover:bg-green-500 text-white">
                                    <IconRocket className="mr-2 h-5 w-5" />
                                    Apply for Incubation
                                </Button>
                            </a>
                            <Link to="/appointment">
                                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                    <IconMail className="mr-2 h-5 w-5" />
                                    Schedule a Call
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full mb-3">
                            The Program
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">How We Support Founders</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our incubation program is built around four core pillars that give hardware startups the best chance of success.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((p) => (
                            <Card key={p.title} className="text-center p-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 mb-5">
                                    <p.icon className="h-7 w-7 text-green-700 stroke-[1.5]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                            <img src={imgIncubation} alt="Incubation program" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full mb-4">
                                Member Benefits
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 mb-5">Everything You Need to Scale</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Accepted founders get access to a comprehensive support package designed for hardware product companies.
                            </p>
                            <ul className="space-y-3">
                                {benefits.map((b) => (
                                    <li key={b} className="flex items-start gap-3 text-gray-700">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <IconCheck className="h-3 w-3 text-green-700" />
                                        </div>
                                        <span className="text-base">{b}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <a href="mailto:incubation@logichub.com">
                                    <Button size="lg" className="bg-green-600 hover:bg-green-500 text-white">
                                        Apply Now <IconArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section className="py-20 bg-green-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-green-100 flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full mb-4">
                                Impact Case Study
                            </span>
                            <img src={craftedClimateLogo} alt="Crafted Climate Logo" className="h-12 mb-6 object-contain" />
                            <h2 className="text-3xl font-bold text-gray-900 mb-5">Environmental Monitoring Network</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                LogicHub is proud to incubate and support real-world solutions. One example is <strong>Crafted Climate</strong>, a climate-focused innovation that demonstrates how ideas developed within LogicHub can grow into impactful products addressing real challenges through environmental monitoring.
                            </p>
                            <a href="https://www.craftedclimate.org" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                                    Visit Crafted Climate <IconArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </a>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="aspect-video bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex flex-col items-center justify-center text-center p-8 relative">
                                <div className="absolute inset-0 bg-green-900/5 mix-blend-multiply" />
                                <IconBulb className="w-20 h-20 text-green-500 mb-6 relative z-10" />
                                <h3 className="text-2xl font-bold text-gray-900 relative z-10">From Idea to Deployed Network</h3>
                                <p className="text-gray-500 mt-3 relative z-10 max-w-sm mx-auto">Providing engineering support, workspace access, and prototyping facilities to accelerate their MVP.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">Founder Stories</h2>
                        <p className="text-lg text-gray-600">Hear from the startups we've supported.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((t) => (
                            <Card key={t.name} className="p-8">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <IconStar key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic mb-5 leading-relaxed">"{t.text}"</p>
                                <div className="border-t pt-4">
                                    <p className="font-bold text-gray-900">{t.name}</p>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-950 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Build Your Company?</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Applications are rolling. Send us a brief overview of your hardware startup idea.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="mailto:incubation@logichub.com">
                            <Button size="lg" className="bg-green-600 hover:bg-green-500 text-white">
                                <IconMail className="mr-2 h-5 w-5" />
                                Apply via Email
                            </Button>
                        </a>
                        <Link to="/appointment">
                            <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-white">
                                <IconMail className="mr-2 h-5 w-5" />
                                Book a Discovery Call
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};
