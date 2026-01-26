function setWebhook() {
  const webAppUrl = "YOUR_WEB_APP_DEPLOYMENT";
  const response = UrlFetchApp.fetch(API_URL + "/setWebhook?url=" + webAppUrl + "&drop_pending_updates=true");
  console.log("Response Set Webhook: " + response.getContentText());
}

function getWebhookInfo() {
  const response = (JSON.parse(UrlFetchApp.fetch(API_URL + "/getWebhookInfo").getContentText()));
  const result = JSON.stringify(`URL: ${response.result.url}\nPending Update: ${response.result.pending_update_count}\nMax Connections: ${response.result.max_connections}\nIp: ${response.result.ip_address}`);
  return JSON.parse(result);
}
