$("document").ready(function () {


    let topics = ["cats", "star wars", "fail", "like a boss", "80s", "cute", "really", "facepalm", "kitten", "puppy"];

    let buttonZone = $("#button-zone");
    let gifZone = $("#gif-zone");
    let gifForm = $("#gif-form");
    let addToArr = $("#add-topic");

    $(addToArr).on("click"), function () {
        let userInput = $("#topic-input").val();
        console.log(userInput);
    }


    for (var i = 0; i < topics.length; i++) {
        let topicButton = $("<button>", "</button>");
        let buttonValue = topics[i];
        topicButton.attr("data-name", buttonValue);
        topicButton.attr({
            class: "btn btn-secondary btn-lg shadow",
            type: "submit",
            value: buttonValue,
        })
        topicButton.text(buttonValue);
        buttonZone.append(topicButton);

    };


    $("button").on("click", function () {
        let topicSearch = $(this).attr("data-name");
        const API_KEY = "api_key=fqIACawBYenDy5toIgCLpnqwOfsm5jnD";
        let gifLimit = 10;
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&" + API_KEY + "&limit=" + gifLimit;

        // var queryURL = "http://api.giphy.com/v1/gifs/random?" + API_KEY + "&tag=" + topicSearch + "&limit=" + gifLimit;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let results = response.data;
            for (var j = 0; j < results.length; j++) {
                let gifDiv = $("<div>");
                let gifRating = results[j].rating;
                let p = $("<p>").text("Rating: " + gifRating.toUpperCase());

                let gifImage = $("<img>");
                gifImage.attr({
                    class: "img-fluid img-thumbnail",
                    src: results[j].images.original_still.url,
                })
                // gifImage.attr("src", results[j].images.original_still.url);

                gifDiv.prepend(gifImage);
                gifDiv.prepend(p);

                gifZone.prepend(gifDiv);

            }


        });


    });






});
