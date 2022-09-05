function cardsSort() {
 
  let comboCard = "";

  arrayRecipes.forEach((recipe) => {
    names = recipe.name;
    time = recipe.time;
    description = recipe.description;

    ustensiles = recipe.ustensils;

    appliances = recipe.appliance;

    let detailsIngredients = "";

    ingredients = recipe.ingredients;
    let ingRecipe = [];
    ingredients.forEach((ing) => {
      ingredient = ing.ingredient;
      ingRecipe.push(ingredient);
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

    //get elements in storage
    let tagsObj = JSON.parse(localStorage.getItem("pp_Memory"));
    let ingredientStore = tagsObj.ingredientStore;
    let appareilStore = tagsObj.appareilStore;
    let ustensileStore = tagsObj.ustensileStore;

    let ok = true;

    ingredientStore.forEach((iS) => {
      if (!ingRecipe.includes(iS)) {
        ok = false;
        //  errorCombo.style.color = "#2f83f5";
      }
    });
    ustensileStore.forEach((uS) => {
      if (!recipe.ustensils.includes(uS)) {
        ok = false;
        //  errorCombo.style.color = "#ed6454";
      }
    });
    appareilStore.forEach((aS) => {
      if (recipe.appliance != aS) {
        ok = false;
        // errorCombo.style.color = "#68d9a5";
      }
    });

    //error messages if no match
    if (comboCard != "") {
      errorCombo.style.display = "none";
    } else {
      errorCombo.style.display = "block";
    }
     
    if (ok == true) {
      
      comboCard += `    <div class="card">
              <div class="photosPlats">
              <img src="./assets/images/logo_lespetitsplats.png" class="photoPlat" />
              </div>  
              <div class="titleTime">
                <h3 class="title">${names}</h3>
                <div class="time">
                  <i class="far fa-clock"></i>
                  <span class="mn">${time} mn</span>
                </div>
              </div>
              <div class="recette">
                <div class="ingredients">
                  <ul id="list-ingredients">  

                      ${detailsIngredients}
        
                    </ul>          
                </div>
                <div class="préparation">
                  <p class="preparation-text">${description}</p>   
                </div>
              </div>
           
          </div>`;
    }
    document.querySelector(".containerCards").innerHTML = comboCard;
  });
}
