/* =========================================================
   FUKREY — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector("#mobile-menu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuToggle.classList.toggle("active", !isOpen);
            mobileMenu.classList.toggle("open");
        });


        /*
         * Close mobile menu when a navigation link
         * is selected.
         */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.classList.remove("active");
                mobileMenu.classList.remove("open");
            });

        });


        /*
         * Close menu with Escape.
         */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.classList.remove("active");
                mobileMenu.classList.remove("open");
            }

        });
    }


    /* =====================================================
       BRANCH SLIDER
       ===================================================== */

    const branchTrack =
        document.querySelector(".branch-track");

    const branchCards =
        document.querySelectorAll(".branch-card");

    const previousButton =
        document.querySelector(".slider-prev");

    const nextButton =
        document.querySelector(".slider-next");

    const dots =
        document.querySelectorAll(".slider-dot");


    if (
        branchTrack &&
        branchCards.length &&
        previousButton &&
        nextButton
    ) {

        let currentIndex = 0;


        /*
         * Calculate the correct scroll position
         * for a particular card.
         */

        const goToBranch = (index) => {

            if (index < 0) {
                index = branchCards.length - 1;
            }

            if (index >= branchCards.length) {
                index = 0;
            }

            currentIndex = index;

            const card = branchCards[currentIndex];

            branchTrack.scrollTo({
                left: card.offsetLeft,
                behavior: "smooth"
            });

            updateDots();
        };


        /*
         * Update active slider indicator.
         */

        const updateDots = () => {

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });
        };


        /*
         * Previous branch.
         */

        previousButton.addEventListener(
            "click",
            () => {
                goToBranch(currentIndex - 1);
            }
        );


        /*
         * Next branch.
         */

        nextButton.addEventListener(
            "click",
            () => {
                goToBranch(currentIndex + 1);
            }
        );


        /*
         * Dot navigation.
         */

        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {
                goToBranch(index);
            });

        });


        /*
         * Update the active dot when the user
         * manually swipes the carousel.
         */

        let scrollTimeout;

        branchTrack.addEventListener(
            "scroll",
            () => {

                window.clearTimeout(scrollTimeout);

                scrollTimeout = window.setTimeout(() => {

                    let closestIndex = 0;
                    let smallestDistance = Infinity;

                    branchCards.forEach(
                        (card, index) => {

                            const distance =
                                Math.abs(
                                    branchTrack.scrollLeft -
                                    card.offsetLeft
                                );

                            if (
                                distance <
                                smallestDistance
                            ) {
                                smallestDistance = distance;
                                closestIndex = index;
                            }

                        }
                    );

                    currentIndex = closestIndex;
                    updateDots();

                }, 80);

            },
            { passive: true }
        );

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, .category-card, .branches-layout, .contact-container"
    );


    /*
     * Add reveal class to elements.
     */

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    /*
     * IntersectionObserver is much more efficient
     * than listening to scroll events continuously.
     */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        /*
         * Fallback for older browsers.
         */

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       CATEGORY CARD MICRO-INTERACTION
       ===================================================== */

    const categoryCards =
        document.querySelectorAll(".category-card");


    categoryCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.classList.add("is-hovered");
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.classList.remove("is-hovered");
            }
        );

    });


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".site-header");


    if (header) {

        let lastScrollY = window.scrollY;

        window.addEventListener(
            "scroll",
            () => {

                const currentScrollY =
                    window.scrollY;


                if (currentScrollY > 30) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }


                lastScrollY = currentScrollY;

            },
            { passive: true }
        );

    }

});