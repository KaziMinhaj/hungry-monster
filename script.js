displayItems("beef");

const search = document.getElementById("search");
search.addEventListener("click", function () {

    //from details page if we want to search again then making sure grid & none display
    document.getElementById("meal-container").style.display = "grid";
    document.getElementById("ingredients-container").style.display = "none";

    const keyWord = document.getElementById("input-box").value;
    if (keyWord == "") {
        alert("Item can not be empty")
    }
    else {
        console.log("clicked");
        document.getElementById("meal-container").innerHTML = '';
        displayItems(keyWord);
    }

})

function displayItems(keyWord) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyWord}`)
        .then(response => response.json())
        .then(response => { displayItem(response) });


    function displayItem(response) {
        console.log(response);
        const data = response.meals;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const name = element.strMeal;
            const imgUrl = element.strMealThumb;

            const mealContainer = document.getElementById("meal-container");
            const eachMealDiv = document.createElement("div");
            eachMealDiv.className = "each-meal-div shadow";
            eachMealDiv.id = element.idMeal;
            eachMealDiv.innerHTML = `
            <img id="image" src=${imgUrl}>
            <h6 id="name">${name}</h6>
            <button onclick="displayDetails('${name}')" id="details">Details</button>`
            mealContainer.appendChild(eachMealDiv);
        }
    };
    document.getElementById("input-box").value = "";
}

function displayDetails(name) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(response => displayingredients(response));
}

function displayingredients(response) {
    const data = response.meals
    // console.log(data[0]);
    const ingredWrapper = document.getElementById("ingredients-container");
    ingredWrapper.innerHTML = `
        <button onclick="closeBtn()" id="close-btn" class="far fa-window-close"></button>
        <img src=${data[0].strMealThumb}>
        <h3 id="details-name">${data[0].strMeal}</h3>
        <h5 id="ingred">Ingrediants</h5>
    `
    const object = data[0];
    const arr1 = [];
    const arr2 = [];
    let counter1 = 1;
    let counter2 = 1;
    for (let i in object) {
        if (i == `strIngredient${counter1}` && object[i] != "" && object[i] != null) {
            arr1.push(object[i])
            counter1++;
        }
        else if (i == `strMeasure${counter2}` && object[i] != "" && object[i] != null) {
            arr2.push(object[i]);
            counter2++;
        }
    }
    console.log(arr1);
    console.log(arr2);

    for (let i = 0; i < arr1.length; i++) {
        const item = `${arr2[i]} ${arr1[i]}`;
        console.log(item);
        if (item != null) {
            const pTag = document.createElement("p");
            pTag.id = "pTag";
            pTag.innerHTML = `<i class="fas fa-check-square"></i> ${item}`;
            document.getElementById("ingredients-container").appendChild(pTag);
        }
    }
    document.getElementById("meal-container").style.display = "none";
    document.getElementById("ingredients-container").style.display = "block"
}

function closeBtn() {
    //clearing child elements
    document.getElementById("meal-container").innerHTML = '';
    document.getElementById("ingredients-container").style.display = "none";
    document.getElementById("meal-container").style.display = "grid";
    displayItems("beef");


}







