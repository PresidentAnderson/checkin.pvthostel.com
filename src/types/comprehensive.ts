// Comprehensive Types for PVT Hostel Management System

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'staff' | 'guest';
  permissions: Permission[];
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

// Enhanced Guest with more comprehensive data
export interface ExtendedGuest {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  idNumber: string;
  idType: 'passport' | 'license' | 'national_id';
  nationality: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences?: {
    bedType?: 'top' | 'bottom' | 'no_preference';
    roommate?: 'male' | 'female' | 'mixed' | 'no_preference';
    smoking?: boolean;
    accessibility?: boolean;
  };
  loyaltyPoints: number;
  totalStays: number;
  averageRating: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Reservation System
export interface Reservation {
  id: string;
  guestId: string;
  guest: ExtendedGuest;
  roomIds: string[];
  rooms: EnhancedRoom[];
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked_in' | 'checked_out' | 'no_show';
  source: 'direct' | 'booking.com' | 'hostelworld' | 'airbnb' | 'walk_in' | 'phone';
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'paid' | 'partial' | 'pending' | 'refunded';
  paymentMethod?: 'cash' | 'card' | 'bank_transfer' | 'digital_wallet';
  cancellationPolicy: string;
  specialRequests?: string;
  confirmationNumber: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Enhanced Room Management
export interface EnhancedRoom {
  id: string;
  number: string;
  name?: string;
  type: 'dorm' | 'private' | 'suite' | 'family';
  subType?: string; // e.g., 'mixed_dorm', 'female_only', 'ensuite'
  capacity: number;
  currentOccupancy: number;
  basePrice: number;
  dynamicPrice?: number;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'out_of_order';
  floor: number;
  amenities: RoomAmenity[];
  beds: Bed[];
  lastCleaned?: string;
  nextMaintenance?: string;
  photos: string[];
  description?: string;
  accessibility: boolean;
  smoking: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Bed {
  id: string;
  roomId: string;
  number: string;
  type: 'single' | 'double' | 'bunk_top' | 'bunk_bottom';
  status: 'available' | 'occupied' | 'maintenance';
  currentGuestId?: string;
  price: number;
}

export interface RoomAmenity {
  id: string;
  name: string;
  icon: string;
  category: 'bathroom' | 'comfort' | 'technology' | 'storage';
}

// Housekeeping & Maintenance
export interface HousekeepingTask {
  id: string;
  roomId: string;
  assignedTo: string;
  type: 'cleaning' | 'maintenance' | 'inspection' | 'setup';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  estimatedDuration: number; // minutes
  actualDuration?: number;
  beforePhotos: string[];
  afterPhotos: string[];
  checklistItems: ChecklistItem[];
  notes?: string;
  scheduledFor: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  name: string;
  completed: boolean;
  required: boolean;
  notes?: string;
}

// Payment System
export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  currency: string;
  method: 'cash' | 'card' | 'bank_transfer' | 'digital_wallet';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripePaymentIntentId?: string;
  paymentDate: string;
  processedBy: string;
  notes?: string;
  refundAmount?: number;
  refundReason?: string;
  createdAt: string;
}

// Revenue Management
export interface PricingRule {
  id: string;
  name: string;
  roomTypes: string[];
  dateRange: {
    start: string;
    end: string;
  };
  daysOfWeek: number[]; // 0-6, Sunday-Saturday
  multiplier: number; // 1.0 = base price, 1.5 = 50% increase
  fixedAmount?: number;
  conditions?: {
    occupancyThreshold?: number;
    advanceBooking?: number; // days
    minStay?: number;
    maxStay?: number;
  };
  active: boolean;
  createdAt: string;
}

// Analytics & Reporting
export interface Analytics {
  period: {
    start: string;
    end: string;
  };
  revenue: {
    total: number;
    bySource: Record<string, number>;
    byRoomType: Record<string, number>;
    byPaymentMethod: Record<string, number>;
  };
  occupancy: {
    rate: number;
    available: number;
    occupied: number;
    total: number;
  };
  guests: {
    total: number;
    new: number;
    returning: number;
    avgStayDuration: number;
    demographics: {
      nationality: Record<string, number>;
      ageGroups: Record<string, number>;
      gender: Record<string, number>;
    };
  };
  performance: {
    revpar: number; // Revenue per available room
    adr: number; // Average daily rate
    totalRevenue: number;
    cancellationRate: number;
    noShowRate: number;
  };
}

// Communication System
export interface Message {
  id: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  recipientId: string;
  recipientType: 'guest' | 'staff';
  subject?: string;
  content: string;
  template?: string;
  variables?: Record<string, any>;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  createdAt: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push';
  trigger: 'booking_confirmation' | 'check_in_reminder' | 'check_out_reminder' | 'payment_reminder' | 'welcome' | 'feedback_request';
  subject?: string;
  content: string;
  variables: string[];
  active: boolean;
  language: string;
}

// Inventory Management
export interface InventoryItem {
  id: string;
  name: string;
  category: 'linens' | 'toiletries' | 'cleaning_supplies' | 'maintenance' | 'food_beverage' | 'other';
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  cost: number;
  supplier?: string;
  location: string;
  expiryDate?: string;
  lastRestocked: string;
  notes?: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  performedBy: string;
  cost?: number;
  createdAt: string;
}

// Staff Management
export interface StaffMember extends User {
  employeeId: string;
  department: 'reception' | 'housekeeping' | 'maintenance' | 'security' | 'management';
  position: string;
  hireDate: string;
  salary?: number;
  workSchedule: WorkSchedule[];
  skills: string[];
  languages: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  documents: Document[];
}

export interface WorkSchedule {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'regular' | 'overtime' | 'holiday';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  expiryDate?: string;
  uploadedAt: string;
}

// Guest Services
export interface Service {
  id: string;
  name: string;
  category: 'laundry' | 'tours' | 'transport' | 'food' | 'other';
  description: string;
  price: number;
  duration?: number; // minutes
  availability: {
    days: number[];
    startTime: string;
    endTime: string;
  };
  maxCapacity?: number;
  active: boolean;
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  guestId: string;
  reservationId?: string;
  scheduledFor: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

// Maintenance & Issues
export interface MaintenanceIssue {
  id: string;
  roomId?: string;
  reportedBy: string;
  assignedTo?: string;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'heating' | 'cleaning' | 'furniture' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  photos: string[];
  estimatedCost?: number;
  actualCost?: number;
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
}

// Reviews & Feedback
export interface Review {
  id: string;
  guestId: string;
  reservationId: string;
  rating: number; // 1-5
  categories: {
    cleanliness: number;
    staff: number;
    location: number;
    facilities: number;
    value: number;
  };
  title?: string;
  comment?: string;
  photos?: string[];
  status: 'pending' | 'approved' | 'rejected';
  response?: string;
  responseBy?: string;
  responseAt?: string;
  createdAt: string;
}

// Channel Management
export interface ChannelConnection {
  id: string;
  platform: 'booking.com' | 'hostelworld' | 'airbnb' | 'expedia' | 'agoda';
  isActive: boolean;
  apiCredentials: {
    username?: string;
    password?: string;
    apiKey?: string;
    hotelId?: string;
  };
  lastSync: string;
  syncStatus: 'success' | 'error' | 'in_progress';
  syncErrors?: string[];
  settings: {
    autoAccept: boolean;
    markupPercentage: number;
    availabilityBuffer: number;
  };
}

// System Settings
export interface SystemSettings {
  id: string;
  category: 'general' | 'payment' | 'email' | 'sms' | 'integrations';
  key: string;
  value: any;
  description?: string;
  updatedBy: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard Widgets
export interface DashboardWidget {
  id: string;
  type: 'chart' | 'stat' | 'list' | 'calendar' | 'map';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: any;
  permissions: string[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
}