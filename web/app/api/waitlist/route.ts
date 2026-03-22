import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Grab URL from env variables
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL is not set. Simulating a successful sign-up in dev mode.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // Submit the email variable formatting it exactly how Apps Script expects it
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ email }).toString(),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error("Failed to submit to Google Sheets API");
    }
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
