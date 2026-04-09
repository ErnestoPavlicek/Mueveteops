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

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable API ${res.status}: ${body}`);
  }
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

  // 1. Append to Airtable CRM
  try {
    await appendToAirtable(data);
  } catch (err) {
    console.error("[audit] Failed to append to Airtable:", err);
    // Non-fatal — continue with email notification
  }

  // 2. Send notification email to founder
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    const subject = `New AI Audit request: ${data.company} — ${data.name}`;

    const notificationText = [
      `Name:      ${data.name}`,
      `Email:     ${data.email}`,
      `Company:   ${data.company}`,
      `Website:   ${data.website}`,
      `Team Size: ${data.teamSize}`,
      `Industry:  ${data.industry}`,
      `Pain Point: ${data.painPoint || "—"}`,
    ].join("\n");

    const notificationHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; color: #0D1117; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New AI Audit Request</h2>
        <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
        <p style="margin: 4px 0;"><strong>Company:</strong> ${escapeHtml(data.company)}</p>
        <p style="margin: 4px 0;"><strong>Website:</strong> <a href="${escapeHtml(data.website)}">${escapeHtml(data.website)}</a></p>
        <p style="margin: 4px 0;"><strong>Team Size:</strong> ${escapeHtml(data.teamSize)}</p>
        <p style="margin: 4px 0;"><strong>Industry:</strong> ${escapeHtml(data.industry)}</p>
        ${data.painPoint ? `<p style="margin: 16px 0 4px;"><strong>Pain Point:</strong></p><pre style="white-space: pre-wrap; font-family: inherit; background: #f5f5f5; padding: 12px; border-radius: 6px;">${escapeHtml(data.painPoint)}</pre>` : ""}
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"MueveOps AI Audit" <${gmailUser}>`,
        to: FOUNDER_INBOX,
        replyTo: data.email,
        subject,
        text: notificationText,
        html: notificationHtml,
      });
    } catch (err) {
      console.error("[audit] Failed to send notification email:", err);
    }

    // 3. Best-effort confirmation to the submitter
    try {
      const confirmHtml = `
        <div style="font-family: -apple-system, system-ui, sans-serif; color: #0D1117; line-height: 1.6;">
          <p>Hi ${escapeHtml(data.name.split(" ")[0] || data.name)},</p>
          <p>Thanks for requesting an AI Audit from <strong>MueveOps</strong>.</p>
          <p>We're analyzing <strong>${escapeHtml(data.website)}</strong> and cross-referencing with ${escapeHtml(data.industry)} automation benchmarks to build your personalized report.</p>
          <p>Your audit will be delivered to this email within a few hours. It will include:</p>
          <ul>
            <li>Website & tech stack analysis</li>
            <li>Top 3-5 automation opportunities specific to your business</li>
            <li>Estimated time savings per automation</li>
            <li>Recommended implementation roadmap</li>
          </ul>
          <p>In the meantime, feel free to <a href="https://calendly.com">book a call</a> to walk through the findings together.</p>
          <p>— The MueveOps team</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"MueveOps" <${gmailUser}>`,
        to: data.email,
        replyTo: FOUNDER_INBOX,
        subject: "Your AI Audit is being prepared — MueveOps",
        html: confirmHtml,
      });
    } catch (err) {
      console.error("[audit] Failed to send confirmation email (non-fatal):", err);
    }
  } else {
    console.warn("[audit] GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping emails");
  }

  return Response.json({ ok: true }, { status: 200 });
}
