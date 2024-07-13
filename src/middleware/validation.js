function validateEmail(email){
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

function validateString(str){
    const regex= /^[A-Za-z\s]*$/;
    return regex.test(str)
}

function validateNumber(number) {
    const regex = /^-?\d+(\.\d+)?$/;
    return regex.test(number);
  }

  module.exports={validateEmail,validateString,validateNumber}