function otpGenerator(){

  let otp = Math.random() * (999999 - 100000) + 100000;
  return Math.floor(otp);
}

module.exports = otpGenerator;