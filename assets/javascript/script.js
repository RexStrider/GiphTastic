    let search = "cats"

    // queryURL for Giphy API
    let queryURL = "https://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+config.GIPHY_KEY;

    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response);
    // });

    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
    });
