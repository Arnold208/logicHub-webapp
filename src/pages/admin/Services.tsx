import { Card } from '../../components/ui/Card';
import { IconLayersIntersect, IconCircleCheck, IconAlertCircle, IconCircleDashed } from '@tabler/icons-react';

const services = [
    { name: '3D Printing', status: 'Active', load: 65, activeOrders: 14, icon: IconLayersIntersect, color: 'teal' },
    { name: 'Laser Cutting', status: 'Active', load: 25, activeOrders: 3, icon: IconLayersIntersect, color: 'sky' },
    { name: 'Woodworking', status: 'Maintenance', load: 0, activeOrders: 0, icon: IconLayersIntersect, color: 'amber' },
    { name: 'Hardware Dev', status: 'Active', load: 40, activeOrders: 2, icon: IconLayersIntersect, color: 'indigo' },
];

export const AdminServices = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Machine Registry</h1>
                <p className="text-sm text-gray-500 font-bold mt-1 uppercase tracking-widest">Active Production Lines & Load Monitoring</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                    <Card key={service.name} className="p-8 bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                        <div className="flex items-start justify-between">
                            <div className={`p-4 rounded-2xl bg-${service.color}-50 text-${service.color}-600`}>
                                <service.icon className="h-8 w-8" />
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${service.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                {service.status === 'Active' ? <IconCircleCheck className="h-3 w-3" /> : <IconAlertCircle className="h-3 w-3" />}
                                {service.status}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-black text-gray-900">{service.name}</h3>
                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Production Load</span>
                                    <span className="font-black text-gray-900">{service.load}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className={`bg-${service.color}-500 h-full transition-all duration-1000`} style={{ width: `${service.load}%` }}></div>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <IconCircleDashed className="h-4 w-4 text-gray-300" />
                                        <span className="text-xs font-bold text-gray-500">{service.activeOrders} Active Orders</span>
                                    </div>
                                    <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Configure</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
