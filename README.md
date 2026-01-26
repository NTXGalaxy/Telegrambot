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

# 🤖 Telegram OCR Bot (Google Apps Script)

A lightweight, serverless Telegram Bot that extracts text from images (OCR) using Google Apps Script and the Google Drive API. This bot is 100% free to host and easy to deploy.

## 📌 Features
- **Fast OCR:** Converts images to text in seconds using Google's OCR engine.
- **Serverless:** Hosted on Google Apps Script (no server maintenance required).
- **Group Security:** Includes a whitelist system to prevent unauthorized group usage.
- **Clean UI:** Uses HTML formatting for better readability in Telegram.
- **Auto-Cleanup:** Temporary files created during the OCR process are automatically deleted.

## 🛠️ Architecture
The bot works by receiving an image via a Webhook, downloading it to a temporary Google Doc to perform OCR, extracting the text, and sending it back to the user.



## 🚀 Setup Instructions

### 1. Create a Telegram Bot
1. Message [@BotFather](https://t.me/botfather) on Telegram.
2. Create a new bot using `/newbot` and save your **API Token**.

### 2. Google Apps Script Configuration
1. Go to [Google Apps Script](https://script.google.com/).
2. Create a **New Project**.
3. Create three files in the editor and paste the code from this repository:
   - `00setup.gs`
   - `01main.gs`
   - `02func.gs`
4. **Important:** In `01main.gs`, update the following variables:
   - `TOKEN`: Your Telegram Bot Token.
   - `ADMIN`: Your Telegram User ID (Get it from [@userinfobot](https://t.me/userinfobot)).
   - `ALLOWED_GROUPS`: Your Group IDs (if applicable).

### 3. Enable Google Drive API
1. In the Apps Script editor, click the **+** icon next to **Services** on the left sidebar.
2. Search for **Drive API** and add it. (This is required for the OCR logic to work).



### 4. Deployment
1. Click **Deploy** > **New Deployment**.
2. Select type: **Web App**.
3. Description: `Telegram OCR Bot v1`.
4. Execute as: **Me**.
5. Who has access: **Anyone** (This is crucial for Telegram to send data).
6. Click **Deploy** and copy the **Web App URL**.

### 5. Setting the Webhook
1. Open `00setup.gs`.
2. Paste your **Web App URL** into the `webAppUrl` variable inside the `setWebhook` function.
3. Run the `setWebhook` function from the top toolbar.
4. Check the execution log to ensure it says: `Response Set Webhook: {"ok":true,...}`.

## 📖 Usage
- **Private Chat:** Simply send an image to the bot, and it will reply with the extracted text.
- **Commands:** - `/start`: Check bot status and version.

## ⚠️ Limitations
- **File Size:** Limited by Google Apps Script's `UrlFetchApp` (max 50MB) and Telegram's file size limits.
- **Quotas:** Subject to Google's daily triggers and URL fetch quotas.

## 🤝 Contributing
Feel free to fork this project and submit a Pull Request if you have any improvements!

---
*Created by [Satria](https://github.com/01satria)*
