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
    
  <p class="element-undefined"> Cet élément n'est pas associé à votre dernier choix .</p>`;

let combo1 = document.querySelector(".inputCombo1");
let combo2 = document.querySelector(".inputCombo2");
let combo3 = document.querySelector(".inputCombo3");
let inactiveArrow = document.querySelector(".arrow-down");
let arrow = document.querySelector(".toggleArrow");
let errorCombo = document.querySelector(".element-undefined");

//Create arrays
let components = []; // =>ingredients
let accessories = []; // =>ustensiles
let equipments = []; // =>appareils

//gat datas in api
function getDataCombo() {
  //get arrays ingrédients, appareils et ustensiles
  recipes.forEach((recipe) => {
    //Get each appliances/new array applianceList
    appliancesList = recipe.appliance;

    equipments.push(appliancesList);
    appliancesList = [...new Set(equipments)];

    //Det each ustensiles/new array ustensilesList
    ustensiles = recipe.ustensils;
    ustensiles.forEach((ust) => {
      ustensilesList = ust;

      accessories.push(ustensilesList);
      ustensilesList = [...new Set(accessories)];
    });

    //Get each components/new Array ingredientList
    ingredients = recipe.ingredients;
    ingredients.forEach((ing) => {
      ingredientsList = ing.ingredient;

      //Push elements in array components
      components.push(ingredientsList);
      //removal of duplicates
      ingredientsList = [...new Set(components)];
    });
  });
}
getDataCombo(components, accessories, equipments);

/***************************************************************************** */

//Sort names in lists in ascending order (native)
let sortedIngredients = ingredientsList.sort();
let sortedUstensile = ustensilesList.sort();
let sortedAppareils = appliancesList.sort();

//Create array with combos
let combos = [
  { input: combo1, list: sortedIngredients, arrow: inactiveArrow },
  { input: combo2, list: sortedAppareils, arrow: inactiveArrow },
  { input: combo3, list: sortedUstensile, arrow: inactiveArrow },
];
 //sort 3 objects with combo, the arrow and the sorted list, for each category.

/****************************************************************************** */

function createItemList(parent, listByCombo) {
  // Create elements listItem
  let listItem = document.createElement("li");
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";

  //localStorage tags for listItem
  listItem.addEventListener("click", () => {
   
    //for (let combo of combos) combo.arrow.classList.toggle("toggleArrow");

    //Create Storage elements per click
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

    //Remove listItem
    removeList();

    //Display Tags
    createTags(tempStorage);

    //Get cards
    cardsSort();
  });

  let word = listByCombo;

  //Display the value of each combo item clicked
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

    //CreateCloseTags appareils
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

/********************************************************************************** */
//https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types#d%c3%a9claration_de_variables
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
    removeList();
    cardsSort();
  });
}

/********************************************************************************* */

//Brings up the complete list of each "list" element when clicking on the combo
function displayList() {
  for (let combo of combos) {
     
    combo.input.addEventListener("click", () => {
      //console.log(combo.list);

      //  Ouvre arrow au click sur combo
      combo.arrow.classList.toggle("toggleArrow");

      //close the list/input on click on another combo
      removeList();

      for (let listByCombo of combo.list) {
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
//à inserrer dans le keyup sur if (e.target.value.length <= 3)
/**************************************************************************** */
//Sorting the list with the keyboard on combo
function keyboardList() {
  for (let combo of combos) {
    combo.input.addEventListener("keyup", (e) => {
     //retourner un nouveau placeholder par combo (exple "Rechercher un ingredient")
        removeList(false);
        
      for (let listByCombo of combo.list) {
        if (
          e.target.value.length >= 3 &&
          listByCombo.toLowerCase().includes(combo.input.value.toLowerCase()) //&&
         // combo.list.value != "" 
          
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

//Closing items (ingredients, ustensiles, appareils) open
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

//Combo Reset
function initCombo() {
  combos.forEach((close) => (close.input.value = ""));
  for (let combo of combos) {
    combo.input.value = "";
    combo.input.style.borderRadius = "5px";
    combo.input.addEventListener("click", () => {});
  }
}

/******************************************************************************** */
