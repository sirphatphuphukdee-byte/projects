/* =====================================================
   🌿 GREENLY REGISTER
===================================================== */


/* =====================================================
   REGISTER
===================================================== */

const registerForm =
    document.getElementById(
        "registerForm"
    );


registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const firstName =
            document.getElementById(
                "firstName"
            ).value.trim();


        const lastName =
            document.getElementById(
                "lastName"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim().toLowerCase();


        const password =
            document.getElementById(
                "password"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        const terms =
            document.getElementById(
                "terms"
            ).checked;


        /* -----------------------------------------
           Check Password
        ----------------------------------------- */

        if (password.length < 8) {

            showToast(
                "🔒 รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
            );

            return;

        }


        /* -----------------------------------------
           Check Password Match
        ----------------------------------------- */

        if (
            password !==
            confirmPassword
        ) {

            showToast(
                "❌ รหัสผ่านไม่ตรงกัน"
            );

            return;

        }


        /* -----------------------------------------
           Check Terms
        ----------------------------------------- */

        if (!terms) {

            showToast(
                "⚠️ กรุณายอมรับข้อกำหนดการใช้งาน"
            );

            return;

        }


        /* -----------------------------------------
           Get Users
        ----------------------------------------- */

        let users =
            JSON.parse(
                localStorage.getItem(
                    "greenlyUsers"
                )
            ) || [];


        /* -----------------------------------------
           Check Existing Email
        ----------------------------------------- */

        const emailExists =
            users.some(
                user =>
                    user.email === email
            );


        if (emailExists) {

            showToast(
                "❌ อีเมลนี้ถูกใช้ไปแล้ว"
            );

            return;

        }


        /* -----------------------------------------
           Create User
        ----------------------------------------- */

        const newUser = {

            id:
                Date.now(),

            firstName:
                firstName,

            lastName:
                lastName,

            email:
                email,

            password:
                password,

            createdAt:
                new Date().toISOString()

        };


        users.push(
            newUser
        );


        /* -----------------------------------------
           Save
        ----------------------------------------- */

        localStorage.setItem(
            "greenlyUsers",
            JSON.stringify(users)
        );


        /* -----------------------------------------
           Success
        ----------------------------------------- */

        showToast(
            "🌱 สมัครสมาชิกสำเร็จ!"
        );


        setTimeout(
            () => {

                window.location.href =
                    "login.html";

            },
            1500
        );

    }
);


/* =====================================================
   PASSWORD TOGGLE
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
   🌙 DARK MODE
===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
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
   🍃 FALLING LEAVES
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