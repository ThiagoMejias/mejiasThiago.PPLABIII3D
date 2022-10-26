import { crearCard } from "./CreadorDeAnuncio.js";
import {
  leerData,
  agregarUnRegistro,
  agregarRegistros,
} from "./localStorage.js";
const div = document.querySelector(".container_anuncios");
const array = [];
leerData(array);
console.log(array);
console.log(crearCard(array));
div.appendChild(crearCard(array));
