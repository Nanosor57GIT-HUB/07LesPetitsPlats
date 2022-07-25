

let detailsIngredients = "";

  function getIngredient(ingredients) {
    ingredients.forEach((ing) => {
     const ingredient = ing.ingredient;
      quantity = ing.quantity;
      unit = ing.unit;

      if (quantity == undefined) {
        quantity = "";
      }
      if (unit == undefined) {
        unit = "";
      }

      const formatUnit = (unit) => {
        switch (unit) {
          case "gramme":
          case "grammes":
            return "Gr.";
          case "cuillères à soupe":
          case "cuillère à soupe":
            return "C à s.";
          case "cuillères à café":
          case "cuillère à café":
            return "C à c.";
          case "litres":
          case "litre":
            return "L.";
          default:
            return unit;
        }
      };
      detailsIngredients += `<li><span class="ingredients-details">${ingredient} / </span> ${quantity} ${formatUnit(
        unit
      )}</li>`;
    });
  }
  //getIngredient() //not reading forEach

