//Création du DOM
document.querySelector(".containerCombo").innerHTML = ` 
<div class="combo">
         <form autocomplete="off">
      <div class="boxIngredients comb">
        <input type="text" id="input1" class="inputCombo1 inputCombo" placeholder="Ingredients ..." maxlength="9" />
        <img src="./assets/images/angle-up-solid.svg" class="ar1 arrow-down toggleArrow">
      </div>
      <ul class="ulCombo bgListCombo1"></ul>
    </form>
          

    <form autocomplete="off">
      <div class="boxAppareils comb">
        <input type="text" id="input2" class="inputCombo2 inputCombo" placeholder="Appareils ..." maxlength="9" />
        <img src="./assets/images/angle-up-solid.svg" class="ar2 arrow-down toggleArrow">
      </div>
      <ul class="ulCombo bgListCombo2"></ul>
    </form>
           

            <form autocomplete="off">
      <div class="boxUstensiles comb">
        <input type="text" id="input3" class="inputCombo3 inputCombo" placeholder="Ustensiles ..." maxlength="9" />
        <img src="./assets/images/angle-up-solid.svg" class="ar3 arrow-down toggleArrow">
      </div>
      <ul class="ulCombo bgListCombo3"></ul>
    </form>
  </div>
           
          </div>`;

//Appel des éléments du DOM
let input = document.querySelector(".inputCombo1");
let input2 = document.querySelector(".inputCombo2");
let input3 = document.querySelector(".inputCombo3");
let ar1 = document.querySelector(".ar1");
let ar2 = document.querySelector(".ar2");
let ar3 = document.querySelector(".ar3");
// let arrow = document.querySelector(".toggleArrow");

//Création des const de tableaux
let component = [];
let ustensile = [];
let appareils = [];

//Récupération des datas api
function getDataCombo() {
  //Récupération des tableaux ingrédients, appareils et ustensiles
  recipes.forEach((recipe) => {
    //Récupération de chaque appareils/new array appliance
    appliance = recipe.appliance;

    appareils.push(appliance);
    appliance = [...new Set(appareils)];

    //Récupération de chaque ustensiles/new array cookingTools
    ustens = recipe.ustensils;

    ustens.forEach((ust) => {
      cookingTools = ust;
      ustensile.push(cookingTools);
      cookingTools = [...new Set(ustensile)];
    });

    //Récupération de chaque component/new Array ingredient
    ingredients = recipe.ingredients;

    ingredients.forEach((ing) => {
      ingredient = ing.ingredient;
      //Pousser les éléments dans le tableau component
      component.push(ingredient);
      //Suppression des doublons
      ingredient = [...new Set(component)];
    });
  });
}
getDataCombo(component, ustensile, appareils);

/************************************************************************* */

//Trier les noms dans les listes par ordre croissant (native)
let sortedIngredients = ingredient.sort();
let sortedUstensile = cookingTools.sort();
let sortedAppareils = appliance.sort();

//Création d'un tableau avec les combos
const combos = [
  { input: input, list: sortedIngredients, arrow: ar1 },
  { input: input2, list: sortedAppareils, arrow: ar2 },
  { input: input3, list: sortedUstensile, arrow: ar3 },
];
//console.log(combos);//sort 3 objets avec le combo,
// la arrow et la liste triée, pour chaque catégorie.

/************************************************************** */
//Création d'une liste "li"
function createItem(parent, listing) {
  //Création d'un élément li
  let listItem = document.createElement("li");
 
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";
  listItem.addEventListener("click", displayTags.bind(null, listing, listItem));//récupérer parent sur dislayTags pour color (if)
  let word = listing;
  //afficher la valeur de chaque éléments
  listItem.innerText = word;
  // console.log(word);
  parent.querySelector(".ulCombo").appendChild(listItem);
  // console.log(listItem);//ressort une liste
}
/*************************************************************** */
//Ressort la liste complète de chaque élément "list" au click sur le combo
function displayList() {
  for (let combo of combos) {
    combo.input.addEventListener("click", () => {
      combo.arrow.classList.toggle("toggleArrow");

      removeList();

      for (let listing of combo.list) {
        const parent = combo.input.closest("form");
        createItem(parent, listing);
        combo.input.style.borderRadius = "5px 5px 0 0";
      }

     

      keyboardList();
    });
    combo.arrow.addEventListener("click", () => {
      combo.arrow.classList.toggle("toggleArrow");
      const listes = document.querySelectorAll(".list-items");
      if (listes.length == 0) {
        for (let listing of combo.list) {
          
          const parent = combo.input.closest("form");
          createItem(parent, listing);
          combo.input.style.borderRadius = "5px 5px 0 0";
        }
      } else {
        removeList();
      }
    });
  }
  
}
displayList();

// window.addEventListener("click", (e) => {
//  // console.log(e.target);
//    for (let combo of combos) {
//   if(e.target == displayList) {
//      displayList.display = "none"
// combo.arrow.classList.toggle("toggleArrow");
//   }
// }
// });

function keyboardList() {
  for (let combo of combos) {
    combo.input.addEventListener("keyup", () => {
      removeList(false)
      for (let listing of combo.list) {
        if (
          listing.toLowerCase().startsWith(combo.input.value.toLowerCase()) &&
          combo.list.value != ""
        ) {
          const parent = combo.input.closest("form");

          createItem(parent, listing);

          combo.input.style.borderRadius = "5px 5px 0 0";
        }
      }
    });
  }
}

//Fermeture de items (liste ingredients, ustensiles, appareils) ouvert
function removeList(init = true) {
  let items = document.querySelectorAll(".list-items");

  items.forEach((item) => {
    item.remove();
    if (init) {
      initCombo();
      
    }//console.log(items);
  });
}

//Réinitialisation du combo sur le click d'un autre combo
function initCombo() {
  combos.forEach((close) => (close.input.value = ""));
  for (let combo of combos) {
    combo.input.style.borderRadius = "5px";
    combo.input.addEventListener("click", () => {});
  }
}


// arrow.classList.toggle("toggleArrow");
//window.addEventListener("click", function(event) {});

//https://www.codegrepper.com/code-examples/javascript/localstorage+array+push
