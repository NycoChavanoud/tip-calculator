let fromX, fromY;
function printDistances(e) {
  if (fromX && fromY) {
    console.log(`↔️ : ${Math.abs(fromX - e.pageX)}px`);
    console.log(`↕️ : ${Math.abs(fromY - e.pageY)}px`);
  }
  fromX = e.pageX;
  fromY = e.pageY;
}
document.body.addEventListener("mousedown", printDistances);

function initSlider({ img, rootSelector = "#app" }) {
  if (!document.querySelector(rootSelector)) {
    console.error(
      `no element selectable with "${rootSelector}" exists on this page, aborting slider initialization.`
    );
    return;
  }

  const slider = document.createElement("div");
  slider.innerHTML = `
  <div class="slider-container slider-container-left">
  </div>
  <div class="slider-container slider-container-right">
    <img src="${img}" class="slider-image" alt="" />
  </div>
  <div class="slider-handle"></div>
  `;

  slider.classList.add("slider");
  const handle = slider.querySelector(".slider-handle");
  const container = slider.querySelector(".slider-container-left");

  function handleMouseMove(event) {
    if (clicked) {
      const sliderPosition = (event.offsetX / slider.offsetWidth) * 100;
      const formattedSliderPosition = `${sliderPosition}%`;
      container.style.width = formattedSliderPosition;
      handle.style.left = formattedSliderPosition;
    }
  }

  slider.addEventListener("mousemove", handleMouseMove);

  let clicked = false;
  slider.addEventListener("click", (event) => {
    clicked = !clicked;
    handleMouseMove(event);
  });

  const body = document.querySelector("body");
  const left = slider.querySelector(".slider-container-left");
  left.innerHTML = body.innerHTML;
  body.innerHTML = "";
  body.appendChild(slider);

  const sliderImage = document.querySelector(".slider-image");
  const app = document.querySelector(rootSelector);

  sliderImage.onload = function () {
    app.style.width = `${this.naturalWidth}px`;
    body.style.minWidth = `${this.naturalWidth}px`;
    app.style.boxSizing = "border-box";
    slider.style.width = `${this.naturalWidth}px`;
    slider.style.height = `${this.naturalHeight}px`;
  };
}
