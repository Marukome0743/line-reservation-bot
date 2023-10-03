function route(req) {
  let result

  switch (req.queryResult.action) {
    case "Back":
      result = back(req)
      break
    case "Complete":
      result = register(req)
      break
    default:
      result = {}
      break
  }

  return result
}