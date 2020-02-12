const fs = require('fs');

//create 
exports.post = (req, res) => {

  const keys = Object.keys(req.body);

  keys.forEach(key => {
    if(req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  })
   
  fs.writeFile("data.json", JSON.stringify(req.body), function(err) {
    if(err) return res.send("Write file error");
    return res.redirect("/instructors")
  });
 }
 