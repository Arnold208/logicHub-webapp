const mockUsers = [
  {
    id: '1',
    email: 'user@logichub.com',
    password: 'password123',
    name: 'John Doe',
    phone: '+234 800 123 4567',
    role: 'user' as const,
  },
  {
    id: '2',
    email: 'admin@logichub.com',
    password: 'adminpassword',
    name: 'Admin User',
    phone: '+233 24 000 0001',
    role: 'admin' as const,
  },
  {
    id: '3',
    email: 'leslie@logichub.com',
    password: 'adminpassword',
    name: 'Leslie Admin',
    phone: '+233 24 000 0002',
    role: 'admin' as const,
  },
];

export const login = async (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === email && u.password === password);

      if (user) {
        resolve({
          data: {
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              phone: user.phone,
              role: user.role,
            },
          },
        });
      } else {
        reject({ response: { data: { message: 'Invalid credentials' } } });
      }
    }, 800);
  });
};

export const signup = async (name: string, email: string, password: string, phone: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: String(mockUsers.length + 1),
        name,
        email,
        password,
        phone,
        role: 'user' as const,
      };
      mockUsers.push(newUser);

      resolve({
        data: {
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            phone: newUser.phone,
            role: newUser.role,
          },
        },
      });
    }, 800);
  });
};

export const refreshToken = async (_token: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          accessToken: 'mock-access-token-refreshed-' + Date.now(),
        },
      });
    }, 500);
  });
};

export const getUserProfile = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: '1',
          email: 'user@logichub.com',
          name: 'John Doe',
          phone: '+234 800 123 4567',
          role: 'user',
          joinedDate: '2024-01-15',
          totalOrders: 12,
        },
      });
    }, 500);
  });
};
