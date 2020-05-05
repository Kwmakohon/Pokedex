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
const _results = document.querySelector(".results");
const _loader = document.querySelector(".loader");


const url = "https://pokeapi.co/api/v2/"


const getPokemonSpecies = async (q) => {
    
    const endpoint = url + 'pokemon-species/' + q;
    
    try{
        const response = await fetch(endpoint)
        if (response.ok) {
            let jsonResponse = await response.json();
            return jsonResponse
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
            return jsonResponse
        }
    } catch(error){
        console.log(error);
    }    
}

_searchBttn.addEventListener("click", (e) => {
    const query = search.value.toLowerCase();
    e.preventDefault();
    mapAllResults(query);
}); 

_randomBttn.addEventListener("click", (e) => {
    const num = Math.floor(Math.random()*807);
    e.preventDefault();
    mapAllResults(num);
})

const mapAllResults = async (q) => {
    _loader.classList.remove("hidden");
    _results.classList.add("hidden");
    
    let res = await Promise.all([getPokemon(q), getPokemonSpecies(q)])
    
    _hgt.innerHTML = res[0].height
    _wgt.innerHTML = res[0].weight
    _img.src = res[0].sprites.front_default

    if (res[0].types.length > 1){
        if (res[0].types[0].slot === 1){
            _type0.innerHTML = res[0].types[0].type.name
            _type1.innerHTML = res[0].types[1].type.name
        } else {
            _type0.innerHTML = res[0].types[1].type.name
            _type1.innerHTML = res[0].types[0].type.name
        }
    }else {
        _type0.innerHTML = res[0].types[0].type.name}

    _name.innerHTML = res[1].name
    
    const genusResult = res[1].genera.find((i) => i.language.name === "en")
    _genus.innerHTML = genusResult.genus;

    const flavorResult = res[1].flavor_text_entries.find(i => i.language.name === "en")
    //console.log(flavorResult)
   _flavor.innerHTML = flavorResult.flavor_text;

   _loader.classList.add("hidden"); 
   _results.classList.remove("hidden");
}
