import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    // Check if API key is loaded
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Initialize Resend with API key inside the function
    const resend = new Resend(process.env.RESEND_API_KEY)
    const RESEND_EMAIL_TO = process.env.RESEND_EMAIL_TO || 'nathan.emanuel007@gmail.com'
    const RESEND_EMAIL_FROM = process.env.RESEND_EMAIL_FROM || 'onboarding@resend.dev'
    
    const { name, email, subject, message } = await request.json()
    
    // Debug: Log the received data
    console.log('Received form data:', { name, email, subject, message })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${RESEND_EMAIL_FROM}>`,
      to: [RESEND_EMAIL_TO],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #334155; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
