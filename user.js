const card = document.getElementById("userCard");
function showData() {
  const user = JSON.parse(localStorage.getItem("users")) || [];
  // console.log(user);

  card.innerHTML = ""; //reset the values of input field

  for (let i = 0; i < user.length; i++) {  //for taking users by there index which is in array
    const cardDetail = document.createElement("div");
    cardDetail.innerHTML = `
            <div class="form-group">
                <p ><b>Name:</b> ${user[i].firstName}  ${user[i].lastName}</p>
        
                <p><b>Aadhaar Number:</b>  ${user[i].aadhar}</p>
            
                <p><b>PAN Number:</b> ${user[i].pan}</p>
                <div class="buttons">
                <a class="fa-solid fa-trash " id="deleteBtn" onclick="deleteUser(${user[i].id})"></a>
                <a href="editUser.html?id=${user[i].id}" class="fa-solid fa-pen-to-square" id="editButton" ></a>
                </div>
            </div>`;
    card.append(cardDetail);   //add the html inside the div tag
  }
}

showData();   //call the function

function deleteUser(id) {
  let usersArray = JSON.parse(localStorage.getItem("users")); //convert json string into javascript object

  console.log(usersArray);

  const newArray = usersArray.filter((user) => {
    if (user.id != id) {
      return true;
    } else {
      return false;
    }
  });

  localStorage.removeItem("users");
  localStorage.setItem("users", JSON.stringify(newArray));

                                  // window.location.reload()
  showData();
}

function gotoIndex() {
  window.location.href = "index.html";
}
