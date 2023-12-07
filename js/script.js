// block ctrl + r

document.addEventListener("keydown", async (event) => {
  if (event.ctrlKey && (event.key === "r" || event.code === "KeyR")) {
    event.preventDefault();
  }
});

// Custom left click

const leftClick = async (e) => {
  e.preventDefault();
  console.log("left click");
  document.getElementById("contextMenu").style.display = "none";
  await toggleSearchMenu(e);
};

// custom right click

const rightClick = (e) => {
  e.preventDefault();
  let menu = document.getElementById("contextMenu");
  if (document.getElementById("contextMenu").style.display == "block") {
    leftClick(e);
  }
  let clickX = e.clientX;
  let clickY = e.clientY;
  let gap = 15;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  menu.style.opacity = 0;
  menu.style.display = "block";
  menu.style.left = `${clickX + gap}px`;
  menu.style.top = `${clickY + gap}px`;
  console.log(menu.getBoundingClientRect());
  let rect = menu.getBoundingClientRect();
  if (rect.right > windowWidth) {
    menu.style.left = `${clickX - (rect.width + gap)}px`;
  }

  if (rect.bottom > windowHeight) {
    menu.style.top = `${clickY - (rect.height + gap)}px`;
  }
  menu.style.opacity = 1;
};

// document.onclick = leftClick;
// document.oncontextmenu = leftClick;
document.querySelector(".bar").onclick = leftClick;
document.querySelector(".bar").oncontextmenu = leftClick;
document.getElementById("apps").onclick = leftClick;
document.getElementById("apps").oncontextmenu = rightClick;

// toggle full screen

function toggleFullScreen() {
  var elem = document.documentElement;
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
}

function showFullScreenAlert() {
  if (sessionStorage.getItem('fullScreenAlertShown') !== 'true') {
    showAlert('System', 'Experience more in full screen', '', toggleFullScreen);
    sessionStorage.setItem('fullScreenAlertShown', 'true');
  }
}

if (!document.fullscreenElement &&
  !document.mozFullScreenElement &&
  !document.webkitFullscreenElement &&
  !document.msFullscreenElement) {
  showFullScreenAlert();
}




// observer for DOM changes

const observer = new MutationObserver(function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach(function (node) {
        node.childNodes.forEach((nd) => {
          if (nd.nodeName === "IFRAME") {
            attachEventHandlers(nd);
            console.log(RunningApps);
          }
        });
      });
    }
  }
});

observer.observe(document, { childList: true, subtree: true });

// add event listeners on apps

function attachEventHandlers(iframe) {
  iframe.contentWindow.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("indisbyubib");
    leftClick(e);
  });
  iframe.contentWindow.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    rightClick(e);
  });
  iframe.contentWindow.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key === "r" || event.code === "KeyR")) {
      event.preventDefault();
    }
  });
}

// get brightness from bg image

function getMaximumColorFromBackgroundAndSetText(element, textElement) {
  const backgroundImage = getComputedStyle(element).backgroundImage;
  const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, "$1");
  const img = new Image();
  img.src = imageUrl;
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let maxBrightness = 0;
    let maxBrightnessPixel = null;
    for (let i = 0; i < imageData.data.length; i += 4) {
      const brightness =
        imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
      if (brightness > maxBrightness) {
        maxBrightness = brightness;
        maxBrightnessPixel = imageData.data.subarray(i, i + 4);
      }
    }
    textElement.style.color = `rgb(${maxBrightnessPixel[0]}, ${maxBrightnessPixel[1]}, ${maxBrightnessPixel[2]})`;
  };
}

const desktopElement = document.querySelector(".desktop");
const myText = document.getElementById("date");

getMaximumColorFromBackgroundAndSetText(desktopElement, myText);

// open or close search menu

const toggleSearchMenu = async (e) => {
  let searchMenu = document.getElementById("menu");
  let searchInput = document.getElementById("searchInput");
  let inputContainer = document.getElementById("searchInputContainer");
  let clickX = e.clientX;
  let clickY = e.clientY;
  let inpRect = inputContainer.getBoundingClientRect();
  let clickedOnSearch =
    clickX > inpRect.left &&
    clickX < inpRect.right &&
    clickY > inpRect.top &&
    clickY < inpRect.bottom;
  if (clickedOnSearch) {
    if (searchMenu.style.display != "flex") {
      searchMenu.style.display = "flex";
      searchInput.focus();
      await getNews();
    } else {
      searchMenu.style.display = "none";
    }
  } else {
    let menuRect = searchMenu.getBoundingClientRect();
    let clickedOnMenu =
      clickX > menuRect.left &&
      clickX < menuRect.right &&
      clickY > menuRect.top &&
      clickY < menuRect.bottom;
    if (!clickedOnMenu) {
      searchMenu.style.display = "none";
    }
  }
};

// search app on menu

function searchMenuApp(value) {
  let searchapp = document.querySelectorAll(".search-app-list li");
  let foundcount = 0;

  searchapp.forEach((e) => {
    let appName = e.querySelector("p").textContent;

    if (
      value.length === 0 ||
      appName.toUpperCase().indexOf(value.toUpperCase()) > -1
    ) {
      e.style.display = "flex";
      foundcount++;
    } else {
      e.style.display = "none";
    }
  });

  if (foundcount > 0) {
    document.querySelector(".search-app-list .not-available").style.display =
      "none";
  } else {
    document.querySelector(".search-app-list .not-available").style.display =
      "flex";
      showNotification('system-error',"no app found")
  }
}

// get news

let defaultKeyWords = [
  "india",
  "AI",
  "machine",
  "Science",
  "Technology",
  "earth",
  "games",
];

const getNews = async (keyword) => {
  if (!keyword) {
    keyword =
      defaultKeyWords[Math.floor(Math.random() * defaultKeyWords.length)];
  }
  try {
    document.getElementById("articles-container").innerHTML = "";
    let preloader = document.createElement("div");
    preloader.classList.add("articlePreloader");
    let loader = document.createElement("div");
    loader.classList.add("loader");
    preloader.appendChild(loader);
    document.getElementById("articles-container").appendChild(preloader);
    const url = "https://eventregistry.org/api/v1/article/getArticles";
    const data = `{
      "action": "getArticles",
      "keyword": "${keyword}",
      "articlesPage": 1,
      "articlesCount": 5,
      "articlesSortBy": "date",
      "articlesSortByAsc": false,
      "articlesArticleBodyLen": -1,
      "resultType": "articles",
      "dataType": [
        "news",
        "pr"
      ],
      "apiKey": "f2bb630d-ceca-4a20-9a04-28ccf0f71b8c",
      "forceMaxDataTimeWindow": 31
    }`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    const text = await response.json();
    const articles = text.articles.results;
    document.getElementById("articles-container").innerHTML = "";
    if (articles.length > 0) {
      const articlesContainer = document.getElementById("articles-container");
      articles.forEach((article) => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");
        const titleElement = document.createElement("h2");
        titleElement.textContent = article.title;
        const sourceElement = document.createElement("p");
        sourceElement.textContent = `Source: ${article.source.title}`;
        const bodyElement = document.createElement("p");
        bodyElement.textContent = article.body;
        const linkElement = document.createElement("a");
        linkElement.href = article.url;
        linkElement.textContent = "Read More";
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        imageElement.alt = article.title;
        imageElement.onerror = () => {
          imageElement.style.display = "none";
        };
        articleDiv.appendChild(imageElement);
        articleDiv.appendChild(titleElement);
        articleDiv.appendChild(sourceElement);
        articleDiv.appendChild(bodyElement);
        articleDiv.appendChild(linkElement);
        articlesContainer.appendChild(articleDiv);
      });
    } else {
      getNews(
        defaultKeyWords[Math.floor(Math.random() * defaultKeyWords.length)]
      );
    }
  } catch {
    showNotification("https://cdn.iconscout.com/icon/free/png-256/free-weather-191-461610.png?f=webp", "Unable to load news at the moment. If problem presist then please check your internet connection.");
  }
};

// search bar get news after some time of typing

let timer;
const waitTime = 1000;
const messageInput = document.getElementById("searchInput");
messageInput.addEventListener("keyup", (event) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    doneTyping(event.target.value);
  }, waitTime);
});

const doneTyping = (value) => {
  if (value !== "") {
    getNews(value);
  }

  searchMenuApp(value);
};

// alert handling



// get time

const time = function () {
  var currentDate = new Date();
  var dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.getElementById("year").innerHTML = currentDate.getFullYear();
  document.getElementById("month").innerHTML = currentDate.getMonth() + 1;

  let date = currentDate.getDate().toString().padStart(2, "0");
  document.getElementById("date").innerHTML = date;

  var dayIndex = currentDate.getDay();
  document.getElementById("day").innerHTML = dayNames[dayIndex];
};

setTimeout(time(), 1000);
