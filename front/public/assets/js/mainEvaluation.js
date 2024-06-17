const getIMC = (peso, estatura, genero) => {
  const imc = (peso / (estatura * estatura)).toFixed(1);
  let categoria = "";

  if (genero === "f") {
    if (imc < 16.5) {
      categoria = "Bajo peso";
    } else if (imc <= 23.9) {
      categoria = "Saludable";
    } else if (imc <= 29.9) {
      categoria = "Sobrepeso";
    } else {
      categoria = "Obesidad";
    }
  } else {
    if (imc < 18.5) {
      categoria = "Bajo peso";
    } else if (imc < 25) {
      categoria = "Saludable";
    } else if (imc <= 29.9) {
      categoria = "Sobrepeso";
    } else {
      categoria = "Obesidad";
    }
  }

  return {
    value: imc,
    category: categoria,
  };
};

function getICC(waist, hip, gender) {
  const ICC = (waist / hip).toFixed(2);
  let category = "";
  if (gender === "f") {
    category =
      ICC < 0.8
        ? "Riesgo bajo"
        : ICC >= 0.81 && ICC <= 0.85
        ? "Riesgo moderado"
        : "Riesgo alto";
  } else {
    category =
      ICC < 0.95
        ? "Riesgo bajo"
        : ICC >= 0.96 && ICC <= 1
        ? "Riesgo moderado"
        : "Riesgo alto";
  }

  return {
    value: ICC,
    category: category,
  };
}

function getFatPercentage(genero, estatura, cuello, cintura, cadera) {
  const calcfatsPercentage = (genero, estatura, cuello, cintura, cadera) => {
    if (genero === "f") {
      return (
        (495 /
          (1.29579 -
            0.35004 * Math.log10(cadera + cintura - cuello) +
            0.221 * Math.log10(estatura * 100)) -
          450) /
        100
      ).toFixed(2);
    } else {
      return (
        (495 /
          (1.0324 -
            0.19077 * Math.log10(cintura - cuello) +
            0.15456 * Math.log10(estatura * 100)) -
          450) /
        100
      ).toFixed(2);
    }
  };
  const fatsPercentage = calcfatsPercentage(
    genero,
    estatura,
    cuello,
    cintura,
    cadera
  );

  if (genero === "f") {
    category =
      fatsPercentage >= 0.4
        ? "Muy alto"
        : fatsPercentage >= 0.35
        ? "Alto"
        : fatsPercentage >= 0.23
        ? "Recomendado"
        : "Bajo";
  } else {
    category =
      fatsPercentage >= 0.38
        ? "Muy alto"
        : fatsPercentage >= 0.33
        ? "Alto"
        : fatsPercentage >= 0.21
        ? "Recomendado"
        : "Bajo";
  }

  return {
    value: `${fatsPercentage * 100}%`,
    category: category,
  };
}
function evaluateUser() {
  $("#measurements").on("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    window.scrollTo(0, 346.3999938964844);
    const form = document.querySelector("#measurements");
    if (form.checkValidity()) {
      let nombre = $("#nombre").val();
      let genero = $("#genero").val();
      let peso = $("#peso").val();
      let estatura = $("#estatura").val();
      let cuello = $("#cuello").val();
      let pecho = $("#pecho").val();
      let cintura = $("#cintura").val();
      let cadera = $("#cadera").val();
      const imc = getIMC(peso, estatura, genero);
      const icc = getICC(cintura, cadera, genero);
      const porcentajeGrasa = getFatPercentage(
        genero,
        estatura,
        cuello,
        cintura,
        cadera
      );

      $(".info-personal .labelResult #name").text(nombre);
      $(".info-personal .labelResult #gender").text(
        genero === "f" ? "Femenino" : "Masculino"
      );

      $("#resultIMC").text(imc.value);
      $("#categoriaIMC").text(imc.category);

      $("#resultICC").text(icc.value);
      $("#categoriaICC").text(icc.category);

      $("#resultPGrasas").text(porcentajeGrasa.value);
      $("#categoriaPGrasas").text(porcentajeGrasa.category);

      const resultIMC = $(".imc-result#containerResult");
      const resultICC = $(".icc-result#containerResult");
      const resultPG = $(".pGrasas-result#containerResult");
      const indicatorLabelIMC = $(".imc-result #indicator-value i");
      const indicatorLabelICC = $(".icc-result #indicator-value i");
      const indicatorLabelPG = $(".pGrasas-result #indicator-value i");

      function getIndicatorStyles(category, type) {
        let indicatorColor;
        let classBorderStyle;

        if (type === "IMC") {
          indicatorColor =
            category === "Saludable"
              ? "#00d26a"
              : category === "Sobrepeso"
              ? "#ffc107"
              : "#f8312f";

          classBorderStyle =
            category === "Saludable"
              ? "border-success"
              : category === "Sobrepeso"
              ? "border-warning"
              : "border-danger";
        } else if (type === "ICC") {
          indicatorColor =
            category === "Riesgo bajo"
              ? "#00d26a"
              : category === "Riesgo moderado"
              ? "#ffc107"
              : "#f8312f";

          classBorderStyle =
            category === "Riesgo bajo"
              ? "border-success"
              : category === "Riesgo moderado"
              ? "border-warning"
              : "border-danger";
        } else if (type === "PFATS") {
          indicatorColor =
            category === "Recomendado"
              ? "#00d26a"
              : category === "Muy alto"
              ? "#f8312f"
              : "#ffc107";

          classBorderStyle =
            category === "Recomendado"
              ? "border-success"
              : category === "Muy alto"
              ? "border-danger"
              : "border-warning";
        }

        return { indicatorColor, classBorderStyle };
      }

      resultIMC.removeClass("border-success border-warning border-danger");
      resultICC.removeClass("border-success border-warning border-danger");
      resultPG.removeClass("border-success border-warning border-danger");

      // IMC
      const imcStyles = getIndicatorStyles(imc.category, "IMC");
      indicatorLabelIMC.css("color", imcStyles.indicatorColor);
      resultIMC.addClass(imcStyles.classBorderStyle);

      // ICC
      const iccStyles = getIndicatorStyles(icc.category, "ICC");
      indicatorLabelICC.css("color", iccStyles.indicatorColor);
      resultICC.addClass(iccStyles.classBorderStyle);

      //PG
      const pgStyles = getIndicatorStyles(porcentajeGrasa.category, "PFATS");
      indicatorLabelPG.css("color", pgStyles.indicatorColor);
      resultPG.addClass(pgStyles.classBorderStyle);
    }
  });
}
