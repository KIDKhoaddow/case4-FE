function likeBlog(idUser, idBlog){
    var settings = {
        "url": "http://localhost:8080/like/"+idUser+"/"+idBlog,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": getAuthorization()
        }
    };
    $.ajax(settings).done(function (response) {
        document.getElementById("iconLike").innerHTML= "<a href='#'><i class='fa fa-heart' aria-hidden='true' onclick='unlikeBlog("+idUser+","+idBlog+")'></i><span id='likeBlog'></span></a>"
        console.log(response);
    });
    showLike(idBlog,idUser)
}
function unlikeBlog(idUser, idBlog){
    var settings = {
        "url": "http://localhost:8080/like/unlike/"+idUser+"/"+idBlog,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": getAuthorization()
        }
    };
    $.ajax(settings).done(function (response) {
        document.getElementById("iconLike").innerHTML="<a href=''><i class='fa fa-heart-o' aria-hidden='true' onclick='likeBlog("+idUser+","+response.id+")'></i><span id='likeBlog'></span></a>"
        console.log(response);
    });
    showLike(idBlog,idUser)
}