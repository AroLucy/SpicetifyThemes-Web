var cssMap = {
  //css Map
};

let ulElement = document.querySelector("ul.RSg3qFREWrqWCuUvDpJR");
if (ulElement) {
  let liElement = document.createElement("li");
  liElement.classList.add("eNs6P3JYpf2LScgTDHc6");

  let aElement = document.createElement("a");
  aElement.classList.add("link-subtle");
  aElement.classList.add("ATUzFKub89lzvkmvhpyE");

  let spanElement = document.createElement("span");
  spanElement.classList.add("Type__TypeElement-sc-goli3j-0");
  spanElement.classList.add("jdSGNV");
  spanElement.classList.add("ellipsis-one-line");
  spanElement.innerHTML = "Spicetify";
  aElement.appendChild(spanElement);

  liElement.appendChild(aElement);
  ulElement.appendChild(liElement);

  let popout = null;
  liElement.addEventListener("click", function () {
    if (popout) {
      popout.remove();
      popout = null;
    } else {
      popout = document.createElement("div");
      popout.classList.add("popout");

      let input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter URL";

      let button = document.createElement("button");
      button.innerHTML = "Apply Stylesheet";

      button.addEventListener("click", function () {
        let url = input.value;
        applyStylesheetFromURL(url);
      });

      popout.appendChild(input);
      popout.appendChild(button);

      ulElement.appendChild(popout);

      let popoutRect = popout.getBoundingClientRect();
      let liRect = liElement.getBoundingClientRect();

      popout.style.top = liRect.bottom + "px";
      popout.style.left = liRect.left - popoutRect.width + "5px";
    }
  });
}

function applyStylesheetFromURL(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      let result = data;
      for (const [key, value] of Object.entries(cssMap)) {
        result = result.split(value).join(key);
      }
      const styleEl = document.createElement("style");
      styleEl.textContent = result;
      const headEl = document.getElementsByTagName("head")[0];
      headEl.appendChild(styleEl);
    })
    .catch((error) => console.error(error));
}
