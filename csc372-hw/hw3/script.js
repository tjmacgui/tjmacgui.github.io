function selectDish(image) {
    document.querySelectorAll(".dish-gallery img").forEach(img => img.classList.remove("selected"));
    image.classList.add("selected");

    document.getElementById("dish-name").textContent = image.dataset.name;
    document.getElementById("dish-description").textContent = image.dataset.description;
    document.getElementById("dish-price").textContent = `$${image.dataset.price}`;

    document.getElementById("dish-details").style.display = "block";
}
