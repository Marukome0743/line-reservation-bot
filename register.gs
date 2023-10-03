function register(req) {
  const SS_ID = "SS_ID";
  const SS = SpreadsheetApp.openById(SS_ID);
  const sheet = SS.getSheetByName("SHEET_NAME");
  const lastRaw = sheet.getLastRow()
  const outputs = req.queryResult.outputContexts
  const params = outputs.find(output => output.name.includes("childname-followup")).parameters

  sheet.appendRow([
    "",
    String(params["childname.original"]).replace(/,/g, ""),
    String(params["childfurigana.original"]).replace(/,/g, ""),
    params.age,
    String(params["parentname.original"]).replace(/,/g, ""),
    String(params["parentfurigana.original"]).replace(/,/g, ""),
    params["address.original"],
    "'" + params.tel,
    params.mail,
    params.Reply,
    params.other
  ])

  const text = sheet.getLastRow() === lastRaw ?
    "登録時にエラーが発声しました😖\nご不便をお掛けして、大変申し訳ございません🙇\nエラー改善次第、再度連絡致します"
    : "申し込みが完了しました👍\nご入力、ありがとうございました😌"

  return {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            text
          ]
        },
        "platform": "LINE"
      },
    ]
  }
}