export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message, honeypot } = req.body;

    // 1. Honeypot check for spam bots
    if (honeypot && honeypot.trim() !== '') {
      // Silently return success to fool spam bots without sending emails
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    // 2. Server-side validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: 'Message cannot exceed 500 characters.' });
    }

    // 3. Resend API config check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is not defined.');
      return res.status(500).json({ error: 'Mail service configuration error.' });
    }

    // 4. Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'yashwanthst2006@gmail.com',
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #FF8C00; border-bottom: 2px solid #FF8C00; padding-bottom: 8px; margin-top: 0;">New Portfolio Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 6px; border-left: 4px solid #ccc;">
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      let errorDetail = 'Failed to send mail notification.';
      const errorText = await response.text();
      console.error('Resend API call failed with status:', response.status, 'Response:', errorText);
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorDetail = `Mail service error: ${errorJson.message}`;
        }
      } catch (e) {
        if (errorText) {
          errorDetail = `Mail service error: ${errorText}`;
        }
      }
      return res.status(response.status || 500).json({ error: errorDetail });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Server error handling contact message:', error);
    if (error && typeof error === 'object') {
      console.error('Error Details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        ...error
      });
    }
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error?.message || String(error)
    });
  }
}
