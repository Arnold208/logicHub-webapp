import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { IconCalendar } from '@tabler/icons-react';
import imgIot from '../../assets/images/service_iot_robotics_1765723715509.png';

export const ServiceIotRobotics = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative bg-gradient-to-br from-primary via-teal-600 to-teal-800 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">IoT & Robotics</h1>
                    <p className="text-xl max-w-2xl mx-auto text-emerald-100 mb-8">
                        Build smart devices and automated systems with expert support.
                    </p>
                    <Link to="/appointment">
                        <Button size="lg" variant="white">
                            <IconCalendar className="mr-2 h-5 w-5" />
                            Build a Prototype
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">Advanced Technology Projects</h2>
                    <p className="max-w-3xl mx-auto text-gray-600 mb-12 text-lg">
                        Whether you are building a smart agriculture sensor, an educational robot, or an industrial automation system, LogicHub provides the lab space and technical expertise you need.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            { title: 'Embedded Systems', desc: 'Arduino, ESP32, Raspberry Pi, and custom PCB development.', img: imgIot },
                            { title: 'Sensor Networks', desc: 'IoT connectivity (LoRa, WiFi, GSM) for remote monitoring solutions.', img: imgIot },
                            { title: 'Robotics & AI', desc: 'Motion control, computer vision, and autonomous navigation.', img: imgIot }
                        ].map((item, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-xl h-64 shadow-lg">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-gray-200">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
