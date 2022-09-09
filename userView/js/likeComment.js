function likeBlog(idUser, idBlog) {
    if (localStorage.getItem("user") == null) {
        showModalLoginRegister();

    } else {
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
                document.getElementById("iconLike" + id).innerHTML = "<a href=''><i class='fa fa-heart' aria-hidden='true' onclick='unlikeBlog(" + idUser + "," + response[i].blog.id + ")'></i><span id='likeBlog" + id + "'></span></a>"
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


function showComment(idBlog) {
    var settings = {
        "url": "http://localhost:8080/userView/listCountComment/" + idBlog,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        console.log(response)
        document.getElementById("commentBlog" + idBlog).innerText = " " + response;
    });
}

function showCommentBlog(idBlog) {
    var settings = {
        "url": "http://localhost:8080/userView/listComment/" + idBlog,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        let result = ""
        for (let i = response.length - 1; i >=0; i--) {
            result += "<!-- Single Comment Area -->" +
                "                            <li class='single_comment_area test'>" +
                "                                <!-- Comment Content -->" +
                "                                <div class='comment-content d-flex'>" +
                "                                    <!-- Comment Author -->" +
                "                                    <div class='comment-author'>" +
                "                                        <img src='http://localhost:8080/Image/" + response[i].userInfo.avatar + "' alt='error'>" +
                "                                    </div>" +
                "                                    <!-- Comment Meta -->" +
                "                                    <div class='comment-meta'>" +
                "                                        <div class='d-flex'>" +
                "                                            <a href='#' class='post-author'>" + response[i].userInfo.name + "</a>" +
                "                                            <a href='#' class='post-date'>" + response[i].createAt + "</a>" +
                "                                            <a href='#' class='reply'>Reply</a>" +
                "                                        </div>" +
                "                                        <p>" + response[i].content + "</p>" +
                "                                    </div>" +
                "                                </div>" +
                "                            </li>"
        }
        document.getElementById("listComment").innerHTML = result
        $(function () {
            $(".test").slice(0, 3).show();
            $("body").on('click touchstart', '.load-more', function (e) {
                e.preventDefault();
                $(".test:hidden").slice(0, 3).slideDown();
                if ($(".test:hidden").length == 0) {
                    $(".load-more").css('visibility', 'hidden');
                }
                $('html,body').animate({
                    scrollTop: $(this).offset().top
                }, 1000);
            });
        });
    });
}

function createComments() {
    let idBlog = localStorage.getItem("blogId")
    let idUser = getInfoLocalStorage("user").id
    let content = document.getElementById("message")

    var settings = {
        "url": "http://localhost:8080/comment/" + idBlog + "/" + idUser,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": getAuthorization(),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "content": content.value
        }),
    };

    $.ajax(settings).done(function (response) {
        content.value = null
        LoadBlog();
        console.log(response);
    });

}

