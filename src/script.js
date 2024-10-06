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
var border_panel = document.querySelector("#border_panel")

reload_btn.addEventListener("click", function () {
  input_boxes.forEach(function (box) {
    gsap.to(box, {
      value: box.defaultValue,
      duration: 0.25,
    });
  });

  gsap.to(shape, {
    height: "200px",
    width: "200px",
    borderRadius: "0px",
    border: "0",
    duration: 0.25,
    opacity: 1,
    rotate: 0,
    x: 0,
    y: 0,
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

border_clr_btn.addEventListener("mouseenter",function(){
  border_panel.style.display = "flex"
  var hex_code = document.querySelector("#hex_code_border");
  hex_code.style.display = "flex";
})

border_panel.addEventListener("mouseleave",function(){
  border_panel.style.display = "none"
  var hex_code = document.querySelector("#hex_code_border");
  hex_code.style.display = "none"; 
})

border_clr_btn.addEventListener("click", function () {
  var color_input_border_display = document.querySelector(
    "#color_input_border"
  );
  color_input_border_display.style.display = "flex";
  color_input_border_display.style.opacity = 1;

  var color_input_border = document.querySelector("#input_color_border");
  var color_output_border = document.querySelector("#hex_code_border");

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
    
    if (effect!="none"){
      gsap.to(shape, {
        borderStyle: effect, 
        duration: 0.25,
      });
    }
    else{
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



var top_right_border = document.querySelector("#top_right_corner")
var top_left_border = document.querySelector("#top_left_corner")
var bottom_left_border = document.querySelector("#bottom_left_corner")
var bottom_right_border = document.querySelector("#bottom_right_corner")
var corners = [top_left_border, top_right_border, bottom_left_border, bottom_right_border]


top_left_border.addEventListener("change",function(){
  gsap.to(shape, {
    borderTopLeftRadius: `${top_left_border.value}px`, 
    duration: 0.25,
  });
})

top_right_border.addEventListener("change",function(){
  gsap.to(shape, {
    borderTopRightRadius: `${top_right_border.value}px`, 
    duration: 0.25,
  });
})

bottom_right_border.addEventListener("change",function(){
  gsap.to(shape, {
    borderBottomRightRadius: `${bottom_right_border.value}px`, 
    duration: 0.25,
  });
})

bottom_left_border.addEventListener("change",function(){
  gsap.to(shape, {
    borderBottomLeftRadius: `${bottom_left_border.value}px`, 
    duration: 0.25,
  });
})


var linked_border = document.querySelector("#linked_border")
var unlinked_border = document.querySelector("#unlinked_border")

var linking_flag = true;

unlinked_border.addEventListener("click", function(){
  linking_flag = false;
  gsap.to(shape, {
    borderRadius:border_radius_input.value,
    duration: 0.25,
  });
  corners.forEach(function(corner) {
    corner.disabled = false;
    corner.value = border_radius_input.value
    border_radius_input.disabled = true;
  });
})

linked_border.addEventListener("click", function(){
  linking_flag = true;
  corners.forEach(function(corner) {
    corner.disabled = true;
    border_radius_input.disabled = false;
  });

  let maxVal = Math.max(...corners.map(corner => corner.value)) || border_radius_input.value;

  gsap.to(shape, {
    borderTopLeftRadius: `${maxVal}px`,
    borderTopRightRadius: `${maxVal}px`,
    borderBottomLeftRadius: `${maxVal}px`,
    borderBottomRightRadius: `${maxVal}px`,
    duration: 0.25,
  })
})

if (linking_flag){
  corners.forEach(function(corner){
    corner.disabled = true;
    border_radius_input.disabled = false;
  })
}
