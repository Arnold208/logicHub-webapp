import { useOrders } from '../context/OrderContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import {
  IconPackage,
  IconTruck
} from '@tabler/icons-react';

export const Orders = () => {
  const { orders, loading } = useOrders();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Syncing Production Cloud...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Track your projects in real-time</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-3 shadow-sm border border-gray-100">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Jobs</p>
            <p className="text-3xl font-black text-primary">{orders.length}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-20 border-none shadow-sm">
            <IconPackage className="h-20 w-20 text-gray-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 font-medium mb-8">Ready to start your next big project?</p>
            <Button size="lg" onClick={() => navigate('/upload')}>Upload Model</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="p-0 overflow-hidden border-none shadow-sm hover:shadow-md transition-all group">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Status Bar */}
                  <div className={`lg:col-span-1 flex items-center justify-center py-4 lg:py-0 ${order.status === 'Completed' ? 'bg-teal-500' :
                    order.status === 'Printing/Crafting' ? 'bg-blue-500' :
                      'bg-amber-500'
                    }`}>
                    <div className="text-white transform lg:-rotate-90 font-black uppercase tracking-[0.2em] text-[10px] whitespace-nowrap">
                      {order.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-11 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8 bg-white">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="font-mono text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded tracking-tighter">
                          {order.id}
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Ordered {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-gray-900 mb-6">
                        {order.items.length === 1 ? order.items[0].name : `${order.items.length} Items Order`}
                      </h3>

                      <div className="flex flex-wrap gap-4">
                        <div className="bg-gray-50 px-4 py-2 rounded-xl">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
                          <p className="font-black text-gray-900">₵{order.total.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 px-4 py-2 rounded-xl">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Items</p>
                          <p className="font-black text-gray-900">{order.items.reduce((s, i) => s + i.quantity, 0)} Units</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3 min-w-[200px]">
                      <Button
                        variant="primary"
                        fullWidth
                        className="shadow-lg shadow-primary/20"
                        onClick={() => navigate(`/orders/track/${order.id}`)}
                      >
                        <IconTruck className="h-5 w-5 mr-2" />
                        Track Progress
                      </Button>
                      <Button
                        variant="white"
                        fullWidth
                        className="border-gray-100 text-gray-500 font-bold hover:bg-gray-50"
                        onClick={() => alert('Viewing Invoice')}
                      >
                        Download Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
