import { create } from 'zustand'
import { Reservation } from '@/types/comprehensive'

interface ReservationStore {
  reservations: Reservation[]
  isLoading: boolean
  error: string | null
  
  // Actions
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateReservation: (id: string, reservation: Partial<Reservation>) => void
  cancelReservation: (id: string, reason?: string) => void
  checkInReservation: (id: string) => void
  checkOutReservation: (id: string) => void
  setReservations: (reservations: Reservation[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Getters
  getReservationById: (id: string) => Reservation | undefined
  getReservationsByGuest: (guestId: string) => Reservation[]
  getReservationsByDateRange: (startDate: string, endDate: string) => Reservation[]
  getTodayCheckIns: () => Reservation[]
  getTodayCheckOuts: () => Reservation[]
  getUpcomingArrivals: (days: number) => Reservation[]
  getActiveReservations: () => Reservation[]
}

export const useReservationStore = create<ReservationStore>((set, get) => ({
  reservations: [],
  isLoading: false,
  error: null,

  addReservation: (reservationData) =>
    set((state) => ({
      reservations: [
        ...state.reservations,
        {
          ...reservationData,
          id: Date.now().toString(),
          confirmationNumber: `PVT${Date.now().toString().slice(-6)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateReservation: (id, updatedReservation) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, ...updatedReservation, updatedAt: new Date().toISOString() }
          : reservation
      ),
    })),

  cancelReservation: (id, reason) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id
          ? {
              ...reservation,
              status: 'cancelled',
              specialRequests: reason ? `${reservation.specialRequests || ''}\nCancellation reason: ${reason}` : reservation.specialRequests,
              updatedAt: new Date().toISOString(),
            }
          : reservation
      ),
    })),

  checkInReservation: (id) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: 'checked_in', updatedAt: new Date().toISOString() }
          : reservation
      ),
    })),

  checkOutReservation: (id) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: 'checked_out', updatedAt: new Date().toISOString() }
          : reservation
      ),
    })),

  setReservations: (reservations) => set({ reservations }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Getters
  getReservationById: (id) => get().reservations.find((r) => r.id === id),

  getReservationsByGuest: (guestId) =>
    get().reservations.filter((r) => r.guestId === guestId),

  getReservationsByDateRange: (startDate, endDate) =>
    get().reservations.filter((r) => {
      const checkIn = new Date(r.checkInDate)
      const checkOut = new Date(r.checkOutDate)
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      return (checkIn >= start && checkIn <= end) || 
             (checkOut >= start && checkOut <= end) ||
             (checkIn <= start && checkOut >= end)
    }),

  getTodayCheckIns: () => {
    const today = new Date().toISOString().split('T')[0]
    return get().reservations.filter(
      (r) => r.checkInDate === today && r.status === 'confirmed'
    )
  },

  getTodayCheckOuts: () => {
    const today = new Date().toISOString().split('T')[0]
    return get().reservations.filter(
      (r) => r.checkOutDate === today && r.status === 'checked_in'
    )
  },

  getUpcomingArrivals: (days) => {
    const today = new Date()
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
    
    return get().reservations.filter((r) => {
      const checkIn = new Date(r.checkInDate)
      return checkIn >= today && checkIn <= futureDate && r.status === 'confirmed'
    })
  },

  getActiveReservations: () =>
    get().reservations.filter((r) => 
      r.status === 'confirmed' || r.status === 'checked_in'
    ),
}))