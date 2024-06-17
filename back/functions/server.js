import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { ebooks } from "./ebooks.js";
import { recetas } from "./recetas.js";

const app = express();
app.use(cors());

const port = 5000;

const router = express.Router();

router.get("/api/v1/", (req, res) => {
  res.json({
    dev: "Amed Pereda",
    webPage: "http://amedpereda.netlify.app/",
    endopoints: {
      recetas:
        "https://api-nutrichay.netlify.app/.netlify/functions/server/api/v1/recetas",
      receta_random:
        "https://api-nutrichay.netlify.app/.netlify/functions/server/api/v1/receta/random",
      ebooks:
        "https://api-nutrichay.netlify.app/.netlify/functions/server/api/v1/ebooks",
      ebook_random:
        "https://api-nutrichay.netlify.app/.netlify/functions/server/api/v1/ebook/random",
    },
  });
});

//ebook random
router.get("/api/v1/ebook/random", (req, res) => {
  const nro_aleatorio = Math.floor(Math.random() * length);
  const randomEbook = ebooks[nro_aleatorio];
  res.json(randomEbook);
});

// receta random
router.get("/api/v1/receta/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * _length);
  const recetaAleatoria = recetas[randomIndex];
  res.json(recetaAleatoria);
});

// recetas por min or max de calorias
router.get("/api/v1/recetas/calorias", (req, res) => {
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
router.get("/api/v1/recetas", (req, res) => {
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
router.get("/api/v1/ebooks", (req, res) => {
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

app.use("/.netlify/functions/server", router);
export const handler = serverless(app);
