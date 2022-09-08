let link = "http://localhost:8080"
let linkAnother = "http://192.168.1.142:8080"
let linkImg = link + "/Image/"
let linkUserInfo = link + "/userInfo/"


function getLists() {
    if (localStorage.getItem("user") == null) {
        location.href = "http://localhost:63342/case4-FE/login.html";
    }
    getAllUser()
    getAdminInfo()
    getAllBlog()
    getAllCategory()
}

function getAdminInfo() {
    let idAdmin = getInfoLocalStorage("user").id;
    let Authorization = getAuthorization();
    let settings = {
        "url": link + "/userInfo/findByUserId/" + idAdmin,
        "method": "GET",
        "headers": {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        },
        "timeout": "0",
        "data": "\r",
        "error": function () {
            location.href = "http://localhost:63342/case4-FE/login.html";
        }
    };
    $.ajax(settings).done(function (userInfo) {
        document.getElementById("avatarAdmin").setAttribute("src", linkImg + userInfo.avatar)
        document.getElementById("avatarAdminDropDown").setAttribute("src", linkImg + userInfo.avatar)
        document.getElementById("nameAdmin").innerText = userInfo.user.username
        document.getElementById("nameAdminDropDown").innerText = userInfo.user.username
        document.getElementById("emailAdmin").innerText = userInfo.email
        console.log(userInfo)

    });
}

function getAllUser() {
    let Authorization = getAuthorization();
    let settings = {
        "url": "http://localhost:8080/admin/users",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        },
        "data": "\r",
    };
    $.ajax(settings).done(function (response) {
        document.getElementById("listUser").innerHTML = displayTableUser(response);
        for (let i = 0; i < response.length; i++) {
            if (!response[i].userStatus.verify) {
                let rows = document.getElementById("rowUser").children
                for (let j = 0; j < rows.length; j++) {
                    rows[j].style.background = "#f8d7da"
                }
            }
        }
        console.log(response);
    });
}

function displayTableUser(data) {

    let result = ""
    for (let i = 0; i < data.length; i++) {
        result += " <tr class='tr-shadow' id='rowUser'>"
        result += "<td class=''>" + (i + 1) + "</td>"
        result += "<td><img id='image' srcset='http://localhost:8080/Image/" + data[i].avatar + "' class='img img-40'></td>"
        result += "<td>" + data[i].user.username + "</td>"

        if (data[i].user.roles[0].name === "ROLE_ADMIN") {
            result += "<td ><span class='role admin'>Admin</span></td>"
        } else {
            result += "<td ><span class='role user'>User</span></td>"
        }
        result += "<td>" + data[i].name + "</td>"
        result += "<td>" + data[i].email + "</td>"
        result += "<td>" + data[i].birthDay + "</td>"
        result += "<td>" + data[i].phoneNumber + "</td>"
        result += "<td>" + data[i].registerDate + "</td>"
        result += "<td>" + data[i].userStatus.status + "</td>"
        result += "<td><div class='table-data-feature'>"
        result += "<button class='item' type='button' data-toggle='modal' data-target='#infoUser' " +
            "data-placement='top' title='Info' onclick='displayModalInfoUser(" + data[i].id + ")'>"
        result += "<i class='zmdi zmdi-info'></i></button>"
        if (data[i].userStatus.verify) {
            document.getElementById("contentModalActionUser").innerText = " Are you sure to ban this Account"

            result += "<button class='item' type='button' data-toggle='modal' data-target='#banAndActiveUser'" +
                " data-placement='top' title='Ban' onclick='getUserIdToBan(" + data[i].userStatus.id + ")'>"
            result += "<i class='fa fa-ban'></i>"
        } else {
            document.getElementById("contentModalActionUser").innerText = " Are you sure to active this Account"

            result += "<button class='item' type='button' data-toggle='modal' data-target='#banAndActiveUser'" +
                " data-placement='top' title='Active' onclick='getUserIdToActive(" + data[i].userStatus.id + ")'>"
            result += "<i class='fa fa-check'></i>"
        }

        result += "</button></div></td>"
        result += "<tr class='spacer'></tr>"

    }
    return result;
}

function displayModalInfoUser(id) {
    let Authorization = getAuthorization();
    var settings = {
        "url": "http://localhost:8080/userInfo/findById/" + id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        },
        "data": "\r",
    };
    $.ajax(settings).done(function (response) {
        let userInfo = response
        document.getElementById("ava").setAttribute("src", linkImg + userInfo.avatar);
        document.getElementById("id").innerText = userInfo.id;
        document.getElementById("username").innerText = userInfo.user.username;
        document.getElementById("name").innerText = userInfo.name;
        document.getElementById("email").innerText = userInfo.email;
        document.getElementById("phone").innerText = userInfo.phone;
        document.getElementById("birthday").innerText = userInfo.birthDay;
        document.getElementById("registerDate").innerText = userInfo.registerDate;
        document.getElementById("lastLogin").innerText = userInfo.userStatus.lastLogin;
        document.getElementById("status").innerText = userInfo.userStatus.status;
        console.log(response);
    });
}

function getUserIdToBan(id) {
    document.getElementById("confirmActionUser").setAttribute("onclick", "banUser(" + id + ")");
}

function getUserIdToActive(id) {
    document.getElementById("confirmActionUser").setAttribute("onclick", "activeUser(" + id + ")");
}

function activeUser(id) {
    let Authorization = getAuthorization();
    let settings = {
        "url": "http://localhost:8080/admin/activeUser/" + id,
        "method": "GET",
        "headers": {
            "Authorization": Authorization
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        getAllUser();
    });

}

function banUser(id) {
    let Authorization = getAuthorization();
    let settings = {
        "url": "http://localhost:8080/admin/banUser/" + id,
        "method": "GET",
        "headers": {
            "Authorization": Authorization
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        getAllUser();
    });

}

function getAllBlog() {

    let Authorization = getAuthorization()
    var settings = {
        "url": "http://localhost:8080/admin/blogs",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        },
        "data": "\r",
    };
    $.ajax(settings).done(function (response) {
        document.getElementById("listBlog").innerHTML = displayTableBlog(response);
        for (let i = 0; i < response.length; i++) {
            if (!response[i].blogStatus.verify) {
                let rows = document.getElementById("rowBlog").children
                for (let j = 0; j < rows.length; j++) {
                    rows[j].style.background = "#f8d7da"
                }
            }
        }
        console.log(response);
    });
}

function displayTableBlog(data) {
    let result = ""
    for (let i = 0; i < data.length; i++) {
        result += " <tr class='tr-shadow' id='rowBlog'>"
        result += "<td>" + (i + 1) + "</td>"
        result += "<td>" + data[i].title + "</td>"
        result += "<td>" + data[i].category.name + "</td>"
        result += "<td>" + data[i].userInfo.user.username + "</td>"
        result += "<td>" + data[i].describes + "</td>"
        result += "<td>" + data[i].createAt + "</td>"

        if (data[i].blogStatus.status === "PENDING") {
            result += "<td><h4><span class='badge badge-warning'>" + data[i].blogStatus.status + "</span></h4></td>"
        } else if (data[i].blogStatus.status === "PUBLIC") {
            result += "<td><h4><span class='badge badge-primary'>" + data[i].blogStatus.status + "</span></h4></td>"
        } else {
            result += "<td><h4><span class='badge badge-danger'>" + data[i].blogStatus.status + "</span></h4></td>"
        }


        result += "<td><div class='table-data-feature'>"
        result += "<button class='item' type='button' data-toggle='modal' data-target='#infoBlog' " +
            "data-placement='top' title='Info' onclick='displayModalInfoBlog(" + data[i].id + ")'>"
        result += "<i class='zmdi zmdi-info'></i></button>"


        if (data[i].blogStatus.status === "PENDING") {
            document.getElementById("contentModalActionBlog").innerText = " Are you sure to admit this Post";
            result += "<button class='item' data-toggle='modal' data-placement='top'  data-target='#reviewBlog' " +
                "title='Review' onclick='getBlogPublic(" + data[i].id + ")'>"
            result += "<i class='fa fa-thumbs-up'></i></button>"
        }

        if (data[i].blogStatus.verify) {
            document.getElementById("contentModalActionBlog").innerText = " Are you sure to ban this Post";
            result += "<button class='item' type='button' data-toggle='modal' data-target='#banAndActiveBlog'" +
                " data-placement='top' title='Ban' onclick='getBlogIdToBan(" + data[i].blogStatus.id + ")'>"
            result += "<i class='fa fa-ban'></i></button>"
        } else {
            document.getElementById("contentModalActionBlog").innerText = " Are you sure to active this Post";
            result += "<button class='item' type='button' data-toggle='modal' data-target='#banAndActiveBlog'" +
                " data-placement='top' title='Active' onclick='getBlogIdToActive(" + data[i].blogStatus.id + ")'>"
            result += "<i class='fa fa-check'></i></button>"
        }
        result += "</div></td></tr>"
        result += "<tr class='spacer'></tr>"
    }
    return result;
}

function displayModalInfoBlog(id) {
    let Authorization = getAuthorization();
    var settings = {
        "url": "http://localhost:8080/userView/blog/" + id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": Authorization
        },
    };

    $.ajax(settings).done(function (response) {
        document.getElementById("idBlog").innerText = response.id
        document.getElementById("picture").setAttribute("src", linkImg + response.picture)
        document.getElementById("titleBlog").innerText = response.title
        document.getElementById("Category").innerText = response.category.name
        document.getElementById("Author").innerText = response.userInfo.name
        document.getElementById("Describe").innerText = response.describe
        document.getElementById("contentBlog").innerText = response.content
        document.getElementById("createAtBlog").innerText = response.createAt
        document.getElementById("lastUpdateBlog").innerText = response.blogStatus.updateAt
        document.getElementById("statusBlog").innerText = response.blogStatus.status
        console.log(response);
    });
}

function getBlogPublic(id) {
    document.getElementById("confirmAdmitBlog").setAttribute("onclick", "admitBlog(" + id + ")");
}

function admitBlog(id) {
    var settings = {
        "url": "http://localhost:8080/admin/publicBlog/" + id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": getAuthorization()
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        getAllBlog()
    });
}

function getBlogIdToBan(id) {
    document.getElementById("confirmActionBlog").setAttribute("onclick", "banBlog(" + id + ")");
}

function getBlogIdToActive(id) {
    document.getElementById("confirmActionBlog").setAttribute("onclick", "activeBlog(" + id + ")");
}

function activeBlog(id) {
    let Authorization = getAuthorization();
    let settings = {
        "url": "http://localhost:8080/admin/activeBlog/" + id,
        "method": "GET",
        "headers": {
            "Authorization": Authorization
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        getAllBlog()
    });

}

function banBlog(id) {
    let Authorization = getAuthorization();
    let settings = {
        "url": "http://localhost:8080/admin/banBlog/" + id,
        "method": "GET",
        "headers": {
            "Authorization": Authorization
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        getAllBlog()
    });

}

function getAllCategory() {
    var settings = {
        "url": "http://localhost:8080/userView/listCategory",
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        document.getElementById("listCategory").innerHTML = displayTableCategory(response)
        console.log(response);
    });
}

function displayTableCategory(response) {
    let result = ""
    for (let i = 0; i < response.length; i++) {
        result += " <tr class='tr-shadow'>" +
            "        <td>" + (i + 1) + "</td>" +
            "        <td><img id='image' srcset='http://localhost:8080/Image/" + response[i].picture + "' class='img img-120'></td>" +
            "        <td>" + response[i].name + "</td>" +
            "           <td> <div class='table-data-feature'>" +
            "                <button class='item' data-toggle='modal' data-placement='top' data-target='#editCategory'" +
            "             title='Edit' type='button' style='background: green;' onclick='displayModalEditCategory("+response[i].id+")'>" +
            "                        <i class='fas fa-edit' style='color: white'></i>" +
            "                </button>" +
            "            </div>" +
            "        </td>" +
            "    </tr>"
        result += "<tr class='spacer'></tr>"
    }
    return result
}

function displayModalEditCategory(id){
    var settings = {
        "url": "http://localhost:8080/userView/category/"+id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        document.getElementById("idCategory").innerText=response.id
        document.getElementById("pictureCategory").setAttribute("src","http://localhost:8080/Image/"+response.picture)
        document.getElementById("name-category-input").value=response.name
        console.log(response);
    });
}

function logOut() {
    let userAdmin = getInfoLocalStorage("user")
    let settings = {
        "url": "http://localhost:8080/logout/" + userAdmin.id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    localStorage.removeItem("user");
    localStorage.removeItem("type");
    localStorage.removeItem("token");
    location.href = "http://localhost:63342/case4-FE/login.html";
}

function getInfoLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getAuthorization() {
    let token = localStorage.getItem("token");
    let type = localStorage.getItem("type");
    return type + " " + token;
}