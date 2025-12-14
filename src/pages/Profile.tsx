import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { IconUser, IconMail, IconPhone, IconCalendar, IconPackage } from '@tabler/icons-react';

export const Profile = () => {
  const { user } = useAuth();

  const profileData = {
    joinedDate: '2024-01-15',
    totalOrders: 12,
    activeOrders: 2,
    completedOrders: 10,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card hover>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <IconPackage className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{profileData.totalOrders}</p>
              <p className="text-gray-600 text-sm">Total Orders</p>
            </div>
          </Card>

          <Card hover>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <IconPackage className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{profileData.completedOrders}</p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
          </Card>

          <Card hover>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                <IconPackage className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{profileData.activeOrders}</p>
              <p className="text-gray-600 text-sm">Active Orders</p>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <IconUser className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <IconMail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <IconPhone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-lg font-semibold text-gray-900">{user?.phone || '+233 20 123 4567'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <IconCalendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(profileData.joinedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
