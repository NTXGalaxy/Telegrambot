function leaveChat(chatId) {
  return UrlFetchApp.fetch(API_URL + "/leaveChat", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ chat_id: String(chatId) }),
    muteHttpExceptions: true
  });
}

function deleteMessage(chatId, messageId) {
  var payload = {
    method: "deleteMessage",
    chat_id: String(chatId),
    message_id: messageId
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  return UrlFetchApp.fetch(API_URL + "/", options);
}

function processOCR(fileId) {
  let tempId = null;
  try {
    const fileUrl = getTelegramFileUrl(fileId);
    const blob = UrlFetchApp.fetch(fileUrl).getBlob();

    const fileMetadata = {
      name: "OCR_Temp_File_" + new Date().getTime(),
      mimeType: "application/vnd.google-apps.document"
    };

    const doc = Drive.Files.create(fileMetadata, blob, {
      ocr: true,
      ocrLanguage: 'id'
    });

    tempId = doc.id;

    const docFile = DocumentApp.openById(tempId);
    const text = docFile.getBody().getText().trim();

    return text || "Gaada teksnya kocak.";
  } catch (e) {
    return "❌ Yah gagal: " + e.message;
  } finally {
    if (tempId) {
      try {
        Drive.Files.remove(tempId);
      } catch (f) {
        try { Drive.Files.del(tempId); } catch (g) { }
      }
    }
  }
}

function getTelegramFileUrl(fileId) {
  var res = UrlFetchApp.fetch(API_URL + "/getFile?file_id=" + fileId);
  var path = JSON.parse(res.getContentText()).result.file_path;
  return "https://api.telegram.org/file/bot" + TOKEN + "/" + path;
}

function sendText(chatId, text, replyToId) {
  const payload = {
    chat_id: String(chatId),
    text: text,
    parse_mode: "HTML",
    reply_to_message_id: replyToId
  };

  return UrlFetchApp.fetch(API_URL + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}
