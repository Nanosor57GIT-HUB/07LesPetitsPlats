function cardsSort() {
  let comboCard = "";

  //Create storage array of sorted elements when displaying tags
  let recipesOk = [];

  //Get elements in localStorage
  let tagsObj = JSON.parse(localStorage.getItem("pp_Memory"));
  let ingredientStore = tagsObj.ingredientStore;
  let appareilStore = tagsObj.appareilStore;
  let ustensileStore = tagsObj.ustensileStore;
  //-----------------------

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

    //Basic display of cards on true
    let ok = true;

    //Loop on storage for recipes not containing .... (by elimination)
    ingredientStore.forEach((iS) => {
      if (!ingRecipe.includes(iS)) {
        ok = false;
        // errorCombo.style.color = "#2f83f5";
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

    //error messages if no match tags
    if (comboCard != "") {
      errorCombo.style.display = "none";
    } else {
      errorCombo.style.display = "block";
    }

    if (ok == true) {
      //Updates recipesOk array
      recipesOk.push(recipe);

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

  //Creation of tables by categories
  let listIng = [];
  let listApp = [];
  let listUst = [];

  //updates each category by comparison
  recipesOk.forEach((r) => {
    
    if (
      !listApp.includes(r.appliance) &&
      !appareilStore.includes(r.appliance)
    ) {
      listApp.push(r.appliance);
    }

    r.ustensils.forEach((rU) => {
      if (!listUst.includes(rU) && !ustensileStore.includes(rU)) {
        listUst.push(rU);
      }
    });

    r.ingredients.forEach((rI) => {
      if (
        !listIng.includes(rI.ingredient) &&
        !ingredientStore.includes(rI.ingredient)
      ) {
        listIng.push(rI.ingredient);
      }
    });
  });

  //sorting arrays
  listIng.sort();
  listUst.sort();
  listApp.sort();

  //Loops and returns remaining items on combos
  let forms = document.querySelectorAll("form");
  forms.forEach((f) => {
    f.querySelector("ul").innerHTML = "";
  });

  removeList();

  //Updates each list on its designated combo
  listIng.forEach((ing) => {
    //outputs the list of remaining ingredients updates, by combo
    createItemList(forms[0], ing);
  });
  listApp.forEach((app) => {
    createItemList(forms[1], app);
  });
  listUst.forEach((ust) => {
    createItemList(forms[2], ust);
  });
}