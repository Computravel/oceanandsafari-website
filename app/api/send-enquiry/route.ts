import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, destination, message, experienceUrl } = await request.json();

    await resend.emails.send({
      from: 'Ocean & Safari <onboarding@resend.dev>',
      to: 'lindsay@computravel.co.za',
      subject: `New Experience Enquiry from ${name} — ${destination}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0B1F3A; border-bottom: 2px solid #C9A84C; padding-bottom: 10px;">
            New Website Enquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #9C8E7A; width: 140px;">Name</td>
              <td style="padding: 10px 0; font-weight: 500; color: #2C2420;">${name}</td>
            </tr>
            <tr style="border-top: 0.5px solid #E0D8C8;">
              <td style="padding: 10px 0; color: #9C8E7A;">Email</td>
              <td style="padding: 10px 0; font-weight: 500; color: #2C2420;">
                <a href="mailto:${email}" style="color: #1A6EA8;">${email}</a>
              </td>
            </tr>
            <tr style="border-top: 0.5px solid #E0D8C8;">
              <td style="padding: 10px 0; color: #9C8E7A;">Phone</td>
              <td style="padding: 10px 0; font-weight: 500; color: #2C2420;">${phone}</td>
            </tr>
            <tr style="border-top: 0.5px solid #E0D8C8;">
              <td style="padding: 10px 0; color: #9C8E7A;">Experience</td>
              <td style="padding: 10px 0; font-weight: 500; color: #2C2420;">${destination}</td>
            </tr>
            ${experienceUrl ? `
            <tr style="border-top: 0.5px solid #E0D8C8;">
              <td style="padding: 10px 0; color: #9C8E7A;">Experience URL</td>
              <td style="padding: 10px 0;">
                <a href="${experienceUrl}" style="color: #1A6EA8;">${experienceUrl}</a>
              </td>
            </tr>
            ` : ''}
            <tr style="border-top: 0.5px solid #E0D8C8;">
              <td style="padding: 10px 0; color: #9C8E7A; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #2C2420; line-height: 1.6;">${message}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #F7F2EA; border-radius: 6px; border-left: 3px solid #C9A84C;">
            <p style="margin: 0; color: #9C8E7A; font-size: 12px;">
              Submitted via oceanandsafari.com · ${new Date().toLocaleDateString('en-ZA', { dateStyle: 'full' })}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}