# Telegram OCR Bot – Free via Google Apps Script

<img src="https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Apps Script"> <img src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">

**A simple, 100% free Telegram bot** that performs **OCR** (Optical Character Recognition) on images — extracts text from photos such as receipts, KTP/ID cards, menus, posters, documents, etc. and returns clean, selectable text.

No server, no VPS, no paid API needed.  
Runs entirely on **Google Apps Script** + Google Drive's free OCR engine.

## Features

- Automatic text extraction from any photo sent to the bot
- Optimized for **Indonesian printed text** (`ocrLanguage: 'id'`)
- Temporary files are deleted immediately after processing → **privacy-friendly**
- Restricts usage to private chats and **allowed groups** only (auto-leaves unauthorized groups)
- Admin-only debug info via `/start` (shows webhook status & version)
- Friendly Indonesian messages for users
- All errors are privately reported to the admin
- No database, no external dependencies, zero cost

## Demo (How it looks)

1. User sends photo  
2. Bot replies: *⏳ Tungguin la wee...*  
3. A few seconds later: extracted text inside `<pre>` block (easy to copy)  
4. If added to random group → bot replies warning & leaves automatically

## Important Limitations

| Aspect                  | Detail                                                                 |
|-------------------------|------------------------------------------------------------------------|
| OCR Engine              | Google Drive built-in OCR (free but basic accuracy)                    |
| Daily Quota             | ~1,000 OCR operations per Google account / project                     |
| Best For                | Clear printed text (receipts, posters, books, IDs)                     |
| Not Great For           | Handwriting, very blurry/low-res images, complex layouts               |
| File Size               | Reliable up to ~2–4 MB (larger files often fail)                       |
| Supported Formats       | Images only (jpg, png, etc.) — **no PDF support yet**                  |

For better accuracy (especially handwriting), consider upgrading to **Google Cloud Vision API** later (requires billing).

## Prerequisites

- Google Account (free)
- Telegram Account
- ~10–15 minutes setup time

## Quick Setup (Step-by-Step)

### 1. Create Telegram Bot & Get Token

1. Open Telegram → search **@BotFather**
2. Send command: `/newbot`
3. Choose bot name & username (must end with `bot`)
4. Copy the **BOT_TOKEN** (format: `123456:ABC-DEF...`)
5. Get your own Telegram numeric ID:
   - Talk to **@userinfobot** or **@RawDataBot** → copy the `id` value

### 2. Create Google Apps Script Project

1. Go to: https://script.google.com
2. Click **New project**
3. Delete default `Code.gs` file
4. Create **three new files**:

   - `00setup.gs`
   - `01main.gs`
   - `02func.gs`

### 3. Paste the Code & Configure

Copy the code from the files below and **replace** the placeholders:

#### `00setup.gs`
```javascript
function setWebhook() {
  const webAppUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";  // ← paste after deploy
  const response = UrlFetchApp.fetch(API_URL + "/setWebhook?url=" + webAppUrl + "&drop_pending_updates=true");
  console.log("Response Set Webhook: " + response.getContentText());
}

function getWebhookInfo() {
  const response = JSON.parse(UrlFetchApp.fetch(API_URL + "/getWebhookInfo").getContentText());
  const result = `URL: ${response.result.url || '(not set)'}
Pending: ${response.result.pending_update_count}
Max conn: ${response.result.max_connections}
IP: ${response.result.ip_address || '-'}`;
  console.log(result);
  return result;
}
