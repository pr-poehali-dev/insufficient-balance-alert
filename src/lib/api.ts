const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  bookings: {
    getAll: async (status?: string) => {
      const url = status ? `${API_URL}/bookings?status=${status}` : `${API_URL}/bookings`;
      const response = await fetch(url);
      return response.json();
    },
    
    create: async (data: {
      clientName: string;
      clientPhone: string;
      clientEmail?: string;
      location: string;
      carType: string;
      service: string;
      serviceDuration: number;
      servicePrice: number;
      bookingDate: string;
      bookingTime: string;
    }) => {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    
    update: async (data: {
      id: number;
      status?: string;
      notes?: string;
      assignedMasterId?: number | null;
    }) => {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },
  
  masters: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/masters`);
      return response.json();
    },
    
    getOrders: async (masterId: string) => {
      const response = await fetch(`${API_URL}/masters?masterId=${masterId}`);
      return response.json();
    },
  },
};
