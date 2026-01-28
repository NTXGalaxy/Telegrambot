const TOKEN = "YOUR_BOT_TOKEN";
const API_URL = "https://api.telegram.org/bot" + TOKEN;
const VER = "YOUR_VERSION_UPDATE" //UPDATE THIS AFTER DEPLOY ON GOOGLE APP SCRIPT
const ADMIN = "YOUR_TELEGRAM_ID"
const ALLOWED_GROUPS = [YOUR_MAIN_GROUP_ID, YOUR_MAINTENANCE_GROUP_ID];

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    const message = contents.message || contents.edited_message;
    if (!message) return;

    const chatId = message.chat.id;
    const firstName = message.from.first_name || "";
    const userId = message.from.id;
    const chatType = message.chat.type;

    if (chatType == "group" || chatType == "supergroup") {
      if (!ALLOWED_GROUPS.includes(chatId)) {
        sendText(chatId, `⚠️ Sorry, I haven't been authorized to join this group. Leaving now...\n\nYour Group ID: <pre>${chatId}</pre>`);
        leaveChat(chatId);
        return;
      }
    }

    if (message.photo) {
      const fileId = message.photo[message.photo.length - 1].file_id;
      const tempMsg = sendText(chatId, "<i>⏳ Please wait a moment... Processing your image</i>", message.message_id);
      const tempMsgId = JSON.parse(tempMsg.getContentText()).result.message_id;
      const result = processOCR(fileId);

      sendText(chatId, "<b>Here is the result (Tap to copy):</b>\n\n<pre>" + result + "</pre>", message.message_id);

      deleteMessage(chatId, tempMsgId);
    } else if (message.text) {
      const textInput = message.text.toLowerCase().trim();

      if (textInput == "/start" && chatId == ADMIN || textInput == "/start" && userId == ADMIN) {
        sendText(chatId, `Hi Admin!\n\n${getWebhookInfo()}\n<pre>${VER}</pre>`);

      } else if (textInput == "/start") {
        sendText(chatId, `Hi ${firstName}!\nI'm an OCR Bot. I will extract text from your images.\nYour privacy is safe as no images are stored on our servers.\nFeel free to use it for free, but please note: this bot is for private use only and cannot be added to groups.`);
      }
    }

  } catch (err) {
    sendText(ADMIN, `System Alert, <b>${err.message}</b>\n\n${err.stack}`);
  }
  return
}

