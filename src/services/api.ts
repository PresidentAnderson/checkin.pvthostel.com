// API Service Layer for PVT Hostel Management System

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// Generic API response handler
export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

// Generic API request wrapper
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  const response = await fetch(url, config)
  return handleApiResponse<T>(response)
}

// Guest API
export const guestApi = {
  // Get all guests with pagination
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    apiRequest<{ guests: any[]; pagination: any }>('/guests' + 
      (params ? `?${new URLSearchParams(params as any).toString()}` : '')),
  
  // Get guest by ID
  getById: (id: string) => 
    apiRequest<any>(`/guests/${id}`),
  
  // Create new guest
  create: (guestData: any) =>
    apiRequest<any>('/guests', {
      method: 'POST',
      body: JSON.stringify(guestData),
    }),
  
  // Update guest
  update: (id: string, guestData: any) =>
    apiRequest<any>(`/guests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(guestData),
    }),
  
  // Delete guest
  delete: (id: string) =>
    apiRequest<void>(`/guests/${id}`, {
      method: 'DELETE',
    }),

  // Check in guest
  checkIn: (guestData: any) =>
    apiRequest<any>('/guests/checkin', {
      method: 'POST',
      body: JSON.stringify(guestData),
    }),

  // Check out guest
  checkOut: (guestId: string) =>
    apiRequest<any>(`/guests/${guestId}/checkout`, {
      method: 'POST',
    }),
}

// Room API
export const roomApi = {
  getAll: () => apiRequest<any[]>('/rooms'),
  
  getById: (id: string) => apiRequest<any>(`/rooms/${id}`),
  
  updateStatus: (id: string, status: string) =>
    apiRequest<any>(`/rooms/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  
  getAvailable: (checkIn: string, checkOut: string) =>
    apiRequest<any[]>(`/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`),
  
  updatePricing: (id: string, pricing: any) =>
    apiRequest<any>(`/rooms/${id}/pricing`, {
      method: 'PATCH',
      body: JSON.stringify(pricing),
    }),
}

// Reservation API
export const reservationApi = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    apiRequest<{ reservations: any[]; pagination: any }>('/reservations' + 
      (params ? `?${new URLSearchParams(params as any).toString()}` : '')),
  
  getById: (id: string) => apiRequest<any>(`/reservations/${id}`),
  
  create: (reservationData: any) =>
    apiRequest<any>('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    }),
  
  update: (id: string, reservationData: any) =>
    apiRequest<any>(`/reservations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reservationData),
    }),
  
  cancel: (id: string, reason?: string) =>
    apiRequest<any>(`/reservations/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }),
  
  checkIn: (id: string) =>
    apiRequest<any>(`/reservations/${id}/checkin`, {
      method: 'POST',
    }),
  
  checkOut: (id: string) =>
    apiRequest<any>(`/reservations/${id}/checkout`, {
      method: 'POST',
    }),
}

// Analytics API
export const analyticsApi = {
  getDashboardStats: () => apiRequest<any>('/analytics/dashboard'),
  
  getOccupancyData: (period: string) =>
    apiRequest<any>(`/analytics/occupancy?period=${period}`),
  
  getRevenueData: (period: string) =>
    apiRequest<any>(`/analytics/revenue?period=${period}`),
  
  getGuestDemographics: () => apiRequest<any>('/analytics/demographics'),
}

// Payment API
export const paymentApi = {
  createPaymentIntent: (data: any) =>
    apiRequest<any>('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  confirmPayment: (paymentIntentId: string) =>
    apiRequest<any>('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId }),
    }),
  
  refundPayment: (paymentIntentId: string, amount?: number) =>
    apiRequest<any>('/payments/refund', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId, amount }),
    }),
  
  getPaymentHistory: (reservationId: string) =>
    apiRequest<any[]>(`/payments/history/${reservationId}`),
}

// Settings API
export const settingsApi = {
  getAll: () => apiRequest<any[]>('/settings'),
  
  update: (key: string, value: any) =>
    apiRequest<any>('/settings', {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    }),
  
  getEmailTemplates: () => apiRequest<any[]>('/settings/email-templates'),
  
  updateEmailTemplate: (id: string, template: any) =>
    apiRequest<any>(`/settings/email-templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(template),
    }),
}

// Housekeeping API
export const housekeepingApi = {
  getTasks: (params?: { status?: string; roomId?: string }) =>
    apiRequest<any[]>('/housekeeping/tasks' + 
      (params ? `?${new URLSearchParams(params as any).toString()}` : '')),
  
  createTask: (taskData: any) =>
    apiRequest<any>('/housekeeping/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),
  
  updateTask: (id: string, taskData: any) =>
    apiRequest<any>(`/housekeeping/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    }),
  
  completeTask: (id: string, completionData: any) =>
    apiRequest<any>(`/housekeeping/tasks/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify(completionData),
    }),
}

// Staff API
export const staffApi = {
  getAll: () => apiRequest<any[]>('/staff'),
  
  getById: (id: string) => apiRequest<any>(`/staff/${id}`),
  
  create: (staffData: any) =>
    apiRequest<any>('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData),
    }),
  
  update: (id: string, staffData: any) =>
    apiRequest<any>(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(staffData),
    }),
  
  getSchedule: (staffId: string, startDate: string, endDate: string) =>
    apiRequest<any[]>(`/staff/${staffId}/schedule?start=${startDate}&end=${endDate}`),
  
  updateSchedule: (staffId: string, schedule: any[]) =>
    apiRequest<any>(`/staff/${staffId}/schedule`, {
      method: 'PUT',
      body: JSON.stringify({ schedule }),
    }),
}