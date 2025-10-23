export interface Guest {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  idNumber: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'paid' | 'partial' | 'pending';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Room {
  id: string;
  number: string;
  type: 'dorm' | 'private' | 'suite';
  capacity: number;
  currentOccupancy: number;
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface CheckInFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  totalAmount: number;
  paidAmount: number;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: {
    type: 'check-in' | 'check-out' | 'stay';
    guest: Guest;
    roomNumber: string;
    status: 'confirmed' | 'pending' | 'cancelled';
  };
}

export interface CalendarView {
  month: 'month';
  week: 'week';
  day: 'day';
  agenda: 'agenda';
}