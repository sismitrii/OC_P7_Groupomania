const bcrypt = require('bcrypt');
const User = require('../models/users');

bcrypt.hash(process.env.ADMIN_PASSWORD, 10 )
.then((hash)=>{
  const user = new User({
  email: process.env.ADMIN_EMAIL,
  password: hash,
  username: "Admin",
  role: ["ROLE_USER", "ROLE_ADMIN"],
  profilImgUrl: `http://localhost:3000/images/profil_default.jpg`
})

  user.save()
  .then(()=> console.log("Admin account created"))
  .catch((error)=> console.error(error))
})
.catch((error)=> console.log(error))


module.exports = [];