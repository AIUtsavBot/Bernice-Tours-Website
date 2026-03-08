import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate basic inputs
        const { name, email, phone, service, message } = data;
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Send to Telegram (if configured)
        const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
        const telegramChatId = process.env.TELEGRAM_CHAT_ID;

        if (telegramToken && telegramChatId) {
            const telegramMessage = `
🛎 *New Website Inquiry*
      
*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Service:* ${service}

*Message:*
${message}
      `;

            try {
                await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: telegramChatId,
                        text: telegramMessage,
                        parse_mode: 'Markdown',
                    }),
                });
            } catch (telegramError) {
                console.error('Failed to send Telegram message:', telegramError);
                // Continue even if Telegram fails, so we can try Google Sheets
            }
        } else {
            console.warn('Telegram token or chat ID not configured in environment variables.');
        }

        // 2. Send to Google Sheets via Apps Script Webhook (if configured)
        const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

        if (googleAppsScriptUrl) {
            try {
                await fetch(googleAppsScriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            } catch (sheetsError) {
                console.error('Failed to send to Google Sheets:', sheetsError);
            }
        } else {
            console.warn('Google Apps Script URL not configured in environment variables.');
        }

        // Return success to the client regardless of whether the third-party integrations succeeded
        // (In a production app, you might want to return a 500 if BOTH failed, but this prevents form freezing)
        return NextResponse.json({ success: true, message: 'Inquiry received' });

    } catch (error) {
        console.error('API Error /api/contact:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
