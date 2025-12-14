import { useState, useEffect } from 'react';
import { getOrders, reorder } from '../api/orders';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';
import {
  IconPackage,
  IconClock,
  IconCheck,
  IconRefresh,
  IconPrinter,
  IconAlertCircle,
} from '@tabler/icons-react';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (orderId) => {
    setReordering(orderId);
    try {
      await reorder(orderId);
      await loadOrders();
    } catch (error) {
      console.error('Reorder failed:', error);
    } finally {
      setReordering(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Printing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Slicing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Queued':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <IconCheck className="h-5 w-5" />;
      case 'Printing':
        return <IconPrinter className="h-5 w-5" />;
      case 'Slicing':
        return <IconClock className="h-5 w-5" />;
      case 'Queued':
        return <IconAlertCircle className="h-5 w-5" />;
      default:
        return <IconPackage className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <Loader text="Loading your orders..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600 text-lg">Track and manage your print jobs</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-md">
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <IconPackage className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start by uploading your first 3D model</p>
            <Button onClick={() => (window.location.href = '/upload')}>Upload Model</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} hover>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{order.fileName}</h3>
                          <span
                            className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Material</p>
                        <p className="font-semibold text-gray-900">{order.material}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Color</p>
                        <p className="font-semibold text-gray-900">{order.color}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Quantity</p>
                        <p className="font-semibold text-gray-900">{order.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Price</p>
                        <p className="font-semibold text-blue-600">₵{order.price.toLocaleString()}</p>
                      </div>
                    </div>

                    {order.status === 'Printing' && order.printer && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-900">
                            Printing on {order.printer}
                          </span>
                          <span className="text-sm font-bold text-blue-900">{order.progress}%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Ordered</span>
                        <span className="font-medium text-gray-900">{order.orderedDate}</span>
                      </div>
                      {order.completedDate && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Completed</span>
                          <span className="font-medium text-gray-900">{order.completedDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        onClick={() => alert('View details for ' + order.id)}
                      >
                        View Details
                      </Button>
                      {order.status === 'Completed' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          fullWidth
                          onClick={() => handleReorder(order.id)}
                          disabled={reordering === order.id}
                        >
                          {reordering === order.id ? (
                            'Reordering...'
                          ) : (
                            <>
                              <IconRefresh className="h-4 w-4 mr-2" />
                              Reorder
                            </>
                          )}
                        </Button>
                      )}
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
