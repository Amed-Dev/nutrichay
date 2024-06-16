const express = require("express");
const app = express();
const port = 3000;

//importar archivos json
const ebooks = require("../data/ebooks.json");
const recetas = require("../data/recetas.json");

app.get("/apiv1/dev", (req, res) => {
  res.json({
    dev: "Amed Pereda",
    webPage: "http://amedpereda.netlify.app/",
  });
});

app.get("/apiv1/ebook/random", (req, res) => {
  const nro_aleatorio = Math.floor(Math.random() * ebooks.length);
  const randomEbook = ebooks[nro_aleatorio];
  res.json(randomEbook);
});
app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});
