import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.warn("Brevo API Key or List ID is not set. Simulating a successful sign-up in dev mode.");
      return NextResponse.json({ success: true, simulated: true });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(BREVO_LIST_ID, 10)],
        updateEnabled: true, // Updates the contact if they are already on another list instead of throwing an error
      }),
    });

    if (response.ok || response.status === 201 || response.status === 204) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
      throw new Error("Failed to submit to Brevo API");
    }
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

