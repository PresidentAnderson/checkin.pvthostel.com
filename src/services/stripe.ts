import { loadStripe, Stripe } from '@stripe/stripe-js'

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_...' // You'll need to set this in environment variables

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
  client_secret: string
}

export interface CreatePaymentIntentRequest {
  amount: number
  currency: string
  reservationId: string
  guestId: string
  description?: string
}

export const createPaymentIntent = async (data: CreatePaymentIntentRequest): Promise<PaymentIntent> => {
  const response = await fetch('/api/payments/create-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create payment intent')
  }

  return response.json()
}

export const confirmPayment = async (paymentIntentId: string) => {
  const response = await fetch('/api/payments/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIntentId }),
  })

  if (!response.ok) {
    throw new Error('Failed to confirm payment')
  }

  return response.json()
}

export const refundPayment = async (paymentIntentId: string, amount?: number) => {
  const response = await fetch('/api/payments/refund', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIntentId, amount }),
  })

  if (!response.ok) {
    throw new Error('Failed to refund payment')
  }

  return response.json()
}