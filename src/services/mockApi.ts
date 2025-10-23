// Mock API Service for development and fallback scenarios

import { ExtendedGuest, EnhancedRoom, Reservation } from '@/types/comprehensive'

// Mock data storage
const mockStorage = {
  guests: [] as ExtendedGuest[],
  rooms: [
    {
      id: '1',
      number: '101',
      name: 'Deluxe Dorm Room',
      type: 'dorm' as const,
      subType: 'mixed_dorm',
      capacity: 6,
      currentOccupancy: 2,
      basePrice: 35,
      dynamicPrice: 35,
      status: 'available' as const,
      floor: 1,
      amenities: [],
      beds: [],
      photos: [],
      accessibility: false,
      smoking: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      number: '102',
      name: 'Private Room',
      type: 'private' as const,
      capacity: 2,
      currentOccupancy: 0,
      basePrice: 80,
      dynamicPrice: 80,
      status: 'available' as const,
      floor: 1,
      amenities: [],
      beds: [],
      photos: [],
      accessibility: false,
      smoking: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      number: '103',
      name: 'Female Only Dorm',
      type: 'dorm' as const,
      subType: 'female_only',
      capacity: 8,
      currentOccupancy: 6,
      basePrice: 30,
      dynamicPrice: 30,
      status: 'available' as const,
      floor: 1,
      amenities: [],
      beds: [],
      photos: [],
      accessibility: false,
      smoking: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      number: '201',
      name: 'Luxury Suite',
      type: 'suite' as const,
      capacity: 4,
      currentOccupancy: 0,
      basePrice: 150,
      dynamicPrice: 150,
      status: 'maintenance' as const,
      floor: 2,
      amenities: [],
      beds: [],
      photos: [],
      accessibility: true,
      smoking: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ] as EnhancedRoom[],
  reservations: [] as Reservation[],
}

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Mock Guest API
export const mockGuestApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    await delay()
    let guests = mockStorage.guests
    
    if (params?.search) {
      const search = params.search.toLowerCase()
      guests = guests.filter(guest => 
        guest.firstName.toLowerCase().includes(search) ||
        guest.lastName.toLowerCase().includes(search) ||
        guest.email?.toLowerCase().includes(search)
      )
    }
    
    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit
    
    return {
      guests: guests.slice(start, end),
      pagination: {
        page,
        limit,
        total: guests.length,
        totalPages: Math.ceil(guests.length / limit),
      }
    }
  },

  getById: async (id: string) => {
    await delay()
    const guest = mockStorage.guests.find(g => g.id === id)
    if (!guest) throw new Error('Guest not found')
    return guest
  },

  create: async (guestData: any) => {
    await delay()
    const newGuest: ExtendedGuest = {
      ...guestData,
      id: `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      loyaltyPoints: 0,
      totalStays: 1,
      averageRating: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockStorage.guests.push(newGuest)
    return newGuest
  },

  update: async (id: string, guestData: any) => {
    await delay()
    const index = mockStorage.guests.findIndex(g => g.id === id)
    if (index === -1) throw new Error('Guest not found')
    
    mockStorage.guests[index] = {
      ...mockStorage.guests[index],
      ...guestData,
      updatedAt: new Date().toISOString(),
    }
    return mockStorage.guests[index]
  },

  delete: async (id: string) => {
    await delay()
    const index = mockStorage.guests.findIndex(g => g.id === id)
    if (index === -1) throw new Error('Guest not found')
    mockStorage.guests.splice(index, 1)
  },

  checkIn: async (guestData: any) => {
    await delay()
    const newGuest = await mockGuestApi.create({
      ...guestData,
      status: 'checked_in',
    })
    return newGuest
  },

  checkOut: async (guestId: string) => {
    await delay()
    return await mockGuestApi.update(guestId, { status: 'checked_out' })
  },
}

// Mock Room API
export const mockRoomApi = {
  getAll: async () => {
    await delay()
    return [...mockStorage.rooms]
  },

  getById: async (id: string) => {
    await delay()
    const room = mockStorage.rooms.find(r => r.id === id)
    if (!room) throw new Error('Room not found')
    return room
  },

  updateStatus: async (id: string, status: string) => {
    await delay()
    const index = mockStorage.rooms.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Room not found')
    
    mockStorage.rooms[index] = {
      ...mockStorage.rooms[index],
      status: status as any,
      updatedAt: new Date().toISOString(),
    }
    return mockStorage.rooms[index]
  },

  getAvailable: async (checkIn: string, checkOut: string) => {
    await delay()
    // For mock purposes, return all available rooms
    return mockStorage.rooms.filter(room => room.status === 'available')
  },

  updatePricing: async (id: string, pricing: any) => {
    await delay()
    const index = mockStorage.rooms.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Room not found')
    
    mockStorage.rooms[index] = {
      ...mockStorage.rooms[index],
      ...pricing,
      updatedAt: new Date().toISOString(),
    }
    return mockStorage.rooms[index]
  },
}

// Mock Analytics API
export const mockAnalyticsApi = {
  getDashboardStats: async () => {
    await delay()
    return {
      totalGuests: mockStorage.guests.length,
      occupiedRooms: mockStorage.rooms.filter(r => r.status === 'occupied').length,
      totalRooms: mockStorage.rooms.length,
      todayCheckins: Math.floor(Math.random() * 10),
      revenueToday: Math.floor(Math.random() * 2000) + 500,
      occupancyRate: Math.floor(Math.random() * 30) + 70,
    }
  },

  getOccupancyData: async (period: string) => {
    await delay()
    // Generate mock data for charts
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 365
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      occupancy: Math.floor(Math.random() * 40) + 60,
    }))
  },

  getRevenueData: async (period: string) => {
    await delay()
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 365
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 1000) + 200,
    }))
  },

  getGuestDemographics: async () => {
    await delay()
    return {
      nationality: {
        'US': 35,
        'UK': 20,
        'Germany': 15,
        'France': 12,
        'Other': 18,
      },
      ageGroups: {
        '18-25': 40,
        '26-35': 35,
        '36-45': 15,
        '46+': 10,
      },
      gender: {
        'Male': 48,
        'Female': 47,
        'Other': 5,
      }
    }
  },
}

// Environment detection
export const isMockMode = () => {
  return import.meta.env.VITE_MOCK_API === 'true' || 
         import.meta.env.MODE === 'development'
}

// API factory that chooses between real and mock APIs
export const createApiService = () => {
  if (isMockMode()) {
    return {
      guest: mockGuestApi,
      room: mockRoomApi,
      analytics: mockAnalyticsApi,
    }
  }
  
  // Return real APIs when not in mock mode
  // This would be imported from the actual api.ts file
  return null
}