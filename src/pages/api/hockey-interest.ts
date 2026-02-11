import type { APIRoute } from 'astro';

/**
 * API endpoint for Hockey Interest form submissions
 *
 * To enable this endpoint:
 * 1. Uncomment the fetch call in /hockey page
 * 2. Configure your email service (Resend, SendGrid, etc.)
 * 3. Add environment variables for email credentials
 * 4. Implement the email sending logic below
 */

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, email, experience, 'age-group': ageGroup } = data;

    if (!name || !email || !experience || !ageGroup) {
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
      subject: 'New Hockey Interest Submission',
      html: `
        <h2>New Hockey Interest</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Age Group:</strong> ${ageGroup}</p>
        <p><strong>Comments:</strong> ${data.message || 'None'}</p>
      `
    });
    */

    // TODO: Store in database if needed

    return new Response(JSON.stringify({
      success: true,
      message: 'Interest submitted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Hockey interest submission error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
