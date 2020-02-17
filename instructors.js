const fs = require('fs');
const data = require('./data.json');
const { age, strToArr, timeFormat } = require('./utils');

//show
exports.show = (req,res) => {
  const { id } = req.params;
  
  const foundInstructor = data.instructors.find(instructor => {
    return instructor.id === Number(id)
  });
  
  if (!foundInstructor) return res.send("instructor not found!");
  
  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    created_at: timeFormat(foundInstructor.created_at)
  }
  
  foundInstructor.gender === "M" 
  ? instructor.gender = "Masculino" : instructor.gender = "Feminino";
  
  instructor.services = strToArr(foundInstructor.services);

  return res.render("instructors/show", { instructor });
}

//create 
exports.post = (req, res) => {

  const keys = Object.keys(req.body);

  keys.forEach(key => {
    if(req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  });
  
  let {avatar_url, birth, name, services, gender} = req.body
  
  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);
  

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });
  
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write file error");
    return res.redirect("/instructors");
  });
}
 
//edit
exports.edit = (req,res) => {
  const { id } = req.params;
  
  const foundInstructor = data.instructors.find(instructor => {
    return instructor.id === Number(id)
  });
  
  if (!foundInstructor) return res.send("instructor not found!");
  
  return res.render('instructors/edit', {instructor: foundInstructor});
}