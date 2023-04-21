// 1. obtener los datos del formulario
// 2. conectarnos a la ruta del api
// 3. mostrar los mensajes correcpondientes

class EspecieAPI {
  constructor() {
    this.nombre = document.getElementById("nombre");
    this.clasificacion = document.getElementById("clasificacion");
    this.esperanza = document.getElementById("esperanza");
    this.peso = document.getElementById("peso");
    this.alimentacion = document.getElementById("alimentacion");
    this.toast = document.getElementById("toastEspecie");

    this.nombreInvalido = document.getElementById("nombreInvalido");
    this.calsificacionInvalido = document.getElementById(
      "calsificacionInvalido"
    );
    this.esperanzaInvalido = document.getElementById("esperanzaInvalido");
    this.pesoInvalido = document.getElementById("pesoInvalido");
    this.alimentacionInvalido = document.getElementById("alimentacionInvalido");
  }

  async guardarEspecie() {
    const resultadoValidar = this.validarDatos();
    console.log(resultadoValidar);
    if (typeof resultadoValidar === "boolean" && resultadoValidar === true) {
      const datos = {
        nombre: this.nombre.value,
        clasificacion: this.clasificacion.value,
        esperanza_vida: parseInt(this.esperanza.value),
        peso_promedio: parseFloat(this.peso.value),
        alimentacion: this.alimentacion.value,
      };

      await fetch("http://127.0.0.1:3000/crear_especie", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.lanzarToast();
      await this.limpiarDatos();
    } else {
      resultadoValidar.forEach((el) => {
        const { tipo, mensaje } = el;

        if (tipo === "nombre") {
          this.nombreInvalido.innerText = mensaje;
        }

        if (tipo === "clasificacion") {
          this.calsificacionInvalido.innerText = mensaje;
        }

        if (tipo === "esperanza") {
          this.esperanzaInvalido.innerText = mensaje;
        }

        if (tipo === "peso") {
          this.pesoInvalido.innerText = mensaje;
        }

        if (tipo === "alimentacion") {
          this.alimentacionInvalido.innerText = mensaje;
        }
      });
    }
  }

  async listarEspecie() {
    const especies = await fetch("http://127.0.0.1:3000/listar_especies");

    const data = await especies.json();

    const miTabla = document.getElementById("tabla_especies");

    // 2 recorrer el json

    data.forEach((el, ind) => {
      const fila = miTabla.insertRow();

      const idEspecieCell = fila.insertCell();
      idEspecieCell.innerText = ind + 1;
      idEspecieCell.classList.add("text-primary");
      idEspecieCell.classList.add("col-2");
      idEspecieCell.classList.add("text-center");

      const nombreCell = fila.insertCell();
      nombreCell.innerText = el.nombre;
      nombreCell.classList.add("text-primary");
      nombreCell.classList.add("col-2");
      nombreCell.classList.add("text-center");

      const clasificacionCell = fila.insertCell();
      clasificacionCell.innerText = el.clasificacion;
      clasificacionCell.classList.add("text-primary");
      clasificacionCell.classList.add("col-2");
      clasificacionCell.classList.add("text-center");

      const esperanzaVidaCell = fila.insertCell();
      esperanzaVidaCell.innerText = `${el.esperanza_vida} Años`;
      esperanzaVidaCell.classList.add("text-primary");
      esperanzaVidaCell.classList.add("col-2");
      esperanzaVidaCell.classList.add("text-center");

      const pesoPromedioCell = fila.insertCell();
      pesoPromedioCell.innerText = `${el.peso_promedio} kg`;
      pesoPromedioCell.classList.add("text-primary");
      pesoPromedioCell.classList.add("col-2");
      pesoPromedioCell.classList.add("text-center");

      const alimentacionCell = fila.insertCell();
      alimentacionCell.innerText = el.alimentacion;
      alimentacionCell.classList.add("text-primary");
      alimentacionCell.classList.add("col-2");
      alimentacionCell.classList.add("text-center");
    });
  }

  validarDatos() {
    const errores = [];

    console.log(this.nombre.value);

    if (!this.nombre.value) {
      errores.push({
        mensaje: "Por favor ingrese un nombre valido.",
        tipo: "nombre",
      });
    }

    if (!this.clasificacion.value) {
      errores.push({
        mensaje: "Por favor ingrese una clasificacion valida.",
        tipo: "clasificacion",
      });
    }

    if (
      !parseInt(this.esperanza.value) ||
      isNaN(parseInt(this.esperanza.value))
    ) {
      errores.push({
        mensaje: "Por favor ingrese una esperanza de vida valida.",
        tipo: "esperanza",
      });
    }

    if (!parseFloat(this.peso.value) || isNaN(parseFloat(this.peso.value))) {
      errores.push({
        mensaje: "Por favor ingrese un peso promedio valido.",
        tipo: "peso",
      });
    }

    if (!this.alimentacion.value) {
      errores.push({
        mensaje: "Por favor ingrese una alimentacion valida.",
        tipo: "alimentacion",
      });
    }

    if (errores.length > 0) {
      return errores;
    } else {
      return true;
    }
  }

  limpiarDatos() {
    const form = document.getElementById("form");

    form.reset();
    form.classList.remove("was-validated");
    this.nombreInvalido.innerText = "";
    this.calsificacionInvalido.innerText = "";
    this.esperanzaInvalido.innerText = "";
    this.pesoInvalido.innerText = "";
    this.alimentacionInvalido.innerText = "";
  }

  lanzarToast() {
    let toastElement = new bootstrap.Toast(this.toast, {
      animation: true,
      delay: 5000,
    });

    toastElement.show();
  }
}

export default EspecieAPI;
