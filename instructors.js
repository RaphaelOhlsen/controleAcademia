//create 
exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  keys.forEach(key => {
    if(req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  })
   
   return res.send(req.body);
 }
 