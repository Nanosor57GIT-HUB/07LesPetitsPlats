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
  console.log(e.target.value);
  const input = searchBar.value; //e.target.value

  let suggestion = "";

  let detailsIngredients = "";

  ingredients.forEach((oui) => {
    detailsIngredients += `<li><span class="ingredients-details">${oui.ingredient} / </span> ${oui.quantity} ${oui.unit}</li>`;
  });

  const filtersSearchBar = arrayRecipes.filter(
    (item) =>
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.description.toLowerCase().includes(input.toLowerCase())
  );

  console.log(filtersSearchBar.length);

  const errorSearch = document.querySelector(".error");

  if (!filtersSearchBar.length) {
    errorSearch.style.display = "block";
  } else if (e.target.value.length <= 3) {
    errorSearch.style.display = "none";
  }

  if (filtersSearchBar.length || e.target.value.length >= 3) {
    filtersSearchBar.forEach((filt) => {
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

/*********************************************************************************** */
//clic à l'exterrieur de l'input
//   window.addEventListener("click", () => {
//     searchBar.value = "";
//     errorSearch.style.display = "none";
//   });
/*********************************************************************************** */

/*
//          ALGO OPTION 1 BARRE PRINCIPALE

const barreChamp = document.getElementById("barre_champ");


function filtreBarre(){
    const inputBarre = barreChamp.value;
    let resultat = [];

    if (inputBarre.length >= 3){    //filtre des recettes en relation avec les 3 caractères tapés

        resultat = recettes.filter(recette => recette.name.toLowerCase().includes(inputBarre.toLowerCase())  recette.description.toLowerCase().includes(inputBarre.toLowerCase())  recette.ingredients.some ((ingredient) => ingredient.ingredient.toLowerCase().includes(inputBarre.toLowerCase())));

        recettes = resultat; 

    }else{      //sinon affiche toutes les recettes avec un filtre correspondant aux tags selectionnes

        recettes = recipes;
        filtreTag();
        resultat = recettes;

    }
    if (resultat.length == 0){  //si il n'y a aucune correspondance, affiche un message

        pasDeRecette();

    }else{

        displayRecette(resultat);   //j'affiche le resultat de ce filtre au niveau des recettes
    }

    displayListe(resultat);     //j'affiche le resultat de ce filtre au niveau des listes btn

}

barreChamp.addEventListener("input", filtreBarre);
*/

//https://github.com/Christelle74/ChristellePhilippe_7_08032022/blob/master/scripts/index.js
//https://github.com/damevin/Les-petits-plats/tree/main/scripts/utils
