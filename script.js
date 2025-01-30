function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || []; //give the name to local storage with empty array to store users
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));//.strinify to convert objects into string
}

function handleFormSubmit(event) { //event execute when user click on submit button
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const aadhar = document.getElementById("aadhaar").value;
  const pan = document.getElementById("pan").value;  //taking the values from input 

  const users = getUsers();
  users.push({ firstName, lastName, aadhar, pan, id: Date.now() });  //date.not for user must have unique value
  saveUsers(users);

  alert("User added successfully");
  document.getElementById("userForm").reset();
}

function gotoUsers() {
  window.location.href = "users.html";   //function for view users list
}
