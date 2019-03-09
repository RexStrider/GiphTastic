    let animalsSearched = ["parrot", "corgi", "bird", "fish", "tiger", "lion", "t-rex", "triceratops", "raptor", "pterodactyl", "pteranodon"];

    (function(window, document, undefined){
        
        window.onload = init;
        
        function init(){

            let animalBtn = document.getElementById("create-animal-button");

            console.log(animalBtn);

            animalBtn.addEventListener("click", addAnimalSearchButton);

            for (i in animalsSearched) {
                let animal = animalsSearched[i];
                console.log(animal);

                // preload the search buttons for the animals
                let btn = document.createElement("button");
                btn.setAttribute("id", animal);
                btn.setAttribute("data-value", animal);
                btn.textContent = animal;
                btn.addEventListener("click", function(event) {
                    let btn = event.target;
                    let search = btn.getAttribute("data-value");
                    let queryURL = "https://api.giphy.com/v1/gifs/search?q="+search+"&limit=12&api_key="+config.GIPHY_KEY;

                    fetch(queryURL)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(json) {
                        // remove previous search from the images section
                        document.getElementById("images-go-here").innerHTML="";

                        // prepares the json data from giphy
                        let data = json.data;
                        
                        console.log(data);

                        // create a new row for the images
                        let row = document.createElement("section");
                        row.setAttribute("class", "row");

                        // set the number of images per row
                        let imagesPerRow = 2;

                        for(i in data) {

                            // create an image tag
                            let img = document.createElement("img");

                            // add a source to the image tag
                            let animateURL = data[i].images.fixed_height.url;
                            let stillURL = data[i].images.fixed_height_still.url

                            img.setAttribute("src", stillURL);
                            img.setAttribute("data-state", "still");
                            // img.setAttribute("data-animate", animateURL);
                            // img.setAttribute("data-still", stillURL);
                            img.addEventListener("click", function() {
                                
                                console.log(this);
                                // console.log(img);

                                let state = this.getAttribute("data-state");
        
                                if (state === "still") {
                                    this.setAttribute("src", animateURL);
                                    this.setAttribute("data-state", "animate");
                                } else {
                                    this.setAttribute("src", stillURL);
                                    this.setAttribute("data-state", "still");
                                }
                            });

                            // create a new row AFTER every 4th image is created
                            if (i % imagesPerRow === 0 && i!=0) {
                                row = document.createElement("section");
                                row.setAttribute("class", "row");
                            }

                            // append the img to the row
                            row.append(img);

                            if ( (i % imagesPerRow) === (imagesPerRow - 1)) {
                                document.getElementById("images-go-here").append(row);

                                // then create a new row
                                row = document.createElement("section");
                                row.setAttribute("class", "row");
                            }
                        }
                    });
                });

                // add buttons to web page
                document.getElementById("buttons-go-here").append(btn);
            }
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
                    // remove previous search from the images section
                    document.getElementById("images-go-here").innerHTML="";

                    // prepares the json data from giphy
                    let data = json.data;
                    
                    console.log(data);

                    // create a new row for the images
                    let row = document.createElement("section");
                    row.setAttribute("class", "row");

                    // set the number of images per row
                    let imagesPerRow = 2;

                    for(i in data) {

                        // create an image tag
                        let img = document.createElement("img");

                        // add a source to the image tag
                        let animateURL = data[i].images.fixed_height.url;
                        let stillURL = data[i].images.fixed_height_still.url

                        img.setAttribute("src", stillURL);
                        img.setAttribute("data-state", "still");
                        // img.setAttribute("data-animate", animateURL);
                        // img.setAttribute("data-still", stillURL);
                        img.addEventListener("click", function() {
                            
                            console.log(this);
                            // console.log(img);

                            let state = this.getAttribute("data-state");
    
                            if (state === "still") {
                                this.setAttribute("src", animateURL);
                                this.setAttribute("data-state", "animate");
                            } else {
                                this.setAttribute("src", stillURL);
                                this.setAttribute("data-state", "still");
                            }
                        });

                        // create a new row AFTER every 4th image is created
                        if (i % imagesPerRow === 0 && i!=0) {
                            row = document.createElement("section");
                            row.setAttribute("class", "row");
                        }

                        // append the img to the row
                        row.append(img);

                        if ( (i % imagesPerRow) === (imagesPerRow - 1)) {
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