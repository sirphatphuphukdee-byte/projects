/* =====================================================
   🌿 PRODUCT DETAIL
===================================================== */

const products = [

    {
        id: 1,
        name: "Monstera Deliciosa",
        category: "ไม้ประดับ",
        price: 890,
        image: "images/monstera.jpg",
        rating: 5,
        reviews: 128,
        description:
            "Monstera Deliciosa เป็นไม้ประดับยอดนิยมที่มีใบขนาดใหญ่และมีรอยแฉกเป็นเอกลักษณ์ เหมาะสำหรับตกแต่งห้องนั่งเล่น ห้องทำงาน และพื้นที่ภายในบ้าน",
        care: [
            "แสงสว่างแบบรำไร",
            "รดน้ำเมื่อดินเริ่มแห้ง",
            "อากาศถ่ายเทได้ดี",
            "ควรเช็ดใบเป็นประจำ"
        ]
    },

    {
        id: 2,
        name: "Snake Plant",
        category: "ไม้ฟอกอากาศ",
        price: 490,
        image: "images/snake-plant.jpg",
        rating: 5,
        reviews: 96,
        description:
            "Snake Plant หรือลิ้นมังกร เป็นหนึ่งในต้นไม้ที่ดูแลง่ายมาก เหมาะสำหรับผู้เริ่มต้นและพื้นที่ที่มีแสงน้อย",
        care: [
            "อยู่ได้ทั้งแสงมากและแสงน้อย",
            "รดน้ำประมาณ 1 ครั้งต่อสัปดาห์",
            "หลีกเลี่ยงน้ำขัง",
            "ไม่ต้องดูแลบ่อย"
        ]
    },

    {
        id: 3,
        name: "Fiddle Leaf Fig",
        category: "ไม้ประดับ",
        price: 1290,
        image: "images/fiddle-leaf.jpg",
        rating: 5,
        reviews: 74,
        description:
            "Fiddle Leaf Fig หรือไทรใบสัก มีใบขนาดใหญ่สวยงาม เหมาะกับการตกแต่งบ้านสไตล์ Modern และ Minimal",
        care: [
            "ต้องการแสงสว่าง",
            "รดน้ำเมื่อดินแห้ง",
            "ควรวางใกล้หน้าต่าง",
            "หลีกเลี่ยงการเปลี่ยนตำแหน่งบ่อย"
        ]
    },

    {
        id: 4,
        name: "Mini Cactus",
        category: "แคคตัส",
        price: 199,
        image: "images/cactus.jpg",
        rating: 5,
        reviews: 152,
        description:
            "Mini Cactus ขนาดกะทัดรัด ดูแลง่าย ใช้พื้นที่น้อย เหมาะสำหรับโต๊ะทำงาน โต๊ะอ่านหนังสือ หรือห้องนอน",
        care: [
            "ต้องการแสงค่อนข้างมาก",
            "รดน้ำเมื่อดินแห้งสนิท",
            "ใช้ดินระบายน้ำดี",
            "หลีกเลี่ยงน้ำขัง"
        ]
    }

];


const params =
    new URLSearchParams(
        window.location.search
    );


const id =
    Number(
        params.get("id")
    );


const product =
    products.find(
        item => item.id === id
    );


const container =
    document.getElementById(
        "productDetail"
    );


if (!product) {

    container.innerHTML = `

        <div class="no-products">

            🌱

            <h3>
                ไม่พบสินค้า
            </h3>

            <a
                href="index.html"
                class="btn btn-primary"
            >
                กลับหน้าร้าน
            </a>

        </div>

    `;

} else {

    container.innerHTML = `

        <div class="product-detail">


            <div class="detail-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="detail-info">

                <span class="detail-category">

                    ${product.category}

                </span>


                <h1>

                    ${product.name}

                </h1>


                <div class="detail-rating">

                    ⭐⭐⭐⭐⭐

                    <span>
                        ${product.reviews} รีวิว
                    </span>

                </div>


                <p class="detail-description">

                    ${product.description}

                </p>


                <div class="detail-price">

                    ฿${product.price.toLocaleString()}

                </div>


                <div class="detail-divider"></div>


                <h3>
                    🌱 วิธีดูแล
                </h3>


                <ul class="care-list">

                    ${product.care
                        .map(
                            item =>
                                `
                                <li>
                                    ${item}
                                </li>
                                `
                        )
                        .join("")
                    }

                </ul>


                <div class="detail-actions">

                    <button
                        class="btn btn-primary"
                        onclick="
                            addProductToCart()
                        "
                    >
                        🛒 เพิ่มลงตะกร้า
                    </button>


                    <a
                        href="index.html#shop"
                        class="btn btn-outline"
                    >
                        ← กลับไปเลือกสินค้า
                    </a>

                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   ADD TO CART
===================================================== */

function addProductToCart() {

    let cart =
        JSON.parse(
            localStorage.getItem(
                "greenlyCart"
            )
        ) || [];


    const existing =
        cart.find(
            item => item.id === product.id
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


    localStorage.setItem(
        "greenlyCart",
        JSON.stringify(cart)
    );


    alert(
        `🌿 เพิ่ม ${product.name} ลงตะกร้าแล้ว`
    );

}


/* =====================================================
   DARK MODE
===================================================== */

const themeButton =
    document.getElementById(
        "productTheme"
    );


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

    themeButton.textContent =
        "☀️";

}


themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const dark =
            document.body.classList.contains(
                "dark"
            );


        themeButton.textContent =
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