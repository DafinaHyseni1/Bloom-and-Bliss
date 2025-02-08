document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const header = document.querySelector("header");

    // Klikimi i butonit ☰ hap ose mbyll navbar-in
    menuToggle.addEventListener("click", function (event) {
      header.classList.toggle("nav-active");
      event.stopPropagation(); // Parandalon mbylljen e menjëhershme kur klikohet ☰
    });

    // Klikimi jashtë navbar-it e mbyll atë
    document.addEventListener("click", function (event) {
      if (!header.contains(event.target)) {
        header.classList.remove("nav-active");
      }
    });
  });


// Lista e fotove që do të përdorim si background
const images = [
    'url("photo1.png")',
    'url("photo2.png")',
    'url("photo3.png")',
    'url("photo4.png")'
];

let currentImageIndex = 0;

// Funksioni që ndërron foton çdo 5 sekonda dhe kthehet tek e para pasi të kalojnë të gjitha
function changeBackgroundImage() {
    const backgroundElement = document.querySelector('.background');
    currentImageIndex = (currentImageIndex + 1) % images.length; // Kur të arrijmë fundin, kthehemi te fotoja e parë
    backgroundElement.style.backgroundImage = images[currentImageIndex]; // Ndryshimi i fotove
}

// Ndërrimi bëhet çdo 5 sekonda dhe vazhdon pafundësisht
setInterval(changeBackgroundImage, 5000);





document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    const slideCount = document.querySelectorAll(".slide").length;
    let currentIndex = 0;

    // Duplikojmë fotot për të krijuar vazhdimësi
    const firstSlide = slides.firstElementChild.cloneNode(true);
    slides.appendChild(firstSlide);

    setInterval(() => {
        currentIndex++;
        slides.style.transition = "transform 1.5s ease-in-out";
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Rikthehemi në fillim pa ndalesë
        if (currentIndex >= slideCount) {
            setTimeout(() => {
                slides.style.transition = "none"; // Fshijmë tranzicionin për efekt të vazhdueshëm
                slides.style.transform = "translateX(0)";
                currentIndex = 0;
            }, 1500); // Koha duhet të përputhet me `transition`
        }
    }, 5000); // Ndërrim çdo 5 sekonda
});


document.addEventListener("DOMContentLoaded", () => {
    const orderButtons = document.querySelectorAll(".order-button");

    orderButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const flowerItem = e.target.closest(".flower-item");
            const flowerName = flowerItem.querySelector(".flower-name").textContent;
            const flowerPrice = parseFloat(flowerItem.querySelector(".flower-price").textContent.slice(1)); // Remove "$"

            showOrderModal(flowerName, flowerPrice);
        });
    });

    const showOrderModal = (flowerName, flowerPrice) => {
        const modalHtml = `
            <div class="order-modal">
                <div class="modal-content">
                    <h2>Order ${flowerName}</h2>
                    <p>Price per item: $${flowerPrice.toFixed(2)}</p>
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" value="1" min="1" />
                    <p id="total-price">Total: $${flowerPrice.toFixed(2)}</p>
                    <label for="payment-method">Payment Method:</label>
                    <select id="payment-method">
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash">Cash on Delivery</option>
                    </select>
                    <button id="confirm-order" class="btn btn-success">Confirm Order</button>
                    <button id="cancel-order" class="btn btn-danger">Cancel</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", modalHtml);

        const modal = document.querySelector(".order-modal");
        const quantityInput = document.getElementById("quantity");
        const totalPriceElement = document.getElementById("total-price");

        // Update total price on quantity change
        quantityInput.addEventListener("input", () => {
            const quantity = parseInt(quantityInput.value) || 1;
            totalPriceElement.textContent = `Total: $${(flowerPrice * quantity).toFixed(2)}`;
        });

        // Handle Confirm Order
        document.getElementById("confirm-order").addEventListener("click", () => {
            const quantity = parseInt(quantityInput.value) || 1;
            const paymentMethod = document.getElementById("payment-method").value;
            alert(`Order Confirmed! \nItem: ${flowerName}\nQuantity: ${quantity}\nTotal: $${(flowerPrice * quantity).toFixed(2)}\nPayment Method: ${paymentMethod}`);
            modal.remove();
        });

        // Handle Cancel Order
        document.getElementById("cancel-order").addEventListener("click", () => {
            modal.remove();
        });
    };
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const emailError = document.getElementById('email-error');
    const passwordStrength = document.getElementById('password-strength');
    const submitButton = form.querySelector('button[type="submit"]');

    const checkPasswordStrength = () => {
        const password = document.getElementById('password').value;
        if (password.length < 6) {
            passwordStrength.textContent = "Weak password. Must be at least 6 characters.";
            passwordStrength.style.color = "red";
        } else if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
            passwordStrength.textContent = "Strong password.";
            passwordStrength.style.color = "green";
        } else {
            passwordStrength.textContent = "Moderate password. Include uppercase letters and numbers.";
            passwordStrength.style.color = "orange";
        }
    };

    const validateForm = () => {
        const inputs = form.querySelectorAll('input[required]');
        let allValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allValid = false;
            }
        });

        submitButton.disabled = !allValid;
    };

    form.addEventListener('input', validateForm);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input[required]');

        for (const input of inputs) {
            if (!input.value.trim()) {
                alert("Please fill out all required fields.");
                return;
            }
        }

        alert("Registration successful!");
    });

    document.getElementById('password').addEventListener('input', checkPasswordStrength);
});