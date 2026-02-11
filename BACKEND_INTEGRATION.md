# Backend Integration Guide

This document explains how to connect the Team Castlemaine website forms to a backend service.

## Current State

The website has two forms ready for backend integration:
1. **Hockey Interest Form** (`/hockey`)
2. **Contact Form** (`/contact`)

Both forms currently:
- ✅ Have full client-side validation
- ✅ Show loading states during submission
- ✅ Display success/error messages via toast notifications
- ✅ Are structured with proper data attributes
- ⏳ Simulate API calls (ready for real backend)

## Integration Options

### Option 1: Cloudflare Pages Functions (Recommended)

Perfect for your Cloudflare deployment:

1. Create a Cloudflare Worker or Pages Function
2. Update the API endpoints in `src/pages/api/`
3. Forms will automatically work with your Cloudflare deployment

### Option 2: Astro API Routes (Current Setup)

The project includes example API routes in `src/pages/api/`:
- `hockey-interest.ts` - Handles hockey registration
- `contact.ts` - Handles contact form submissions

To enable:
1. Uncomment the `fetch()` calls in the form scripts
2. Add your email service credentials to `.env`
3. Install email service package (Resend, SendGrid, etc.)

Example `.env` file:
```env
RESEND_API_KEY=your_key_here
# or
SENDGRID_API_KEY=your_key_here
```

### Option 3: Third-Party Form Services

Easy setup with no backend code:

- **FormSpree**: https://formspree.io
- **Basin**: https://usebasin.com
- **Getform**: https://getform.io

Just update the form `action` attribute to point to their endpoint.

## Email Service Setup

### Using Resend (Recommended)

```bash
npm install resend
```

Uncomment the Resend code in the API route files and add your API key.

### Using SendGrid

```bash
npm install @sendgrid/mail
```

Update the API routes with SendGrid's email sending code.

## Database Storage (Optional)

If you want to store form submissions in a database:

1. Choose a database (Cloudflare D1, Supabase, etc.)
2. Add storage logic in the API route files
3. Update environment variables

## Testing

Before deploying to production:

1. Test forms locally: `npm run dev`
2. Check browser console for any errors
3. Verify email delivery
4. Test validation (required fields, email format, etc.)
5. Test loading states and error handling

## Form Data Structure

### Hockey Interest Form
```typescript
{
  name: string;          // Required
  email: string;         // Required
  phone?: string;        // Optional
  experience: string;    // Required (beginner|rusty|regular|elite)
  "age-group": string;   // Required (junior|youth|adult)
  message?: string;      // Optional
}
```

### Contact Form
```typescript
{
  name: string;     // Required
  email: string;    // Required
  subject: string;  // Required (general|hockey|merch|sponsorship|volunteering|other)
  message: string;  // Required
}
```

## Next Steps

1. Choose an integration method above
2. Set up your email service
3. Update API endpoints or form actions
4. Test thoroughly
5. Deploy to Cloudflare Pages

## Support

For questions about integration, refer to:
- Astro API Routes: https://docs.astro.build/en/core-concepts/endpoints/
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Resend Docs: https://resend.com/docs
