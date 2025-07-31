import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { CheckInFormData } from '@/types'
import { format } from 'date-fns'

const checkInSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  idNumber: z.string().min(1, 'ID/Passport number is required'),
  roomNumber: z.string().min(1, 'Room number is required'),
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().min(1, 'Check-out date is required'),
  nights: z.number().min(1, 'Number of nights must be at least 1'),
  totalAmount: z.number().min(0, 'Total amount must be positive'),
  paidAmount: z.number().min(0, 'Paid amount must be positive'),
  notes: z.string().optional(),
})

export default function CheckIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      checkInDate: format(new Date(), 'yyyy-MM-dd'),
      checkOutDate: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
      nights: 1,
      totalAmount: 0,
      paidAmount: 0,
    },
  })

  const onSubmit = async (data: CheckInFormData) => {
    try {
      // TODO: Implement API call to save guest data
      console.log('Check-in data:', data)
      toast.success(`Guest ${data.firstName} ${data.lastName} checked in successfully!`)
      reset()
    } catch (error) {
      toast.error('Failed to check in guest. Please try again.')
    }
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Guest Check-In</h1>
          <p className="mt-2 text-sm text-gray-700">
            Register new guests and assign rooms
          </p>
        </div>
      </div>

      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                {...register('firstName')}
                className="input-field mt-1"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                {...register('lastName')}
                className="input-field mt-1"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="input-field mt-1"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="input-field mt-1"
              />
            </div>

            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                ID/Passport Number *
              </label>
              <input
                type="text"
                {...register('idNumber')}
                className="input-field mt-1"
              />
              {errors.idNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.idNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">
                Room Number *
              </label>
              <input
                type="text"
                {...register('roomNumber')}
                className="input-field mt-1"
              />
              {errors.roomNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.roomNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">
                Check-in Date *
              </label>
              <input
                type="date"
                {...register('checkInDate')}
                className="input-field mt-1"
              />
              {errors.checkInDate && (
                <p className="mt-1 text-sm text-red-600">{errors.checkInDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">
                Check-out Date *
              </label>
              <input
                type="date"
                {...register('checkOutDate')}
                className="input-field mt-1"
              />
              {errors.checkOutDate && (
                <p className="mt-1 text-sm text-red-600">{errors.checkOutDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nights" className="block text-sm font-medium text-gray-700">
                Number of Nights *
              </label>
              <input
                type="number"
                {...register('nights', { valueAsNumber: true })}
                className="input-field mt-1"
              />
              {errors.nights && (
                <p className="mt-1 text-sm text-red-600">{errors.nights.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                Total Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('totalAmount', { valueAsNumber: true })}
                className="input-field mt-1"
              />
              {errors.totalAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.totalAmount.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-700">
                Paid Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('paidAmount', { valueAsNumber: true })}
                className="input-field mt-1"
              />
              {errors.paidAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.paidAmount.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="input-field mt-1"
              placeholder="Any special requests or notes..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Check In Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}