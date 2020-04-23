import Register from "./../views/Register.js";
import Login from "./../views/Login.js";
import Home from "./../views/Home.js";

const app = document.getElementById('app');

const registerButton = document.getElementById('regBtn');
const loginButton = document.getElementById('logBtn');
const logoutButton = document.getElementById('logout');
const logo = document.getElementById('logo');

const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');

const notification = document.getElementById('notification');

firebase
    .auth()
    .onAuthStateChanged(user => {
        if (user) {
            Home(app);

            notification.style.display = "none";

            title.textContent = "Real Estate";
            subtitle.textContent = "Find your future home";

            registerButton.style.display = "none";
            loginButton.style.display = "none";
            logoutButton.style.display = "block";

            logoutButton.addEventListener('click', e => {
                e.preventDefault();

                firebase.auth().signOut()
            })
            logo.addEventListener('click', () => {
                Home(app);

                notification.style.display = "none";

                title.textContent = "Real Estate";
                subtitle.textContent = "Find your future home";
            })
        } else {
            Register(app);

            notification.style.display = "none";

            title.textContent = "Register";
            subtitle.textContent = "Register to see our estates";

            registerButton.style.display = "block";
            loginButton.style.display = "block";
            logoutButton.style.display = "none";

            registerButton.addEventListener('click', e => {
                e.preventDefault();
                
                Register(app);

                title.textContent = "Register";
                subtitle.textContent = "Login to see our estates";
            })

            loginButton.addEventListener('click', e => {
                e.preventDefault();

                Login(app);

                notification.style.display = "none";

                title.textContent = "Login";
                subtitle.textContent = "Login to see our estates";
            })

            logo.addEventListener('click', () => {
                Login(app);

                notification.style.display = "none";

                title.textContent = "Login";
                subtitle.textContent = "Login to see our estates";
            })
        }
    })
