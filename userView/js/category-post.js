function loadListPostByCategory() {
    loadNavBar()
    let nameCategory=localStorage.getItem("nameCategory")
    var settings = {
        "url": "http://localhost:8080/userView/listBlogByCategoryName/"+nameCategory,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        document.getElementById("listPostByCategory").innerHTML = showListBlogByCategory(response);
        // localStorage.removeItem("nameCategory")
    });
}

function showListBlogByCategory(response) {
    let result = ""
    for (let i = 0; i < response.length; i++) {
        result += " <!-- Single Blog Post -->" +
            "                    <div class='single-blog-post style-1 d-flex flex-wrap mb-30'>" +
            "                        <!-- Blog Thumbnail -->" +
            "                        <div class='blog-thumbnail'>" +
            "                            <img src='http://localhost:8080/Image/"+response[i].picture+"' alt=''>" +
            "                        </div>" +
            "                        <!-- Blog Content -->" +
            "                        <div class='blog-content'>" +
            "                            <a href='#' class='post-tag'>The Best</a>" +
            "                            <a href='http://localhost:63342/case4-FE/single-post.html' class='post-title'onclick='saveBlogId("+response[i].id+")'>"+response[i].title+"</a>" +
            "                            <div class='post-meta'>" +
            "                                <a href='#' class='post-date'>"+response[i].createAt+"</a>" +
            "                                <a href='#' class='post-author'>By "+response[i].userInfo.name+"</a>" +
            "                            </div>" +
            "                            <p>"+response[i].describes+"</p>" +
            "                        </div>"
    }
    return result
}
