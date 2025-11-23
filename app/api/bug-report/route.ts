import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function getIP(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp;

  return "unknown";
}

const categories = [
  "UI/UX Issue",
  "Performance Issue",
  "Security Vulnerability",
  "Functionality Bug",
  "Data Loss",
  "Integration Problem",
  "Other",
];

const severityLevels = new Set(["Low", "Medium", "High", "Critical"]);

const MAX_ATTACHMENTS = 3;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const email = String(formData.get("email") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const steps = String(formData.get("steps") || "").trim();
    const severity = String(formData.get("severity") || "").trim();
    const screenRecordingRaw = String(
      formData.get("screenRecording") || ""
    ).trim();
    const canContact =
      String(formData.get("canContact") || "").toLowerCase() === "true";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!category || !categories.includes(category)) {
      return NextResponse.json(
        { success: false, error: "Please choose a valid category." },
        { status: 400 }
      );
    }

    if (!steps) {
      return NextResponse.json(
        { success: false, error: "Steps to reproduce are required." },
        { status: 400 }
      );
    }

    if (severity && !severityLevels.has(severity)) {
      return NextResponse.json(
        { success: false, error: "Please choose a valid severity level." },
        { status: 400 }
      );
    }

    const attachmentsEntries = formData.getAll("attachments");
    const files = attachmentsEntries.filter(
      (item): item is File => item instanceof File && item.size > 0
    );

    if (files.length > MAX_ATTACHMENTS) {
      return NextResponse.json(
        {
          success: false,
          error: `You can upload up to ${MAX_ATTACHMENTS} attachments.`,
        },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: "Each attachment must be 10 MB or smaller.",
          },
          { status: 400 }
        );
      }
    }

    let recordingUrl: URL | null = null;
    if (screenRecordingRaw) {
      try {
        recordingUrl = new URL(screenRecordingRaw);
        if (!/(https?:)/i.test(recordingUrl.protocol)) {
          return NextResponse.json(
            {
              success: false,
              error: "Screen recording link must use http or https.",
            },
            { status: 400 }
          );
        }
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            error: "Please provide a valid screen recording link.",
          },
          { status: 400 }
        );
      }
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;

    if (!resendApiKey || !emailTo) {
      console.error(
        "Bug report configuration missing: RESEND_API_KEY or EMAIL_TO not set."
      );
      return NextResponse.json(
        { success: false, error: "Bug report service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Generate bug report ID
    const bugId = `BUG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const ip = getIP(req);
    const reportedAt = new Date();
    const screenRecording = recordingUrl?.toString();
    const screenRecordingSafe = screenRecording
      ? escapeHtml(screenRecording)
      : null;

    // Convert attachments into buffers for Resend
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || "application/octet-stream",
      }))
    );

    const { error } = await resend.emails.send({
      from: "OWASP VIT Bhopal Bug Report <onboarding@resend.dev>",
      to: [emailTo],
      subject: `Bug Report [${bugId}] - ${category}`,
      attachments,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #fff; padding: 2rem; color: #111;">
          <div style="max-width: 640px; margin: auto; background: #fff; border-radius: 16px; border: 2px solid #111; box-shadow: 0 2px 12px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="background: #111; padding: 1.5rem 2rem;">
              <h2 style="color: #fff; margin: 0;">🐛 Bug Report - OWASP VIT Bhopal</h2>
              <div style="font-size: 1.1rem; color: #fff; margin-top: 4px;">Bug ID: ${bugId}</div>
            </div>
            <div style="padding: 2rem;">
              <table cellpadding="8" cellspacing="0" border="0" style="width:100%; background:#fafafa; border-radius:10px;">
                <tr>
                  <td style="font-weight:600; color:#111; width:160px;">Reporter Email:</td>
                  <td style="color:#111;">${escapeHtml(email)}</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color:#111;">Category:</td>
                  <td style="color:#111;">${escapeHtml(category)}</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color:#111;">Severity:</td>
                  <td style="color:#111;">${escapeHtml(severity || "Not provided")}</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color:#111;">Contact Permission:</td>
                  <td style="color:#111;">${canContact ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color:#111;">Steps:</td>
                  <td style="white-space:pre-line; color:#111;">${escapeHtml(steps)}</td>
                </tr>
                ${
                  screenRecordingSafe
                    ? `
                <tr>
                  <td style="font-weight:600; color:#111;">Screen Recording:</td>
                  <td style="color:#111;"><a href="${screenRecordingSafe}" style="color:#0066cc;">${screenRecordingSafe}</a></td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="font-weight:600; color:#111;">Attachments:</td>
                  <td style="color:#111;">${files.length ? `${files.length} file(s) attached` : "No attachments"}</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color:#111;">Reported At:</td>
                  <td style="color:#111;">${reportedAt.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color:#111;">Reporter IP:</td>
                  <td style="color:#111;">${ip}</td>
                </tr>
              </table>
              <div style="margin-top: 2rem; color:#111; font-size: 0.95rem; background: #fff; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid #111;">
                This bug report was submitted via the <b>OWASP VIT Bhopal Student Chapter Official Website</b>.
              </div>
            </div>
          </div>
          <div style="text-align:center; font-size:0.85rem; color:#111; margin-top:2rem;">
            &copy; ${new Date().getFullYear()} OWASP VIT Bhopal Student Chapter
          </div>
        </div>
      `,
      text: `
Bug Report - OWASP VIT Bhopal Student Chapter
Bug ID: ${bugId}

Reporter Email: ${email}
Category: ${category}
Severity: ${severity || "Not provided"}
Contact Permission: ${canContact ? "Yes" : "No"}
Steps:\n${steps}
${screenRecording ? `Screen Recording: ${screenRecording}\n` : ""}
Attachments: ${files.length ? `${files.length} file(s) attached` : "No attachments"}
Reported At: ${reportedAt.toLocaleString()}
Reporter IP: ${ip}

This bug report was submitted via the OWASP VIT Bhopal Student Chapter Official Website.
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send bug report" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: { bugId, message: "Bug report submitted successfully" },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Bug report submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit bug report" },
      { status: 500 }
    );
  }
}
