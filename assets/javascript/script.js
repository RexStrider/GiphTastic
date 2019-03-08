    let search = "cats";

    // queryURL for Giphy API
    let queryURL = "https://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+config.GIPHY_KEY;

    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
    });

    (function(window, document, undefined){

        // code that should be taken care of right away
        
        window.onload = init;
        
        function init(){
            // the code to be called when the dom has loaded
            // #document has its nodes
            let animalBtn = document.getElementById("create-animal-button");

            console.log(animalBtn);

            animalBtn.addEventListener("click", addAnimalSearchButton);
        }
        
    })(window, document, undefined);

    // let animalBtn = document.getElementById("create-animal-button");

    // console.log(animalBtn);

    // animalBtn.addEventListener("click", addAnimalSearchButton);

    function addAnimalSearchButton(event) {
        event.preventDefault();

        let animal = document.getElementById("add-animal-input");

        console.log(animal);
        console.log(animal.value);
        // if (animal.value )
    }