const Intl = require('intl');

module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      --age;
    }

    return age;
  },

  strToArr(str) {
    return str.split(',').map(el => el.trim());
  },

  timeFormat(time) {
    return new Intl.DateTimeFormat("pt-BR").format(time);
  },
  date(timestamp) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);
    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },
  bloodType(blood) {
    const subType = blood.slice(-1)
    if (subType === '1') {
      return blood.replace(subType,"+")
    }
    return blood.replace(subType, "-")
    }
}



