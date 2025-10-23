import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      amount, 
      guestName, 
      guestEmail, 
      checkInDate, 
      checkOutDate, 
      roomType 
    } = req.body

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        guestName,
        guestEmail,
        checkInDate,
        checkOutDate,
        roomType
      },
      receipt_email: guestEmail,
      description: `PVT Hostel - ${roomType} (${checkInDate} to ${checkOutDate})`
    })

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('Payment error:', error)
    res.status(500).json({ error: 'Payment processing failed' })
  }
}

// Webhook to handle successful payments
export async function handlePaymentSuccess(paymentIntent) {
  // This would typically:
  // 1. Update booking status in database
  // 2. Send confirmation email
  // 3. Generate room access codes
  // 4. Notify staff
  
  console.log('Payment successful:', paymentIntent.id)
  
  // You can integrate with your existing booking system here
  // For example, call your main PVT Hostel API to create the booking
  
  return true
}