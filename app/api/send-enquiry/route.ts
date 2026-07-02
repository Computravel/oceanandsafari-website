import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, destination, message, experienceUrl } = await request.json();

    // Email to Lindsay
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

    // Confirmation email to client
    await resend.emails.send({
      from: 'Ocean & Safari <onboarding@resend.dev>',
      to: email,
      subject: `Your enquiry about ${destination} — Ocean & Safari`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">

          <div style="background: #0B1F3A; padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="font-family: Georgia, serif; font-size: 32px; color: #F7F2EA; letter-spacing: 0.1em;">
              O <span style="color: #C9A84C;">&</span> S
            </div>
            <div style="font-size: 11px; letter-spacing: 0.2em; color: rgba(247,242,234,0.5); text-transform: uppercase; margin-top: 4px;">
              Ocean & Safari · Luxury Travel
            </div>
          </div>

          <div style="background: #F7F2EA; padding: 32px; border-radius: 0 0 8px 8px;">
            <h2 style="font-family: Georgia, serif; font-size: 26px; color: #2C2420; font-weight: 400; margin-bottom: 16px;">
              Thank you, ${name}
            </h2>
            <p style="color: #6B5E50; line-height: 1.8; font-size: 15px; margin-bottom: 24px;">
              We have received your enquiry and one of our luxury travel consultants 
              will be in touch within 24 hours to begin crafting your personalised journey.
            </p>

            <div style="background: white; border-radius: 6px; padding: 20px; border: 0.5px solid #E0D8C8; margin-bottom: 24px;">
              <div style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #9C8E7A; margin-bottom: 12px;">
                Your Enquiry Summary
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9C8E7A; font-size: 14px; width: 130px;">Experience</td>
                  <td style="padding: 8px 0; font-weight: 500; color: #2C2420; font-size: 14px;">${destination}</td>
                </tr>
                ${experienceUrl ? `
                <tr style="border-top: 0.5px solid #E0D8C8;">
                  <td style="padding: 8px 0; color: #9C8E7A; font-size: 14px;">View online</td>
                  <td style="padding: 8px 0; font-size: 14px;">
                    <a href="${experienceUrl}" style="color: #1A6EA8;">${experienceUrl}</a>
                  </td>
                </tr>
                ` : ''}
                <tr style="border-top: 0.5px solid #E0D8C8;">
                  <td style="padding: 8px 0; color: #9C8E7A; font-size: 14px; vertical-align: top;">Your message</td>
                  <td style="padding: 8px 0; color: #2C2420; font-size: 14px; line-height: 1.6;">${message}</td>
                </tr>
                <tr style="border-top: 0.5px solid #E0D8C8;">
                  <td style="padding: 8px 0; color: #9C8E7A; font-size: 14px;">Date submitted</td>
                  <td style="padding: 8px 0; color: #2C2420; font-size: 14px;">
                    ${new Date().toLocaleDateString('en-ZA', { dateStyle: 'full' })}
                  </td>
                </tr>
              </table>
            </div>

            <p style="color: #9C8E7A; font-size: 13px; line-height: 1.7; margin-bottom: 24px;">
              In the meantime, if you have any questions please don&apos;t hesitate to 
              contact us directly at 
              <a href="mailto:lindsay@computravel.co.za" style="color: #1A6EA8;">lindsay@computravel.co.za</a>
            </p>

            <div style="border-top: 0.5px solid #E0D8C8; padding-top: 20px; text-align: center;">
              <p style="color: #9C8E7A; font-size: 12px; margin: 0;">
                Ocean & Safari · A Computravel Company · Luxury Travel Specialists
              </p>
              <p style="color: #C8C0B0; font-size: 11px; margin: 8px 0 0;">
                ASATA Member · IATA Accredited · 25+ Years Experience
              </p>
            </div>
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