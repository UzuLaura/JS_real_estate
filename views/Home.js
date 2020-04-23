import Add from "./Add.js";

const Home = (app) => {
    app.innerHTML = `
    <h3>Filter</h3>
    <div class="flex-menu">
        <div>
            <button class="filter button is-outlined">Vilnius</button>
            <button class="filter button is-outlined">Kaunas</button>
            <button class="filter button is-outlined">Klaipėda</button>
        </div>
        <button id="add" class="button is-dark">Add Estate</button>
    </div>
    <div class="flex" id="houses">
    </div>
`;

    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');

    function showHouses (house) {
        document.getElementById('houses')
        .innerHTML += `
        <div class="item">
            <img src="${house.data().img}"
                alt="${house.data().alt}">
            <h2 class="title">${house.data().price}</h2>
            <p class="subtitle">${house.data().location}</p>
            <p>${house.data().about.substring(0, 200)}...</p>
        </div>
        `;
    }

    firebase
        .firestore()
        .collection("houses")
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(house => {
                showHouses(house);
            })
        })

    // Filter
    const buttons = document.querySelectorAll('button.filter');
    buttons[0].addEventListener('click', e => {
        e.preventDefault();

        document.getElementById('houses').innerHTML = '';
        buttons[0].classList.add('is-primary');
        buttons[1].classList.remove('is-primary');
        buttons[2].classList.remove('is-primary');

        firebase
            .firestore()
            .collection("houses")
            .where('location', '==', 'Vilnius')
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(house => {
                    showHouses(house);
                })
            })
    })

    buttons[1].addEventListener('click', e => {
        e.preventDefault();

        document.getElementById('houses').innerHTML = '';
        buttons[1].classList.add('is-primary');
        buttons[0].classList.remove('is-primary');
        buttons[2].classList.remove('is-primary');

        firebase
            .firestore()
            .collection("houses")
            .where('location', '==', 'Kaunas')
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(house => {
                    showHouses(house);
                })
            })
    })

    buttons[2].addEventListener('click', e => {
        e.preventDefault();

        document.getElementById('houses').innerHTML = '';
        buttons[2].classList.add('is-primary');
        buttons[1].classList.remove('is-primary');
        buttons[0].classList.remove('is-primary');

        firebase
            .firestore()
            .collection("houses")
            .where('location', '==', 'Klaipėda')
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(house => {
                    showHouses(house);
                })
            })
    })


    // Add Button
    const addButton = document.getElementById('add');
    addButton.addEventListener('click', e => {
        e.preventDefault();

        Add(app);

        notification.style.display = "none";

        title.textContent = 'Add Real Estate'
        subtitle.textContent = '';
    })



}

export default Home;