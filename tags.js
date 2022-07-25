//localStorage.clear();

function displayTags(value) {
  //Création d'une classe unique et récupération couleur pour chaque tag
  const colorTags = document.querySelectorAll(".ulCombo");

//  console.log(colorTags);

  function displayColorTag() {
    for (let color of colorTags) {
      //ajout d'une classe aux listes et aux tags par catégorie (ingredients, appareils et ustensiles)
      color.addEventListener("click", () => {
        let listTags = document.createElement("li");
        listTags.classList.add("list-tags");
        listTags.innerText = value;

        if (color.classList.contains("bgListCombo1")) {
          console.log(color);
          listTags.classList.add("ingTag");
          console.log(listTags);
        } else if (color.classList.contains("bgListCombo2")) {
          console.log(color);
          listTags.classList.add("appTag");
          console.log(listTags);
        } else if (color.classList.contains("bgListCombo3")) {
          console.log(color);
          listTags.classList.add("ustTag");
          console.log(listTags);
        }

        let closeTags = document.createElement("img");
        closeTags.src = "./assets/images/times-circle-regular.svg";
        closeTags.classList.add("closedtag");
        closeTags.style.cursor = "pointer";
        listTags.appendChild(closeTags);
        closeTags.addEventListener("click", () => {
          listTags.remove();
        });
        const tags = document.querySelector(".tags").appendChild(listTags);
        removeList();
        console.log(tags);
        console.log(listTags);
        delete listTags
      });
    }

  }
  displayColorTag();
  /************************************************************************** */
  //storageTags(listTags);
  /******************************************************* */
  // parent().siblings().removeClass("active").end().addClass("active");
  /****************************************************** */

  //Stockage liste des tags affichés

  // localStorage.setItem("tags", listTags.innerText);
  //console.log(localStorage);
  // localStorage.getItem("tags");
  // console.log(localStorage);

  //Création du close tags et de leurs fermeture
}
//listTags et tags ressortent la même chose
function storageTags(listTags) {
  let ingStorage = [];
  let appStorage = [];
  let ustStorage = [];

  ingStorage[0] = listTags.classList.contains("ingTag");
  appStorage[0] = listTags.classList.contains("appTag");
  ustStorage[0] = listTags.classList.contains("ustTag");
  localStorage.setItem("ingStorage", JSON.stringify(listTags.innerText));
  localStorage.setItem("appStorage", JSON.stringify(listTags.innerText));
  localStorage.setItem("ustStorage", JSON.stringify(listTags.innerText));
  let storedNames = JSON.parse(localStorage.getItem("ingStorage"));

  console.log(storedNames);
  // console.log(localStorage);
  //Comment pousser dans un tableau localStorage
  /*********************************** */
  // Obtenir les données existantes
  let existing = JSON.parse(localStorage.getItem("ingStorage"));
  console.log(existing);
  // S'il n'y a pas de données existantes, créez un tableau
  // Sinon, convertir la chaîne localStorage en un tableau
  existing = existing ? existing.split(", ") : [];

  // Ajouter de nouvelles données à localStorage Array
  existing.push(listTags.innerText);
  console.log(existing); //ressort un tableau ingStorage (2 x le même)
  // Enregistrer dans localStorage
  localStorage.setItem("ingStorage", existing.toString());
  // console.log(localStorage);
}
/*********************************************************** */
//   let arrays = ["hello"];
//   arrays.push("world");
//  localStorage.setItem("helloWorld", JSON.stringify(arrays));
/*********************************************************** */

//arrow = document.querySelector(".toggleArrow");
// arrow.classList.toggle("toggleArrow")

//localStorage.setItem();
//localStorage.getItem();
//localStorage.clear();

/************************************************************************** */
//https://gomakethings.com/how-to-update-localstorage-with-vanilla-javascript/
//https://www.codegrepper.com/code-examples/javascript/localstorage+array+push
/************************************************************************** */
//localStorage array append element/élément d'ajout de tableau localStorage
/********************************* */
// function addEntry() {
//     // (Parse any JSON) /Analyser tout JSON précédemment stocké dans allEntries
//     var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
//     if(existingEntries == null) existingEntries = [];
//     var entryTitle = document.getElementById("entryTitle").value;
//     var entryText = document.getElementById("entryText").value;
//     var entry = {
//         "title": entryTitle,
//         "text": entryText
//     };
//     localStorage.setItem("entry", JSON.stringify(entry));
//     // Enregistrer toutes les entrées dans le stockage local
//     existingEntries.push(entry);
//     localStorage.setItem("allEntries", JSON.stringify(existingEntries));
// };

/*************************************************************************** */

//Ajouter un tableau au stockage local
/********************************* */
// var names = [];
// names[0] = prompt("New member name?");
// localStorage.setItem("names", JSON.stringify(names));

// //...
// var storedNames = JSON.parse(localStorage.getItem("names"));

/*************************************************************************** */

//Comment pousser dans un tableau localStorage
/*********************************** */
// // Obtenir les données existantes
// var existing = localStorage.getItem("myFavoriteSandwich");
// // S'il n'y a pas de données existantes, créez un tableau
// // Sinon, convertissez la chaîne localStorage en un tableau
// existing = existing ? existing.split(",") : [];

// // Ajouter de nouvelles données à localStorage Array
// existing.push("tuna");
// // Enregistrer dans localStorage
// localStorage.setItem("myFavoriteSandwich", existing.toString());
// ;

/*************************************************************************** */

//Mettre à jour localStorage Array
// var yesArray = [];
// localStorage.setItem("yesArray", JSON.stringify(yesArray));
// yesArray = JSON.parse(localStorage.getItem("yesArray"));
// yesArray.push("yes");
// localStorage.setItem("yesArray", JSON.stringify(yesArray));
// JSON.parse(localStorage.getItem("yesArray")); // Returns ["yes"]
