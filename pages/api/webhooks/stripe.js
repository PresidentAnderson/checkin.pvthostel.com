import Stripe from 'stripe'
import { buffer } from 'micro'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.log('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('Payment succeeded:', paymentIntent.id)
      
      // Process the successful payment
      await processSuccessfulPayment(paymentIntent)
      break
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object
      console.log('Payment failed:', failedPayment.id)
      
      // Handle failed payment
      await processFailedPayment(failedPayment)
      break
      
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.status(200).json({ received: true })
}

async function processSuccessfulPayment(paymentIntent) {
  try {
    const { 
      guestName, 
      guestEmail, 
      checkInDate, 
      checkOutDate, 
      roomType 
    } = paymentIntent.metadata

    // Here you would typically:
    // 1. Create booking record in your database
    // 2. Send confirmation email with room access details
    // 3. Generate QR code for room access
    // 4. Notify hotel staff
    
    console.log('Processing successful payment for:', {
      guestName,
      guestEmail,
      checkInDate,
      checkOutDate,
      roomType,
      amount: paymentIntent.amount / 100
    })

    // Example: Send confirmation email
    await sendConfirmationEmail({
      email: guestEmail,
      name: guestName,
      checkInDate,
      checkOutDate,
      roomType,
      amount: paymentIntent.amount / 100,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('Error processing successful payment:', error)
  }
}

async function processFailedPayment(paymentIntent) {
  try {
    const { guestEmail } = paymentIntent.metadata

    // Send payment failure notification
    console.log('Payment failed for:', guestEmail)
    
    // You could send an email to the guest about the failed payment
    // and provide alternative payment options
    
  } catch (error) {
    console.error('Error processing failed payment:', error)
  }
}

async function sendConfirmationEmail({ email, name, checkInDate, checkOutDate, roomType, amount, paymentIntentId }) {
  // This would integrate with your email service
  // For now, just log the details
  console.log('Sending confirmation email to:', email)
  console.log('Booking details:', {
    name,
    checkInDate,
    checkOutDate,
    roomType,
    amount,
    paymentIntentId
  })
  
  // In production, you'd use a service like SendGrid, Mailgun, or similar
  // to send a beautifully formatted confirmation email
}