let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function addToCart(productName, productPrice) {
    cartItems.push({
        name: productName,
        price: productPrice
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(productName + " added to cart!");
}

function removeItem(itemIndex) {
    cartItems.splice(itemIndex, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    showCart();
}

function showCart() {
    let cartBox = document.getElementById("cartBox");

    if (!cartBox) {
        return;
    }

    cartBox.innerHTML = "";

    if (cartItems.length === 0) {
        cartBox.innerHTML = "<p>Your cart is empty. Add some coffee first ☕</p>";
        return;
    }

    let totalPrice = 0;

    cartItems.forEach(function(item, index) {
        totalPrice = totalPrice + item.price;

        cartBox.innerHTML += `
            <div class="cart-row">
                <div>
                    <b>${item.name}</b>
                    <br>
                    $${item.price.toFixed(2)}
                </div>

                <button class="button dark" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartBox.innerHTML += `
        <h2 style="margin-top: 25px;">
            Total: $${totalPrice.toFixed(2)}
        </h2>
    `;
}

function searchProducts() {
    let searchText = document
        .getElementById("searchText")
        .value
        .toLowerCase();

    let products = document.querySelectorAll(".productCard");

    products.forEach(function(product) {
        let productName = product.innerText.toLowerCase();

        if (productName.includes(searchText)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

function openOffer() {
    let offerModal = document.getElementById("offerModal");

    if (offerModal) {
        offerModal.style.display = "flex";
    }
}

function closeOffer() {
    let offerModal = document.getElementById("offerModal");

    if (offerModal) {
        offerModal.style.display = "none";
    }
}

let slideNumber = 1;

function showSlide(number) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    slides[number - 1].classList.add("active");
    dots[number - 1].classList.add("active");
}

function nextSlide() {
    slideNumber = slideNumber + 1;

    if (slideNumber > 3) {
        slideNumber = 1;
    }

    showSlide(slideNumber);
}

window.addEventListener("load", function() {
    showCart();

    if (document.getElementById("offerModal")) {
        if (!localStorage.getItem("offerShown")) {
            setTimeout(function() {
                openOffer();
                localStorage.setItem("offerShown", "yes");
            }, 1200);
        }
    }

    if (document.querySelector(".slide")) {
        showSlide(1);
        setInterval(nextSlide, 5000);
    }
});
