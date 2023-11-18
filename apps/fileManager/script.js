let header = document.getElementById("header");
let pth = document.getElementById("path");
let pthInput = document.getElementById("pathInput");

header.onclick = () => {
  if (pthInput.classList.contains("active")) {
    pthInput.classList.remove("active");
  }
  if (!pth.classList.contains("active")) {
    pth.classList.add("active");
  }
};

pth.onclick = (e) => {
  e.stopPropagation();
  if (!pthInput.classList.contains("active")) {
    pthInput.classList.add("active");
  }
  if (pth.classList.contains("active")) {
    pth.classList.remove("active");
  }
  let spans = pth.querySelectorAll("span");
  let values = [];
  spans.forEach((span) => {
    values.push(span.innerText);
  });
  pthInput.querySelector("input").value = values.join("/");
  pthInput.querySelector("input").focus();
};

pthInput.onclick = (e) => {
  e.stopPropagation();
  pthInput.querySelector("input").focus();
};

pthInput.querySelector("input").onkeyup = (e) => {
  var event = window.event || e.which;
  if (event.keyCode == 13) {
    let input = pthInput.querySelector("input").value.split("/");
    document.getElementById("path").innerHTML = "";

    let elems = [];
    input.forEach((word, index) => {
      if (word != "" && word != " ") {
        console.log(word != "", word);
        let spn = document.createElement("span");
        spn.innerText = word;
        elems.push(spn);
        let img = document.createElement("img");
        img.src = "../../assets/forward.png";
        elems.push(img);
      }
    });

    if (
      elems[elems.length - 1] &&
      elems[elems.length - 1].tagName &&
      elems[elems.length - 1].tagName.toLowerCase() === "img"
    ) {
      elems.pop();
    }

    elems.forEach((elem) => {
      document.getElementById("path").appendChild(elem);
    });

    if (pthInput.classList.contains("active")) {
      pthInput.classList.remove("active");
    }
    if (!pth.classList.contains("active")) {
      pth.classList.add("active");
    }
  }
};