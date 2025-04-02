// PROFILE MANAGEMENT JS
document.addEventListener("DOMContentLoaded", function() { // execute func on html load
    const user = JSON.parse(localStorage.getItem("user")) || {};
    
    document.getElementById("fullname").textContent = `${user.f_name} ${user.l_name}`;
    document.getElementById("email").textContent = user.email;
    document.getElementById("birthday").value = user.birthday || "";

    const profilePic = localStorage.getItem("profilePic");
    if (profilePic) {
        document.getElementById("profile-pic").src = profilePic;
    }
    document.getElementById("profile-pic").addEventListener("click", () => { // on profile pic click, trigger hidden img input
        document.getElementById("profile-pic-input").click();
    });

    document.getElementById("profile-pic-input").addEventListener("change", function(event) { // execute on profile pic change
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profile-pic").src = e.target.result; // base64 encode img for local storage
                localStorage.setItem("profilePic", e.target.result); // store b64 on local storage
            };
            reader.readAsDataURL(file); // display image
        }
    });
});

function editName() {
    const fullnameSpan = document.getElementById("fullname");
    const nameContainer = document.getElementById("name-container");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = fullnameSpan.textContent;
    nameInput.classList.add("form-control");
    nameInput.id = "name-input";
    
    nameContainer.innerHTML = "<label class='fw-bold'>Name:</label>";
    nameContainer.appendChild(nameInput);
}

function editEmail() {
    const emailSpan = document.getElementById("email");
    const emailContainer = document.getElementById("email-container");

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = emailSpan.textContent;
    emailInput.classList.add("form-control");
    emailInput.id = "email-input";
    
    emailContainer.innerHTML = "<label class='fw-bold'>Email:</label>";
    emailContainer.appendChild(emailInput);
}

function editBirthday() {
    const birthdayInput = document.getElementById("birthday");
    birthdayInput.disabled = false; 
}

function saveProfile() {
    const birthday = document.getElementById("birthday").value;
    const nameInput = document.getElementById("name-input");
    const emailInput = document.getElementById("email-input");

    let user = JSON.parse(localStorage.getItem("user")) || {};

    if (nameInput) user.f_name = nameInput.value.split(" ")[0];
    if (nameInput) user.l_name = nameInput.value.split(" ")[1];
    if (emailInput) user.email = emailInput.value;

    user.birthday = birthday;
    localStorage.setItem("user", JSON.stringify(user));

    alert("Changes Saved!")

    document.getElementById("fullname").textContent = `${user.f_name} ${user.l_name}`;
    document.getElementById("email").textContent = user.email;
    document.getElementById("birthday").value = user.birthday || "";
    
    document.getElementById("birthday").disabled = true;
}

// LOGOUT JS
function logout() {
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = "login.html";
    }
}