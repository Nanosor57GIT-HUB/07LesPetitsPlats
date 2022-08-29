//Création du DOM
localStorage.clear();

document.querySelector(".containerCombo").innerHTML = ` 


<div class="combos">
<div class="combos-spaces">
         <form autocomplete="off">
      <div class="boxIngredients comb">
        <input type="text" id="inputCombo1" class="inputCombo1 inputCombo" placeholder="Ingredients ..." maxlength="9" />
        <img src="./assets/images/angle-up-solid.svg" class="arrow-down toggleArrow">
      </div>
      <ul class="ulCombo bgListCombo1"></ul>
    </form>
          

    <form autocomplete="off">
      <div class="boxAppareils comb">
        <input type="text" id="inputCombo2" class="inputCombo2 inputCombo" placeholder="Appareils ..." maxlength="9" />
        <img src="./assets/images/angle-up-solid.svg" class="arrow-down toggleArrow">
      </div>
      <ul class="ulCombo bgListCombo2"></ul>
    </form>
           

            <form autocomplete="off">
      <div class="boxUstensiles comb">
        <input type="text" id="inputCombo3" class="inputCombo3 inputCombo" placeholder="Ustensiles ..." maxlength="9" />
        <img src="./assets/images/angle-up-solid.svg" class="arrow-down toggleArrow">
      </div>
      <ul class="ulCombo bgListCombo3"></ul>
    </form>
  </div>
  </div>
    
  <p class="element-undefined"> Cet élément n'est pas associé à vos choix précédents .</p>
         `;

let combo1 = document.querySelector(".inputCombo1");
let combo2 = document.querySelector(".inputCombo2");
let combo3 = document.querySelector(".inputCombo3");
let inactiveArrow = document.querySelector(".arrow-down");
let arrow = document.querySelector(".toggleArrow");

//Création des const de tableaux
let components = []; // =>ingredients
let accessories = []; // =>ustensiles
let equipments = []; // =>appareils

//Récupération des datas api
function getDataCombo() {
  //Récupération des tableaux ingrédients, appareils et ustensiles
  recipes.forEach((recipe) => {
    //Récupération de chaque appareils/new array applianceList
    appliancesList = recipe.appliance;

    equipments.push(appliancesList);
    appliancesList = [...new Set(equipments)];

    //Récupération de chaque ustensiles/new array ustensilesList
    ustensiles = recipe.ustensils;
    ustensiles.forEach((ust) => {
      ustensilesList = ust;

      accessories.push(ustensilesList);
      ustensilesList = [...new Set(accessories)];
    });

    //Récupération de chaque component/new Array ingredientList
    ingredients = recipe.ingredients;
    ingredients.forEach((ing) => {
      ingredientsList = ing.ingredient;

      //Pousser les éléments dans le tableau component
      components.push(ingredientsList);
      //Suppression des doublons
      ingredientsList = [...new Set(components)];
    });
  });
}
getDataCombo(components, accessories, equipments);

/***************************************************************************** */

//Trier les noms dans les listes par ordre croissant (native)
let sortedIngredients = ingredientsList.sort();
let sortedUstensile = ustensilesList.sort();
let sortedAppareils = appliancesList.sort();

//Création d'un tableau avec les combos
let combos = [
  { input: combo1, list: sortedIngredients, arrow: inactiveArrow },
  { input: combo2, list: sortedAppareils, arrow: inactiveArrow },
  { input: combo3, list: sortedUstensile, arrow: inactiveArrow },
];
/*console.log(combos);*/ /*sort 3 objets avec le combo,
 la arrow et la liste triée, pour chaque catégorie.*/

/****************************************************************************** */

function createItemList(parent, listByCombo) {
  // Création des éléments listItem
  let listItem = document.createElement("li");
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";

  //localStorage tags for listItem
  listItem.addEventListener("click", () => {
    // console.log("click sur un item");
    console.log(listItem != word);

    //for (let combo of combos) combo.arrow.classList.toggle("toggleArrow");

    // console.log(listItem);
    // console.log(listItem.parentNode);
    // console.log(listItem.innerHTML);
    // console.log(word);

    if (localStorage.getItem("pp_Memory") == null) {
      let memoire = {
        ingredientStore: [],
        appareilStore: [],
        ustensileStore: [],
      };
      localStorage.setItem("pp_Memory", JSON.stringify(memoire));
    }

    let tempStorage = JSON.parse(localStorage.getItem("pp_Memory"));
    if (listItem.parentNode.classList.contains("bgListCombo1")) {
      tempStorage.ingredientStore.push(listItem.innerHTML);
    }
    if (listItem.parentNode.classList.contains("bgListCombo2")) {
      tempStorage.appareilStore.push(listItem.innerHTML);
    }
    if (listItem.parentNode.classList.contains("bgListCombo3")) {
      tempStorage.ustensileStore.push(listItem.innerHTML);
    }

    localStorage.setItem("pp_Memory", JSON.stringify(tempStorage));

    document.querySelector(".tags").innerHTML = "";

    //remove listItem
    removeList();

    //DisplayTags
    createTags(tempStorage);

    //faire l'algo ici

    //récup cards
    cardsSort();
  });

  let word = listByCombo;

  //afficher la valeur de chaque éléments combo cliqué
  listItem.innerText = word;
  // console.log(word);

  parent.querySelector(".ulCombo").appendChild(listItem);
}

/******************************************************************************* */

function createTags(tempStorage) {
  tempStorage.ingredientStore.forEach((ing) => {
    //CreateTags ingredients
    let listTags = document.createElement("li");
    listTags.classList.add("list-tags");
    listTags.classList.add("ingTag");
    listTags.innerText = ing;
    document.querySelector(".tags").append(listTags);

    //CreateCloseTags ingredients
    let closeTags = document.createElement("img");
    closeTags.src = "./assets/images/times-circle-regular.svg";
    closeTags.classList.add("closedTag");
    closeTags.classList.add("closedIngTag");
    closeTags.style.cursor = "pointer";
    listTags.appendChild(closeTags);
    removeTags(closeTags, listTags);
  });

  tempStorage.appareilStore.forEach((app) => {
    //CreateTags appareils
    let listTags = document.createElement("li");
    listTags.classList.add("list-tags");
    listTags.classList.add("appTag");
    listTags.innerText = app;
    document.querySelector(".tags").append(listTags);

    //CreateCloseTags Appareils
    let closeTags = document.createElement("img");
    closeTags.src = "./assets/images/times-circle-regular.svg";
    closeTags.classList.add("closedTag");
    closeTags.classList.add("closedAppTag");
    closeTags.style.cursor = "pointer";
    listTags.appendChild(closeTags);
    removeTags(closeTags, listTags);
  });

  tempStorage.ustensileStore.forEach((ust) => {
    //CreateTags ustensiles
    let listTags = document.createElement("li");
    listTags.classList.add("list-tags");
    listTags.classList.add("ustTag");
    listTags.innerText = ust;
    document.querySelector(".tags").append(listTags);

    //CreateCloseTags ustensiles
    let closeTags = document.createElement("img");
    closeTags.src = "./assets/images/times-circle-regular.svg";
    closeTags.classList.add("closedTag");
    closeTags.classList.add("closedUstTag");
    closeTags.style.cursor = "pointer";
    listTags.appendChild(closeTags);
    removeTags(closeTags, listTags);
  });
}

/******************************************************************************** */

//let x = "";
//let y = "";
//let z = "";
function getStorage() {
  //   //ressort les éléments stockés dans pp_Memory (si 0 return "")
  let tagsObj = JSON.parse(localStorage.getItem("pp_Memory"));

  let ingredientStore = tagsObj.ingredientStore;
  //
  //console.log(x);

  let appareilStore = tagsObj.appareilStore;
  //appareilStore.forEach((bcd) => (y = bcd));
  //console.log(y);

  let ustensileStore = tagsObj.ustensileStore;
  //ustensileStore.forEach((cde) => (z = cde));
  //console.log(z);
}

/******************************************************************************** */

/********************************************************************************** */
// À METTRE AU MOMENT DU CLIC SUR UN ITEM D'UNE LISTE (quand on ajoute un tag)

//ok. On récupère dans une variable le contenu du localStorage

// On crée une variable qui contiendra toutes les recettes à afficher (liste finale)

// On crée une variable qui va servir de vérificateur (si elle est vraie, on garde la recette,
// si c'est faux on ne fait rien)

// Pour chaque recette (que je nomme r)=>
// Je mets le vérificateur à vrai (on part du principe que la recette est bonne)

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types#d%c3%a9claration_de_variables

function cardsSort() {
  console.log("je passe ici");
  //get elements in storage
  getStorage();

  const array1 = recipes;

  //cards
  let comboCard = "";

  array1.forEach((recipe) => {
    names = recipe.name;
    time = recipe.time;
    description = recipe.description;

    ustensiles = recipe.ustensils;

    appliances = recipe.appliance;

    //array for checker function
    let t = [];

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
    let tagsObj = JSON.parse(localStorage.getItem("pp_Memory"));
    let ingredientStore = tagsObj.ingredientStore;
    let appareilStore = tagsObj.appareilStore;
    let ustensileStore = tagsObj.ustensileStore;
    let ok = true;

    ingredientStore.forEach((iS) => {
      if (!ingRecipe.includes(iS)) {
        ok = false;
      }
    });
    ustensileStore.forEach((uS) => {
      if (!recipe.ustensils.includes(uS)) {
        ok = false;
      }
    });
    appareilStore.forEach((aS) => {
      if (recipe.appliance != aS) {
        ok = false;
      }
    });
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

/********************************************************************************** */

function removeTags(closeTags, listTags) {
  closeTags.addEventListener("click", () => {
    //console.log(listTags);
    const nom = listTags.innerText;
    const classe = listTags.classList[1];
    //  console.log(nom, classe);
    let type = "";

    if (classe == "ingTag") {
      type = "ingredientStore";
    }
    if (classe == "appTag") {
      type = "appareilStore";
    }
    if (classe == "ustTag") {
      type = "ustensileStore";
    }

    let tempStorage = JSON.parse(localStorage.getItem("pp_Memory"));
    let index = tempStorage[type].indexOf(nom);
    if (index > -1) {
      tempStorage[type].splice(index, 1);
    }
    localStorage.setItem("pp_Memory", JSON.stringify(tempStorage));

    listTags.remove();
    cardsSort();
  });
}

/********************************************************************************* */

//Ressort la liste complète de chaque élément "list" au click sur le combo
function displayList() {
  for (let combo of combos) {
    combo.input.addEventListener("click", () => {
      //console.log(combo.list);

      //  Ouvre arrow au click sur combo
      combo.arrow.classList.toggle("toggleArrow");

      //ferme la liste/input au click sur autre combo
      removeList();

      for (let listByCombo of combo.list) {
        // console.log(listByCombo);
        const parent = combo.input.closest("form");
        createItemList(parent, listByCombo);
        combo.input.style.borderRadius = "5px 5px 0 0";
      }

      keyboardList();
    });

    combo.arrow.addEventListener("click", () => {
      //ferme listItem au click sur arrow
      combo.arrow.classList.toggle("toggleArrow");

      removeList();
    });
  }
}
displayList();

/********************************************************************************** */

//Tri de la liste au clavier sur combo
function keyboardList() {
  for (let combo of combos) {
    combo.input.addEventListener("keyup", () => {
      removeList(false);
      for (let listByCombo of combo.list) {
        if (
          listByCombo
            .toLowerCase()
            .startsWith(combo.input.value.toLowerCase()) &&
          combo.list.value != ""
        ) {
          const parent = combo.input.closest("form");
          //console.log(parent);
          createItemList(parent, listByCombo);

          combo.input.style.borderRadius = "5px 5px 0 0";
        }
      }
    });
    combos.forEach((close) => (close.input.value = ""));
  }
}

/********************************************************************************* */

//Fermeture de items (ingredients, ustensiles, appareils) ouvert
function removeList(init = true) {
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
    if (init) {
      initCombo();
    } //console.log(items);
  });
}

/********************************************************************************* */

//Réinitialisation du combo
function initCombo() {
  combos.forEach((close) => (close.input.value = ""));
  for (let combo of combos) {
    combo.input.value = "";
    combo.input.style.borderRadius = "5px";
    combo.input.addEventListener("click", () => {});
  }
}

/******************************************************************************** */
