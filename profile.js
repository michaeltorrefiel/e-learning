document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    
    document.getElementById("fullname").textContent = `${user.f_name} ${user.l_name}`;
    document.getElementById("email").textContent = user.email;
    document.getElementById("birthday").value = user.birthday || "";

    const profilePic = localStorage.getItem("profilePic");
    if (profilePic) {
        document.getElementById("profile-pic").src = profilePic;
    }
    document.getElementById("profile-pic").addEventListener("click", () => {
        document.getElementById("profile-pic-input").click();
    });

    document.getElementById("profile-pic-input").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profile-pic").src = e.target.result;
                localStorage.setItem("profilePic", e.target.result);
            };
            reader.readAsDataURL(file);
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

function saveAndReload() {
    saveProfile();
    window.location.reload();
}