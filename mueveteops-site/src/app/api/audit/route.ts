import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FOUNDER_INBOX = "ernst@mueveops.com";

type AuditPayload = {
  name: string;
  email: string;
  company: string;
  website: string;
  teamSize: string;
  industry: string;
  painPoint: string;
};

type FieldErrors = Partial<Record<keyof AuditPayload, string>>;

function validate(input: unknown): { data?: AuditPayload; fieldErrors?: FieldErrors } {
  if (!input || typeof input !== "object") {
    return { fieldErrors: { name: "Invalid request body." } };
  }
  const raw = input as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const company = typeof raw.company === "string" ? raw.company.trim() : "";
  const website = typeof raw.website === "string" ? raw.website.trim() : "";
  const teamSize = typeof raw.teamSize === "string" ? raw.teamSize.trim() : "";
  const industry = typeof raw.industry === "string" ? raw.industry.trim() : "";
  const painPoint = typeof raw.painPoint === "string" ? raw.painPoint.trim() : "";

  const fieldErrors: FieldErrors = {};

  if (!name) fieldErrors.name = "Name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Invalid email address.";
  if (!company) fieldErrors.company = "Company is required.";
  if (!website) fieldErrors.website = "Website is required.";
  if (!teamSize) fieldErrors.teamSize = "Team size is required.";
  if (!industry) fieldErrors.industry = "Industry is required.";

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };
  return { data: { name, email, company, website, teamSize, industry, painPoint } };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function appendToAirtable(data: AuditPayload): Promise<void> {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;

  if (!token || !baseId || !tableId) {
    console.warn("[audit] Airtable env vars not configured — skipping CRM append");
    return;
  }

  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
  const payload = {
    records: [
      {
        fields: {
          Name: data.name,
          Email: data.email,
          Company: data.company,
          Website: data.website,
          "Team Size": data.teamSize,
          Industry: data.industry,
          "Pain Point": data.painPoint || "",
        },
      },
    ],
  };

  console.log("[audit] Airtable request URL:", url);
  console.log("[audit] Airtable request body:", JSON.stringify(payload, null, 2));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  console.log("[audit] Airtable response status:", res.status);
  console.log("[audit] Airtable response body:", body);

  if (!res.ok) {
    throw new Error(`Airtable API ${res.status}: ${body}`);
  }
}

export async function GET() {
  const token = process.env.AIRTABLE_API_TOKEN ?? "";
  const baseId = process.env.AIRTABLE_BASE_ID ?? "(not set)";
  const tableId = process.env.AIRTABLE_TABLE_ID ?? "(not set)";
  const maskedToken = token.length >= 8
    ? `${token.slice(0, 4)}...${token.slice(-4)}`
    : token ? "(too short)" : "(not set)";

  return Response.json({
    airtableUrl: `https://api.airtable.com/v0/${baseId}/${tableId}`,
    tokenPreview: maskedToken,
  });
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

  // 1. Append to Airtable CRM — fatal if it fails
  try {
    await appendToAirtable(data);
  } catch (err) {
    console.error("[audit] Failed to append to Airtable:", err);
    return Response.json(
      { error: "Something went wrong saving your request. Please try again." },
      { status: 500 },
    );
  }

  // 2. Send emails (best-effort — don't break UX if these fail)
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    const firstName = escapeHtml(data.name.split(" ")[0] || data.name);
    const companyEsc = escapeHtml(data.company);
    const industryEsc = escapeHtml(data.industry);
    const websiteEsc = escapeHtml(data.website);
    const timestamp = new Date().toISOString();

    // --- Email 1: Branded confirmation to the lead ---
    const confirmHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your AI Audit is being prepared</title></head>
<body style="margin:0;padding:0;background-color:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0F;">
  <tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <!-- Top accent line -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#0BFFC2,#0BFFC2 60%,transparent);border-radius:16px 16px 0 0;font-size:0;line-height:0;">&nbsp;</td></tr>
      <!-- Main card -->
      <tr><td style="background-color:#1A1A2E;border:1px solid rgba(255,255,255,0.08);border-top:none;border-radius:0 0 16px 16px;padding:40px;">
        <!-- Logo -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding-bottom:8px;">
            <span style="font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:4px;text-transform:uppercase;">MUEVEOPS</span>
          </td></tr>
          <tr><td align="center" style="padding-bottom:32px;">
            <div style="width:40px;height:2px;background-color:#0BFFC2;margin:0 auto;"></div>
          </td></tr>
        </table>
        <!-- Greeting -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="color:#EEEEF6;font-size:20px;font-weight:600;padding-bottom:16px;">
            Hi ${firstName},
          </td></tr>
          <tr><td style="color:#A8A8C0;font-size:15px;line-height:1.7;padding-bottom:28px;">
            Thanks for requesting an AI Audit for <strong style="color:#EEEEF6;">${companyEsc}</strong>. We&#39;re analyzing your website and cross-referencing with <strong style="color:#EEEEF6;">${industryEsc}</strong> automation benchmarks.
          </td></tr>
        </table>
        <!-- What they'll receive -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#12122A;border-radius:12px;margin-bottom:28px;">
          <tr><td style="padding:24px 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="color:#0BFFC2;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding-bottom:16px;">YOUR REPORT INCLUDES</td></tr>
              <tr><td style="color:#A8A8C0;font-size:14px;line-height:2.2;">
                &#128269; Website &amp; tech stack analysis<br>
                &#9889; Top 3-5 automation opportunities for your business<br>
                &#128202; Estimated time savings per automation<br>
                &#128506;&#65039; Recommended implementation roadmap
              </td></tr>
            </table>
          </td></tr>
        </table>
        <!-- Timeline callout -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr><td style="background-color:rgba(11,255,194,0.08);border-left:3px solid #0BFFC2;border-radius:0 8px 8px 0;padding:16px 20px;">
            <span style="color:#EEEEF6;font-size:14px;font-weight:500;">Your personalized report will arrive within 24 hours.</span>
          </td></tr>
        </table>
        <!-- CTA Button (bulletproof) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
          <tr><td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" bgcolor="#0BFFC2" style="background-color:#0BFFC2;border-radius:10px;">
                  <a href="https://calendly.com/mueveops" target="_blank" style="display:block;padding:16px 24px;font-size:15px;font-weight:700;color:#0A0A0F;text-decoration:none;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Book a Strategy Call &#8594;</a>
                </td>
              </tr>
            </table>
          </td></tr>
          <tr><td align="center" style="padding-top:10px;">
            <span style="color:#7B7B99;font-size:12px;">15 minutes &middot; No commitment &middot; Walk through your findings together</span>
          </td></tr>
        </table>
        <!-- Signature -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
          <tr><td style="color:#EEEEF6;font-size:14px;font-weight:600;padding-bottom:4px;">Ernesto Pavlicek</td></tr>
          <tr><td style="color:#A8A8C0;font-size:13px;line-height:1.8;">
            MueveOps &mdash; AI Solutions Agency<br>
            <a href="mailto:ernst@mueveops.com" style="color:#0BFFC2;text-decoration:none;">ernst@mueveops.com</a> | <a href="https://mueveops.com" style="color:#0BFFC2;text-decoration:none;">mueveops.com</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
    <!-- Footer -->
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin-top:24px;">
      <tr><td align="center" style="color:#7B7B99;font-size:11px;line-height:1.5;">
        Your data is processed securely and never used for AI training.<br>&copy; 2026 MueveOps
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

    try {
      await transporter.sendMail({
        from: `"MueveOps" <${gmailUser}>`,
        to: data.email,
        replyTo: FOUNDER_INBOX,
        subject: `Your AI Audit is being prepared — ${data.company}`,
        html: confirmHtml,
      });
    } catch (err) {
      console.error("[audit] Failed to send confirmation email:", err);
    }

    // --- Email 2: Notification to founder ---
    const notificationHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9f9f9;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;border:1px solid #e5e5e5;">
      <tr><td style="padding:32px;">
        <h2 style="margin:0 0 24px;font-size:18px;color:#0D1117;">&#x1F7E2; New AI Audit Lead</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#333;">
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:600;width:120px;color:#666;">Name</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#666;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#0066cc;">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#666;">Company</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${companyEsc}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#666;">Website</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><a href="${websiteEsc}" style="color:#0066cc;">${websiteEsc}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#666;">Industry</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${industryEsc}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#666;">Team Size</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(data.teamSize)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#666;">Pain Point</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${escapeHtml(data.painPoint || "\u2014")}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#666;">Submitted</td><td style="padding:8px 0;">${timestamp}</td></tr>
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr><td align="center">
            <a href="https://airtable.com/appvO7XwGOwrdoYZR" target="_blank" style="display:inline-block;padding:10px 24px;background:#0066cc;color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">Open in Airtable &rarr;</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

    try {
      await transporter.sendMail({
        from: `"MueveOps Leads" <${gmailUser}>`,
        to: FOUNDER_INBOX,
        replyTo: data.email,
        subject: `\u{1F7E2} New AI Audit Lead: ${data.company}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company}`,
          `Website: ${data.website}`,
          `Industry: ${data.industry}`,
          `Team Size: ${data.teamSize}`,
          `Pain Point: ${data.painPoint || "\u2014"}`,
          `Submitted: ${timestamp}`,
          ``,
          `Airtable: https://airtable.com/appvO7XwGOwrdoYZR`,
        ].join("\n"),
        html: notificationHtml,
      });
    } catch (err) {
      console.error("[audit] Failed to send notification email:", err);
    }
  } else {
    console.warn("[audit] GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping emails");
  }

  return Response.json({ ok: true }, { status: 200 });
}
