const urlParams = new URLSearchParams(window.location.search); //search url of id
const id = parseInt(urlParams.get("id"));    //convert id string to interger


function editUser(id) {
  let usersArray = JSON.parse(localStorage.getItem("users")) || [];

  const editUser = usersArray.find((user) => user.id === id);


  if (editUser) {
                                        // Check if user exists
    console.log(editUser);

    const edit = document.getElementById("editUser"); // get user by id

    edit.innerHTML = `
        <h2>Edit User Information</h2>
        <form id="editUserForm">
            <input type="hidden" id="userId" value="${editUser.id}"/> 
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" value="${editUser.firstName}" required>
            </div>

            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" value="${editUser.lastName}" required>
            </div>

            <div class="form-group">
                <label for="aadhaar">Aadhaar Number:</label>
                <input type="text" id="aadhaar" value="${editUser.aadhar}"  pattern="[0-9]{12}"
            maxlength="12"
            required required>
            </div>

            <div class="form-group">
                <label for="pan">PAN Number:</label>
                <input type="text" id="pan" value="${editUser.pan}" minlength="10"
            maxlength="10" required>
            </div>

            <button type="submit" onClick="updateUser(${editUser.id}")>Update</button>
        </form>`;

    // Add event listener to update user details
    document
      .getElementById("editUserForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        updateUser(id);
      });
  } else {
    console.log("User not found");
  }
}

editUser(id);

function updateUser(id) {
  let usersArray = JSON.parse(localStorage.getItem("users")) || [];  //convert string into objects

  let index = usersArray.findIndex((user) => user.id === id); //for find the index of object 
  if (index === -1) {
    console.log("User not found");
    return;
  }

  usersArray[index].firstName = document.getElementById("firstName").value;
  usersArray[index].lastName = document.getElementById("lastName").value;
  usersArray[index].aadhar = document.getElementById("aadhaar").value;
  usersArray[index].pan = document.getElementById("pan").value;

  localStorage.setItem("users", JSON.stringify(usersArray));

  alert("User updated successfully!");

  window.location.href = "users.html";   
}
