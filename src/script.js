var bgc_btn = document.querySelector("#bgc_btn");
var shape = document.querySelector("#shape");
var border_input = document.querySelector("#border_input");
var border_radius_input = document.querySelector("#border_radius_input");
var opacity_btn = document.querySelector("#opacity_input")

var size_plus_btn = document.querySelector("#size_plus_btn");
var size_minus_btn = document.querySelector("#size_minus_btn");

var height_btn = document.querySelector("#height_input");
var width_btn = document.querySelector("#width_input");

var reload_btn = document.querySelector("#reload_btn");

reload_btn.addEventListener("click", function () {
  gsap.to(height_btn, {
    value: 200,
    duration: 0.25,
  });

  gsap.to(width_btn, {
    value: 200,
    duration: 0.25,
  });

  gsap.to(border_input, {
    value: 0,
    duration: 0.25,
  });

  gsap.to(border_radius_input, {
    value: 200,
    duration: 0.25,
  });

  gsap.to(shape, {
    height: "200px",
    width: "200px",
    borderRadius: "100px",
    border: "0",
    duration: 0.25,
  });
});

bgc_btn.addEventListener("click", function () {
  var color_input_display = document.querySelector("#color_input");
  color_input_display.style.display = "flex";
  color_input_display.style.opacity = 1;

  var color_input = document.querySelector("#input_color");
  var color_output = document.querySelector("#hex_code");

  color_input.addEventListener("change", function () {
    // color_input_display.style.display = "none";

    gsap.to(color_input_display, {
      display: "none",
      duration: 0.5,

      opacity: 0,
    });

    color_output.textContent = color_input.value;

    gsap.to("#shape", {
      backgroundColor: color_input.value,
      duration: 0.1,

    });

    gsap.to("#bgc_btn", {
      backgroundColor: color_input.value,
      duration: 0.1,
      delay: 0.1,

    });

    gsap.to(border_input, {
      border: `2px solid ${color_input.value}`,
      duration: 0.1,
      delay: 0.1,

    });

    gsap.to(border_radius_input, {
      border: `2px solid ${color_input.value}`,
      duration: 0.1,
      delay: 0.1,

    });

    gsap.to(width_btn, {
      border: `2px solid ${color_input.value}`,
      duration: 0.1,
      delay: 0.1,

    });

    gsap.to(height_btn, {
      border: `2px solid ${color_input.value}`,
      duration: 0.1,
      delay: 0.1,

    });

    gsap.to(size_plus_btn, {
      backgroundColor: color_input.value,
      duration: 0.1,
      delay: 0.1,

    });

    gsap.to(size_minus_btn, {
      backgroundColor: color_input.value,
      duration: 0.1,
      delay: 0.1,

    });
  });
});

bgc_btn.addEventListener("mouseenter", function () {
  var hex_code = document.querySelector("#hex_code");
  hex_code.style.display = "flex";
});

bgc_btn.addEventListener("mouseleave", function () {
  var hex_code = document.querySelector("#hex_code");
  hex_code.style.display = "none";
});

border_input.addEventListener("change", function () {
  gsap.to(shape, {
    border: `${border_input.value}px solid black`,
    duration: 0.25,
  });
});

border_radius_input.addEventListener("change", function () {
  gsap.to(shape, {
    borderRadius: `${border_radius_input.value}px`,
    duration: 0.25,
  });
});

height_btn.addEventListener("change", function () {
  gsap.to(shape, {
    height: `${height_btn.value}px`,
    duration: 0.25,
  });
});

width_btn.addEventListener("change", function () {
  gsap.to(shape, {
    width: `${width_btn.value}px`,
    duration: 0.25,
  });
});

size_plus_btn.addEventListener("click", function () {
  var currentWidth = shape.offsetWidth;
  var currentHeight = shape.offsetHeight;

  width_btn.value = currentWidth + 10;
  height_btn.value = currentHeight + 10;

  gsap.to(shape, {
    width: `${currentWidth + 10}px`,
    height: `${currentHeight + 10}px`,
    duration: 0.25,
  });
});

size_minus_btn.addEventListener("click", function () {
  var currentWidth = shape.offsetWidth;
  var currentHeight = shape.offsetHeight;

  width_btn.value = currentWidth - 10;
  height_btn.value = currentHeight - 10;

  gsap.to(shape, {
    width: `${currentWidth - 10}px`,
    height: `${currentHeight - 10}px`,
    duration: 0.25,
  });
});

opacity_btn.addEventListener("click",function(){
  gsap.to(shape, {
    opacity: `${opacity_btn.value/100}`,
    duration: 0.25,
  });
})

var rise_btn = document.querySelector("#rise");
rise_btn.addEventListener("click", function () {
  gsap.from(shape, {
    y: "50%",
    opacity: 0,
    duration: 0.5,
    delay: 0.1,
  });
});

var pan_btn = document.querySelector("#pan");
pan_btn.addEventListener("click", function () {
  gsap.from(shape, {
    x: "-50%",
    opacity: 0,
    duration: 0.5,
    delay: 0.1,
  });
});

var fade_btn = document.querySelector("#fade");
fade_btn.addEventListener("click", function () {
  gsap.from(shape, {
    opacity: 0,
    duration: 1,
    delay: 0.1,
  });
});

var pop_btn = document.querySelector("#pop");
pop_btn.addEventListener("click", function () {
  gsap.from(shape, {
    scale: 1.5,
    duration: 0.75,
    ease: "bounce.out",
  });
});

var drift_btn = document.querySelector("#drift");
drift_btn.addEventListener("click", function () {
  gsap.from(shape, {
    x: "-50%",
    duration: 3,
    delay: 0.1,
  });
});

var rotate_btn = document.querySelector("#rotate");
rotate_btn.addEventListener("click", function () {
  gsap.to(shape, {
    rotate: "+=360",
    duration: 1,
    delay: 0.1,
    ease: "linear",
  });
});

var breathe_btn = document.querySelector("#breathe");
breathe_btn.addEventListener("click", function () {
  gsap.from(shape, {
    scale: 0.25,
    duration: 5,
    delay: 0.1,
    ease: "",
  });
});
