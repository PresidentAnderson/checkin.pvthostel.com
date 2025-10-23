import { create } from 'zustand'
import { Guest } from '@/types'

interface GuestStore {
  guests: Guest[]
  isLoading: boolean
  error: string | null
  
  // Actions
  addGuest: (guest: Guest) => void
  updateGuest: (id: string, guest: Partial<Guest>) => void
  deleteGuest: (id: string) => void
  setGuests: (guests: Guest[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useGuestStore = create<GuestStore>((set) => ({
  guests: [],
  isLoading: false,
  error: null,

  addGuest: (guest) =>
    set((state) => ({
      guests: [...state.guests, { ...guest, id: Date.now().toString(), createdAt: new Date().toISOString() }],
    })),

  updateGuest: (id, updatedGuest) =>
    set((state) => ({
      guests: state.guests.map((guest) =>
        guest.id === id ? { ...guest, ...updatedGuest, updatedAt: new Date().toISOString() } : guest
      ),
    })),

  deleteGuest: (id) =>
    set((state) => ({
      guests: state.guests.filter((guest) => guest.id !== id),
    })),

  setGuests: (guests) => set({ guests }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))