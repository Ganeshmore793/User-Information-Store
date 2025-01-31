document.addEventListener("DOMContentLoaded", showData); // ensure that HTML is fully loaded before executing showData 

let editingUserId = null;

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || []; // get the users from local storage
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users)); // Convert array objects into a string
}

function handleFormSubmit(event) {                         //event occure when user submit the form
  event.preventDefault();                                 // Prevent page reload

  if (!validate()) {
    return;                                           // Stop user to submit the form untill the validation is correct
  }

  const firstName = document.getElementById("firstName").value;   //get the values from html input field
  const lastName = document.getElementById("lastName").value;
  const aadhaar = document.getElementById("aadhaar").value;
  const pan = document.getElementById("pan").value;

  const users = getUsers();                      

  let newUser;
  if (editingUserId) {                     //if id is existing update the user otherwise add the new user 
    const userIndex = users.findIndex((user) => user.id === editingUserId);
    users[userIndex] = { firstName, lastName, aadhaar, pan, id: editingUserId };
    newUser = users[userIndex];
    alert("User updated successfully");
    editingUserId = null;
  } else {
    newUser = { firstName, lastName, aadhaar, pan, id: Date.now() };
    users.push(newUser);                                  //add the user into array
    alert("User added successfully");
  }

  saveUsers(users);
  document.getElementById("userForm").reset();        //reset is for reset the form field
  showNewUserCard(newUser);
  showData();
}

function showData() {                         
  const users = getUsers();
  const container = document.getElementById("userCardsContainer");
  container.innerHTML = ""; // Clear the container before adding new elements

  users.forEach((user) => {                 //use to take users oe by one 
    const userCard = document.createElement("div");       
    userCard.className = "user-card";
    userCard.innerHTML = `
      <p><b>Name:</b> ${user.firstName} ${user.lastName}</p> 
      <p><b>Aadhaar Number:</b> ${user.aadhaar}</p>
      <p><b>PAN Number:</b> ${user.pan}</p>
      <div class="buttons">
        <a class="fa-solid fa-trash" id="deleteBtn" onclick="confirmDeleteUser(${user.id})"></a>
        <a class="fa-solid fa-pen-to-square" id="editButton" onclick="editUser(${user.id})"></a>
      </div>`;
    container.appendChild(userCard);        //add the users
  });
}

function confirmDeleteUser(id) {                //function use for show confirm message after delete the user 
  if (confirm("Are you sure you want to delete this user?")) {
    deleteUser(id);
  }
}

function deleteUser(id) {                         //delete user basic on its id
  const users = getUsers().filter((user) => user.id !== id);
  saveUsers(users);
  showData();
}

function editUser(id) {                 //edit the user basis on its id
  const users = getUsers();
  const userToEdit = users.find((user) => user.id === id);   //if id is match with users id then edit the user otherwise not

  if (userToEdit) {
    document.getElementById("firstName").value = userToEdit.firstName;
    document.getElementById("lastName").value = userToEdit.lastName;
    document.getElementById("aadhaar").value = userToEdit.aadhaar;
    document.getElementById("pan").value = userToEdit.pan;
    editingUserId = userToEdit.id;
    toggleUserList();
  }
}

function showNewUserCard(user) {                //show the single user after register
  const userCardContainer = document.getElementById("userCardContainer");
  const newUserCard = document.getElementById("newUserCard");

  newUserCard.innerHTML = `
    <p><b>Name:</b> ${user.firstName} ${user.lastName}</p>        
    <p><b>Aadhaar Number:</b> ${user.aadhaar}</p>
    <p><b>PAN Number:</b> ${user.pan}</p>`;

  userCardContainer.style.display = "block";
}

function closeUserCard() {                      //close the card of the single user 
  document.getElementById("userCardContainer").style.display = "none";
}

function toggleUserList() {
  const container = document.getElementById("userCardsContainer");
  const showUsersButton = document.getElementById("showUserListButton");

  if (container.style.display === "none") {
    container.style.display = "block";
    showUsersButton.textContent = "Hide User List";
  } else {
    container.style.display = "none";
    showUsersButton.textContent = "Show User List";
  }
}

function validate() {          //validation for adhar and pan
  const aadhaarInput = document.getElementById("aadhaar");
  const aadhaarValue = aadhaarInput.value.trim();
  const aadhaarPattern = /^[0-9]{12}$/;

  const panInput = document.getElementById("pan");
  const panValue = panInput.value.trim();
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!aadhaarPattern.test(aadhaarValue)) {
    alert("Invalid inputs please check adhar(12 digits) and pan(XXXXX9999X)");
    aadhaarInput.focus();
    return false;
  }

  if (!panPattern.test(panValue)) {
    alert("Invalid inputs please check adhar(12 digits) and pan(XXXXX9999X)");
    panInput.focus();
    return false;
  }

  return true;                          // Allow user to submit form if everything is valid
}
