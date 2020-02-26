const fs = require('fs');
const data = require('../data.json');
const { age, strToArr, timeFormat, date } = require('../utils');


exports.index = (req, res) => {
  const filteredInstructors = data.instructors

  for (const instructor of filteredInstructors) {
      const services = instructor.services.toString().split(",")
      instructor.services = services
  }

  return res.render('instructors/index', { instructors: filteredInstructors })

}


exports.show = (req,res) => {
  const { id } = req.params;
  
  const foundInstructor = data.instructors.find(instructor => {
    return instructor.id == id;
  });
  
  if (!foundInstructor) return res.send("instructor not found!");
  
  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.toString().split(","),
    created_at: timeFormat(foundInstructor.created_at)
  }
  
  foundInstructor.gender === "M" 
  ? instructor.gender = "Masculino" : instructor.gender = "Feminino";
  
  // instructor.services = strToArr(foundInstructor.services);

  return res.render("instructors/show", { instructor });
}

exports.create = (req,res) => {
    return res.render("instructors/create")
}

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
 

exports.edit = (req,res) => {
  const { id } = req.params;
  
  const foundInstructor = data.instructors.find(instructor => {
    return instructor.id == id
  });
  
  if (!foundInstructor) return res.send("instructor not found!");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso
  }
  
  return res.render('instructors/edit', {instructor} );
}


exports.put = (req, res) => {
  const { id, birth } = req.body;
  let index = 0;
  
  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if (instructor.id == Number(id)) {
      index = foundIndex;
      return true;
    }
  });
  
  if (!foundInstructor) return res.send("instructor not found!");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(birth),
    id: Number(id)
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect(`/instructors/${id}`);
  });
}

exports.delete = (req,res) => {
  const {id} = req.body;

  const filteredInstructors = data.instructors.filter(instructor => {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;
  
  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect("/instructors");
  });
}