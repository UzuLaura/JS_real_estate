const Add = (app) => {
    app.innerHTML = `            
    <form action="" name="add">
        <div class="field">
            <label class="label">Image</label>
            <div class="control">
                <input class="input" type="text" name="img" placeholder="Enter image url">
            </div>
        </div>
        <div class="field">
            <label class="label">Title</label>
            <div class="control">
                <input class="input" type="text" name="alt" placeholder="Enter title for real estate">
            </div>
        </div>
        <div class="field">
            <label class="label">Price, EUR</label>
            <div class="control">
                <input class="input" type="text" name="price" placeholder="Enter price">
            </div>
        </div>
        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea" name="description" placeholder="Enter description"></textarea>
            </div>
        </div>
        <label class="label">City</label>
        <div class="select">
            <select name="city">
                <option>Vilnius</option>
                <option>Kaunas</option>
                <option>Klaipėda</option>
            </select>
        </div>
        <div class="control is-pulled-right">
            <button class="button is-dark">Add Estate</button>
        </div>
    </form>
`;

    const notification = document.getElementById('notification');

    // Function to format price
    function numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    document.forms.add.addEventListener('submit', e => {
        e.preventDefault();

        const img = e.target.elements.img.value;
        const alt = e.target.elements.alt.value;
        const price = '€' + numberWithCommas(e.target.elements.price.value);
        const about = e.target.elements.description.value;
        const location = e.target.elements.city.value;
        const urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        if (img.match(urlPattern) && alt && e.target.elements.price.value.match(/[0-9]/) && about && location) {
            firebase
                .firestore()
                .collection('houses')
                .add({
                    img: img,
                    alt: alt,
                    price: price,
                    about: about,
                    location: location
                })
                .then(() => {
                    succesNotification("Successfully Added!");
                })
                .catch(error => {
                    notification.style.display = "block";
                    document.getElementById('notificationMsg').textContent = error;
                })
        } else if (!e.target.elements.price.value.match(/[0-9]/)) {
            failNotification("Please enter correct price!");
        } else if (!img.match(urlPattern)) {
            failNotification("Please enter valid url!");
        } else {
            failNotification("All fields are required!");
        }
    })

    // Notifications
    const succesNotification = (message) => {
        notification.style.display = "block";
        notification.classList.remove("is-danger");
        notification.classList.add("is-success");
        document.getElementById('notificationMsg').textContent = message;
    }

    const failNotification = (message) => {
        notification.style.display = "block";
        notification.classList.add("is-danger");
        notification.classList.remove("is-success");
        document.getElementById('notificationMsg').textContent = message;
    }

    // Notification Controls
    const closeBtn = document.querySelector('button.delete')

    closeBtn.addEventListener('click', e => {
        e.preventDefault();

        notification.style.display = "none";
    })

}

export default Add;