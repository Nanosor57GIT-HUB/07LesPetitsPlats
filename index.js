const arrayRecipes = recipes;

let cardRecipes = "";

//function createCardRecipe() {
  arrayRecipes.forEach((recipe) => {
    names = recipe.name;
    time = recipe.time;
    description = recipe.description;  
  
    let detailsIngredients = "";

ingredients = recipe.ingredients;
   ingredients.forEach((ing) => {
      ingredient = ing.ingredient;
   //     console.log(ingredient);
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

 
    //Je boucle les cards

    cardRecipes += `    <div class="card">
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

 
   document.querySelector(".containerCards").innerHTML = cardRecipes;
 })
 
  
//};

//createCardRecipe();





//https://github.com/git504/Les-Petits-Plats
//https://github.com/gndz07/GinaAdzani_7_18122020

//maquette : https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/Default_parameters
