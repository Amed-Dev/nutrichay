async function includeHTML(url, targetElement) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const htmlContent = await response.text();
    targetElement.innerHTML = htmlContent;
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
}

async function loadHeader(activeNav) {
  const headerElement = document.querySelector("header");
  await includeHTML("./layout/header.html", headerElement);
  $(activeNav).toggleClass("active");
}

async function loadBanner() {
  const bannerElement = document.querySelector("#home");
  await includeHTML("./layout/banner.html", bannerElement);
  initializeSliders();
}

async function loadBooksSection() {
  const booksElement = document.querySelector("#books");
  await includeHTML("./layout/books.html", booksElement);
}

async function loadNutritionistSection() {
  const nutritionistElement = document.querySelector("#nutritionist");
  await includeHTML("./layout/nutritionist.html", nutritionistElement);
}

async function loadFooter() {
  const footerElement = document.querySelector("footer");
  await includeHTML("./layout/footer.html", footerElement);
}

async function loadRecipe() {
  try {
    const response = await fetch("/api_v1/recetas");
    if (response.ok) {
      let data = await response.json();
      showRecipes(data);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    console.error(`Error loading data from server - ${e.message}`);
  }
}

// mostrar info de las recetas en HTML
function showRecipes(data) {
  //calcular las calorías totales de las recetas
  const calories = (C, P, G) => C * 4 + P * 4 + G * 9;
  let containerRecipes = $("#recipesDetails");

  const recipes = data;

  recipes.forEach((recipe) => {
    let name = recipe.nombre;
    let category = recipe.categoria;
    let fats = recipe.grasas;
    let carbohydrates = recipe.carbohidratos;
    let proteins = recipe.proteinas;
    let totalCalories = calories(carbohydrates, proteins, fats);
    let itemCategory =
      category === "bebida"
        ? { color: "text-bg-info" }
        : category === "desayuno"
        ? { color: "text-bg-warning" }
        : category === "desayuno, snack"
        ? { color: "text-bg-success" }
        : category === "snack"
        ? { color: "text-bg-snack" }
        : category === "almuerzo"
        ? { color: "text-bg-secondary" }
        : { color: "text-bg-primary" };

    let contentRecipes = document.createElement("div");
    contentRecipes.className = "card col-3 col-md-6";
    contentRecipes.style.width = "18rem";
    contentRecipes.innerHTML = `
      <img src="${recipe.img}" class="card-img-top" alt="${name}" height="175px">
      <div class="card-body">
        <span class="badge rounded-pill ${itemCategory.color} text-capitalize">${category}</span>
        <p class="card-text fw-bold ">${name}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Grasas: ${fats} g</li>
        <li class="list-group-item">Carbohidratos: ${carbohydrates} g</li>
        <li class="list-group-item">Proteínas: ${proteins} g</li>
        <li class="list-group-item fw-semibold text-decoration-underline text-success-emphasis ">Calorías totales: ${totalCalories} cal</li>
      </ul>
    `;
    let $contentRecipes = $(contentRecipes);
    containerRecipes.append($contentRecipes);
  });
}

function loadInnerBanner(title, currentSection) {
  let breadCrumb = document.createElement("div");
  breadCrumb.className = "w3l-breadcrumb py-lg-5";
  let container = document.createElement("div");
  container.className = "container pt-5 pb-sm-4 pb-2";

  let h4 = document.createElement("h4");
  h4.className = "inner-text-title font-weight-bold pt-5";
  h4.innerText = title;
  container.appendChild(h4);
  let listNavContainer = document.createElement("div");
  listNavContainer.className = "my-3 d-flex justify-content-center";

  let listNav = document.createElement("ul");
  listNav.className = "breadcrumbs-custom-path d-flex gap-2";

  let defaultItem = document.createElement("li");
  defaultItem.innerHTML = '<a href="index.html">Inicio</a>';
  listNav.appendChild(defaultItem);
  let currentItem = document.createElement("li");
  currentItem.innerHTML = `<i class="fas fa-angle-right me-2"></i>${currentSection}`;
  listNav.appendChild(currentItem);
  listNavContainer.appendChild(listNav);
  container.appendChild(listNavContainer);
  breadCrumb.appendChild(container);

  document.querySelector(".inner-banner").appendChild(breadCrumb);
}

function initializeSliders() {
  if (typeof $.fn.zoomSlider !== "undefined") {
    $("#demo-1").zoomSlider({
      src: [
        "./assets/img/banner/banner1.jpg",
        "./assets/img/banner/banner2.jpg",
        "./assets/img/banner/banner3.jpg",
        "./assets/img/banner/banner4.jpg",
      ],
      overlay: "plain",
    });
  } else {
    console.error("Zoom slider plugin not found");
  }
}

function scrollNavSets() {
  const currentTheme = localStorage.getItem("theme");
  let darkIcon = "./assets/img/icon-dark.png";
  let lightIcon = "./assets/img/icon-light.png";
  let scroll = $(window).scrollTop();

  if (currentTheme) {
    if (scroll >= 80) {
      $("#site-header").addClass("nav-fixed");
      document.querySelector("#icon-site").src =
        currentTheme === "light" ? lightIcon : darkIcon;
    } else {
      $("#site-header").removeClass("nav-fixed");
      document.querySelector("#icon-site").src =
        currentTheme === "light" ? darkIcon : darkIcon;
    }
  }
}
