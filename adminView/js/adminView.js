let link = "http://localhost:8080"
let linkImg = link + "/Image/"
let linkUserInfo = link + "/userInfo/"

function getInfoLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getLists() {
    if (localStorage.getItem("userAdmin") == null) {
        location.href = "http://localhost:63342/case4-FE/login.html";
    }
    getAllUser()
    getAdminInfo()
    getAllBlog()

}

function getAdminInfo() {
    let idAdmin = getInfoLocalStorage("userAdmin").id;
    let Authorization = getAuthorization();
    let settings = {
        "url": "http://localhost:8080/userInfo/findByUserId/" + idAdmin,
        "method": "GET",
        "headers": {
            "Authorization": Authorization,
            "Content-Type": "application/json",
        },
        "data": "\r\n",
    };
    $.ajax(settings).done(function (userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
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
        "data": "\r\n",
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
        result += "<button class='item' type='button' data-toggle='modal' data-target='#banUser'" +
            " data-placement='top' title='Ban' onclick='getUserIdToBan(" + data[i].id + ")'>"
        result += "<i class='fa fa-ban'></i>"
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
        "data": "\r\n",
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
    document.getElementById("confirmBanUser").setAttribute("onclick", "banUser("+id+")");
}

function banUser(id) {
    let Authorization = getAuthorization();
    let settings = {
        "url": "http://localhost:8080/banUser/" + id,
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
        "data": "\r\n",
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        document.getElementById("listBlog").innerHTML = displayTableBlog(response);
    });
}

function displayTableBlog(data) {
    let result = ""
    for (let i = 0; i < data.length; i++) {
        result += " <tr class='tr-shadow'>"
        result += "<td>" + (i + 1) + "</td>"
        result += "<td>" + data[i].title + "</td>"
        result += "<td>" + data[i].category.name + "</td>"
        result += "<td>" + data[i].userInfo.user.username + "</td>"
        result += "<td>" + data[i].describes + "</td>"
        result += "<td>" + data[i].createAt + "</td>"
        result += "<td>" + data[i].blogStatus.status + "</td>"
        result += "<td><div class='table-data-feature'>"
        result += "<button class='item' data-toggle='tooltip' data-placement='top' title='Info'>"
        result += "<i class='zmdi zmdi-info'></i></button>"
        result += "<button class='item' data-toggle='tooltip' data-placement='top' title='Edit'>"
        result += "<i class='fa fa-edit'></i></button>"
        result += "<button class='item' data-toggle='tooltip' data-placement='top' title='Ban'>"
        result += "<i class='fa fa-ban'></i></button>"
        result += "</div></td>"
        result += "<tr class='spacer'></tr>"
    }
    return result;
}

function logOut() {
    let userAdmin = getInfoLocalStorage("userAdmin")
    var settings = {
        "url": "http://localhost:8080/logout/" + userAdmin.id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userAdmin");
    localStorage.removeItem("type");
    localStorage.removeItem("token");
    location.href = "http://localhost:63342/case4-FE/login.html";
}

function getAuthorization() {
    let token = localStorage.getItem("token");
    let type = localStorage.getItem("type");
    return type + " " + token;
}