
document.addEventListener("DOMContentLoaded", () => {
const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector("#mobile-menu");

    if (menuToggle && mobileMenu) {

        const closeMenu = () => {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("open");
        };


        const openMenu = () => {
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.classList.add("active");
            mobileMenu.classList.add("open");
        };


        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });
const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });
document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });
document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMenu();
            }

        });

    }
const branchTrack =
        document.querySelector(".branch-track");

    const branchCards =
        document.querySelectorAll(".branch-card");

    const previousButton =
        document.querySelector(".slider-prev");

    const nextButton =
        document.querySelector(".slider-next");

    const branchDots =
        document.querySelectorAll(".slider-dot");


    if (
        branchTrack &&
        branchCards.length &&
        previousButton &&
        nextButton
    ) {

        let currentIndex = 0;
const updateBranchDots = () => {

            branchDots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });

        };
const goToBranch = (index) => {

            if (index < 0) {
                index = branchCards.length - 1;
            }

            if (index >= branchCards.length) {
                index = 0;
            }

            currentIndex = index;

            const card =
                branchCards[currentIndex];

            if (!card) {
                return;
            }

            branchTrack.scrollTo({
                left: card.offsetLeft,
                behavior: "smooth"
            });

            updateBranchDots();

        };
previousButton.addEventListener(
            "click",
            () => {
                goToBranch(currentIndex - 1);
            }
        );
nextButton.addEventListener(
            "click",
            () => {
                goToBranch(currentIndex + 1);
            }
        );
branchDots.forEach((dot, index) => {

            dot.addEventListener(
                "click",
                () => {
                    goToBranch(index);
                }
            );

        });
let scrollTimeout = null;

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

                                smallestDistance =
                                    distance;

                                closestIndex =
                                    index;

                            }

                        }
                    );

                    currentIndex =
                        closestIndex;

                    updateBranchDots();

                }, 100);

            },
            {
                passive: true
            }
        );

    }
const revealElements =
        document.querySelectorAll(
            [
                ".section-heading",
                ".category-card",
                ".footwear-card",
                ".branches-layout",
                ".contact-container"
            ].join(", ")
        );


    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

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

                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "visible"
            );

        });

    }
const categoryCards =
        document.querySelectorAll(
            ".category-card, .footwear-card"
        );


    categoryCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "is-hovered"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "is-hovered"
                );

            }
        );

    });
const header =
        document.querySelector(".site-header");


    if (header) {

        const updateHeader =
            () => {

                if (window.scrollY > 30) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            };


        updateHeader();


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );

    }
const navigationLinks =
        document.querySelectorAll(
            '.desktop-nav a, .mobile-nav a'
        );


    const sections =
        document.querySelectorAll(
            "#mens-wear, #footwear, #branches, #contact"
        );


    if (
        navigationLinks.length &&
        sections.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        navigationLinks.forEach(
                            (link) => {

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );

                                link.classList.toggle(
                                    "active",
                                    href === `#${id}`
                                );

                            }
                        );

                    });

                },
                {
                    threshold: 0.35
                }
            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }
const lazyImages =
        document.querySelectorAll(
            'img[loading="lazy"]'
        );


    lazyImages.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });
document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "ArrowLeft" &&
                document.activeElement === heroPrevious
            ) {

                heroPrevious?.click();

            }


            if (
                event.key === "ArrowRight" &&
                document.activeElement === heroNext
            ) {

                heroNext?.click();

            }

        }
    );

});