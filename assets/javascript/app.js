$("document").ready(function () {


    let topics = ["cats", "star wars", "fail", "like a boss", "80s", "cute", "really", "facepalm", "kitten", "puppy", "yoda", "anchorman"];

    let buttonZone = $("#button-zone");
    let gifZone = $("#gif-zone");
    let addToArr = $("#add-topic");

    $(addToArr).on("click", function (e) {
        e.preventDefault();
        let userInput = $("#topic-input").val();
        topics.push(userInput);
        renderButton(userInput);
        $("#topic-input").val("");
    });


    for (var i = 0; i < topics.length; i++) {
        renderButton(topics[i]);
    };

    function renderButton (topic){ 
        let topicButton = $("<button>", "</button>");
        topicButton.attr("data-name", topic);
        topicButton.attr({
            class: "btn btn-secondary btn-lg shadow",
            type: "submit",
            value: topic,
        })
        topicButton.text(topic);
        buttonZone.append(topicButton);

    }


    buttonZone.on("click", "button", function () {
        gifZone.empty();
        let topicSearch = $(this).attr("data-name");
        const API_KEY = "api_key=fqIACawBYenDy5toIgCLpnqwOfsm5jnD";
        let gifLimit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&" + API_KEY + "&limit=" + gifLimit;


        // var queryURL = "https://api.giphy.com/v1/gifs/random?" + API_KEY + "&tag=" + topicSearch + "&limit=" + gifLimit;

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
                // p.addClass("text-left");

                let gifImage = $("<img>");
                gifImage.attr({
                    class: "img-fluid img-thumbnail shadow rounded",
                    src: results[j].images.fixed_height_still.url,
                    still: results[j].images.fixed_height_still.url,
                    animated: results[j].images.fixed_height.url,
                    state: "still",
                })
                // gifImage.attr("src", results[j].images.original_still.url);

                gifDiv.prepend(gifImage);
                gifDiv.prepend(p);
                gifZone.prepend(gifDiv);
            }
        });


    });

gifZone.on("click", "img", function () {
    let still = $(this).attr("still");
    let animated = $(this).attr("animated");
    let state = $(this).attr("state");

    if (state === "still") {
        $(this).attr("src", animated);
        $(this).attr("state", "animated");
    } else {
        $(this).attr("src", still);
        $(this).attr("state", "still");
    }

});



});
