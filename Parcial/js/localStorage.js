export function leerData(array) {
  if (localStorage.getItem("autos")) {
    JSON.parse(localStorage.getItem("autos")).forEach((element) => {
      array.push(element);
    });
    return true;
  }
  return false;
}

export function agregarUnRegistro(registro, array) {
  array.push(registro);
  localStorage.setItem("autos", JSON.stringify(array));
}

export function agregarRegistros(registros) {
  localStorage.setItem("autos", JSON.stringify(registros));
  return true;
}
