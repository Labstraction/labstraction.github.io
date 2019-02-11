const connectionString = "https://www.killersinger2000.info/tse/v3.6/simplehtmldom_1_5/my_parsers/scraping/my_scraper3.php?query=life&sort=0&category=0&page=0&adult=false&key=abcd&concurrent=0&provider_ids[]=3"
const connectionString2 = "http://www.google.com"

    ; (function () {
        $.get(connectionString, function (data, status) {
            if (status == "success") {
                console.log(data);
                alert("bella storia")

                let obj = JSON.parse(data);
                let div = document.getElementById("pippo")
                obj.results.forEach(element => {
                    let title = document.createElement("h1");
                    title.innerHTML = element.title;
                    title.appendChild(document.createElement("br"))
                    div.appendChild(title);

                    let link = document.createElement("a");
                    link.setAttribute("href", element.magnet);
                    link.innerHTML = "link";
                    div.appendChild(link);

                });
            }
        });
    })();