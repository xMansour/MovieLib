window.addEventListener('DOMContentLoaded', () => {
    const fs = require('fs');
    const files = fs.readdirSync('D:\Movies');
    const rawData = [];
    //const namesAndPaths = new Array();
    const namesAndPaths = new Map();


    files.forEach(file => {
        rawData.push(file);
    }
    );
    for (i in rawData) {
        let movieName = rawData[i];
        const extensionIndex = movieName.indexOf(".mp4") || movieName.indexOf(".avi");
        movieName = rawData[i].substring(0, extensionIndex).replaceAll(".", " ").trim();
        namesAndPaths.set(movieName, rawData[i]);
        rawData[i] = movieName;

    }
    console.log(rawData);
    console.log(namesAndPaths);
    for (let i = 0; i < 10; i++) {
        new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else reject();

                }
            }
            xhr.open("GET", `http://www.omdbapi.com/?apikey=eed12a96&t=${rawData[i]}`);
            xhr.send("");
        }).then((response) => {
            let movieJson = JSON.parse(response);
            if (movieJson["Response"] === "False")
                console.log("undefined " + rawData[i]);
            else
                extractJsonData(movieJson, i);
        }).catch((error) => {
            console.error("Failed Request: " + error);
        });
    }



    function extractJsonData(jsonObject) {
        const movieTitle = jsonObject["Title"];
        const movieDirector = jsonObject["Director"];
        const movieActors = jsonObject["Actors"];
        const movieLanguage = jsonObject["Language"];
        const moviePlot = jsonObject["Plot"];
        const movieRated = jsonObject["Rated"];
        const movieRuntime = jsonObject["Runtime"];
        const movieImdbRating = jsonObject["imdbRating"];
        const moviePoster = jsonObject["Poster"];
        const movieGenre = jsonObject["Genre"];
        const movieYear = jsonObject["Year"];

        document.getElementById("cardsContainer").innerHTML += `<div class="movieCard">
        <img src="${moviePoster}" alt="movie poster" class="moviePic" />
        <h3 class="movieTitle">${movieTitle}</h3>
        <p class="movieRate">IMDB Rating: ${movieImdbRating}</p>
        <p class="movieTime">Runtime: ${movieRuntime}</p>
    </div>`;

        //        <p class="movieDescription">Plot: ${moviePlot}</p>

        //needs refactor
        document.querySelectorAll(".movieCard").forEach(card =>
            card.onclick = (e) => {
                const clickedMovieName = card.getElementsByClassName("movieTitle")[0].innerHTML;
                console.log(clickedMovieName);
                //console.log("Path: " + namesAndPaths[clickedMovieName]);
                console.log(namesAndPaths.has(clickedMovieName));
                console.log("Path: " + namesAndPaths.get(clickedMovieName));
                console.log(rawData);
                console.log(namesAndPaths);

            }
        );
    }



    function runSelectedMovie() {
        var child_process = require("child_process");
        // Spawn VLC
        var proc = child_process.spawn("VLC", [`D:\\Movies\\[EgyBest].All.Quiet.On.The.Western.Front.1930.720p.x264.mp4`], { shell: true });
        // Handle VLC error output (from the process' stderr stream)
        proc.stderr.on("data", (data) => {
            console.error("VLC: " + data.toString());
        });
        // Optionally, also handle VLC general output (from the process' stdout stream)
        proc.stdout.on("data", (data) => {
            console.log("VLC: " + data.toString());
        });
        // Finally, detect when VLC has exited
        proc.on("exit", (code, signal) => {
            // Every code > 0 indicates an error.
            console.log("VLC exited with code " + code);
        });
    }

})

