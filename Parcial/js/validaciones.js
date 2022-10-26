export const validarCampoVacio = (e) => {
  const input = e.target;
  const value = input.value.trim();

  !value ? setError(input, "Campo requerido") : clearError(input);
};

export const validarNumero = (e) => {
  const input = e.target;
  const numero = parseInt(input.value.trim());
  if (numero > -1) clearError(input);
  else setError(input, "Ingrese un numero, mayor o igual a 0");
};
export const validarKM = (e) => {
  const input = e.target;
  const numero = parseInt(input.value.trim());
  if (numero > -1 && numero < 200001) clearError(input);
  else setError(input, "Ingrese un numero, entre 1 y 200000");
};
export const validarPotencia = (e) => {
  const input = e.target;
  const numero = parseInt(input.value.trim());
  if (numero > 49 && numero < 301) clearError(input);
  else setError(input, "Ingrese un numero, entre 50 y 300");
};
export const validarPuertas = (e) => {
  const input = e.target;
  const numero = parseInt(input.value.trim());
  if (numero == 2 || numero == 4 || numero == 5) clearError(input);
  else setError(input, "Ingrese: 2,4 o 5");
};

export const validarEmail = (e) => {
  const pattern = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
  const input = e.target;
  const email = input.value.trim();

  if (email.length > 6) {
    pattern.test(email) ? clearError(input) : setError(input, "Email Invalido");
  }
};

export const validarPassword = (e) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const input = e.target;
  const password = input.value.trim();

  if (!validarLongitudMinima(input, 8)) {
    setError(input, "Debe tener al menos 8 caracteres");
  } else {
    pattern.test(password)
      ? clearError(input)
      : setError(
          input,
          "Debe contener una mayuscula, una minuscula y algun numero"
        );
  }
};

export const validarExtension = (e) => {
  const extensiones = ["gif", "jpg", "png", "jpeg"];

  const input = e.target;

  const nombre = input.files[0].name;
  const ext = nombre.split(".").pop();
  extensiones.includes(ext)
    ? clearError(input)
    : setError(input, "Archivo invalido");

  //console.log(nombre.split(".").pop());

  /*
      if (email.length > 6) {
        pattern.test(email) ? clearError(input) : setError(input, "Email Invalido");
      }*/
};

const validarLongitudMinima = (input, minimo) =>
  input.value.trim().length >= minimo;

const clearError = (input, mensaje) => {
  const $small = input.nextElementSibling;
  $small.textContent = "";
  input.classList.remove("inputError");
  $small.classList.remove("danger");
};

const setError = (input, mensaje) => {
  const $small = input.nextElementSibling;
  $small.textContent = mensaje || `${input.name} requerido`;
  input.classList.add("inputError");
  $small.classList.add("danger");
  input.classList.remove("inputOk");
};
