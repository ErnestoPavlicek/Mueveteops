import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_COMPANY = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const MIN_MESSAGE = 10;

const FOUNDER_INBOX = "ernst@mueveops.com";

type FieldErrors = Partial<Record<"name" | "email" | "company" | "message", string>>;

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
};

function validate(input: unknown): { data?: ContactPayload; fieldErrors?: FieldErrors } {
  if (!input || typeof input !== "object") {
    return { fieldErrors: { message: "Invalid request body." } };
  }
  const raw = input as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const company = typeof raw.company === "string" ? raw.company.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  const fieldErrors: FieldErrors = {};

  if (!name) fieldErrors.name = "Please enter your name.";
  else if (name.length > MAX_NAME) fieldErrors.name = `Keep it under ${MAX_NAME} characters.`;

  if (!email) fieldErrors.email = "Please enter your email.";
  else if (email.length > MAX_EMAIL) fieldErrors.email = "That email looks too long.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";

  if (company.length > MAX_COMPANY) fieldErrors.company = `Keep it under ${MAX_COMPANY} characters.`;

  if (!message) fieldErrors.message = "Tell us a bit about your project.";
  else if (message.length < MIN_MESSAGE)
    fieldErrors.message = "A little more detail helps — at least 10 characters.";
  else if (message.length > MAX_MESSAGE)
    fieldErrors.message = `Keep it under ${MAX_MESSAGE} characters.`;

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };
  return { data: { name, email, company, message } };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { data, fieldErrors } = validate(body);
  if (!data) {
    return Response.json(
      { error: "Validation failed.", fieldErrors },
      { status: 400 }
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) {
    console.error("[contact] GMAIL_USER or GMAIL_APP_PASSWORD is not set");
    return Response.json(
      { error: "Email service not configured." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const subjectSuffix = data.company ? ` — ${data.company}` : "";
  const notificationSubject = `New contact: ${data.name}${subjectSuffix}`;

  const notificationText = [
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Company: ${data.company || "—"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const notificationHtml = `
    <div style="font-family: -apple-system, system-ui, sans-serif; color: #0D1117; line-height: 1.5;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>
      <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
      <p style="margin: 4px 0;"><strong>Company:</strong> ${escapeHtml(data.company || "—")}</p>
      <p style="margin: 16px 0 4px;"><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit; background: #f5f5f5; padding: 12px; border-radius: 6px;">${escapeHtml(data.message)}</pre>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"MueveOps Contact" <${gmailUser}>`,
      to: FOUNDER_INBOX,
      replyTo: data.email,
      subject: notificationSubject,
      text: notificationText,
      html: notificationHtml,
    });
  } catch (err) {
    console.error("[contact] Failed to send notification email:", err);
    return Response.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }

  // Best-effort confirmation back to the submitter. Don't fail the request if this errors.
  try {
    const confirmText = [
      `Hi ${data.name},`,
      "",
      "Thanks for reaching out to MueveOps — your message landed safely and we'll be in touch within 24 hours.",
      "",
      "For your records, here's what you sent:",
      "",
      data.message,
      "",
      "— The MueveOps team",
    ].join("\n");

    const confirmHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; color: #0D1117; line-height: 1.6;">
        <p>Hi ${escapeHtml(data.name)},</p>
        <p>Thanks for reaching out to <strong>MueveOps</strong> — your message landed safely and we'll be in touch within 24 hours.</p>
        <p>For your records, here's what you sent:</p>
        <pre style="white-space: pre-wrap; font-family: inherit; background: #f5f5f5; padding: 12px; border-radius: 6px;">${escapeHtml(data.message)}</pre>
        <p>— The MueveOps team</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"MueveOps" <${gmailUser}>`,
      to: data.email,
      replyTo: FOUNDER_INBOX,
      subject: "Thanks for reaching out to MueveOps",
      text: confirmText,
      html: confirmHtml,
    });
  } catch (err) {
    console.error("[contact] Failed to send confirmation email (non-fatal):", err);
  }

  return Response.json({ ok: true }, { status: 200 });
}
