let count = 0;

const defaultload = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then(res => res.json())
        .then(data => {
            displaydrink(data.drinks);
        });
};



const search_drink = () => {
    const val = document.getElementById("search-field").value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val}`)
        .then(res => res.json())
        .then(data => {
            if (data.drinks) {
                displaydrink(data.drinks);
            }
            else {
                document.getElementById("drink-container").innerHTML = "<h2>Not Found</h2>";
            }
        });



};


const displaydrink = (drink) => {

    const container = document.getElementById("drink-container")
    container.innerHTML = "";

    drink.forEach(data => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <img src="${data.strDrinkThumb}">
        <h4>${data.strDrink}</h4>
        <p>Category: ${data.strCategory}</p>
        <p>${data.strInstructions.slice(0, 15)}...</p>
        <button onclick="addgroup('${data.strDrink}','${data.strDrinkThumb}')">
              Add To Selected Item
              </button>
            <button onclick="Details('${data.idDrink}')">
            Details
            </button>
        
        
        `

        container.appendChild(div);
    })


};


const addgroup = (name, img) => {

    if (count >= 7) {
        alert("You cannot add more than 7 drinks!");
        return;
    }
    const groupList = document.getElementById("group-list");
    const div = document.createElement("div");
    div.classList.add("group-item");

    div.innerHTML = `
        <img class="mg" src="${img}">
        <span>${name}</span>
    `;

    groupList.appendChild(div);

    count++;
    document.getElementById("count").innerText = count;
};


const Details = (id) => {

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {

            const drink = data.drinks[0]
            const mbody = document.getElementById("details-body")

            mbody.innerHTML = `
        
        <img src="${drink.strDrinkThumb}" width="200">
            <h2>${drink.strDrink}</h2>
            <p><b>Category:</b> ${drink.strCategory}</p>
            <p><b>Alcoholic:</b> ${drink.strAlcoholic}</p>
            <p><b>Glass:</b> ${drink.strGlass}</p>
            <p><b>Instructions:</b> ${drink.strInstructions}</p>
        
        `;
            document.getElementById("detail-container").style.display = "block"
        });


};

const closeModal = () => {
    document.getElementById("detail-container").style.display = "none";
};

defaultload();

