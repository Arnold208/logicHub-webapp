const mockUsers = [
  {
    id: '1',
    email: 'user@logichub.com',
    password: 'password123',
    name: 'John Doe',
    phone: '+234 800 123 4567',
  },
];

export const login = async (email, password) => {
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
            },
          },
        });
      } else {
        reject({ response: { data: { message: 'Invalid credentials' } } });
      }
    }, 800);
  });
};

export const signup = async (name, email, password, phone) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: String(mockUsers.length + 1),
        name,
        email,
        password,
        phone,
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
          },
        },
      });
    }, 800);
  });
};

export const refreshToken = async (refreshToken) => {
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

export const getUserProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: '1',
          email: 'user@logichub.com',
          name: 'John Doe',
          phone: '+234 800 123 4567',
          joinedDate: '2024-01-15',
          totalOrders: 12,
        },
      });
    }, 500);
  });
};
