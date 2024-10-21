// Select DOM elements
const elements = {
  bgc_btn: document.querySelector("#bgc_btn"),
  border_clr_btn: document.querySelector("#border_clr_btn"),
  shape: document.querySelector("#shape"),
  border_input: document.querySelector("#border_input"),
  border_radius_input: document.querySelector("#border_radius_input"),
  opacity_btn: document.querySelector("#opacity_input"),
  size_plus_btn: document.querySelector("#size_plus_btn"),
  size_minus_btn: document.querySelector("#size_minus_btn"),
  height_btn: document.querySelector("#height_input"),
  width_btn: document.querySelector("#width_input"),
  reload_btn: document.querySelector("#reload_btn"),
  x_pos: document.querySelector("#x_input"),
  y_pos: document.querySelector("#y_input"),
  deg_btn: document.querySelector("#deg_input"),
  input_boxes: document.querySelectorAll('input[type="number"]'),
  border_panel: document.querySelector("#border_panel"),
  shapes_panel: document.querySelector("#shapes_container"),
  animations_panel: document.querySelector("#animations_container")
};

// Helper function for GSAP animations
function animateShape(properties, duration = 0.25) {
  gsap.to(elements.shape, { ...properties, duration });
}

// Reset function
elements.reload_btn.addEventListener("click", function () {
  elements.input_boxes.forEach(box => {
    gsap.to(box, { value: box.defaultValue, duration: 0.25 });
  });

  elements.border_radius_input.disabled = false;
  elements.border_input.disabled = false;
  elements.border_clr_btn.style.pointerEvents = "auto";

  animateShape({
    height: "200px",
    width: "200px",
    borderRadius: "0px",
    border: "0",
    opacity: 1,
    rotate: 0,
    x: 0,
    y: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  }, 0.5);
});

// Background color change
elements.bgc_btn.addEventListener("click", function () {
  const color_input_display = document.querySelector("#color_input");
  color_input_display.style.display = "flex";
  color_input_display.style.opacity = 1;

  const color_input = document.querySelector("#input_color");
  const color_output = document.querySelector("#hex_code");

  color_input.addEventListener("change", function () {
    gsap.to(color_input_display, {
      display: "none",
      duration: 0.5,
      opacity: 0,
    });

    color_output.textContent = color_input.value;

    animateShape({ backgroundColor: color_input.value }, 0.1);

    gsap.to("#bgc_btn", {
      backgroundColor: color_input.value,
      duration: 0.1,
      delay: 0.1,
    });

    elements.input_boxes.forEach(box => {
      gsap.to(box, {
        border: `2px solid ${color_input.value}`,
        duration: 0.1,
        delay: 0.1,
      });
    });

    [elements.size_plus_btn, elements.size_minus_btn].forEach(btn => {
      gsap.to(btn, {
        backgroundColor: color_input.value,
        duration: 0.1,
        delay: 0.1,
      });
    });
  });
});

// Hover effects for color buttons
[
  { btn: elements.bgc_btn, code: "#hex_code" },
  { btn: elements.border_clr_btn, code: "#hex_code_border", panel: elements.border_panel }
].forEach(({ btn, code, panel }) => {
  btn.addEventListener("mouseenter", () => {
    document.querySelector(code).style.display = "flex";
    if (panel) panel.style.display = "flex";
  });

  if (panel) {
    panel.addEventListener("mouseleave", () => {
      panel.style.display = "none";
      document.querySelector(code).style.display = "none";
    });
  } else {
    btn.addEventListener("mouseleave", () => {
      document.querySelector(code).style.display = "none";
    });
  }
});

// Border color change
elements.border_clr_btn.addEventListener("click", function () {
  const color_input_border_display = document.querySelector("#color_input_border");
  color_input_border_display.style.display = "flex";
  color_input_border_display.style.opacity = 1;
});

// Shape property changes
elements.border_input.addEventListener("change", () => animateShape({ border: `${elements.border_input.value}px solid black` }));
elements.border_radius_input.addEventListener("change", () => animateShape({ borderRadius: `${elements.border_radius_input.value}px` }));
elements.height_btn.addEventListener("change", () => animateShape({ height: `${elements.height_btn.value}px` }));
elements.width_btn.addEventListener("change", () => animateShape({ width: `${elements.width_btn.value}px` }));

// Size buttons
[elements.size_plus_btn, elements.size_minus_btn].forEach((btn, index) => {
  btn.addEventListener("click", function () {
    const change = index === 0 ? 10 : -10;
    const currentWidth = elements.shape.offsetWidth;
    const currentHeight = elements.shape.offsetHeight;

    elements.width_btn.value = currentWidth + change;
    elements.height_btn.value = currentHeight + change;

    animateShape({
      width: `${currentWidth + change}px`,
      height: `${currentHeight + change}px`
    });
  });
});

// Position and rotation changes
elements.x_pos.addEventListener("change", () => animateShape({ x: `${elements.x_pos.value}px` }));
elements.y_pos.addEventListener("change", () => animateShape({ y: `${elements.y_pos.value}px` }));
elements.deg_btn.addEventListener("change", () => animateShape({ rotate: `${elements.deg_btn.value}deg` }));
elements.opacity_btn.addEventListener("change", () => animateShape({ opacity: `${elements.opacity_btn.value / 100}` }));

// Animation buttons
const animations = {
  fade: shape => ({ opacity: 0, duration: 1, delay: 0.1 }),
  pop: shape => ({ scale: 1.5, duration: 0.75, ease: "bounce.out" }),
  rotate: shape => ({ rotate: "+=360", duration: 1, delay: 0.1, ease: "linear" }),
  breathe: shape => ({ scale: 0.25, duration: 5, delay: 0.1 }),
  flicker: shape => ({ duration: 0.1, delay: 0.1, opacity: 0.5, yoyo: true, repeat: 5, ease: "power1.out" })
};

Object.entries(animations).forEach(([name, animation]) => {
  document.querySelector(`#${name}`).addEventListener("click", () => {
    gsap.from(elements.shape, animation(elements.shape));
  });
});

// Border types
const borderTypes = ["none", "solid", "dashed", "dotted", "double"];
document.querySelectorAll(".b_type").forEach((border, i) => {
  border.addEventListener("click", function () {
    const effect = borderTypes[i] || "solid";
    if (effect !== "none") {
      animateShape({ borderStyle: effect });
    } else {
      animateShape({ borderStyle: effect });
      gsap.to(elements.border_input, { value: 0, duration: 0.25 });
    }
  });
});

// Corner radius controls
const corners = ["top_left", "top_right", "bottom_left", "bottom_right"].map(id => document.querySelector(`#${id}_corner`));
corners.forEach((corner, index) => {
  corner.addEventListener("change", function () {
    const property = `border${["TopLeft", "TopRight", "BottomLeft", "BottomRight"][index]}Radius`;
    animateShape({ [property]: `${corner.value}px` });
  });
});

// Linked/Unlinked border radius
let linking_flag = true;
const linked_border = document.querySelector("#linked_border");
const unlinked_border = document.querySelector("#unlinked_border");

unlinked_border.addEventListener("click", function () {
  linking_flag = false;
  animateShape({ borderRadius: elements.border_radius_input.value });
  corners.forEach(corner => {
    corner.disabled = false;
    corner.value = elements.border_radius_input.value;
  });
  elements.border_radius_input.disabled = true;
});

linked_border.addEventListener("click", function () {
  linking_flag = true;
  corners.forEach(corner => {
    corner.disabled = true;
  });
  elements.border_radius_input.disabled = false;

  const maxVal = Math.max(...corners.map(corner => corner.value)) || elements.border_radius_input.value;
  animateShape({
    borderTopLeftRadius: `${maxVal}px`,
    borderTopRightRadius: `${maxVal}px`,
    borderBottomLeftRadius: `${maxVal}px`,
    borderBottomRightRadius: `${maxVal}px`,
  });
});

if (linking_flag) {
  corners.forEach(corner => {
    corner.disabled = true;
  });
  elements.border_radius_input.disabled = false;
}

// Shape and Animation panels
const left_panel_heading = document.querySelector("#left_panel_heading");

document.querySelector("#shape_btn").addEventListener("click", function () {
  elements.border_radius_input.disabled = true;
  elements.border_input.disabled = true;
  elements.border_clr_btn.style.pointerEvents = "none";

  gsap.to(elements.shapes_panel, { display: "flex", delay: 0.1 });
  gsap.to(elements.animations_panel, { display: "none", duration: 0.1 });
  gsap.to(left_panel_heading, { textContent: "Shapes" });
  animateShape({ border: 0, borderRadius: 0 });
});

document.querySelector("#animate_btn").addEventListener("click", function () {
  gsap.to(elements.shapes_panel, { display: "none", duration: 0.1 });
  gsap.to(elements.animations_panel, { display: "flex", delay: 0.1 });
  gsap.to(left_panel_heading, { textContent: "Animations" });
});

// Shape buttons
const shapes = {
  up_triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
  down_triangle: "polygon(50% 100%, 0% 0%, 100% 0%)",
  diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  hexagon_01: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  hexagon_02: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
  octagon_01: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  octagon_02: "polygon(30% 0%, 70% 0%, 100% 40%, 100% 60%, 70% 100%, 30% 100%, 0% 60%, 0% 40%)",
  star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  circle: "circle(50% at 50% 50%)"
};

Object.entries(shapes).forEach(([id, clipPath]) => {
  document.querySelector(`#${id}`).addEventListener("click", () => {
    animateShape({ clipPath, borderRadius: id === "circle" ? "50%" : 0 });
  });
});

// Advanced animation controls
function createAnimationPanel(btnId, panelId, speedInputId, animationFunction) {
  const btn = document.querySelector(`#${btnId}`);
  const panel = document.querySelector(`#${panelId}`);
  const speedInput = document.querySelector(`#${speedInputId}`);
  let speed = 1.5;

  panel.addEventListener("mouseleave", () => panel.style.display = "none");

  btn.addEventListener("click", () => {
    panel.style.display = "flex";
    speedInput.addEventListener("change", () => {
      speed = parseFloat(speedInput.value);
      animationFunction(speed);
    });
  });

  return { btn, panel, speedInput, speed };
}

// Rise animation
const rise = createAnimationPanel("rise", "rise_panel", "rise_speed", (speed) => {
  const direction = document.querySelector("#rise_up").checked ? "50%" : "-50%";
  gsap.from(elements.shape, {
    y: direction,
    opacity: 0,
    duration: 2.25 - speed,
    delay: 0.1,
  });
});

// Pan animation
const pan = createAnimationPanel("pan", "pan_panel", "pan_speed", (speed) => {
  const direction = document.querySelector("#pan_up").checked ? "50%" : "-50%";
  gsap.from(elements.shape, {
    x: direction,
    opacity: 0,
    duration: 2.25 - speed,
    delay: 0.1,
  });
});

// Fade animation
const fade = createAnimationPanel("fade", "fade_panel", "fade_speed", (speed) => {
  gsap.from(elements.shape, {
    opacity: 0,
    duration: 2.25 - speed,
    delay: 0.1,
  });
});

// Pop animation
const pop = createAnimationPanel("pop", "pop_panel", "pop_speed", (speed) => {
  gsap.from(elements.shape, {
    duration: 2.25 - speed,
    delay: 0.1,
    scale: 1.5,
    ease: "bounce.out",
  });
});

// Breathe animation
const breathe = createAnimationPanel("breathe", "breathe_panel", "breathe_speed", (speed) => {
  const direction = document.querySelector("#breathe_up").checked ? 1.5 : 0.25;
  gsap.from(elements.shape, {
    scale: direction,
    duration: 2.25 - speed,
    delay: 0.1,
  });
});

// Drift animation
const drift = createAnimationPanel("drift", "drift_panel", "drift_speed", (speed) => {
  let direction;
  if (document.querySelector("#drift_up").checked) direction = { y: "75%" };
  else if (document.querySelector("#drift_down").checked) direction = { y: "-75%" };
  else if (document.querySelector("#drift_right").checked) direction = { x: "-75%" };
  else direction = { x: "75%" };

  gsap.from(elements.shape, {
    ...direction,
    duration: 2.25 - speed,
    delay: 0.1,
  });
});

// Rotate animation
const rotate = createAnimationPanel("rotate", "rotate_panel", "rotate_speed", (speed) => {
var pop_btn = document.querySelector("#pop");
pop_btn.addEventListener("click", function () {
  gsap.from(shape, {
    scale: 1.5,
    duration: 0.75,
    ease: "bounce.out",
  });
});

// var drift_btn = document.querySelector("#drift");
// drift_btn.addEventListener("click", function () {
//   gsap.from(shape, {
//     x: "-50%",
//     duration: 3,
//     delay: 0.1,
//   });
// });

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
  });
});

var flicker_btn = document.querySelector("#flicker");
flicker_btn.addEventListener("click", function () {
  gsap.to(shape, {
    duration: 0.1,
    delay: 0.1,
    opacity: 0.5,
    yoyo: true,
    repeat: 5,
    ease: "power1.out",
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
    border: 0,
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
  });
});

var down_triangle = document.querySelector("#down_triangle");
down_triangle.addEventListener("click", function () {
  gsap.to(shape, {
    duration: 0.5,
    clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
  });
});

var diamond = document.querySelector("#diamond");
diamond.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: "0%",
    duration: 0.5,
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  });
});

var pentagon = document.querySelector("#pentagon");
pentagon.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  });
});

var hexagon_01 = document.querySelector("#hexagon_01");
hexagon_01.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  });
});

var hexagon_02 = document.querySelector("#hexagon_02");
hexagon_02.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
  });
});

var octagon_01 = document.querySelector("#octagon_01");
octagon_01.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  });
});

var octagon_02 = document.querySelector("#octagon_02");
octagon_02.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 40%, 100% 60%, 70% 100%, 30% 100%, 0% 60%, 0% 40%)",
  });
});

var star = document.querySelector("#star");
star.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath:
      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  });
});

var circle = document.querySelector("#circle");
circle.addEventListener("click", function () {
  gsap.to(shape, {
    borderRadius: 0,
    duration: 0.5,
    clipPath: "circle(50% at 50% 50%)",
  });
});

var rise_btn = document.querySelector("#rise");
var rise_panel = document.querySelector("#rise_panel");
var rise_speed = document.querySelector("#rise_speed");
var speed = 1.5;

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
    duration: 2.25 - speed,
    delay: 0.1,
  });
}

var pan_btn = document.querySelector("#pan");
var pan_panel = document.querySelector("#pan_panel");
var pan_speed = document.querySelector("#pan_speed");
var p_speed = 1.5;

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
    duration: 2.25 - p_speed,
    delay: 0.1,
  });
}

var fade_btn = document.querySelector("#fade");
var fade_panel = document.querySelector("#fade_panel");
var fade_speed = document.querySelector("#fade_speed");
var f_speed = 1.5;

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
    duration: 2.25 - f_speed,
    delay: 0.1,
  });
}

var pop_btn = document.querySelector("#pop");
var pop_panel = document.querySelector("#pop_panel");
var pop_speed = document.querySelector("#pop_speed");
var po_speed = 1.5;

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
    duration: 2.25 - po_speed,
    delay: 0.1,
    scale: 1.5,
    ease: "bounce.out",
  });
}

var breathe_btn = document.querySelector("#breathe");
var breathe_panel = document.querySelector("#breathe_panel");
var breathe_speed = document.querySelector("#breathe_speed");
var b_speed = 1.5;

breathe_panel.addEventListener("mouseleave", function () {
  breathe_panel.style.display = "none";
});

breathe_btn.addEventListener("click", function () {
  breathe_panel.style.display = "flex";

  var breathe_direction;

  var breathe_up_btn = document.querySelector("#breathe_up");
  var breathe_down_btn = document.querySelector("#breathe_down");

  breathe_speed.addEventListener("change", function () {
    b_speed = breathe_speed.value;
  });

  breathe_up_btn.addEventListener("click", function () {
    breathe_direction = -1;
    triggerGSAPAnimation(breathe_direction);
  });

  breathe_down_btn.addEventListener("click", function () {
    breathe_direction = 1;
    triggerGSAPAnimationBreathe(breathe_direction);
  });
});

function triggerGSAPAnimationBreathe(breathe_direction) {
  breathe_direction == 1
    ? gsap.from(shape, {
        scale: 0.25,
        duration: 2.25 - b_speed,
        delay: 0.1,
      })
    : gsap.from(shape, {
        scale: 1.5,
        duration: 2.25 - b_speed,
        delay: 0.1,
      });
}

var drift_btn = document.querySelector("#drift");
var drift_panel = document.querySelector("#drift_panel");
var drift_speed = document.querySelector("#drift_speed");
var dri_speed = 1.5;

drift_panel.addEventListener("mouseleave", function () {
  drift_panel.style.display = "none";
});

drift_btn.addEventListener("click", function () {
  drift_panel.style.display = "flex";

  var drift_direction;

  var drift_up_btn = document.querySelector("#drift_up");
  var drift_down_btn = document.querySelector("#drift_down");
  var drift_right_btn = document.querySelector("#drift_right");
  var drift_left_btn = document.querySelector("#drift_left");

  drift_speed.addEventListener("change", function () {
    dri_speed = drift_speed.value;
  });

  drift_up_btn.addEventListener("click", function () {
    drift_direction = 1;
    triggerGSAPAnimationDrift(drift_direction);
  });

  drift_down_btn.addEventListener("click", function () {
    drift_direction = 2;
    triggerGSAPAnimationDrift(drift_direction);
  });

  drift_right_btn.addEventListener("click", function () {
    drift_direction = 3;
    triggerGSAPAnimationDrift(drift_direction);
  });

  drift_left_btn.addEventListener("click", function () {
    drift_direction = 4;
    triggerGSAPAnimationDrift(drift_direction);
  });
});

function triggerGSAPAnimationDrift(drift_direction) {
  switch (drift_direction) {
    case 1:
      gsap.from(shape, {
        y: "75%",
        duration: 2.25 - dri_speed,
        delay: 0.1,
      });
      break;

    case 2:
      gsap.from(shape, {
        y: "-75%",
        duration: 2.25 - dri_speed,
        delay: 0.1,
      });
      break;

    case 3:
      gsap.from(shape, {
        x: "-75%",
        duration: 2.25 - dri_speed,
        delay: 0.1,
      });
      break;

    case 4:
      gsap.from(shape, {
        x: "75%",
        duration: 2.25 - dri_speed,
        delay: 0.1,
      });
      break;

    default:
      break;
  }
}

var rotate_btn = document.querySelector("#rotate");
var rotate_panel = document.querySelector("#rotate_panel");
var rotate_speed = document.querySelector("#rotate_speed");
var r_speed = 1.5;

rotate_panel.addEventListener("mouseleave", function () {
  rotate_panel.style.display = "none";
});

rotate_btn.addEventListener("click", function () {
  rotate_panel.style.display = "flex";

  var rotate_direction;

  var rotate_up_btn = document.querySelector("#rotate_up");
  var rotate_down_btn = document.querySelector("#rotate_down");

  rotate_speed.addEventListener("change", function () {
    r_speed = parseFloat(rotate_speed.value);
  });

  rotate_up_btn.addEventListener("click", function () {
    rotate_direction = -1;
    triggerGSAPAnimationRotate(rotate_direction);
  });

  rotate_down_btn.addEventListener("click", function () {
    rotate_direction = 1;
    triggerGSAPAnimationRotate(rotate_direction);
  });
});

function triggerGSAPAnimationRotate(rotate_direction) {
  gsap.to(shape, {
    rotate: rotate_direction === 1 ? "+=360" : "-=360",
    duration: 3 - r_speed,
    delay: 0.1,
    ease: "linear",
  });
}

var flicker_btn = document.querySelector("#flicker");
var flicker_panel = document.querySelector("#flicker_panel");
var flicker_speed = document.querySelector("#flicker_speed");
var fl_speed = 1.5;

flicker_panel.addEventListener("mouseleave", function () {
  flicker_panel.style.display = "none";
});

flicker_btn.addEventListener("click", function () {
  flicker_panel.style.display = "flex";

  flicker_speed.addEventListener("change", function () {
    fl_speed = parseFloat(flicker_speed.value);
    triggerGSAPAnimationFlicker(fl_speed);
  });
});

function triggerGSAPAnimationFlicker(fl_speed) {
  gsap.to(shape, {
    duration: 0.75 - fl_speed * 0.35,
    delay: 0.1,
    opacity: 0.5,
    yoyo: true,
    repeat: 5,
    ease: "power1.out",
  });
}

var baseline_btn = document.querySelector("#baseline");
var baseline_panel = document.querySelector("#baseline_panel");
var baseline_speed = document.querySelector("#baseline_speed");
var bl_speed = 1.5;

baseline_panel.addEventListener("mouseleave", function () {
  baseline_panel.style.display = "none";
});

baseline_btn.addEventListener("click", function () {
  baseline_panel.style.display = "flex";

  baseline_speed.addEventListener("change", function () {
    bl_speed = parseFloat(baseline_speed.value);
    triggerGSAPAnimationBaseline(bl_speed);
  });
});

function triggerGSAPAnimationBaseline(bl_speed) {
  gsap.to(shape, {
    duration: 0.75 - bl_speed * 0.3,
    delay: 0.1,
    y: "+=20",
    yoyo: true,
    repeat: 5,
    ease: "power1.out",
  });
}
