[...document.querySelectorAll('.form-redirect')].map(e => e.addEventListener('click', () => moveBox()))

var initUsers = [{
    "id": 1,
    "username": "admin",
    "password": "123",
    "isOnline": false,
    "like": []
}]

const getUsers = () => JSON.parse(localStorage.getItem("users")) || initUsers

const moveBox = () => {
    [...document.querySelectorAll('input')].map(e => e.value = "")
    document.getElementById('black__box').classList.toggle('active')
}

users = getUsers()
console.log(users)

const check = (username, password = "") => {
    let users = getUsers()
    for (let i = 0; i < users.length; i++)
        if (users[i]["username"] === username) {
            if (password == "")
                return true
            else if (users[i]["password"] === password) {
                users[i]["isOnline"] = true
                return true
            } else
                return false
        }
    return false
}

const signUp = (username, password) => {
    let users = getUsers()
    if (!check(username)) {
        let newUser = {
            "id": users.length + 1,
            "username": username,
            "password": password,
            "isOnline": false,
            "like": []
        }
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        moveBox()
        return true
    }

    return false
}

const signIn = (username, password) => {
    let users = getUsers()
    if (check(username, password)) {
        window.location.href = '/home.html'

        localStorage.setItem("users", JSON.stringify(users))

        return true
    }

    return false
}

// ========================SIGN UP======================================
document.getElementById('btn-sign-up').addEventListener('click', () => {
    let username = document.getElementById('username').value,
        password = document.getElementById('password').value,
        cPassword = document.getElementById('confirm-password').value

    if (username && password && cPassword)
        if (cPassword === password) {
            if (!signUp(username, password))
                toast("Username already exists!") // username exist
        } else
            toast("Confirm password not match!") // confirm pass not match
    else
        toast("Please enter all fields!") // fill all field
})

// ==========================SIGN IN====================================
document.getElementById('btn-sign-in').addEventListener('click', () => {
    let username = document.getElementById('username2').value,
        password = document.getElementById('password2').value

    if (username && password) {
        if (!signIn(username, password))
            toast("Password not match")
    } else
        toast("Please enter all fields!") // fill all fields

})

// ==========================TOAST======================================
const toast = msg => {
    const main = document.getElementById('toast')

    const newToast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(() => {
        main.removeChild(newToast);
    }, 3000);

    // Remove toast when clicked
    newToast.onclick = e => {
        if (e.target.closest(".toast__close")) {
            main.removeChild(newToast);
            clearTimeout(autoRemoveId);
        }
    };

    newToast.classList.add("toast", `toast--error`);
    newToast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s 3s forwards`;

    newToast.innerHTML = `
                    <div class="toast__icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">Error</h3>
                        <p class="toast__msg">${msg}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(newToast);
}