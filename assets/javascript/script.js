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
                let queryURL = "https://api.giphy.com/v1/gifs/search?q="+search+"&limit=12&api_key="+config.GIPHY_KEY;

                fetch(queryURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {

                    let data = json.data;
                    
                    console.log(data);

                    let row = document.createElement("section");
                    row.setAttribute("class", "row");

                    for(i in data) {
                        console.log(i + " | " + (i % 4));

                        // create an image tag
                        let img = document.createElement("img");

                        // add a source to the image tag
                        img.setAttribute("src", data[i].images.fixed_height.url);

                        // create a new row AFTER every 4th image is created
                        if (i % 4 === 0 && i!=0) {
                            row = document.createElement("section");
                            row.setAttribute("class", "row");
                        }

                        // append the img to the row
                        row.append(img);

                        // every 4th image created, append a new row
                        if (i % 4 === 3) {
                            document.getElementById("images-go-here").append(row);

                            // then create a new row
                            row = document.createElement("section");
                            row.setAttribute("class", "row");
                        }
                    }
                });

                
            });

            document.getElementById("buttons-go-here").append(btn);
        }
    }
