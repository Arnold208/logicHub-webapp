const mockOrders = [
  {
    id: 'ORD-2024-001',
    fileName: 'dragon_figurine.stl',
    status: 'Completed',
    material: 'PLA',
    color: 'Red',
    quantity: 2,
    price: 45000,
    orderedDate: '2024-11-28',
    completedDate: '2024-11-30',
    progress: 100,
  },
  {
    id: 'ORD-2024-002',
    fileName: 'phone_stand.stl',
    status: 'Printing',
    material: 'PETG',
    color: 'Black',
    quantity: 5,
    price: 38000,
    orderedDate: '2024-12-05',
    completedDate: null,
    progress: 67,
    printer: 'Printer C',
  },
  {
    id: 'ORD-2024-003',
    fileName: 'custom_bracket.obj',
    status: 'Slicing',
    material: 'ABS',
    color: 'White',
    quantity: 1,
    price: 22000,
    orderedDate: '2024-12-09',
    completedDate: null,
    progress: 25,
  },
  {
    id: 'ORD-2024-004',
    fileName: 'gear_assembly.stl',
    status: 'Queued',
    material: 'PLA',
    color: 'Blue',
    quantity: 3,
    price: 56000,
    orderedDate: '2024-12-10',
    completedDate: null,
    progress: 0,
  },
];

export const getOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          orders: mockOrders,
        },
      });
    }, 600);
  });
};

export const getOrderById = async (orderId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = mockOrders.find((o) => o.id === orderId);
      if (order) {
        resolve({ data: order });
      } else {
        reject({ response: { data: { message: 'Order not found' } } });
      }
    }, 400);
  });
};

export const createOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = {
        id: `ORD-2024-${String(mockOrders.length + 1).padStart(3, '0')}`,
        ...orderData,
        status: 'Queued',
        orderedDate: new Date().toISOString().split('T')[0],
        completedDate: null,
        progress: 0,
      };
      mockOrders.push(newOrder);
      resolve({ data: newOrder });
    }, 800);
  });
};

export const reorder = async (orderId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = mockOrders.find((o) => o.id === orderId);
      if (order) {
        const newOrder = {
          ...order,
          id: `ORD-2024-${String(mockOrders.length + 1).padStart(3, '0')}`,
          status: 'Queued',
          orderedDate: new Date().toISOString().split('T')[0],
          completedDate: null,
          progress: 0,
        };
        mockOrders.push(newOrder);
        resolve({ data: newOrder });
      }
    }, 600);
  });
};
