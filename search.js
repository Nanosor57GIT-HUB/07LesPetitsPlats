document.querySelector(
  ".searchWrapper"
).innerHTML = `  <div class="searchRecipes">
            <label for="search">
              <i class="fas fa-search loupe"></i>
            </label>
            <input
            placeholder="Rechercher une recette ..."
              class="input"    
              type="text"
              id="search"
              name="search
              
              minlength="2"
              maxlength="30"
            /> 
            
          </div>
<p class="error">Votre recette n'éxiste pas, veuillez essayer avec un autre mot ...</p>`;

const searchInput = document.querySelector("#search");



searchInput.addEventListener("keyup", function () {
  const input = searchInput.value;

  const results = array.filter(
    (item) =>
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.description.toLowerCase().includes(input.toLowerCase())
  );

   

  results.forEach((cardRecipes) => cardRecipes );
;
});
