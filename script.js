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
  const direction = document.querySelector("#rotate_up").checked ? "+=360" : "-=360";
  gsap.to(elements.shape, {
    rotate: direction,
    duration: 3 - speed,
    delay: 0.1,
    ease: "linear",
  });
});

// Flicker animation
const flicker = createAnimationPanel("flicker", "flicker_panel", "flicker_speed", (speed) => {
  gsap.to(elements.shape, {
    duration: 0.75 - speed * 0.35,
    delay: 0.1,
    opacity: 0.5,
    yoyo: true,
    repeat: 5,
    ease: "power1.out",
  });
});

// Baseline animation
const baseline = createAnimationPanel("baseline", "baseline_panel", "baseline_speed", (speed) => {
  gsap.to(elements.shape, {
    duration: 0.75 - speed * 0.3,
    delay: 0.1,
    y: "+=20",
    yoyo: true,
    repeat: 5,
    ease: "power1.out",
  });
});
