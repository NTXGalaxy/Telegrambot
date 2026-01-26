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
    const userId = message.from.id;
    const chatType = message.chat.type;

    if (chatType == "group" || chatType == "supergroup") {
      if (!ALLOWED_GROUPS.includes(chatId)) {
        sendText(chatId, `⚠️ Lu siapa.. ko nambahin gw tanpa ijin\n\n<pre>${chatId}</pre>`);
        leaveChat(chatId);
        return;
      }
    }

    if (message.photo) {
      const fileId = message.photo[message.photo.length - 1].file_id;
      const tempMsg = sendText(chatId, "<i>⏳ Tungguin la wee...</i>", message.message_id);
      const tempMsgId = JSON.parse(tempMsg.getContentText()).result.message_id;
      const result = processOCR(fileId);

      sendText(chatId, "<b>Nih ya (Ketuk aja utk salin):</b>\n\n<pre>" + result + "</pre>", message.message_id);

      deleteMessage(chatId, tempMsgId);
    } else if (message.text) {
      const textInput = message.text.toLowerCase().trim();

      if (textInput == "/start" && chatId == ADMIN || userId == ADMIN) {
        sendText(chatId, `HAI TUAN PEMBASMI TIKUS!\n\n${getWebhookInfo()}\n<pre>${VER}</pre>`);

      } else if (textInput == "/start") {
        sendText(chatId, "Hai WNI! \nIni bot OCR gambar, gambarnya ga disimpen jadi aman.\nPake aja gratis. tapi jangan masukin ke grub ya!!");
      }
    }

  } catch (err) {
    sendText(ADMIN, `Ada Error, <b>${err.message}</b>\n\n${err.stack}`);
  }
  return
}

