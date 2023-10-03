function back(req) {
  const outputs = req.queryResult.outputContexts
  const childnameFW = outputs.find(output => output.name.includes("childname-followup"))
  const parameters = (childnameFW && "parameters" in childnameFW) ? childnameFW.parameters : {}
  let action

  if ("other" in parameters && parameters["other"] != ""
    && parameters["other.original"] != "") {
    parameters["other"] = ""
    parameters["other.original"] = ""
    action = "SUBSCRIBE"
  } else if ("Reply" in parameters && parameters["Reply"] != ""
    && parameters["Reply.original"] != "") {
    parameters["Reply"] = ""
    parameters["Reply.original"] = ""
    action = "MAIL"
  } else if ("mail" in parameters && parameters["mail"] != ""
    && parameters["mail.original"] != "") {
    parameters["mail"] = ""
    parameters["mail.original"] = ""
    action = "TEL"
  } else if ("tel" in parameters && parameters["tel"] != ""
    && parameters["tel.original"] != "") {
    parameters["tel"] = ""
    parameters["tel.original"] = ""
    action = "ADDRESS"
  } else if ("address" in parameters && parameters["address"] != ""
    && parameters["address.original"] != "") {
    parameters["address"] = ""
    parameters["address.original"] = ""
    action = "PARENTFURIGANA"
  } else if ("parentfurigana" in parameters && parameters["parentfurigana"] != ""
    && parameters["parentfurigana.original"] != "") {
    parameters["parentfurigana"] = ""
    parameters["parentfurigana.original"] = ""
    action = "PARENTNAME"
  } else if ("parentname" in parameters && parameters["parentname"] != ""
    && parameters["parentname.original"] != "") {
    parameters["parentname"] = ""
    parameters["parentname.original"] = ""
    action = "AGE"
  } else if ("age" in parameters && parameters["age"] != ""
    && parameters["age.original"] != "") {
    parameters["age"] = ""
    parameters["age.original"] = ""
    action = "CHILDFURIGANA"
  } else if ("childfurigana" in parameters && parameters["childfurigana"] != ""
    && parameters["childfurigana.original"] != "") {
    parameters["childfurigana"] = ""
    parameters["childfurigana.original"] = ""
    action = "CHILDNAME"
  } else if ("childname" in parameters && parameters["childname"] != ""
    && parameters["childname.original"] != "") {
    parameters["childname"] = ""
    parameters["childname.original"] = ""
    action = "RESERVATION"
  } else {
    return {
      "followupEventInput": {
        "name": "FALLBACK",
      }
    }
  }

  return {
    "outputContexts": [
      {
        "name": req.session + "/contexts/childname-followup",
        "lifespanCount": 30,
        parameters
      }],
    "followupEventInput": {
      "name": action,
      parameters
    }
  }
}