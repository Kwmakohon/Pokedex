const _searchBttn = document.querySelector("button.search");
const _randomBttn = document.querySelector("button.random");
const _search = document.querySelector("#search");
const _hgt = document.querySelector(".height");
const _wgt = document.querySelector(".weight");
const _img = document.querySelector("img")
const _type0 = document.querySelector(".type0");
const _type1 = document.querySelector(".type1");
const _name = document.querySelector(".name");
const _genus = document.querySelector(".genus");
const _flavor = document.querySelector(".flavor");


const url = "https://pokeapi.co/api/v2/"


const getPokemonSpecies = async (q) => {
    
    const endpoint = url + 'pokemon-species/' + q;
    
    try{
        const response = await fetch(endpoint)
        if (response.ok) {
            let jsonResponse = await response.json();
            mapPokemonSpeciesResults(jsonResponse)
        }
    } catch(error){
        console.log(error);
    }
}

const getPokemon = async (q) => {
    
    const endpoint = url + 'pokemon/' + q; 

    try{
        const response = await fetch(endpoint)
        if (response.ok) {
            let jsonResponse = await response.json();
            mapPokemonResults(jsonResponse);
        }
    } catch(error){
        console.log(error);
    }    
}

_searchBttn.addEventListener("click", (e) => {
    const query = search.value.toLowerCase();
    e.preventDefault();
    getPokemonSpecies(query);
    getPokemon(query);
}); 

_randomBttn.addEventListener("click", (e) => {
    const num = Math.floor(Math.random()*807);
    e.preventDefault();
    getPokemonSpecies(num);
    getPokemon(num);
})

function mapPokemonResults(res) {

    _hgt.innerHTML = res.height
    _wgt.innerHTML = res.weight
    _img.src = res.sprites.front_default
    
    if (res.types.length > 1){
        if (res.types[0].slot === 1){
            _type0.innerHTML = res.types[0].type.name
            _type1.innerHTML = res.types[1].type.name
        } else {
            _type0.innerHTML = res.types[1].type.name
            _type1.innerHTML = res.types[0].type.name
        }
    }else {
        _type0.innerHTML = res.types[0].type.name}
}

function mapPokemonSpeciesResults(res) {
    
    _name.innerHTML = res.name
    
    const genusResult = res.genera.find((i) => i.language.name === "en")
    _genus.innerHTML = genusResult.genus;

    const flavorResult = res.flavor_text_entries.find(i => i.language.name === "en")
    //console.log(flavorResult)
   _flavor.innerHTML = flavorResult.flavor_text;
}