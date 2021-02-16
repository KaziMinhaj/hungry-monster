const search = document.getElementById("search");
search.addEventListener("click", function () {
    const keyWord = document.getElementById("input-box").value;
    if (keyWord == "") {
        alert("Item can not be empty")
    }
    else {
        displayItems(keyWord);
    }

})


function displayItems(keyWord) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyWord}`)
        .then(response => response.json())
        .then(response => { displayItems(response) });

    function displayItems(response) {
        const data = response.meals;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const name = element.strMeal;
            const imgUrl = element.strMealThumb;

            const mealContainer = document.getElementById("meal-container");
            const eachMealDiv = document.createElement("div");
            eachMealDiv.className = "each-meal-div shadow"
            eachMealDiv.innerHTML = `
            <img id="image" src=${imgUrl}>
            <h6 id="name">${name}</h6>
        `
            mealContainer.appendChild(eachMealDiv);
        }
    };
    document.getElementById("input-box").value = "";
}





