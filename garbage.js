const bcrypt = require("bcryptjs");
const password = "Sanadh@123";
const encrptedPw = bcrypt.hashSync(password, 11);
console.log(encrptedPw);
