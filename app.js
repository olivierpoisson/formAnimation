const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");
const timeline = gsap.timeline({ defaults: { duration: 1 } });

const start =
    "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const end =
    "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

containers.forEach((container) => {
    const input = container.querySelector("input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

    input.addEventListener("focus", () => {
        //? Check to see if there is any text in the input
        if (!input.value) {
            timeline.fromTo(
                line,
                { attr: { d: start } },
                { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
            );
            timeline.to(
                line,
                {
                    attr: { d: start },
                    ease: "elastic.out(3, 0.5)",
                },
                "<50%"
            );
            timeline.to(
                placeholder,
                {
                    top: -15,
                    left: 0,
                    scale: 0.7,
                    duration: 0.5,
                    ease: "Power2.easeOut",
                },
                "<15%"
            );
        }
    });
});

form.addEventListener("click", () => {
    containers.forEach((container) => {
        const input = container.querySelector("input");
        const line = container.querySelector(".elastic-line");
        const placeholder = container.querySelector(".placeholder");

        if (document.activeElement !== input) {
            if (!input.value) {
                //? If it's empty
                gsap.to(placeholder, {
                    top: 0,
                    left: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.easeOut",
                });
            }
        }
        input.addEventListener("input", (e) => {
            //? Name validation
            if (e.target.type === "text") {
                let text = e.target.value;
                if (text.length > 2) {
                    colorize("#6391e8", line, placeholder);
                } else {
                    colorize("#fe8c99", line, placeholder);
                }
            }
            //? Email validation

            if (e.target.type === "email") {
                let valid = validateEmail(e.target.value);
                if (valid) {
                    colorize("#6391e8", line, placeholder);
                } else {
                    colorize("#fe8c99", line, placeholder);
                }
            }
            //? Telephone validation

            if (e.target.type === "tel") {
                let valid = validatePhone(e.target.value);
                if (valid) {
                    colorize("#6391e8", line, placeholder);
                } else {
                    colorize("#fe8c99", line, placeholder);
                }
            }
        });
    });
});

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
}

function colorize(color, line, placeholder) {
    gsap.to(line, { stroke: color, duration: 0.75 });
    gsap.to(placeholder, { color: color, duration: 0.75 });
}

//! Checkbox animation fill
const checkbox = document.querySelector(".checkbox");
const timeline2 = gsap.timeline({
    defaults: { duration: 0.5, eaase: "Power2.easeOut" },
});
const tickmarkPath = document.querySelector(".tick-mark path");
const pathLength = tickmarkPath.getTotalLength();

gsap.set(tickmarkPath, {
    strokeDashoffset: pathLength,
    strokeDasharray: pathLength,
});

checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
        timeline2.to(".checkbox-fill", { top: "0%" });
        timeline2.fromTo(
            tickmarkPath,
            { strokeDashoffset: pathLength },
            { strokeDashoffset: 0 },
            "<50%"
        );
        timeline2.to(".checkbox-label", { color: "#6391e8" }, "<");
    } else {
        timeline2.to(".checkbox-fill", { top: "100%" });
        timeline2.fromTo(
            tickmarkPath,
            { strokeDashoffset: 0 },
            { strokeDashoffset: pathLength },
            "<50%"
        );
        timeline2.to(".checkbox-label", { color: "#c5c5c5" }, "<");
    }
});

gsap.set("#eye", { transformOrigin: "center" });
gsap.fromTo(
    "#eye",
    { scaleY: 1 },
    {
        scaleY: 0.3,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
        ease: "Power2.easeOut",
    }
);
gsap.fromTo(
    "#eyebrow",
    { y: 0 },
    {
        y: -1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
        ease: "Power2.easeOut",
    }
);
