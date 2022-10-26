import { crearTabla } from "./creadorDeTabla.js";
import {
  leerData,
  agregarUnRegistro,
  agregarRegistros,
} from "./localStorage.js";
import {
  validarNumero,
  validarPotencia,
  validarKM,
  validarCampoVacio,
  validarPuertas,
} from "./validaciones.js";
import { Anuncio_Auto } from "./Anuncio.js";
// localStorage.clear();
//////////////ANUNCIO////////////////////////

const autos = [];

if (leerData(autos)) {
  agregarRegistros(autos);
}

//creada de tabla
const $tabla = crearTabla(autos);
$tabla.setAttribute("id", "tabla_autos");
const $contenedorTabla = document.querySelector(".container_tabla");
$contenedorTabla.appendChild($tabla);

const $btnModificar = document.querySelector(".save");
const $botonBorrar = document.querySelector(".delete");
const $botonCancelar = document.querySelector(".cancel");
const $formulario = document.querySelector(".formulario");
const $btnGuardar = document.querySelector("#btnAgregar");
const $msjError = document.querySelector(".msjFaltanDatos");
const $spinner = document.querySelector(".spinner");

// seteos por defecto
$botonBorrar.disabled = true;
$botonBorrar.style.opacity = 0.7;
$botonCancelar.style.disabled = true;
$botonCancelar.style.opacity = 0.7;
$btnModificar.disabled = true;
$btnModificar.style.opacity = 0.7;
$spinner.style.display = "none";
$formulario.dataset.id = -1;

// carga de anuncio desde el form a tabla
window.addEventListener("load", () => {
  $formulario.addEventListener("submit", (e) => {
    // me fijo que no este vacio
    asignarInputError();
    e.preventDefault();
    if (validarForm()) {
      $msjError.textContent = "";
      $msjError.classList.remove("danger");
      const {
        titulo,
        transaccion,
        descripcion,
        precio,
        puertas,
        khms,
        potencia,
      } = e.target;

      const nuevoAnuncio = new Anuncio_Auto(
        Date.now(),
        titulo.value,
        transaccion.value,
        descripcion.value,
        precio.value,
        puertas.value,
        khms.value,
        potencia.value
      );

      if (nuevoAnuncio) {
        $spinner.style.display = "block";

        setTimeout(() => {
          agregarUnRegistro(nuevoAnuncio, autos);
          actualizarTabla(autos);
          limpiarForm();
          $spinner.style.display = "none";
        }, 3000);
      }
    } else {
      $msjError.classList.add("danger");
      $msjError.textContent =
        "Por favor revise los campos para agregar el anuncio";
    }
  });
});
//carga del form mediante click
document.addEventListener("click", (e) => {
  const emisor = e.target;

  // si el ckick es dentro de mi form
  if (emisor.matches("tbody tr td")) {
    emisor.parentElement;
    // consigo el id de mi tr ya que el click es en mi td
    let id = emisor.parentElement.dataset.id;
    //encuentro mi obj dentro de mi array mediante el id
    const anuncio = autos.find((element) => element.id == id);

    // cargo en el form tambien el id en su dataseet
    cargarForm(
      anuncio.titulo,
      anuncio.transaccion,
      anuncio.descripcion,
      anuncio.precio,
      anuncio.puertas,
      anuncio.khms,
      anuncio.potencia,
      anuncio.id
    );
  }

  //activo y desactivo de botones si el id del form es valido o no
  if ($formulario.dataset.id == -1) {
    $botonBorrar.disabled = true;
    $botonBorrar.style.opacity = 0.7;
    $botonCancelar.style.disabled = true;
    $botonCancelar.style.opacity = 0.7;
    $btnModificar.disabled = true;
    $btnModificar.style.opacity = 0.7;
    $btnGuardar.disabled = false;
    $btnGuardar.style.opacity = 1;
  } else {
    $botonBorrar.disabled = false;
    $botonBorrar.style.opacity = 1;
    $botonCancelar.style.disabled = false;
    $botonCancelar.style.opacity = 1;
    $btnModificar.disabled = false;
    $btnModificar.style.opacity = 1;
    $btnGuardar.disabled = true;
    $btnGuardar.style.opacity = 0.7;
  }
});

// modificacion
$btnModificar.addEventListener("click", () => {
  let id = $formulario.dataset.id;

  let objetoAModificar = autos.find((element) => element.id == id);

  objetoAModificar.id = $formulario.dataset.id;
  objetoAModificar.titulo = $formulario.titulo.value;
  objetoAModificar.transaccion = $formulario.transaccion.value;
  objetoAModificar.descripcion = $formulario.descripcion.value;
  objetoAModificar.precio = $formulario.precio.value;
  objetoAModificar.puertas = $formulario.puertas.value;
  objetoAModificar.khms = $formulario.khms.value;
  objetoAModificar.potencia = $formulario.potencia.value;

  actualizarTabla(autos);

  agregarRegistros(autos);
  limpiarForm();
});

// borrar elemento
$botonBorrar.addEventListener("click", () => {
  let id = $formulario.dataset.id;
  // creo un nuevo array sin el obj
  const arrayFiltrado = autos.filter((element) => element.id != id);
  // lo cargo
  actualizarTabla(arrayFiltrado);
  agregarRegistros(arrayFiltrado);
  limpiarForm();
});

// limpiar con el cancelar
$botonCancelar.addEventListener("click", limpiarForm);

function asignarInputError() {
  const elementos = $formulario.elements;
  for (const control of elementos) {
    if (control.value.length < 1) control.classList.add("inputError");
    return false;
  }
}

function actualizarTabla(array) {
  while ($contenedorTabla.hasChildNodes()) {
    $contenedorTabla.removeChild($contenedorTabla.firstChild);
  }
  $contenedorTabla.appendChild(crearTabla(array));
}

// form
function cargarForm(
  titulo,
  transaccion,
  descripcion,
  precio,
  puertas,
  khms,
  potencia,
  id
) {
  $formulario.titulo.value = titulo;
  $formulario.transaccion.value = transaccion;
  $formulario.descripcion.value = descripcion;
  $formulario.precio.value = precio;
  $formulario.puertas.value = puertas;
  $formulario.khms.value = khms;
  $formulario.potencia.value = potencia;
  $formulario.value = id;
  $formulario.setAttribute("data-id", id);
}

function validarForm() {
  const elementos = $formulario.elements;
  for (const control of elementos) {
    console.log(control.classList.contains("inputError"));
    if (control.classList.contains("inputError")) {
      return false;
    }
  }
  return true;
}

function limpiarForm() {
  $formulario.titulo.value = "";
  $formulario.transaccion.value = "";
  $formulario.descripcion.value = "";
  $formulario.precio.value = "";
  $formulario.puertas.value = "";
  $formulario.khms.value = "";
  $formulario.potencia.value = "";
  $formulario.setAttribute("data-id", -1);
}

// asignacion de eventos<

const elementos = $formulario.elements;

for (let i = 0; i < elementos.length; i++) {
  const elemento = elementos.item(i);

  if (elemento.matches("input")) {
    if (elemento.matches("[type=text]") || elemento.matches("[type=number]")) {
      elemento.addEventListener("blur", validarCampoVacio);

      if (elemento.matches("[id=txtPrecio]")) {
        elemento.addEventListener("input", validarNumero);
        elemento.addEventListener("blur", validarNumero);
      } else {
        if (elemento.matches("[id=txtPotencia]")) {
          elemento.addEventListener("input", validarPotencia);
          elemento.addEventListener("blur", validarPotencia);
        } else if (elemento.matches("[id=txtKhms]")) {
          elemento.addEventListener("input", validarKM);
          elemento.addEventListener("blur", validarKM);
        } else if (elemento.matches("[id=txtPuertas]")) {
          elemento.addEventListener("input", validarPuertas);
          elemento.addEventListener("blur", validarPuertas);
        }
      }
    }
  }
}
