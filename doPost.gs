// Dialogflow の Webhook は POST メソッド
function doPost(e) {
  const data = e.postData.getDataAsString();
  const req = JSON.parse(data);
  const res = route(req);
  
  return ContentService.createTextOutput(JSON.stringify(res));
}