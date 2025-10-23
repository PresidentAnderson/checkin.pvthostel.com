import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [isFormLoaded, setIsFormLoaded] = useState(false)

  useEffect(() => {
    // Load HubSpot form script
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/embed/v2.js'
    script.async = true
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "139620674",
          formId: "Mx3g5iRVRRa5FNI4Q17g-Qq6rv3",
          target: '#hubspot-form',
          onFormSubmit: function(form) {
            // Handle form submission
            console.log('Form submitted:', form)
          },
          onFormReady: function(form) {
            setIsFormLoaded(true)
          }
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Remote Check-in - PVT Hostel</title>
        <meta name="description" content="Complete your check-in remotely and pay for your stay at PVT Hostel. Fast, secure, and convenient." />
        <meta name="keywords" content="hostel check-in, remote check-in, PVT Hostel, accommodation, booking" />
        <meta property="og:title" content="Remote Check-in - PVT Hostel" />
        <meta property="og:description" content="Complete your check-in remotely and pay for your stay at PVT Hostel" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-hostel-blue">PVT Hostel</h1>
              </div>
              <div className="text-sm text-gray-600">
                Need help? Call: +1-555-0123
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Check-in Remotely
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Skip the lines and check-in from anywhere. Complete your stay details and payment online for a seamless arrival experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-hostel-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Easy</h3>
                <p className="text-gray-600">Complete check-in in under 5 minutes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-hostel-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600">Pay safely with encrypted transactions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-hostel-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Access</h3>
                <p className="text-gray-600">Get your digital key instantly</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  What You'll Need
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-hostel-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Personal Information</h4>
                      <p className="text-gray-600">Full name, email, phone number, and date of birth</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-hostel-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">ID Document</h4>
                      <p className="text-gray-600">Passport or government-issued ID number</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-hostel-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Stay Details</h4>
                      <p className="text-gray-600">Check-in/out dates and room preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-hostel-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Payment Method</h4>
                      <p className="text-gray-600">Credit card or booking confirmation number</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="font-semibold text-green-900">Already Paid Online?</h4>
                  </div>
                  <p className="text-green-800 text-sm">
                    If you've already paid for your booking, simply enter your booking confirmation number in the form to skip payment.
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <div>
                <div className="card">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Start Your Check-in
                  </h3>
                  
                  {/* HubSpot Form Container */}
                  <div id="hubspot-form" className="min-h-[500px]">
                    {!isFormLoaded && (
                      <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hostel-blue"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Fallback Form (if HubSpot fails to load) */}
                  {!isFormLoaded && (
                    <div className="mt-8">
                      <p className="text-center text-gray-600 mb-4">
                        Having trouble loading the form?
                      </p>
                      <button 
                        onClick={() => window.location.reload()}
                        className="btn-primary w-full"
                      >
                        Reload Page
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
              After Check-in, You'll Receive:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-hostel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Confirmation Email</h4>
                  <p className="text-gray-600">Booking details, room access code, and arrival instructions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-hostel-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Digital Key</h4>
                  <p className="text-gray-600">QR code for contactless room entry via our mobile app</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-hostel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Local Guide</h4>
                  <p className="text-gray-600">Recommendations for nearby restaurants, attractions, and transport</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                  <p className="text-gray-600">Direct line to our front desk for any questions or assistance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">PVT Hostel</h3>
            <p className="text-gray-400 mb-6">
              Experience comfort, community, and convenience in the heart of the city.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-3">Contact</h4>
                <p className="text-gray-400 text-sm">
                  123 Hostel Street<br />
                  City, State 12345<br />
                  Phone: +1-555-0123<br />
                  Email: info@pvthostel.com
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Check-in Hours</h4>
                <p className="text-gray-400 text-sm">
                  Front Desk: 24/7<br />
                  Check-in: 3:00 PM<br />
                  Check-out: 11:00 AM<br />
                  Remote Check-in: Anytime
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <p className="text-gray-400 text-sm">
                  Having issues?<br />
                  Call: +1-555-0123<br />
                  Email: help@pvthostel.com<br />
                  Response: Within 1 hour
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm">
                © 2025 PVT Hostel. All rights reserved. | 
                <a href="/privacy" className="hover:text-white ml-1">Privacy Policy</a> | 
                <a href="/terms" className="hover:text-white ml-1">Terms of Service</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}