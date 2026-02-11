import type { APIRoute } from 'astro';

/**
 * API endpoint for Contact form submissions
 *
 * To enable this endpoint:
 * 1. Uncomment the fetch call in /contact page
 * 2. Configure your email service (Resend, SendGrid, etc.)
 * 3. Add environment variables for email credentials
 * 4. Implement the email sending logic below
 */

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // TODO: Send email using your preferred service
    // Example with Resend:
    /*
    import { Resend } from 'resend';
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Team Castlemaine <onboarding@resend.dev>',
      to: 'info@teamc.com.au',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });
    */

    // TODO: Store in database if needed

    return new Response(JSON.stringify({
      success: true,
      message: 'Message sent successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
