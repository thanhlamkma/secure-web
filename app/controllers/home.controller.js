exports.home = (req, res) => {
  res.sendFile(__dirname.replace("app\\controllers", "") + "/index.html");
}

exports.about = (req, res) => {
  res.send("demo controller about");
}