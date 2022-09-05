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

function searchBarAlgo() {
  searchBar.addEventListener("keyup", (e) => {
    console.log(e.target.value);
    const input = searchBar.value; //e.target.value

    let suggestion = "";

    const filtersSearchBar = arrayRecipes.filter(
      (item) =>
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.description.toLowerCase().includes(input.toLowerCase())
    );

    console.log(filtersSearchBar);

    const errorSearch = document.querySelector(".error");

    if (!filtersSearchBar.length) {
      errorSearch.style.display = "block";
    } else if (e.target.value.length <= 3) {
      errorSearch.style.display = "none";
    }

    if (filtersSearchBar.length || e.target.value.length >= 3) {
      for (let searchBar of filtersSearchBar) {
        let detailsIngredients = "";

        searchBar.ingredients.forEach((ing) => {
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
                <h3 class="title">${searchBar.name}</h3>
                <div class="time">
                  <i class="far fa-clock"></i>
                  <span class="mn">${searchBar.time} mn</span>
                </div>
              </div>

              <div class="recette">
                <div class="ingredients">
                  <ul id="list-ingredients">
                
              ${detailsIngredients}
                  
                    </ul>          
                </div>
                <div class="préparation">
                  <p class="preparation-text">${searchBar.description}</p>   
                </div>
              </div>

           
          </div>`;
      }
    }
    document.querySelector(".containerCards").innerHTML = suggestion;
  });
}
searchBarAlgo();

/*********************************************************************************** */
//clic à l'exterrieur de l'input
//   window.addEventListener("click", () => {
//     searchBar.value = "";
//     errorSearch.style.display = "none";
//   });
/*********************************************************************************** */

//https://github.com/Christelle74/ChristellePhilippe_7_08032022/blob/master/scripts/index.js
//https://github.com/damevin/Les-petits-plats/tree/main/scripts/utils