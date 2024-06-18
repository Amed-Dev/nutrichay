async function loadEbooks() {
  const url = "https://api-nutrichay.netlify.app/.netlify/functions/api/v1/ebooks";
  try {
    const response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      if (!Array.isArray(data)) {
        data = [data];
      }
      showEbooks(data);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    console.error(`Error loading data from server - ${e.message}`);
  }
}

function showEbooks(ebooks) {
  ebooks.forEach((ebook) => {
    let ebookCard = document.createElement("div");
    ebookCard.className = "col-lg-4 col-md-6 item mt-5";
    ebookCard.innerHTML = `
      <div class="card h-100">
        <div class="card-header p-0 position-relative">
          <a href="classes.html" class="zoom d-block">
            <img
              class="card-img-bottom d-block"
              src="./assets/img/ebooks/eb4.jpg"
              alt="Card image cap" />
          </a>
          <div class="post-pos">
            ${ebook.tags.map((tag) => {
              let classTags =
                tag === "Nutrición"
                  ? "nutricion"
                  : tag === "Estilo de vida"
                  ? "life-style"
                  : tag.toLowerCase();
              return `<li class="${classTags}">${tag}</li>`;
            })}
          </div>
        </div>
        <div class="card-body course-details">
          <div
            class="price-review d-flex justify-content-between mb-1align-items-center">
            <p>S/${ebook.precio}</p>
            <ul class="rating-star">
              <li><span class="fas fa-star"></span></li>
              <li><span class="fas fa-star"></span></li>
              <li><span class="fas fa-star"></span></li>
              <li><span class="fas fa-star"></span></li>
              <li><span class="fas fa-star"></span></li>
            </ul>
          </div>
          <a href="#" class="course-desc">
            ${ebook.Nombre}
          </a>
          <div class="course-meta mt-4">
            <div class="meta-item course-lesson">
              <span class="fas fa-book"></span>
              <span class="meta-value">${Math.floor(
                Math.random() * 100
              )} Libros Comprados</span>
            </div>
          </div>
        </div>
      </div>
    `;
    let $ebookCard = $(ebookCard);
    $("#ebook-container").append($ebookCard);
  });
}
