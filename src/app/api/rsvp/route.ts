import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { names, dietary } = await request.json();

    if (
      !Array.isArray(names) ||
      names.length === 0 ||
      names.some((n) => typeof n !== "string" || n.trim().length === 0)
    ) {
      return NextResponse.json(
        { error: "At least one attendee name is required" },
        { status: 400 }
      );
    }

    const cleanedNames = (names as string[]).map((n) => n.trim());
    const totalGuests = cleanedNames.length;

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            cleanedNames.join(", "),
            totalGuests,
            typeof dietary === "string" ? dietary.trim() : "",
            new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
