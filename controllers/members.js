const fs = require('fs');
const data = require('../data.json');
const { date, bloodType } = require('../utils');


exports.index = (req, res) => {
  const filteredMembers = data.members

  for (const member of filteredMembers) {
      const services = member.services.toString().split(",")
      member.services = services
  }

  return res.render('members/index', { members: filteredMembers })

}


exports.show = (req,res) => {
  const { id } = req.params;
  
  const foundMember = data.members.find(member => {
    return member.id == id;
  });
  
  if (!foundMember) return res.send("member not found!");
  
  const member = {
    ...foundMember,
    birth: date(foundMember.birth).birthDay,
    blood: bloodType(foundMember.blood)
  }
  
  // console.log(bloodType(foundMember.blood))

  foundMember.gender === "M" 
  ? member.gender = "Masculino" : member.gender = "Feminino";
  
  // member.services = strToArr(foundMember.services);

  return res.render("members/show", { member });
}

exports.create = (req, res) => {
  return res.render('members/create');
}


exports.post = (req, res) => {

  const keys = Object.keys(req.body);

  keys.forEach(key => {
    if(req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  });
  
  let {
    avatar_url, 
    name, 
    email, 
    birth, 
    gender, 
    blood, 
    weight, 
    height
  } = req.body
  
  birth = Date.parse(birth);
  const created_at = Date.now();

  let id = 1;
  const lastMember = data.members[data.members.length - 1];
  if(lastMember) {
    id = lastMember.id + 1;
  }

  data.members.push({
    id,
    avatar_url,
    name,
    email,
    birth,
    gender,
    blood,
    weight,
    height,
    created_at
  });
  
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write file error");
    return res.redirect("/members");
  });
}
 

exports.edit = (req,res) => {
  const { id } = req.params;
  
  const foundMember = data.members.find(member => {
    return member.id == id
  });
  
  if (!foundMember) return res.send("member not found!");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }
  
  return res.render('members/edit', {member} );
}


exports.put = (req, res) => {
  const { id, birth } = req.body;
  let index = 0;
  
  const foundMember = data.members.find((member, foundIndex) => {
    if (member.id == Number(id)) {
      index = foundIndex;
      return true;
    }
  });
  
  if (!foundMember) return res.send("member not found!");

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(birth),
    id: Number(id)
  };

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect(`/members/${id}`);
  });
}

exports.delete = (req,res) => {
  const {id} = req.body;

  const filteredMembers = data.members.filter(member => {
    return member.id != id;
  });

  data.members = filteredMembers;
  
  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect("/members");
  });
}