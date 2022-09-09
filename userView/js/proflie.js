function loadProfilePage() {
    if (localStorage.getItem("user") == null) {
        location.href = "http://localhost:63342/case4-FE/index.html";
    }
    loadNavBar()
    let userId = getInfoLocalStorage("user").id

    var settings = {
        "url": "http://localhost:8080/blog/listBlog/" + userId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": getAuthorization()
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        document.getElementById("listPostByAuthor").innerHTML = showListBlogByAuthor(response, userId);
        for (let i = 0; i < response.length; i++) {
            showLike(response[i].id, userId)
            showComment(response[i].id)
        }
        // localStorage.removeItem("nameCategory")
    });
}
function showListBlogByAuthor(response, userId) {
    let result = ""
    for (let i = 0; i < response.length; i++) {
        result += "<!-- Single Post -->" +
            "<div class='col-12 col-md-6 col-lg-4' >" +
            "    <div class='single-post wow fadeInUp' data-wow-delay='0.5s'>" +
            "        <!-- Post Thumb -->" +
            "        <div class='post-thumb' onclick='showSingleBlog(" + response[i].id + ")'>" +
            "            <img style='width: 280px ; height: 280px;' src='http://localhost:8080/Image/" + response[i].picture + "' alt=''>" +
            "        </div>" +
            "        <!-- Post Content -->" +
            "        <div class='post-content'>" +
            "            <div class='post-meta d-flex'>" +
            "                <div class='post-author-date-area d-flex'>" +
            "                    <!-- Post Author -->" +
            "                    <div class='post-author'>" +
            "                        <a href='#'>By " + response[i].userInfo.name + "</a>" +
            "                    </div>" +
            "                    <!-- Post Date -->" +
            "                    <div class='post-date'>" +
            "                        <a href='#'>" + response[i].createAt + "</a>" +
            "                    </div>" +
            "                </div>" +
            "                <!-- Post Comment & Share Area -->" +
            "                <div class='post-comment-share-area d-flex'>" +
            "                    <!-- Post Favourite -->" +
            "                    <div class='post-favourite' id='iconLike" + response[i].id + "'>" +
            "                        <a href='#'><i class='fa fa-heart-o' aria-hidden='true' onclick='likeBlog(" + userId + "," + response[i].id + ")'></i><span id='likeBlog" + response[i].id + "'></span></a>" +
            "                    </div>" +
            "                    <!-- Post Comments -->" +
            "                    <div class='post-comments'>" +
            "                        <a href='#'><i class='fa fa-comment-o' aria-hidden='true' onclick='showSingleBlog(" + response[i].id + ")'></i><span id='commentBlog" + response[i].id + "'></span></a>" +
            "                    </div>" +
            "                    <!-- Post Share -->"
        if (response[i].blogStatus.status === "PUBLIC") {
            result += "                    <div class='post-share'>" +
                "                        <a href='#'><i class='fa fa-group' aria-hidden='true'></i></a>"
        }else if(response[i].blogStatus.status === "PRIVATE"){
            result += "                    <div class='post-share'>" +
                "                        <a href='#'><i class='fa fa-lock' aria-hidden='true'></i></a>"
        }
        else {
            result += "                    <div class='post-share'>" +
                "                        <a href='#'><i class='fa fa-clock-o' aria-hidden='true'></i></a>"
        }
        result += "                    </div>" +
            "                </div>" +
            "            </div>" +
            "                <h4 class='post-headline' >" + response[i].title +
            "                   <div class='table-data-feature'>" +
            "                        <button class='item' data-toggle='modal' data-placement='top' onclick='displayBlogToUpdate(" + response[i].id + ")'" +
            "                                   title='Edit' type='button' data-target='#updateBlog' style='background: green;'>" +
            "                               <i class='fa fa-edit' style='color: white'></i>" +
            "                        </button>" +
            "                        <button class='item' data-toggle='modal' data-placement='top' onclick='displayBlogToDelete(" + response[i].id + ")'" +
            "                               title='Delete' type='button' data-target='#deleteBlog'  style='background: red;'>" +
            "                               <i class='fa fa-close' style='color: white'></i>" +
            "                       </button>" +
            "</div></h4></div></div></div>"
    }
    document.getElementById("contentModalDeleteBlog").innerText = " Are you sure to delete this post"
    return result
}

function displayBlogToUpdate(idBlog) {
    var settings = {
        "url": "http://localhost:8080/userView/blog/" + idBlog,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        document.getElementById("picture").setAttribute("src", "http://localhost:8080/Image/" + response.picture);
        document.getElementById("AuthorBlog").innerText = response.userInfo.name;
        document.getElementById("title-input").value = response.title;
        document.getElementById("describe-input").value = response.describes;
        document.getElementById("content-input").value = response.content;
        document.getElementById("createAtBlog").innerText = response.createAt;
        console.log(response);
        showListCategoryBlogModal("category-input")
    });
    document.getElementById("confirmUpdateBlog").setAttribute("onclick", "updateBlog(" + idBlog + ")");
}

function showListCategoryBlogModal(idCategory) {
    let result = ""


    var settings = {
        "url": "http://localhost:8080/userView/listCategory",
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        result += "  <select name='select'  class='form-control' id='" + idCategory + "-select" + "'  >"
        for (let i = 0; i < response.length; i++) {
            result += " <option value='" + response[i].id + "'>" + response[i].name + "</option>"
        }
        result += "</select>"
        document.getElementById(idCategory).innerHTML = result;
        console.log(response);
    });
}

function displayBlogToDelete(idBlog) {
    document.getElementById("contentModalDeleteBlog").innerText = " Are you sure to delete this post";
    document.getElementById("confirmDeleteBlog").setAttribute("onclick", "deleteBlog(" + idBlog + ")");
}

function updateBlog(idBlog) {
    let idUser = getInfoLocalStorage("user").id
    let title = document.getElementById("title-input").value;
    let describe = document.getElementById("describe-input").value;
    let content = document.getElementById("content-input").value;
    let categoryId = document.getElementById("category-input-select").value;
    let blog = {
        id: idBlog,
        title: title,
        picture: null,
        createAt: null,
        describes: describe,
        content: content,
        category: {
            id: categoryId,
            name: null,
            picture: null
        },
        blogStatus: {
            id: idBlog,
            updateAt: null,
            status: null,
            verify: null
        },
        userInfo: null
    }


    $.ajax({
        headers: {
            "Authorization": getAuthorization(),
            "Content-Type": "application/json",
        },
        type: "PUT",
        url: "http://localhost:8080/blog/update/" + idUser,
        data: JSON.stringify(blog),
        success: function (response) {

            console.log(response)
        }
    }).done(function (){

    })
    loadProfilePage();
    event.preventDefault()

}

function deleteBlog(idBlog) {
    var settings = {
        "url": "http://localhost:8080/blog/delete/" + idBlog,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
            "Authorization": getAuthorization()
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

    });
    loadProfilePage();
}

function createBlog() {
    let title = document.getElementById("title-input-create").value
    let describe = document.getElementById("describe-input-create").value
    let content = document.getElementById("content-input-create").value
    let idCategory = document.getElementById("category-input-create-select").value
    let status = document.getElementById("selectStatus").value;
    let blog = {
        id: null, title: title, picture: null, createAt: null, describes: describe, content: content,
        category: {id: idCategory, name: null, picture: null},
        blogStatus: {id: null, updateAt: null, status: status, verify: null},
        userInfo: null
    }

    let file = null
    if ($('#picture-input-create').val() !== '') {
        file = $('#picture-input-create')[0].files[0];
    }

    let formData = new FormData();
    formData.append("fileImage", file);
    formData.append("blog", new Blob([JSON.stringify(blog)], {type: "application/json"}))
    let idUser = getInfoLocalStorage("user").id
    let settings = {
        "url": "http://localhost:8080/blog/create/" + idUser,
        "method": "POST",
        "timeout": 0,
        "contentType": false,
        "processData": false,
        "headers": {
            "Authorization": getAuthorization()
        },
        "data": formData,
    };
    $.ajax(settings).done(function (response) {

        console.log(response);
    });
    loadProfilePage();
}

function showSingleBlog(idBlog) {
    localStorage.setItem("blogId", idBlog)
    location.href = "http://localhost:63342/case4-FE/single-post.html"
}