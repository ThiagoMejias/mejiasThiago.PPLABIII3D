export function crearCard(array) {
  if (!Array.isArray(array)) return null;
  const divContenedor = document.createElement("div");
  array.forEach((element) => {
    const h3Titulo = document.createElement("h3");
    const descripcion = document.createElement("h6");
    const precio = document.createElement("p");
    const btn = document.createElement("button");
    btn.textContent = "Ver Vehiculo";
    h3Titulo.textContent = element.titulo;
    descripcion.textContent = element.descripcion;
    precio.textContent = element.precio;

    divContenedor.appendChild(h3Titulo);
    divContenedor.appendChild(descripcion);
    divContenedor.appendChild(precio);
    divContenedor.appendChild(crearExtra(element));
    divContenedor.appendChild(btn);
    divContenedor.setAttribute("class", "container_obj");
  });
  return divContenedor;
}

function crearExtra(element) {
  const container_extras = document.createElement("div");

  const puertas = document.createElement("p");
  puertas.textContent = element.puertas;
  const img1 = document.createElement("img");
  img1.setAttribute("src", "./imgs/puertita.png");

  container_extras.appendChild(puertas);
  container_extras.appendChild(img1);

  const km = document.createElement("p");
  km.textContent = element.khms;
  const img2 = document.createElement("img");
  img2.setAttribute("src", "./imgs/kms.png");

  container_extras.appendChild(km);
  container_extras.appendChild(img2);

  const potencia = document.createElement("p");
  potencia.textContent = element.potencia;
  const img3 = document.createElement("img");
  img3.setAttribute("src", "./imgs/potencia.png");

  container_extras.appendChild(potencia);
  container_extras.appendChild(img3);
  container_extras.setAttribute("class", "container_extras");

  return container_extras;
}
