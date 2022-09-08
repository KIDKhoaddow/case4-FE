function likeBlog(idUser, idBlog) {
    if (localStorage.getItem("user") == null) {
        showModalLoginRegister();

    }else {
        var settings = {
            "url": "http://localhost:8080/like/" + idUser + "/" + idBlog,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": getAuthorization()
            }
        };
        $.ajax(settings).done(function (response) {
            document.getElementById("iconLike" + idBlog).innerHTML = "<a  href=''><i class='fa fa-heart' aria-hidden='true' onclick='unlikeBlog(" + idUser + "," + idBlog + ")'></i><span id='likeBlog" + idBlog + "'></span></a>"

            console.log(response);
            showLike(idBlog, idUser)
        });

    }
     event.preventDefault()
}

function unlikeBlog(idUser, idBlog) {
    if (localStorage.getItem("user") == null) {
        showModalLoginRegister();
    } else {
        var settings = {
            "url": "http://localhost:8080/like/unlike/" + idUser + "/" + idBlog,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": getAuthorization()
            }
        };
        $.ajax(settings).done(function (response) {
            document.getElementById("iconLike" + idBlog).innerHTML = "<a  href='' ><i class='fa fa-heart-o' aria-hidden='true' onclick='likeBlog(" + idUser + "," + idBlog + ")'></i><span id='likeBlog" + idBlog + "'></span></a>"
            console.log(response);
            showLike(idBlog, idUser);
        });

    }
     event.preventDefault()
}

function showLike(id, idUser) {
    var settings = {
        "url": "http://localhost:8080/userView/countLike/" + id,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        for (let i = 0; i < response.length; i++) {
            if (idUser === response[i].userInfo.id) {
                // $("iconLike").removeClass("fa-heart-o").addClass("fa-heart");
                document.getElementById("iconLike" + id).innerHTML = "<a href=''><i class='fa fa-heart' aria-hidden='true' onclick='unlikeBlog(" + idUser + "," + response[i].blog.id + ")'></i><span id='likeBlog"+id+"'></span></a>"
                break;
            }
        }
        if (response.length === 0) {
            document.getElementById("likeBlog" + id).innerText = " " + 0;
        } else {
            document.getElementById("likeBlog" + id).innerText = " " + response.length;
        }
        console.log(response);
    });
}