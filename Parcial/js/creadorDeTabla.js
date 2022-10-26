export function crearTabla(objetos) {
  if (!Array.isArray(objetos)) return null;

  const body = document.createElement("tbody");
  const tabla = document.createElement("table");
  const head = document.createElement("thead");

  for (const key in objetos[0]) {
    if (key != "id") {
      const newTh = document.createElement("th");
      var texto = document.createTextNode(key);
      newTh.textContent = key;
      head.appendChild(newTh);
    }
  }
  tabla.appendChild(head);

  objetos.forEach((element) => {
    const newTr = document.createElement("tr");

    for (const key in element) {
      const newTd = document.createElement("td");
      if (key != "id") {
        newTd.textContent = element[key];
        newTr.appendChild(newTd);
      } else newTr.setAttribute("data-id", element[key]);
    }

    body.appendChild(newTr);
  });
  tabla.appendChild(body);
  return tabla;
}
