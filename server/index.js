const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();
const port = 3000;

// // Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Importar archivos JSON
const ebooks = require("../public/assets/data/ebooks.json");
const recetas = require("../public/assets/data/recetas.json");

// permitir CORS
let corsOption = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

// - Permitir CORS
app.get("/api_v1/dev", (req, res) => {
  res.json({
    dev: "Amed Pereda",
    webPage: "http://amedpereda.netlify.app/",
  });
});

//ebook random
app.get("/api_v1/ebook/random", (req, res) => {
  const nro_aleatorio = Math.floor(Math.random() * ebooks.length);
  const randomEbook = ebooks[nro_aleatorio];
  res.json(randomEbook);
});

// receta random
app.get("/api_v1/receta/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * recetas.length);
  const recetaAleatoria = recetas[randomIndex];
  res.json(recetaAleatoria);
});
//receta por categoria
app.get("/api/recetas", (req, res) => {
  const { duck } = req.query;
  if (duck) {
    const recetasCategoria = recetas.filter((receta) =>
      receta.categoria.includes(duck)
    );
    return res.json(recetasCategoria);
  }
  res.json(recetas);
});

// recetas por min or max de calorias
app.get("/api_v1/recetas/calorias", (req, res) => {
  const { minCal, maxCal } = req.query;
  let filteredRecetas = recetas;
  if (minCal) {
    filteredRecetas = filteredRecetas.filter(
      (receta) => receta.calorias >= parseInt(minCal)
    );
  }
  if (maxCal) {
    filteredRecetas = filteredRecetas.filter(
      (receta) => receta.calorias <= parseInt(maxCal)
    );
  }
  res.json(filteredRecetas);
});

// recetas por categoria
app.get("/api_v1/recetas", (req, res) => {
  const { categoria, nombre, minCal, maxCal } = req.query;
  let filteredRecetas = recetas;

  if (categoria) {
    filteredRecetas = filteredRecetas.filter((receta) =>
      receta.categoria.toLowerCase().includes(categoria.toLowerCase())
    );
  }
  if (nombre) {
    filteredRecetas = filteredRecetas.filter((receta) =>
      receta.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (minCal) {
    filteredRecetas = filteredRecetas.filter(
      (receta) => receta.calorias >= parseInt(minCal)
    );
  }
  if (maxCal) {
    filteredRecetas = filteredRecetas.filter(
      (receta) => receta.calorias <= parseInt(maxCal)
    );
  }

  res.json(filteredRecetas);
});

// ebooks
app.get("/api_v1/ebooks", (req, res) => {
  const { categoria, nombre, limit } = req.query;
  let filteredEbooks = ebooks;

  if (categoria) {
    filteredEbooks = filteredEbooks.filter((ebook) =>
      ebook.categoria.toLowerCase().includes(categoria.toLowerCase())
    );
  }

  if (nombre) {
    filteredEbooks = filteredEbooks.filter((ebook) =>
      ebook.Nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (limit) {
    filteredEbooks = filteredEbooks.slice(0, parseInt(limit));
  }

  res.json(filteredEbooks);
});
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
