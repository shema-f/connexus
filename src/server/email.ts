/**
 * Transactional email service.
 * When EMAIL_API_KEY is configured, wire your provider here (Resend, SES, Postmark…).
 * Without credentials, emails are logged to the server console — nothing breaks in dev.
 */

type Mail = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: Mail): Promise<boolean> {
  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey) {
    console.info(`[email:dev] to=${to} subject="${subject}"`);
    return false;
  }

  // Example provider integration point (Resend):
  // const res = await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  //   body: JSON.stringify({ from: process.env.EMAIL_FROM, to, subject, text }),
  // });
  // return res.ok;

  console.warn("[email] EMAIL_API_KEY set but no provider implemented in src/server/email.ts");
  return false;
}

export const adminNotifyEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@ferrivox.com";
