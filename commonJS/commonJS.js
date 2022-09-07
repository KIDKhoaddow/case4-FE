let link = "http://localhost:8080"
let linkAnother = "http://192.168.1.142:8080"


function login() {

    let username = $("#username").val();
    let password = $("#password").val();

    let appUser = {
        username: username,
        password: password
    }

    var settings = {
        "url": "http://localhost:8080/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(appUser),
        "success": function (response) {
            localStorage.setItem("user", JSON.stringify(response))
            localStorage.setItem("token", response.token);
            localStorage.setItem("type", response.type);
            $('#alertHeader').removeClass('alert-danger').addClass('alert-primary');
            $('#alertlogin').removeClass('alert-danger').addClass('alert-primary')
                .removeClass('fade').addClass('show');
            document.getElementById("alertHeader").innerText = "Success!"
            document.getElementById("alertContent").innerText = "Login Success"
            document.getElementById("bodyLogin").setAttribute("data-animsition-out-duration", "50000")
            for (let i = 0; i < response.roles.length; i++) {
                if (response.roles[i].authority === "ROLE_ADMIN") {
                    location.href = "http://localhost:63342/case4-FE/adminView.html";
                } else
                    location.href = "http://localhost:63342/case4-FE/index.html"
            }
            console.log(response);
        },
        "error": function (response) {
            document.getElementById("alertHeader").innerText = "Fail!"
            if (response.status === 403 || response.status === 401) {
                document.getElementById("alertContent").innerText = "Your username or password is wrong ,try again please !"
            } else {
                document.getElementById("alertContent").innerText = response.responseText
            }
            $('#alertlogin').removeClass('fade').addClass('show');
            // $('#alertlogin').addClass('show');
        }
    };
    $.ajax(settings).done();
    // $('#alertlogin').removeClass('fade');
    //
    // $('#alertlogin').addClass('show');
    event.preventDefault()
}


function register() {
    let username = $("#register-username").val();
    let password = $("#register-password").val();
    let repassword = $("#re-register-password").val();


    var settings = {
        "url": "http://localhost:8080/register",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "username": username,
            "password": password,
            "confirmPassword": repassword
        }),
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function saveCategoryName(id) {
    let settings = {
        "url": "http://localhost:8080/userView/category/" + id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        localStorage.setItem("nameCategory", response.name)
        console.log(response);
    });
}

function saveBlogId(id) {
    localStorage.setItem("blogId", id)
}


function getInfoLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function getAuthorization() {
    let token = localStorage.getItem("token");
    let type = localStorage.getItem("type");
    return type + " " + token;
}