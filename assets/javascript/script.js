    // let search = "cats";

    // queryURL for Giphy API
    // let queryURL = "https://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+config.GIPHY_KEY;

    // fetch(queryURL)
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(myJson) {
    //     console.log(myJson);
    // });
    let animalsSearched = [];

    (function(window, document, undefined){
        
        window.onload = init;
        
        function init(){

            let animalBtn = document.getElementById("create-animal-button");

            console.log(animalBtn);

            animalBtn.addEventListener("click", addAnimalSearchButton);
        }
        
    })(window, document, undefined);

    function addAnimalSearchButton(event) {
        event.preventDefault();

        let animal = document.getElementById("add-animal-input").value;
        let btn;

        // console.log(animal);
        // console.log(animal.value);

        if ( ! (animal.value === "" || animalsSearched.includes(animal)) ) {
            
            // adding animal to the array of animals searched
            animalsSearched.push(animal);

            // add a button to query the api
            btn = document.createElement("button");
            btn.setAttribute("id", animal);
            btn.setAttribute("data-value", animal);
            btn.textContent = animal;
            btn.addEventListener("click", function(event) {
                console.log(event.target);

                let btn = event.target;
                let search = btn.getAttribute("data-value");
                let queryURL = "https://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+config.GIPHY_KEY;

                fetch(queryURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {
                    // console.log(json);

                    let data = json.data;
                    // console.log(data);
                    // print information to web page
                    
                    for(i in data) {
                        // console.log(data[i]);

                        // console.log(data[i].rating);
                        // console.log(data[i].images.original.url);
                        // console.log(data[i].images.original_still.url);

                        let p = document.createElement("p");
                        let img = document.createElement("img");

                        p.textContent = "data rating is " + data[i].rating;
                        img.setAttribute("src", data[i].images.original.url);

                        document.getElementById("images-go-here").append(p, img);
                    }
                });

                
            });

            document.getElementById("buttons-go-here").append(btn);
        }
    }

    function searchForGiph() {
        // search the api for giph images for the specified query
        console.log();

        let search = document.getElementById(this);
        let queryURL = "https://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+config.GIPHY_KEY;

        fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            // console.log(json);

            let data = json.data;
            // console.log(data);
            // print information to web page
            
            for(i in data) {
                // console.log(data[i]);

                // console.log(data[i].rating);
                // console.log(data[i].images.original.url);
                // console.log(data[i].images.original_still.url);

                let p = document.createElement("p");
                let img = document.createElement("img");

                p.textContent = "data rating is " + data[i].rating;
                img.setAttribute("src", data[i].images.original.url);

                document.getElementById("images-go-here").append(p, img);
            }
        });
    }