// const crypto = require("crypto");

// function generateSecretKey() {
//   return crypto.randomBytes(64).toString("hex");
// }

// const secretKey = generateSecretKey();
// console.log("JWT Secret Key:", secretKey);
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const password = "pass";

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Hashed Password:", hash);
});
