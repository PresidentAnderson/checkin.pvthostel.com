import { useState } from 'react'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getStripe, createPaymentIntent } from '@/services/stripe'
import toast from 'react-hot-toast'

interface PaymentFormProps {
  amount: number
  currency: string
  reservationId: string
  guestId: string
  onSuccess: (paymentIntent: any) => void
  onError: (error: string) => void
}

const CheckoutForm = ({ amount, currency, reservationId, guestId, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      // Create payment intent
      const paymentIntent = await createPaymentIntent({
        amount: amount * 100, // Convert to cents
        currency,
        reservationId,
        guestId,
        description: `PVT Hostel Reservation ${reservationId}`,
      })

      // Confirm payment
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        throw new Error('Card element not found')
      }

      const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      )

      if (error) {
        onError(error.message || 'Payment failed')
        toast.error(error.message || 'Payment failed')
      } else if (confirmedPaymentIntent?.status === 'succeeded') {
        onSuccess(confirmedPaymentIntent)
        toast.success('Payment successful!')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed'
      onError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
        
        <div className="mb-4 p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-xl font-semibold text-gray-900">
              {currency.toUpperCase()} {amount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            !stripe || isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isProcessing ? 'Processing...' : `Pay ${currency.toUpperCase()} ${amount.toFixed(2)}`}
        </button>
      </div>

      <div className="text-xs text-gray-500 text-center">
        <p>🔒 Your payment information is secure and encrypted</p>
        <p>Powered by Stripe</p>
      </div>
    </form>
  )
}

export default function PaymentForm(props: PaymentFormProps) {
  const stripePromise = getStripe()

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  )
}