/* =====================================================
   🌿 GREENLY PLANT SHOP
   Main JavaScript
===================================================== */


/* =====================================================
   PRODUCT DATA
===================================================== */

const products = [

    {
        id: 1,
        name: "Monstera Deliciosa",
        category: "indoor",
        categoryName: "ไม้ประดับ",
        price: 890,
        image: "images/monstera.jpg",
        rating: 5,
        reviews: 128,
        description:
            "ต้น Monstera Deliciosa ใบใหญ่สวย มีเอกลักษณ์ เหมาะสำหรับตกแต่งห้องนั่งเล่น ห้องทำงาน และพื้นที่ภายในบ้าน"
    },

    {
        id: 2,
        name: "Snake Plant",
        category: "air",
        categoryName: "ไม้ฟอกอากาศ",
        price: 490,
        image: "images/snake-plant.jpg",
        rating: 5,
        reviews: 96,
        description:
            "ต้นลิ้นมังกร ดูแลง่าย ทนต่อสภาพแสงน้อย เหมาะสำหรับมือใหม่และสามารถนำไปวางในห้องนอนได้"
    },

    {
        id: 3,
        name: "Fiddle Leaf Fig",
        category: "indoor",
        categoryName: "ไม้ประดับ",
        price: 1290,
        oldPrice: 1590,
        image: "images/fiddle-leaf.jpg",
        rating: 5,
        reviews: 74,
        description:
            "ไทรใบสวยที่มีรูปทรงโดดเด่น เหมาะกับการตกแต่งบ้านสไตล์ Modern และ Minimal"
    },

    {
        id: 4,
        name: "Mini Cactus",
        category: "cactus",
        categoryName: "แคคตัส",
        price: 199,
        image: "images/cactus.jpg",
        rating: 5,
        reviews: 152,
        description:
            "แคคตัสขนาดเล็ก ดูแลง่าย ใช้พื้นที่น้อย เหมาะสำหรับโต๊ะทำงาน โต๊ะอ่านหนังสือ หรือห้องนอน"
    },

    {
        id: 5,
        name: "Golden Pothos",
        category: "air",
        categoryName: "ไม้ฟอกอากาศ",
        price: 350,
        image: "images/pothos.jpg",
        rating: 5,
        reviews: 83,
        description:
            "พลูด่างสีทอง เติบโตง่ายและสามารถช่วยเพิ่มความสดชื่นให้กับพื้นที่ภายในบ้าน"
    },

    {
        id: 6,
        name: "Mini Monstera",
        category: "small",
        categoryName: "ต้นไม้ขนาดเล็ก",
        price: 390,
        image: "images/monstera.jpg",
        rating: 5,
        reviews: 64,
        description:
            "Mini Monstera ขนาดกะทัดรัด เหมาะสำหรับผู้ที่ต้องการเพิ่มสีเขียวให้กับโต๊ะหรือพื้นที่เล็ก ๆ"
    }

];


/* =====================================================
   VARIABLES
===================================================== */

let cart = JSON.parse(
    localStorage.getItem("greenlyCart")
) || [];

let currentFilter = "all";

let currentProduct = null;


/* =====================================================
   DOM
===================================================== */

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const noProducts =
    document.getElementById("noProducts");

const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const emptyCart =
    document.getElementById("emptyCart");

const themeToggle =
    document.getElementById("themeToggle");

const productModal =
    document.getElementById("productModal");

const modalClose =
    document.getElementById("modalClose");

const toast =
    document.getElementById("toast");


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(price) {

    return new Intl.NumberFormat("th-TH", {

        style: "currency",

        currency: "THB",

        maximumFractionDigits: 0

    }).format(price);

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        products.filter(product => {

            const matchesCategory =
                currentFilter === "all" ||
                product.category === currentFilter;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    productGrid.innerHTML = "";


    filtered.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                ${
                    product.oldPrice
                    ?
                    `
                    <span class="badge sale">
                        -20%
                    </span>
                    `
                    :
                    ""
                }

                <button
                    class="favorite"
                    onclick="event.stopPropagation()"
                >
                    ♡
                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <span class="product-category">

                    ${product.categoryName}

                </span>


                <h3>

                    ${product.name}

                </h3>


                <div class="rating">

                    ⭐⭐⭐⭐⭐

                    <span>
                        (${product.reviews})
                    </span>

                </div>


                <div class="product-bottom">

                    <div>

                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                        ${
                            product.oldPrice
                            ?
                            `
                            <del>
                                ${formatPrice(product.oldPrice)}
                            </del>
                            `
                            :
                            ""
                        }

                    </div>


                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        🛒
                    </button>

                </div>

            </div>

        `;


        /* Click card = popup */

        card.addEventListener(
            "click",
            () => openProductModal(product.id)
        );


        productGrid.appendChild(card);

    });


    noProducts.style.display =
        filtered.length === 0
            ? "block"
            : "none";

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    renderProducts
);


/* =====================================================
   FILTER
===================================================== */

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                currentFilter =
                    button.dataset.filter;


                renderProducts();

            }
        );

    });


/* =====================================================
   CATEGORY CARDS
===================================================== */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                currentFilter =
                    card.dataset.category;


                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn => {

                        btn.classList.remove("active");

                        if (
                            btn.dataset.filter ===
                            currentFilter
                        ) {

                            btn.classList.add("active");

                        }

                    });


                document
                    .getElementById("shop")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                renderProducts();

            }
        );

    });


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    showToast(
        `🌿 เพิ่ม ${product.name} แล้ว`
    );

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    renderCart();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            item => item.id === productId
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    renderCart();

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display =
            "block";

    } else {

        emptyCart.style.display =
            "none";

    }


    let total = 0;

    let quantity = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        quantity +=
            item.quantity;


        const element =
            document.createElement("div");

        element.className =
            "cart-item";


        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <strong>
                    ${formatPrice(item.price)}
                </strong>


                <div class="quantity">

                    <button
                        onclick="
                            changeQuantity(
                                ${item.id},
                                -1
                            )
                        "
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="
                            changeQuantity(
                                ${item.id},
                                1
                            )
                        "
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="
                    removeFromCart(
                        ${item.id}
                    )
                "
            >
                ×
            </button>

        `;


        cartItems.appendChild(element);

    });


    cartCount.textContent =
        quantity;


    cartTotal.textContent =
        formatPrice(total);

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "greenlyCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   OPEN CART
===================================================== */

cartButton.addEventListener(
    "click",
    () => {

        cartSidebar.classList.add(
            "active"
        );

        cartOverlay.classList.add(
            "active"
        );

    }
);


/* =====================================================
   CLOSE CART
===================================================== */

function closeCartSidebar() {

    cartSidebar.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );

}


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =====================================================
   PRODUCT MODAL
===================================================== */

function openProductModal(productId) {

    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) return;


    currentProduct =
        product;


    document.getElementById(
        "modalImage"
    ).innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
        >

    `;


    document.getElementById(
        "modalCategory"
    ).textContent =
        product.categoryName;


    document.getElementById(
        "modalName"
    ).textContent =
        product.name;


    document.getElementById(
        "modalRating"
    ).textContent =
        `⭐⭐⭐⭐⭐ (${product.reviews})`;


    document.getElementById(
        "modalDescription"
    ).textContent =
        product.description;


    document.getElementById(
        "modalPrice"
    ).textContent =
        formatPrice(product.price);


    document.getElementById(
        "detailPageLink"
    ).href =
        `product.html?id=${product.id}`;


    productModal.classList.add(
        "active"
    );

}


/* =====================================================
   CLOSE MODAL
===================================================== */

modalClose.addEventListener(
    "click",
    () => {

        productModal.classList.remove(
            "active"
        );

    }
);


productModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            productModal
        ) {

            productModal.classList.remove(
                "active"
            );

        }

    }
);


/* =====================================================
   MODAL ADD CART
===================================================== */

document
    .getElementById("modalAddCart")
    .addEventListener(
        "click",
        () => {

            if (!currentProduct)
                return;


            addToCart(
                currentProduct.id
            );


            productModal.classList.remove(
                "active"
            );

        }
    );


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2200
    );

}


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const savedTheme =
    localStorage.getItem(
        "greenlyTheme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );

    themeToggle.textContent =
        "☀️";

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const dark =
            document.body.classList.contains(
                "dark"
            );


        themeToggle.textContent =
            dark
                ? "☀️"
                : "🌙";


        localStorage.setItem(
            "greenlyTheme",
            dark
                ? "dark"
                : "light"
        );

    }
);


/* =====================================================
   FALLING LEAVES
===================================================== */

const leafContainer =
    document.getElementById(
        "leafContainer"
    );


const leafTypes = [
    "🍃",
    "🌿",
    "🍂",
    "🌱"
];


for (
    let i = 0;
    i < 18;
    i++
) {

    const leaf =
        document.createElement(
            "span"
        );


    leaf.className =
        "falling-leaf";


    leaf.textContent =
        leafTypes[
            Math.floor(
                Math.random() *
                leafTypes.length
            )
        ];


    leaf.style.left =
        Math.random() * 100 +
        "%";


    leaf.style.animationDuration =
        8 +
        Math.random() * 12 +
        "s";


    leaf.style.animationDelay =
        Math.random() * 10 +
        "s";


    leaf.style.fontSize =
        12 +
        Math.random() * 18 +
        "px";


    leafContainer.appendChild(
        leaf
    );

}


/* =====================================================
   CHECKOUT
===================================================== */

document
    .getElementById(
        "checkoutButton"
    )
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "🛒 กรุณาเพิ่มสินค้าก่อน"
                );

                return;

            }


            showToast(
                "🌿 ระบบ Checkout พร้อมใช้งาน"
            );

        }
    );


/* =====================================================
   INITIALIZE
===================================================== */

renderProducts();

renderCart();

/* =====================================================
   👤 USER LOGIN STATUS
===================================================== */

const userButton =
    document.getElementById(
        "userButton"
    );


const currentUser =
    JSON.parse(
        localStorage.getItem(
            "greenlyCurrentUser"
        )
    );


if (
    currentUser &&
    userButton
) {

    userButton.innerHTML =
        `👤 ${currentUser.firstName}`;


    userButton.href =
        "#";


    userButton.addEventListener(
        "click",
        event => {

            event.preventDefault();


            const logout =
                confirm(
                    `สวัสดี ${currentUser.firstName} 🌿\n\nต้องการออกจากระบบหรือไม่?`
                );


            if (logout) {

                localStorage.removeItem(
                    "greenlyCurrentUser"
                );


                location.reload();

            }

        }
    );

}