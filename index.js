import EspecieAPI from "./EspecieApi.js";

const miEspecie = new EspecieAPI();
const btnProcesar = document.getElementById("btnProcesar");
const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await miEspecie.guardarEspecie();
});

// validacion

(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
