const Intl = require('intl');

module.exports = {
  age: (timestamp) => {
    const today = new Date();
    const birthDate = new Date(timestamp);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      --age;
    }

    return age;
  },

  strToArr: str => {
    return str.split(',').map(el => el.trim());
  },

  timeFormat: time => {
    return new Intl.DateTimeFormat("pt-BR").format(time);
  }

}

