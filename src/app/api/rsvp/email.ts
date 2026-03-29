import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SHEET_URL = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`;

function buildEmailHtml(names: string[], isAttending: boolean) {
	const attendingColor = isAttending ? '#16a34a' : '#dc2626';
	const attendingText = isAttending ? 'Yes, attending' : 'Not attending';
	const nameList = names
		.map(
			(n) => `<li style="padding:4px 0;border-bottom:1px solid #f0f0f0;color:#374151;">${n}</li>`,
		)
		.join('');

	return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2d5a8e 100%);padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#93c5fd;letter-spacing:2px;text-transform:uppercase;">Bernard 50th Anniversary</p>
            <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#ffffff;">New RSVP Received</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <!-- Status badge -->
              <tr>
                <td style="padding-bottom:28px;text-align:center;">
                  <span style="display:inline-block;padding:8px 20px;border-radius:999px;background:${attendingColor};color:#fff;font-size:14px;font-weight:600;letter-spacing:0.5px;">
                    ${attendingText}
                  </span>
                </td>
              </tr>
              <!-- Guest count -->
              <tr>
                <td style="padding-bottom:20px;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Guest${names.length !== 1 ? 's' : ''} (${names.length})</p>
                  <ul style="margin:0;padding:0 0 0 0;list-style:none;">
                    ${nameList}
                  </ul>
                </td>
              </tr>
              <!-- Divider -->
              <tr><td style="padding:8px 0 24px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"></td></tr>
              <!-- CTA -->
              <tr>
                <td style="text-align:center;">
                  <a href="${SHEET_URL}" style="display:inline-block;padding:12px 28px;background:#1e3a5f;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
                    View Full Spreadsheet →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f3f4f6;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">This is an automated notification from your RSVP form.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export const sendEmail = async (names: string[], isAttending: boolean) => {
	const attendingLabel = isAttending ? 'Yes, attending' : 'Not attending';

	const result = await resend.emails.send({
		from: 'RSVP Notifications <noreply@bernard50th.com>',
		to: ['jon@jonbernard.net', 'jenniecstoddart@gmail.com', 'davebernard@gmail.com'],
		subject: `New RSVP: ${names.join(', ')} — ${attendingLabel}`,
		html: buildEmailHtml(names, isAttending),
	});

	if (result.error) {
		console.error(result.error);
	}

	return result;
};
