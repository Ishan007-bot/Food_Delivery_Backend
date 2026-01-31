import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests and handle FormData
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Remove Content-Type for FormData to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (firstName: string, lastName: string, email: string, password: string, phone: string) => {
    const response = await api.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      phone,
      role: 'CUSTOMER',
    });
    return response.data;
  },
};

// Restaurant API
export const restaurantApi = {
  getAll: async (params?: any) => {
    const response = await api.get('/restaurants', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },
};

// Menu Items API
export const menuItemApi = {
  getByRestaurant: async (restaurantId: number) => {
    const response = await api.get(`/restaurants/${restaurantId}/menu`);
    return response.data;
  },
};

// Orders API
export const orderApi = {
  create: async (data: any) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// Analytics API
export const analyticsApi = {
  getRestaurantAnalytics: async (restaurantId: number) => {
    const response = await api.get(`/analytics/restaurant/${restaurantId}`);
    return response.data;
  },

  getSystemAnalytics: async () => {
    const response = await api.get('/analytics/system');
    return response.data;
  },
};

// Users API
export const userApi = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

// File Upload API
export const fileApi = {
  upload: async (file: File, folder: string = 'general', onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    // Don't set Content-Type header - let axios set it automatically with boundary
    const response = await api.post('/files/upload', formData, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data;
  },

  delete: async (folder: string, filename: string) => {
    const response = await api.delete(`/files/${folder}/${filename}`);
    return response.data;
  },
};
