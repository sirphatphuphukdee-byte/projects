/* =====================================================
   🌿 GREENLY LOGIN
===================================================== */


const loginForm =
    document.getElementById(
        "loginForm"
    );


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value
                .trim()
                .toLowerCase();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        /* -----------------------------------------
           Get Users
        ----------------------------------------- */

        const users =
            JSON.parse(
                localStorage.getItem(
                    "greenlyUsers"
                )
            ) || [];


        /* -----------------------------------------
           Find User
        ----------------------------------------- */

        const user =
            users.find(
                item =>
                    item.email === email &&
                    item.password === password
            );


        if (!user) {

            showToast(
                "❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง"
            );

            return;

        }


        /* -----------------------------------------
           Login Success
        ----------------------------------------- */

        const loginUser = {

            id:
                user.id,

            firstName:
                user.firstName,

            lastName:
                user.lastName,

            email:
                user.email

        };


        localStorage.setItem(
            "greenlyCurrentUser",
            JSON.stringify(
                loginUser
            )
        );


        showToast(
            `🌿 ยินดีต้อนรับ ${user.firstName}`
        );


        setTimeout(
            () => {

                window.location.href =
                    "index.html";

            },
            1200
        );

    }
);


/* =====================================================
   PASSWORD
===================================================== */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );


    if (
        input.type ===
        "password"
    ) {

        input.type =
            "text";

        button.textContent =
            "🙈";

    } else {

        input.type =
            "password";

        button.textContent =
            "👁️";

    }

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


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
        2500
    );

}


/* =====================================================
   DARK MODE
===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


if (
    localStorage.getItem(
        "greenlyTheme"
    ) === "dark"
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
   🍃 LEAVES
===================================================== */

const leafContainer =
    document.getElementById(
        "leafContainer"
    );


const leaves = [
    "🍃",
    "🌿",
    "🍂",
    "🌱"
];


for (
    let i = 0;
    i < 15;
    i++
) {

    const leaf =
        document.createElement(
            "span"
        );


    leaf.className =
        "falling-leaf";


    leaf.textContent =
        leaves[
            Math.floor(
                Math.random() *
                leaves.length
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
        Math.random() * 8 +
        "s";


    leafContainer.appendChild(
        leaf
    );

}