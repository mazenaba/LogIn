var loginForm = document.querySelector(".login");
var registerForm = document.querySelector(".register");
var userName = document.querySelector("#userName");
var userEmail = document.querySelector("#userEmail");
var userPass = document.querySelector("#userPass");
var regBtn = document.querySelector("#regBtn");
var logBtn = document.querySelector("#logBtn");
var logEmail = document.querySelector("#logEmail");
var logPass = document.querySelector("#logPass");

var demo = document.getElementById("demo");
var welcomeUserLog = document.getElementById("welcomeUserLog");

var userInfo = [];

if (localStorage.getItem("user") != null) {
  userInfo = JSON.parse(localStorage.getItem("user"));
} else {
  userInfo = [];
}

//user data function 
function userData() {
  user = {
    name: userName.value,
    email: userEmail.value,
    password: userPass.value,
  };

  if (userName.value == "" || userEmail.value == "" || userPass.value == "") {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Please Enter All Input</span>';
  } else if (regexValid() == false) {
    document.getElementById("exist").innerHTML = "This mail is not valid";
  } else if (checkEmail() == false) {
    document.getElementById("exist").innerHTML = "This mail is already in use";
  } else {
    userInfo.push(user);
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
  }
  localStorage.setItem("user", JSON.stringify(userInfo));
}

function checkEmail() {
  for (var i = 0; i < userInfo.length; i++)
    if (userInfo[i].email.toLowerCase() == userEmail.value.toLowerCase()) {
      return false;
    }
}

function regexValid() {
  var mailRegex = /^[a-zA-z]{1,}(@)(yahoo|gmail|outlook)(.)(c)(o)(m)$/;
  var emailValue = userEmail.value;
  console.log(emailValue);
  if (mailRegex.test(emailValue) == true) {
    return true;
  } else {
    return false;
  }
}

// login function

function checkAll() {
  var logInCheck = {
    passwordLog: logPass.value,
    emailLog: logEmail.value,
  };

  for (var i = 0; i < userInfo.length; i++) {
    if (
      userInfo[i].password.toLowerCase() ==
        logInCheck.passwordLog.toLowerCase() &&
      userInfo[i].email.toLowerCase() == logInCheck.emailLog.toLowerCase()
    ) {
    //   welcomeUser
    localStorage.setItem("userName",JSON.stringify(userInfo[i].name));
      return true;
    }
  }
  return false;
}

function myFun() {
 checkAll();
  window.location.href = "welcome.html";
}

function isEmpty() {
  if (logEmail.value == "" || logPass.value == "") return true;
}

function incorrectInput() {
  for (var i = 0; i < userInfo.length; i++) {
    if (
      userInfo[i].email.toLowerCase() != logEmail.value.toLowerCase() ||
      userInfo[i].password.toLowerCase() != logPass.value.toLowerCase())
      continue;
      else{
        return false;
      }
}
return true;
}
function logIn() {
  if (isEmpty() == true) {
    document.getElementById("incorrect").innerHTML = "All inputs is required";
  } else if (incorrectInput() == true) {
    document.getElementById("incorrect").innerHTML =
      "incorrect email or password";
  }  else {
    myFun();
  }
}
