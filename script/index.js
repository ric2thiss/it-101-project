const getUserData = JSON.parse(localStorage.getItem("userloggedIn"));

if (!getUserData || !getUserData.user) {
    window.location.href = 'login.html';
}


const { firstname, lastname, email, idnumber, username } = getUserData.user;

const username_placeholder = document.getElementById("username");

username_placeholder.textContent = `${firstname} ${lastname}`

const data_placeholder = document.getElementById("data");
data_placeholder.innerHTML = `<p>Email : ${email}</p>
<p>Id : ${idnumber}</p>
<p>Username : ${username}</p>`



// Logout
const button_logout = document.getElementById("button_logout");

if (button_logout) {
    button_logout.addEventListener("click", () => {
        console.log("Log1")
        localStorage.removeItem("userloggedIn");
        window.location.href = "login.html";
    });
}



    
