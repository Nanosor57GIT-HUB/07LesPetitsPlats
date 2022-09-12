document.querySelector(
  ".searchWrapper"
).innerHTML = `  <div class="searchRecipes">
            <label for="search">
              <i class="fas fa-search loupe"></i>
            </label>
            <input
              class="input"    
              placeholder="Rechercher une recette ..."
              type="text"
              id="search"
              name="search
              
              minlength="2"
              maxlength="30"
            /> 
            
          </div>
<p class="error">Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson », etc.</p>`;

/************************************************************************************ */

const searchBar = document.querySelector("#search");

searchBar.addEventListener("keyup", (e) => {
 
  const input = searchBar.value; //e.target.value
 
  let suggestion = "";

  const filtersSearchBar = arrayRecipes.filter(
    (item) =>
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.description.toLowerCase().includes(input.toLowerCase())
  );

  const errorSearch = document.querySelector(".error");

  if (!filtersSearchBar.length) {
    errorSearch.style.display = "block";
  } else if (e.target.value.length <= 3) {
    errorSearch.style.display = "none";
  }

  if (filtersSearchBar.length || e.target.value.length >= 3) {
    filtersSearchBar.forEach((filt) => {
      let detailsIngredients = "";

      filt.ingredients.forEach((ing) => {
        ingredient = ing.ingredient;
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

      suggestion += `    <div class="card">

              <div class="photosPlats">
              <img src="./assets/images/logo_lespetitsplats.png" class="photoPlat" />
              </div>  

              <div class="titleTime">
                <h3 class="title">${filt.name}</h3>
                <div class="time">
                  <i class="far fa-clock"></i>
                  <span class="mn">${filt.time} mn</span>
                </div>
              </div>

              <div class="recette">
                <div class="ingredients">
                  <ul id="list-ingredients">
                
               ${detailsIngredients}
                 
                    </ul>          
                </div>
                <div class="préparation">
                  <p class="preparation-text">${filt.description}</p>   
                </div>
              </div>

           
          </div>`;
    });
  }
  document.querySelector(".containerCards").innerHTML = suggestion;
});
