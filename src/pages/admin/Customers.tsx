import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Card } from '../../components/ui/Card';
import {
    IconUser,
    IconMail,
    IconTrash,
    IconSearch,
    IconAlertCircle,
    IconCheck,
    IconShield
} from '@tabler/icons-react';

interface Profile {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    role: string;
    created_at: string;
}

export const AdminCustomers = () => {
    const [customers, setCustomers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCustomers(data || []);
        } catch (err: any) {
            console.error('Error fetching customers:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you absolutely sure? This will delete the user account and all their profile data forever.')) {
            return;
        }

        try {
            setDeletingId(id);
            setError(null);

            const { error } = await supabase.rpc('delete_user', { target_user_id: id });

            if (error) throw error;

            setSuccess('Customer deleted successfully');
            setCustomers(prev => prev.filter(c => c.id !== id));

            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            console.error('Error deleting user:', err);
            setError(err.message || 'Failed to delete user');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Accessing User Directory</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Loading customer records...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Customer Directory</h1>
                    <p className="text-gray-500 font-medium mt-1 uppercase text-xs tracking-widest">Manage User Accounts and Access Privileges</p>
                </div>
                <div className="relative">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="SEARCH BY NAME OR EMAIL..."
                        className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all w-full md:w-64 uppercase font-bold tracking-tight"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-shake">
                    <IconAlertCircle className="h-5 w-5" />
                    <p className="text-sm font-bold uppercase tracking-tight">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-slideDown">
                    <IconCheck className="h-5 w-5" />
                    <p className="text-sm font-bold uppercase tracking-tight">{success}</p>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers.map(customer => (
                    <Card key={customer.id} className="p-6 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                                    <IconUser className="h-6 w-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 uppercase tracking-tight">{customer.full_name}</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${customer.role === 'admin' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {customer.role}
                                        </span>
                                        {customer.role === 'admin' && <IconShield className="h-3 w-3 text-teal-600" />}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(customer.id)}
                                disabled={deletingId === customer.id || customer.role === 'admin'}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                            >
                                <IconTrash className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2 text-gray-500">
                                <IconMail className="h-4 w-4" />
                                <span className="text-xs font-bold truncate lowercase">{customer.email}</span>
                            </div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Joined: {new Date(customer.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredCustomers.length === 0 && (
                <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 px-6">
                    <IconUser className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">No Customers Found</h3>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2 px-6">
                        Try adjusting your search filters or check your network connection.
                    </p>
                </div>
            )}
        </div>
    );
};
