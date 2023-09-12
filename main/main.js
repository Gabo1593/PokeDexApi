const container = document.querySelector(".container");
const details = document.querySelector(".details");
const nameDetails = document.querySelector("#name");
const ImgDetails = document.querySelector("#img__detail");
const ImgDetails2 = document.querySelector("#img__detail2");
const numberDetails = document.querySelector("#number");
const abilitiesType = document.querySelector("#abilities__type");
const abilitiesName = document.querySelector("#abilities__name");
const descriptionHeight = document.querySelector("#description__height");
const descriptionWight = document.querySelector("#description__weight");
const hp = document.querySelector("#hp");
const atk = document.querySelector("#atk");
const def = document.querySelector("#df");
const spd = document.querySelector("#spd");
const iconClose = document.querySelector(".icon_close");

const colorsType = {
  fire: "#ee0505bd",
  water: "#0e87f0",
  default: "#d4c0ff",
  grass: "#7aff7a",
  bug: "orange",
  poison: "#f25e5e",
  electric: "#c8c85d",
  ground: "#9d6d6d",
  fairy: "pink"
};

window.addEventListener("resize", ()=>{
  if(window.innerWidth < 490){
    if(container.style.display == "flex"){
      details.style.display = "none";
    }else{
      details.style.display = "flex";
      container.style.display = "none"
    }
  }else{
    details.style.display = "flex";
    container.style.display = "grid"
  }
})

function pokemonId(numero){
  for(let i = 1; i<=numero; i++){
    fetchPokemon(i);
  }
  fetchPokemon(numero);
}

function fetchPokemon(id){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    pokemones(data)
    

  })
  .catch(function(error) {
    console.log('Error:', error);
  });
}


function pokemones(pokemon){
  let divPokedex = document.createElement("div");
  divPokedex.classList = "divPokedex";
  divPokedex.innerHTML = `
  <h1>${pokemon.name}</h1> 
  <img src=${pokemon.sprites.other.dream_world.front_default}> 
  `;
  container.appendChild(divPokedex);
  colorBg(pokemon, divPokedex)
  divPokedex.addEventListener("click", ()=>{

    colorBg(pokemon, details)
    nameDetails.innerText = pokemon.name;
    ImgDetails.src = pokemon.sprites.other.dream_world.front_default;
    ImgDetails2.src = pokemon.sprites.other['official-artwork'].front_default;
    ImgDetails2.style.display= "block"
    numberDetails.innerText = `#${pokemon.id}`;
    abilitiesType.innerText = `Type: ${pokemon.types[0].type.name}`;
    abilitiesName.innerText = ` Abilities: ${pokemon.abilities[0].ability.name}, ${pokemon.abilities[1].ability.name}`;
    descriptionHeight.innerText = `Height: ${(pokemon.height)/10} M`;
    descriptionWight.innerText = `Weight: ${(pokemon.weight)/10} Kg`;
    
    hp.innerHTML = `HP: <input type="range" name="${pokemon.stats[0].stat.name}" id="${pokemon.stats[0].stat.name}" value="${pokemon.stats[0].base_stat}"> ${pokemon.stats[0].base_stat}`;

    atk.innerHTML = `Attack: <input type="range" name="${pokemon.stats[1].stat.name}" id="${pokemon.stats[1].stat.name}" value="${pokemon.stats[1].base_stat}"> ${pokemon.stats[1].base_stat}`;

    def.innerHTML = `Defense: <input type="range" name="${pokemon.stats[2].stat.name}" id="${pokemon.stats[2].stat.name}" value="${pokemon.stats[2].base_stat}"> ${pokemon.stats[2].base_stat}`;

    spd.innerHTML = `Speed: <input type="range" name="${pokemon.stats[5].stat.name}" id="${pokemon.stats[5].stat.name}" value="${pokemon.stats[5].base_stat}"> ${pokemon.stats[5].base_stat}`;
      if(window.innerWidth < 490){
        details.style.display = "flex";
        container.style.display = "none";
      }
    details.style.display = "flex";
    let description = `${nameDetails.innerText} pokemon ${abilitiesType.innerText}, ${abilitiesName.innerText}`;
    let sonar = new SpeechSynthesisUtterance(description);
    speechSynthesis.speak(sonar);
  })
  
}
pokemonId(50);

function colorBg(colors, bg,){
  const pokemonColor = colors.types[0].type.name;
  if(colorsType[pokemonColor]){
    bg.style.background = colorsType[pokemonColor];
  } else{bg.style.background = colorsType.default;}

}

iconClose.addEventListener("click", ()=>{
  details.style.display = "none";
  container.style.display = "grid";
})