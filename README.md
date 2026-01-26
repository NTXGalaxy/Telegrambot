# 🤖 Telegram OCR Bot (Serverless) - FREE!

[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://script.google.com/)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://telegram.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A lightweight, **100% free**, easy to setup, and serverless Telegram bot that extracts text from images (OCR). It can read receipts, ID cards, documents, and posters, returning clean, selectable text directly in your chat.

**No VPS, no database, and no paid APIs required.** Built with Google Apps Script and powered by the Google Drive OCR engine.

---

## ✨ Key Features

- ⚡ **Fast Extraction:** Converts images to text in seconds.
- 🛡️ **Privacy Focused:** Temporary files are deleted immediately after processing.
- 🔒 **Security:** Built-in whitelist system to prevent unauthorized group usage.
- 🇮🇩 **Optimized:** Pre-configured for high accuracy with Indonesian and English printed text.
- 📊 **Admin Dashboard:** Monitor webhook status and bot version via `/start`.
- ☁️ **Zero Maintenance:** Hosted entirely on Google's infrastructure.

## 📸 Demo
1. **User** sends a photo.
2. **Bot** responds with: *⏳ Processing image, please wait...*
3. **Result:** Extracted text is sent in a `<pre>` block for easy one-tap copying.

---

## ⚙️ Setup Instructions

### 1. Create Your Bot
1. Chat with [@BotFather](https://t.me/botfather) on Telegram.
2. Use the `/newbot` command and save your **API Token**.

### 2. Configure Google Apps Script
1. Open [Google Apps Script](https://script.google.com/).
2. Create a **New Project**.
3. Create three files in the editor and paste the code from this repository:
   - `00setup.gs`
   - `01main.gs`
   - `02func.gs`
4. In `01main.gs`, update the following variables:
   - `TOKEN`: Your Telegram Bot Token.
   - `ADMIN`: Your Telegram User ID (Get it from [@userinfobot](https://t.me/userinfobot)).
   - `ALLOWED_GROUPS`: List of authorized Group IDs (e.g., `[-100123456]`).

### 3. Enable Services & Authorization
1. Click the **+** (Plus) icon next to **Services** on the left sidebar.
2. Find and add the **Drive API** (Select **v3**), then click **Add**.
3. **Crucial Step:** To grant the script permission to access your Drive, Open `00setup.gs`.
4. Select the `triggerDrivePermissions` function from the top toolbar in the editor and click **Run**. 
5. Follow the Google authorization prompts (Click *Advanced > Go to [Project Name] (unsafe)* if warned).

### 4. Deployment
1. Click **Deploy** > **New Deployment**.
2. Select **Web App** as the type.
3. Set **Execute as:** `Me`.
4. Set **Who has access:** `Anyone`.
5. Click **Deploy** and copy the **Web App URL**.

### 5. Activate Webhook
1. Open `00setup.gs`.
2. Paste your **Web App URL** into the `webAppUrl` variable.
3. Select the `setWebhook` function in the top toolbar and click **Run**.
4. Check the logs to ensure you see `{"ok":true}`.

---

## ⚠️ Limitations & Quotas

| Aspect | Detail |
| :--- | :--- |
| **Engine** | Google Drive Free OCR (Best for printed text) |
| **Daily Quota** | ~1,000 operations per day (Google's limit) |
| **File Size** | Optimized for images up to 4MB |
| **Weaknesses** | Cursive handwriting, extremely low-res photos |
| **Format** | Currently supports Images only (JPEG, PNG, WebP) |

> [!TIP]
> If the bot stops responding, check the **Executions** tab in Apps Script to see if there are any "Permission Denied" errors. Running `triggerDrivePermissions` again usually fixes this.

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repository, open an issue, or submit a pull request.

---
**Developed with ❤️ by [Satria](https://github.com/01satria)**
