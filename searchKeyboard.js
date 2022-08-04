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
<p class="error">Votre recette n'éxiste pas, essayez avec un autre mot ...</p>`;


const searchInput = document.querySelector("#search");
//console.log(searchInput);

  searchInput.addEventListener("keyup",  (e) => {
    console.log(e.target.value);
    const input = searchInput.value; //e.target.value

    const filtered = array.filter(
      (item) =>
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.description.toLowerCase().includes(input.toLowerCase())
    );
    
    console.log(filtered);

 const err = document.querySelector(".error");
    if (!filtered.length) { 
      err.style.display = "block"
     // console.log(err);
     }  else if (e.target.value.length <= 3) {
      err.style.display = "none";
filtered.forEach((cardFiltered) =>


  console.log(cardFiltered)
);       

      }
     
   // document.querySelector(".containerCards").innerHTML += cardRecipes;
  });
 
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