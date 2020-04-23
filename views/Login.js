const Login = (app) => {
    app.innerHTML = `
    <form action="" name="login">
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input" type="email" name="email" placeholder="Enter email">
            </div>
        </div>
        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input class="input" type="password" name="password" placeholder="Enter password">
            </div>
        </div>
        <div class="control">
            <button class="button is-dark">Log in</button>
        </div>
    </form>    `;

    const notification = document.getElementById('notification');

    document.forms.login.addEventListener('submit', e => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
            })
            .catch(error => {
                notification.style.display = "block";
                document.getElementById('notificationMsg').textContent = error;
            });
    })

    // Notification Controls
    const closeBtn = document.querySelector('button.delete')

    closeBtn.addEventListener('click', e => {
        e.preventDefault();

        notification.style.display = "none";
    })
}

export default Login;