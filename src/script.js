var bgc_btn = document.querySelector("#bgc_btn");
var border_clr_btn = document.querySelector("#border_clr_btn");
var shape = document.querySelector("#shape");
var border_input = document.querySelector("#border_input");
var border_radius_input = document.querySelector("#border_radius_input");
var opacity_btn = document.querySelector("#opacity_input");

var size_plus_btn = document.querySelector("#size_plus_btn");
var size_minus_btn = document.querySelector("#size_minus_btn");

var height_btn = document.querySelector("#height_input");
var width_btn = document.querySelector("#width_input");

var reload_btn = document.querySelector("#reload_btn");

var x_pos = document.querySelector("#x_input");
var y_pos = document.querySelector("#y_input");
var deg_btn = document.querySelector("#deg_input");

var input_boxes = document.querySelectorAll('input[type="number"]');
var border_panel = document.querySelector("#border_panel");

var shapes_panel = document.querySelector("#shapes_container");
var animations_panel = document.querySelector("#animations_container");

reload_btn.addEventListener("click", function () {
  input_boxes.forEach(function (box) {
    gsap.to(box, {
      value: box.defaultValue,
      duration: 0.25,
    });
  });

  border_radius_input.disabled = false;
  border_input.disabled = false;
  border_clr_btn.style.pointerEvents = "auto";

  gsap.to(shape, {
    height: "200px",
    width: "200px",
    borderRadius: "0px",
    border: "0",
    duration: 0.5,
    opacity: 1,
    rotate: 0,
    x: 0,
    y: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
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

    input_boxes.forEach(function (box) {
      gsap.to(box, {
        border: `2px solid ${color_input.value}`,
        duration: 0.1,
        delay: 0.1,
      });
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

border_clr_btn.addEventListener("mouseenter", function () {
  border_panel.style.display = "flex";
  var hex_code = document.querySelector("#hex_code_border");
  hex_code.style.display = "flex";
});

border_panel.addEventListener("mouseleave", function () {
  border_panel.style.display = "none";
  var hex_code = document.querySelector("#hex_code_border");
  hex_code.style.display = "none";
});

border_clr_btn.addEventListener("click", function () {
  var color_input_border_display = document.querySelector(
    "#color_input_border"
  );
  color_input_border_display.style.display = "flex";
  color_input_border_display.style.opacity = 1;

  // var color_input_border = document.querySelector("#input_color_border");
  // var color_output_border = document.querySelector("#hex_code_border");

  // color_input_border.addEventListener("change", function () {

  //   gsap.to(color_input_border_display, {
  //     display: "none",
  //     duration: 0.5,
  //     opacity: 0,
  //   });
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

x_pos.addEventListener("change", function () {
  gsap.to(shape, {
    x: `${x_pos.value}px`,
    duration: 0.25,
  });
});

y_pos.addEventListener("change", function () {
  gsap.to(shape, {
    y: `${y_pos.value}px`,
    duration: 0.25,
  });
});

deg_btn.addEventListener("change", function () {
  gsap.to(shape, {
    rotate: `${deg_btn.value}deg`,
    duration: 0.25,
  });
});

opacity_btn.addEventListener("change", function () {
  gsap.to(shape, {
    opacity: `${opacity_btn.value / 100}`,
    duration: 0.25,
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

// var block_border = document.querySelector("#block_border")
// var normal_border = document.querySelector("#normal_border")
// var dashed_border = document.querySelector("#dashed_border")
// var dotted_border = document.querySelector("#dotted_border")
// var double_border = document.querySelector("#double_border")

var border_types = document.querySelectorAll(".b_type");
border_types.forEach(function (border, i) {
  border.addEventListener("click", function () {
    let effect;
    switch (i) {
      case 0:
        effect = "none";
        break;
      case 1:
        effect = "solid";
        break;
      case 2:
        effect = "dashed";
        break;
      case 3:
        effect = "dotted";
        break;
      case 4:
        effect = "double";
        break;
      default:
        effect = "solid";
        break;
    }

    if (effect != "none") {
      gsap.to(shape, {
        borderStyle: effect,
        duration: 0.25,
      });
    } else {
      gsap.to(shape, {
        borderStyle: effect,
        duration: 0.25,
      });
      gsap.to(border_input, {
        value: 0,
        duration: 0.25,
      });
    }
  });
});

var top_right_border = document.querySelector("#top_right_corner");
var top_left_border = document.querySelector("#top_left_corner");
var bottom_left_border = document.querySelector("#bottom_left_corner");
var bottom_right_border = document.querySelector("#bottom_right_corner");
var corners = [
  top_left_border,
  top_right_border,
  bottom_left_border,
  bottom_right_border,
];

top_left_border.addEventListener("change", function () {
  gsap.to(shape, {
    borderTopLeftRadius: `${top_left_border.value}px`,
    duration: 0.25,
  });
});

top_right_border.addEventListener("change", function () {
  gsap.to(shape, {
    borderTopRightRadius: `${top_right_border.value}px`,
    duration: 0.25,
  });
});

bottom_right_border.addEventListener("change", function () {
  gsap.to(shape, {
    borderBottomRightRadius: `${bottom_right_border.value}px`,
    duration: 0.25,
  });
});

bottom_left_border.addEventListener("change", function () {
  gsap.to(shape, {
    borderBottomLeftRadius: `${bottom_left_border.value}px`,
    duration: 0.25,
  });
});

var linked_border = document.querySelector("#linked_border");
var unlinked_border = document.querySelector("#unlinked_border");

var linking_flag = true;

unlinked_border.addEventListener("click", function () {
  linking_flag = false;
  gsap.to(shape, {
    borderRadius: border_radius_input.value,
    duration: 0.25,
  });
  corners.forEach(function (corner) {
    corner.disabled = false;
    corner.value = border_radius_input.value;
    border_radius_input.disabled = true;
  });
});

linked_border.addEventListener("click", function () {
  linking_flag = true;
  corners.forEach(function (corner) {
    corner.disabled = true;
    border_radius_input.disabled = false;
  });

  let maxVal =
    Math.max(...corners.map((corner) => corner.value)) ||
    border_radius_input.value;

  gsap.to(shape, {
    borderTopLeftRadius: `${maxVal}px`,
    borderTopRightRadius: `${maxVal}px`,
    borderBottomLeftRadius: `${maxVal}px`,
    borderBottomRightRadius: `${maxVal}px`,
    duration: 0.25,
  });
});

if (linking_flag) {
  corners.forEach(function (corner) {
    corner.disabled = true;
    border_radius_input.disabled = false;
  });
}

var left_panel_heading = document.querySelector("#left_panel_heading");

var shape_btn = document.querySelector("#shape_btn");
shape_btn.addEventListener("click", function () {
  border_radius_input.disabled = true;
  border_input.disabled = true;
  border_clr_btn.style.pointerEvents = "none";

  gsap.to(shapes_panel, {
    display: "flex",
    delay: 0.1,
  });

  gsap.to(animations_panel, {
    display: "none",
    duration: 0.1,
  });

  gsap.to(left_panel_heading, {
    textContent: "Shapes",
  });

  gsap.to(shape, {
    border:0,
    borderRadius: 0,
  });
});

var animate_btn = document.querySelector("#animate_btn");
animate_btn.addEventListener("click", function () {
  gsap.to(shapes_panel, {
    display: "none",
    duration: 0.1,
  });

  gsap.to(animations_panel, {
    display: "flex",
    delay: 0.1,
  });

  gsap.to(left_panel_heading, {
    textContent: "Animations",
  });
});

var up_triangle = document.querySelector("#up_triangle");
up_triangle.addEventListener("click", function () {
  gsap.to(shape, {
    duration: 0.5,
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
  })
});

var down_triangle = document.querySelector("#down_triangle");
down_triangle.addEventListener("click", function () {
  gsap.to(shape, {
    duration: 0.5,
    clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
  })
});

var diamond = document.querySelector("#diamond");
diamond.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: "0%",
    duration: 0.5,
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  })
});

var pentagon = document.querySelector("#pentagon");
pentagon.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  })
});

var hexagon_01 = document.querySelector("#hexagon_01");
hexagon_01.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  })
});

var hexagon_02 = document.querySelector("#hexagon_02");
hexagon_02.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
  })
});

var octagon_01 = document.querySelector("#octagon_01");
octagon_01.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  })
});

var octagon_02 = document.querySelector("#octagon_02");
octagon_02.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 40%, 100% 60%, 70% 100%, 30% 100%, 0% 60%, 0% 40%)",
  })
});

var star = document.querySelector("#star");
star.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath:
      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  })
});

var circle = document.querySelector("#circle");
circle.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath: "circle(50% at 50% 50%)",
  })
});

var rise_btn = document.querySelector("#rise");
var rise_panel = document.querySelector("#rise_panel");
var rise_speed = document.querySelector("#rise_speed");
var speed = 1.5

rise_panel.addEventListener("mouseleave", function () {
  rise_panel.style.display = "none";
});

rise_btn.addEventListener("click", function () {
  rise_panel.style.display = "flex";

  var rise_direction;

  var rise_up_btn = document.querySelector("#rise_up");
  var rise_down_btn = document.querySelector("#rise_down");

  rise_speed.addEventListener("change", function () {
    speed = rise_speed.value;
  });

  rise_up_btn.addEventListener("click", function () {
    rise_direction = "50%";
    triggerGSAPAnimation(rise_direction);
  });

  rise_down_btn.addEventListener("click", function () {
    rise_direction = "-50%";
    triggerGSAPAnimation(rise_direction);
  });
});

function triggerGSAPAnimation(direction) {
  gsap.from(shape, {
    y: direction,
    opacity: 0,
    duration: 2.25-speed,
    delay: 0.1,
  });
}

var pan_btn = document.querySelector("#pan");
var pan_panel = document.querySelector("#pan_panel");
var pan_speed = document.querySelector("#pan_speed");
var p_speed = 1.5

pan_panel.addEventListener("mouseleave", function () {
  pan_panel.style.display = "none";
});

pan_btn.addEventListener("click", function () {
  pan_panel.style.display = "flex";

  var pan_direction;

  var pan_up_btn = document.querySelector("#pan_up");
  var pan_down_btn = document.querySelector("#pan_down");

  pan_speed.addEventListener("change", function () {
    p_speed = pan_speed.value;
  });

  pan_up_btn.addEventListener("click", function () {
    pan_direction = "50%";
    triggerGSAPAnimationPan(pan_direction);
  });

  pan_down_btn.addEventListener("click", function () {
    pan_direction = "-50%";
    triggerGSAPAnimationPan(pan_direction);
  });
});

function triggerGSAPAnimationPan(pan_direction) {
  gsap.from(shape, {
    x: pan_direction,
    opacity: 0,
    duration: 2.25-p_speed,
    delay: 0.1,
  });
}

var fade_btn = document.querySelector("#fade");
var fade_panel = document.querySelector("#fade_panel");
var fade_speed = document.querySelector("#fade_speed");
var f_speed = 1.5

fade_panel.addEventListener("mouseleave", function () {
  fade_panel.style.display = "none";
});

fade_btn.addEventListener("click", function () {
  fade_panel.style.display = "flex";

  fade_speed.addEventListener("change", function () {
    f_speed = fade_speed.value;
    triggerGSAPAnimationFade(f_speed);
  });
});

function triggerGSAPAnimationFade(f_speed) {
  gsap.from(shape, {
    opacity: 0,
    duration: 2.25-f_speed,
    delay: 0.1,
  });
}

var pop_btn = document.querySelector("#pop");
var pop_panel = document.querySelector("#pop_panel");
var pop_speed = document.querySelector("#pop_speed");
var po_speed = 1.5

pop_panel.addEventListener("mouseleave", function () {
  pop_panel.style.display = "none";
});

pop_btn.addEventListener("click", function () {
  pop_panel.style.display = "flex";

  pop_speed.addEventListener("change", function () {
    po_speed = pop_speed.value;
    triggerGSAPAnimationPop(po_speed);
  });
});

function triggerGSAPAnimationPop(po_speed) {
  gsap.from(shape, {
    duration: 2.25-po_speed,
    delay: 0.1,
    scale: 1.5,
    ease: "bounce.out",
  });
}
