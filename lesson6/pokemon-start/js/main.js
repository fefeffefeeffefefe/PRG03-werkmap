window.addEventListener('load', init);

//Globals
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
let pokemonGallery;
let detailModal;
let pokemonData = {};
let detailContent;

/**
 * Initialize after the DOM is ready
 */
function init()
{
    pokemonGallery = document.getElementById('pokemon-gallery');
    pokemonGallery.addEventListener('click', pokemonClickHandler);

    //retrieve modal elements
    detailModal = document.getElementById('pokemon-detail');
    detailModal.addEventListener('click', detailModalClickHandler);
    detailModal.addEventListener('close', dialogCloseHandler);
    detailContent = document.querySelector('.modal-content');

    ajaxRequest(apiUrl, getPokemonSuccesHandler);
}

function ajaxRequest(url, succesCallback) {
    fetch(url)
        .then((response) => {
            if (!response.ok){
                throw new Error(`HTTP error (${response.status}): ${response.statusText}`);
            }
            return response.json();
        })
        .then(succesCallback)
        .catch(getPokemonErrorHandler);
}

function getPokemonSuccesHandler(data) {
    for (const pokemon of data.results) {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.dataset.name = pokemon.name;
        pokemonGallery.appendChild(pokemonCard);
        ajaxRequest(pokemon.url, fillPokemonCard);
    }
}

function fillPokemonCard(pokemon) {
    const  pokemonCard = document.querySelector(`.pokemon-card[data-name='${pokemon.name}']`);
    const title = document.createElement('h2');
    const img = document.createElement('img');
    const detailButton = document.createElement('button')
    // title.innerHTML = pokemon.name + ' #' + pokemon.id;
    title.innerHTML = `${pokemon.name} #${pokemon.id}`;
    detailButton.innerHTML = 'detail';
    img.src = pokemon.sprites.back_default;
    img.alt = pokemon.name;

    detailButton.dataset.id = pokemon.id;
    pokemonCard.appendChild(title);
    pokemonCard.appendChild(img);
    pokemonCard.appendChild(detailButton);
    // console.log(pokemonCard);

    //store pokemon globally
    pokemonData[pokemon.id] = pokemon;

}

function getPokemonErrorHandler(error) {
    console.log(error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.innerHTML = 'the item you tried to reach is not found';
    pokemonGallery.before(errorMessage);
}

function pokemonClickHandler(e) {
    let target = e.target;
    if (target.nodeName !== "BUTTON"){
        return;
    }
    console.log(target.src = pokemonData[target.dataset.id]);

    const pokemon = pokemonData[target.dataset.id];

    detailContent.innerHTML = '';

    const title = document.createElement('h1');
    const img = document.createElement('img');
    title.innerHTML = `${pokemon.name} #${pokemon.id}`;
    img.src = pokemon.sprites.front_shiny;
    img.alt = pokemon.name;
    detailContent.appendChild(title);
    detailContent.appendChild(img);

    for (const type of pokemon.types) {
        const typeContainer = document.createElement('div');
        typeContainer.innerHTML = type.type.name;
        console.log(typeContainer);
        detailContent.appendChild(typeContainer);
    }

    detailModal.showModal();
    pokemonGallery.classList.add('dialog-open');
}

function detailModalClickHandler(e) {
    if (e.target.nodeName === 'DIALOG' || e.target.nodeName === 'BUTTON'){
        detailModal.close();
    }
}

function dialogCloseHandler() {
    pokemonGallery.classList.remove('dialog-open');
}