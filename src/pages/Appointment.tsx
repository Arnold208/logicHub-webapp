import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { bookAppointment } from '../api/files';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { IconCalendar, IconClock, IconUser, IconMail, IconPhone, IconCheck } from '@tabler/icons-react';

export const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await bookAppointment({
        ...formData,
        date: formData.date?.toISOString(),
      });
      setAppointmentId(response.data.appointmentId);
      setSuccess(true);
    } catch (error) {
      console.error('Appointment booking failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center p-8">
          <IconCheck className="h-16 w-16 text-gray-900 mx-auto mb-6 stroke-[1.5]" />

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Appointment Confirmed!</h1>
          <p className="text-base text-gray-600 mb-8">
            Your consultation has been scheduled. We'll send you a confirmation email shortly.
          </p>

          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Appointment ID</p>
            <p className="text-2xl font-bold text-gray-900">{appointmentId}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600 mb-1">Date</p>
                <p className="font-semibold text-gray-900">
                  {formData.date?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Time</p>
                <p className="font-semibold text-gray-900">{formData.time}</p>
              </div>
            </div>
          </div>

          <Button onClick={() => window.location.reload()}>Book Another Appointment</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Book a Consultation</h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Schedule a meeting with our experts to discuss your 3D modelling needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Why Book a Consultation?</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <IconCheck className="h-6 w-6 text-gray-900 mt-0.5 flex-shrink-0 stroke-[1.5]" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Expert Guidance</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Get professional advice on design optimization and material selection
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <IconCheck className="h-6 w-6 text-gray-900 mt-0.5 flex-shrink-0 stroke-[1.5]" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Custom Solutions</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Discuss complex projects and receive tailored recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <IconCheck className="h-6 w-6 text-gray-900 mt-0.5 flex-shrink-0 stroke-[1.5]" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cost Estimates</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Understand pricing for your specific requirements before ordering
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <IconCheck className="h-6 w-6 text-gray-900 mt-0.5 flex-shrink-0 stroke-[1.5]" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Technical Support</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Learn about our equipment capabilities and printing options
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <IconUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <IconPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+234 800 123 4567"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <DatePickerInput
                    value={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    placeholder="Pick a date"
                    minDate={new Date()}
                    className="w-full"
                    styles={{
                      input: {
                        padding: '10px 12px',
                        borderColor: '#d1d5db',
                        borderRadius: '0.5rem',
                      },
                    }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description of Your Project
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your 3D modelling needs..."
                    required
                  ></textarea>
                </div>

                <Button type="submit" fullWidth size="lg" disabled={submitting}>
                  {submitting ? 'Booking...' : 'Book Appointment'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
