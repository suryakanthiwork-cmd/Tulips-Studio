/* =====================================================
   TULIPS STUDIO
   INTERACTIVE EXPERIENCE
===================================================== */


/* =====================================================
   LOADER
===================================================== */

const loader = document.getElementById("loader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderPercent = document.getElementById("loaderPercent");

let loading = 0;

const loadingTimer = setInterval(() => {

    loading += Math.random() * 8;

    if (loading >= 100) {

        loading = 100;

        clearInterval(loadingTimer);

        setTimeout(() => {

            loader.classList.add("hidden");

            document.body.classList.remove("loading");

        }, 500);

    }

    loaderProgress.style.width = loading + "%";

    loaderPercent.textContent =
        Math.floor(loading) + "%";

}, 100);


/* =====================================================
   PHOTO DATA
===================================================== */

const photos = [

    {
        image:
        "images/wedding.jpg",
        title:
        "Wedding Moments"
    },

    {
        image:
        "images/themed.jpg",
        title:
        "Themed photography"
    },

    {
        image:
        "images/fashion.jpg",
        title:
        "Fashion Portraits"
    },

    {
        image:
        "images/maternity.jpg",
        title:
        "maternity"
    },

    {
        image:
        "images/portrait.jpg",
        title:
        "Portraits"
    },

    {
        image:
        "images/sports.jpg",
        title:
        "Sports Photography"
    },

    {
        image:
        "images/interior.jpg",
        title:
        "Villa Interiors"
    },

    {
        image:
        "images/food.jpg",
        title:
        "Food Photography"
    },

    {
        image:
        "images/corporate.jpg",
        title:
        "Corporate Portraits"
    }

];


/* =====================================================
   CREATE PHOTO CARDS
===================================================== */

const track =
    document.getElementById("photoTrack");


function createPhoto(photo, index) {

    const card =
        document.createElement("div");

    card.className =
        "hanging-photo";


    const clip =
        document.createElement("div");

    clip.className =
        "photo-clip";


    const image =
        document.createElement("img");

    image.src =
        photo.image;

    image.alt =
        photo.title;


    const title =
        document.createElement("div");

    title.className =
        "photo-name";

    title.textContent =
        photo.title;


    card.appendChild(clip);

    card.appendChild(image);

    card.appendChild(title);


    /*
       Give every card slightly
       different rotation.
    */

    const rotations = [
        -3,
        2,
        -2,
        3,
        -1,
        2
    ];

    card.style.setProperty(
        "--rotation",
        rotations[index % rotations.length] + "deg"
    );


    return card;

}


/* =====================================================
   BUILD THE TRACK
===================================================== */

function buildPhotoWall() {

    /*
       Create several copies.

       Multiple copies are important
       because this gives us a
       continuous infinite-looking
       animation.
    */

    for (let repeat = 0; repeat < 3; repeat++) {

        photos.forEach((photo, index) => {

            const card =
                createPhoto(
                    photo,
                    index
                );

            track.appendChild(card);

        });

    }

}

buildPhotoWall();


/* =====================================================
   CONTINUOUS PHOTO MOVEMENT
===================================================== */

let position = 0;

let speed = 0.35;

let paused = false;


/*
   Calculate approximate width
   of one complete photo set.
*/

function getSetWidth() {

    const cards =
        track.querySelectorAll(
            ".hanging-photo"
        );

    if (!cards.length) {
        return 0;
    }

    const firstCard =
        cards[0];

    const lastCard =
        cards[photos.length - 1];


    return (
        lastCard.offsetLeft +
        lastCard.offsetWidth -
        firstCard.offsetLeft +
        34
    );

}


let setWidth = 0;


/*
   Update width after
   page loads.
*/

window.addEventListener(
    "load",
    () => {

        setWidth =
            getSetWidth();

    }
);


/* =====================================================
   ANIMATION LOOP
===================================================== */

function movePhotos() {

    if (!paused) {

        position -= speed;


        /*
           When one complete
           set has passed,
           jump back by exactly
           one set width.

           Because the same images
           are repeated, the user
           never sees the reset.
        */

        if (
            setWidth > 0 &&
            Math.abs(position) >= setWidth
        ) {

            position += setWidth;

        }

        track.style.transform =
            `translate3d(
                ${position}px,
                0,
                0
            )`;

    }


    requestAnimationFrame(
        movePhotos
    );

}

movePhotos();


/* =====================================================
   PAUSE WHEN HOVERING
===================================================== */

track.addEventListener(
    "mouseenter",
    () => {

        paused = true;

    }
);


track.addEventListener(
    "mouseleave",
    () => {

        paused = false;

    }
);


/* =====================================================
   TOUCH / MOBILE
===================================================== */

let touchStart = 0;

let touchLast = 0;


track.addEventListener(
    "touchstart",
    (event) => {

        touchStart =
            event.touches[0].clientX;

        touchLast =
            touchStart;

    },
    {
        passive: true
    }
);


track.addEventListener(
    "touchmove",
    (event) => {

        const current =
            event.touches[0].clientX;

        const difference =
            current - touchLast;

        position += difference;

        touchLast = current;

    },
    {
        passive: true
    }
);


/* =====================================================
   FAQ
===================================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach((item) => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    question.addEventListener(
        "click",
        () => {


            /*
               Close other FAQ items
            */

            faqItems.forEach(
                (other) => {

                    if (
                        other !== item
                    ) {

                        other.classList.remove(
                            "active"
                        );

                    }

                }
            );


            /*
               Toggle selected item
            */

            item.classList.toggle(
                "active"
            );

        }
    );

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

    }
);


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

            }
        );

    });


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar =
    document.getElementById(
        "navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 50
        ) {

            navbar.style.boxShadow =
                "0 5px 25px rgba(0,0,0,.06)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }
);


/* =====================================================
   CAMERA MOUSE PARALLAX
===================================================== */

const camera =
    document.querySelector(
        ".camera"
    );


const cameraStage =
    document.querySelector(
        ".camera-stage"
    );


if (
    window.innerWidth > 900 &&
    camera &&
    cameraStage
) {

    cameraStage.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                cameraStage.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateY =
                ((x / rect.width) - .5) * 18;


            const rotateX =
                ((y / rect.height) - .5) * -12;


            camera.style.animation =
                "none";


            camera.style.transform =
                `
                translateY(-8px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    cameraStage.addEventListener(
        "mouseleave",
        () => {

            camera.style.animation =
                "cameraFloat 5s ease-in-out infinite";

        }
    );

}


/* =====================================================
   IMAGE PRELOADING
===================================================== */

photos.forEach(
    (photo) => {

        const img =
            new Image();

        img.src =
            photo.image;

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".service-card, .work-item, .testimonial, .project-row"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    (element) => {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        revealObserver.observe(
            element
        );

    }
);


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        setWidth =
            getSetWidth();

    }
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%cTULIPS STUDIO",
    "font-family:serif;font-size:30px"
);

console.log(
    "Photography • Films • Stories"
);