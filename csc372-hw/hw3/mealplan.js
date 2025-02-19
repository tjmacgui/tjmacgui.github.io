let totalCost = 0;

function addToMeal(button) {
    let dish = button.parentElement;
    let name = dish.dataset.name;
    let price = parseFloat(dish.dataset.price);

    let mealList = document.getElementById("selected-meals");
    let listItem = document.createElement("li");
    listItem.textContent = `${name} - $${price.toFixed(2)}`;
    mealList.appendChild(listItem);

    totalCost += price;
    document.getElementById("total-cost").textContent = totalCost.toFixed(2);
}
