
const _searchBttn = document.querySelector("#searchbttn");
const _randomBttn = document.querySelector("#randombttn");
const _search = document.querySelector("#search");
const _hgt = document.querySelector("#height");
const _wgt = document.querySelector("#weight");
const _img = document.querySelector("img");
const _type0 = document.querySelector("#type0");
const _type1 = document.querySelector("#type1");
const _name = document.querySelector("#name");
const _genus = document.querySelector("#genus");
const _flavor = document.querySelector("#flavor");
const _results = document.querySelector("#results");
const _loader = document.querySelector(".loader");
const _message = document.querySelector("#message")

const url = "https://pokeapi.co/api/v2/";
const numOfPokemon = 807

const getPokemonSpecies = async (q) => {
  const endpoint = url + "pokemon-species/" + q;

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.error(error);
  }
};

const getPokemon = async (q) => {
  const endpoint = url + "pokemon/" + q;

  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

const determineType = (res) => {
  if (res[0].types.length > 1) {
    if (res[0].types[0].slot === 1) {
      _type0.innerHTML = res[0].types[0].type.name;
      _type1.innerHTML = res[0].types[1].type.name;
    } else {
      _type0.innerHTML = res[0].types[1].type.name;
      _type1.innerHTML = res[0].types[0].type.name;
    }
  } else {
    _type0.innerHTML = res[0].types[0].type.name;
  }
}

const fetchAndMapAllResults = async (q) => {
  _loader.classList.remove("hidden");
  _results.classList.add("hidden");

  let res = await Promise.all([getPokemon(q), getPokemonSpecies(q)]);
  
  if (!res[0]) {
    _message.classList.remove("hidden")
    return
  } else {
    _message.classList.add("hidden")
  }

  _hgt.innerHTML = res[0].height;
  _wgt.innerHTML = res[0].weight;
  _img.src = res[0].sprites.front_default;

  determineType(res);
  

  _name.innerHTML = res[1].name;

  //not a huge deal (and probably not realistic), but you might want logic to check if the
  //result is null (i.e. "en" does not exist in the array). Not totally necessary for this though.
  const genusResult = res[1].genera.find((i) => i.language.name === "en");
  _genus.innerHTML = genusResult.genus;

  const flavorResult = res[1].flavor_text_entries.find(
    (i) => i.language.name === "en"
  );
  _flavor.innerHTML = flavorResult.flavor_text;

  _loader.classList.add("hidden");
  _results.classList.remove("hidden");
};

_searchBttn.addEventListener("click", (e) => {
  const query = _search.value.toLowerCase();
  e.preventDefault();
  fetchAndMapAllResults(query);
});

_randomBttn.addEventListener("click", (e) => {
  const num = Math.floor(Math.random() * numOfPokemon);
  e.preventDefault();
  fetchAndMapAllResults(num);
});
