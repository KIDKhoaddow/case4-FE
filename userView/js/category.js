function loadListCategory() {
    loadNavBar()
    var settings = {
        "url": "http://localhost:8080/userView/listCategory",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        document.getElementById("categoryList").innerHTML = showListCategory(response);
    });
}

function showListCategory(response) {
    let result = ""
    for (let i = 0; i < response.length; i++) {
        result += "  <div class='col-12 col-sm-6 col-lg-4'>\n" +
            "                <div class='single-post-catagory mb-30'>\n" +
            "                    <img src='http://localhost:8080/Image/" + response[i].picture + "' alt=''>\n" +
            "                    <!-- Content -->\n" +
            "                    <div class='catagory-content-bg'>\n" +
            "                        <div class='catagory-content'>\n" +
            "                            <a href='http://localhost:63342/case4-FE/catagory-post.html' class='post-tag'>The Best</a>\n" +
            "                            <a href='http://localhost:63342/case4-FE/catagory-post.html' class='post-title' onclick='saveCategoryName(" + response[i].id + ")'>" + response[i].name + "</a>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>"
    }
    return result
}


