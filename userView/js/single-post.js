function LoadBlog() {
    loadNavBar()
    let idBlog = localStorage.getItem("blogId")
    var settings = {
        "url": "http://localhost:8080/userView/blog/" + idBlog,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        let idUser=getInfoLocalStorage("user").id
        document.getElementById("blogDetail").innerHTML = showBlog(response,idUser);
        document.getElementById("avatar").setAttribute("src", "http://localhost:8080/Image/" + response.userInfo.avatar);
        document.getElementById("author").innerText = response.userInfo.name;
        showLike(response.id,idUser)
        console.log(response);
    });

}

function showBlog(response,idUser) {
    let result = ""
    result += "<div class='blog-thumbnail mb-50'>" +
        "                            <img src='http://localhost:8080/Image/"+response.picture+"' alt=''>" +
        "                        </div>" +
        "                        <div class='blog-content'>" +
        "                            <a href='#' class='post-tag'>Healthy Food</a>" +
        "                            <h4 class='post-title'>" + response.title + "</h4>" +
        "                            <div class='post-meta mb-50'>" +
        "                                <a href='#' class='post-date'>" + response.createAt + "</a>" +
        "                                <a href='#' class='post-author'>By " + response.userInfo.name + "</a>" +
        "                            </div>" + "<p>" + response.content + "</p>" +
        "                            </div>" +
        "                        <!-- Post Comment & Share Area -->" +
        "                        <div class='post-comment-share-area d-flex justify-content-end '>" +
        "                            <!-- Post Favourite -->" +
        "                            <div class='post-favourite' id='iconLike'>" +
        "                                <a href=''><i class='fa fa-heart-o' aria-hidden='true' onclick='likeBlog("+idUser+","+response.id+")'></i><span id='likeBlog'></span></a>" +
        "                            </div>" +
        "                            <!-- Post Comments -->" +
        "                            <div class='post-comments'>" +
        "                                <a href='#'><i class='fa fa-comment-o' aria-hidden='true'></i> 12</a>" +
        "                            </div>" +
        "                            <!-- Post Share -->" +
        "                            <div class='post-share'>" +
        "                                <a href='#'><i class='fa fa-share-alt' aria-hidden='true'></i></a>" +
        "                            </div>" +
        "                        </div>"
    return result;
}
function showLike(id,idUser){
    var settings = {
        "url": "http://localhost:8080/userView/countLike/"+id,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        for(let i=0;i<response.length;i++){
            if(idUser === response[i].userInfo.id){
                // $("iconLike").removeClass("fa-heart-o").addClass("fa-heart");
                document.getElementById("iconLike").innerHTML= "<a href=''><i class='fa fa-heart' aria-hidden='true' onclick='unlikeBlog("+idUser+","+response[i].blog.id+")'></i><span id='likeBlog'></span></a>"
                break;

            }
        }
        if(response.length===0){
            document.getElementById("likeBlog").innerText=" "+0;
        }else {
            document.getElementById("likeBlog").innerText=" "+response.length;
        }
        console.log(response);
    });
}