function loadNavBar() {
    let result = ""
    var settings = {
        "url": "http://localhost:8080/userView/listCategory",
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {

        for (let i = 0; i < response.length; i++) {
            result += "<li><a href='catagory-post.html' onclick='saveCategoryName(" + response[i].id + ")'> " + response[i].name + "</a></li>"
        }
        document.getElementById("dropDownCategory").innerHTML = result;
        console.log(response);
    });
    getAdminInfo()
    displayTop10Like()
}

function showModalLoginRegister() {
    let result = ""
    result = "<div class='modal fade' id='login-register-Modal' tabindex='-1' role='dialog' aria-labelledby='largeModalLabel'" +
        "     aria-hidden='true'>" +
        "    <div class='modal-dialog modal-lg' role='document'>" +
        "        <div class='modal-content'>" +
        "            <div class='modal-header'>" +
        "                <ul class='nav nav-tabs' id='myTab' role='tablist'>" +
        "                    <li class='nav-item'>" +
        "                        <a class='nav-link active' id='home-tab' data-toggle='tab' href='#loginModal' onclick='openLoginForm()' role='tab'" +
        "                           aria-controls='login' aria-selected='true'>Login</a>" +
        "                    </li>" +
        "                    <li class='nav-item'>" +
        "                        <a class='nav-link' id='profile-tab' data-toggle='tab' onclick='openRegisterForm()' href='#registerModal' role='tab'" +
        "                           aria-controls='register' aria-selected='false'>Register</a>" +
        "                    </li>" +
        "                </ul>" + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
        "               <span aria-hidden='true'>&times;</span></button>" +
        "            </div>" +
        "            <div class='modal-body'>" +
        "                <div class='tab-content' id='myTabContent'>" +
        "                    <div class='tab-pane fade show active' id='loginModal' role='tabpanel' aria-labelledby='login-tab'>" +
        "                        <form action='' method='post' class='form-horizontal'>" +
        "                            <div class='row form-group'>" +
        "                                <div class='col col-md-3'>" +
        "                                    <label for='login-username' class=' form-control-label'>Email</label>" +
        "                                </div>" +
        "                                <div class='col-12 col-md-9'>" +
        "                                    <input type='text' id='username' name='login-username' placeholder='Enter username...'" +
        "                                           class='form-control'>" +
        "                                    <span class='help-block'>Please enter your username</span>" +
        "                                </div>" +
        "                            </div>" +
        "                            <div class='row form-group'>" +
        "                                <div class='col col-md-3'>" +
        "                                    <label for='password' class=' form-control-label'>Password</label>" +
        "                                </div>" +
        "                                <div class='col-12 col-md-9'>" +
        "                                    <input type='password' id='password' name='login-password'" +
        "                                           placeholder='Enter Password...' class='form-control'>" +
        "                                    <span class='help-block'>Please enter your password</span>" +
        "                                </div>" +
        "                            </div>" +
        "                        </form>" +
        "                    </div>" +
        "                    <div class='tab-pane fade' id='registerModal' role='tabpanel' aria-labelledby='register-tab'>" +
        "                        <form action='' method='post' class='form-horizontal'>" +
        "                            <div class='row form-group'>" +
        "                                <div class='col col-md-3'>" +
        "                                    <label for='register-username' class=' form-control-label'>Email</label>" +
        "                                </div>" +
        "                                <div class='col-12 col-md-9'>" +
        "                                    <input type='text' id='register-username' name='register-username' placeholder='Enter username...'" +
        "                                           class='form-control'>" +
        "                                    <span class='help-block'>Please enter your username</span>" +
        "                                </div>" +
        "                            </div>" +
        "                            <div class='row form-group'>" +
        "                                <div class='col col-md-3'>" +
        "                                    <label for='register-password' class=' form-control-label'>Password</label>" +
        "                                </div>" +
        "                                <div class='col-12 col-md-9'>" +
        "                                    <input type='password' id='register-password' name='register-password'" +
        "                                           placeholder='Enter Password...' class='form-control'>" +
        "                                    <span class='help-block'>Please enter your password</span>" +
        "                                </div>" +
        "                            </div>" +
        "                            <div class='row form-group'>" +
        "                                <div class='col col-md-3'>" +
        "                                    <label for='re-register-password' class=' form-control-label'>Re-Password</label>" +
        "                                </div>" +
        "                                <div class='col-12 col-md-9'>" +
        "                                    <input type='password' id='re-register-password' name='re-register-password'" +
        "                                           placeholder='Enter Re-Password...' class='form-control'>" +
        "                                    <span class='help-block'>Please enter your re-password</span>" +
        "                                </div>" +
        "                            </div>" +
        "                        </form>" +
        "                    </div>" +
        "                </div>" +
        "            </div>" +
        "            <div class='modal-footer'>" +
        "                <button type='submit' class='btn btn-primary btn-sm' id='buttonSubmit' onclick='loginUserView()'>" +
        "                    <i class='fa fa-dot-circle-o'></i> Submit" +
        "                </button>" +
        "                <button type='reset' class='btn btn-danger btn-sm' id='buttonReset'>" +
        "                    <i class='fa fa-ban'></i> Reset" +
        "                </button>" +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>"
    document.getElementById("modal").innerHTML = result;
    $('#login-register-Modal').modal("show")
}
function registerUserView(){
    let username = $("#register-username").val();
    let password = $("#register-password").val();
    let re_password = $("#re-register-password").val();
    let appUser = {
        username: username,
        password: password,
        confirmPassword:re_password
    }
    var settings = {
        "url": "http://localhost:8080/register",
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
            document.getElementById("alertContent").innerText = "Create Success"
            $('#login-register-Modal').modal("hide")
            console.log(response);
        },
        "error": function (response) {
            document.getElementById("alertHeader").innerText = "Fail!"
            document.getElementById("alertContent").innerText = "Your username already exist, please try again  !"
            $('#alert').removeClass('fade').addClass('show');
            // $('#alertlogin').addClass('show');
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
function getAdminInfo() {
    let user = getInfoLocalStorage("user")
    if (user != null) {
        let idAdmin = user.id;
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
            console.log(userInfo)
            document.getElementById("login-area").innerHTML = displayAccount()
            document.getElementById("avatar").setAttribute("src", linkImg + userInfo.avatar)
            document.getElementById("avatar1").setAttribute("src", linkImg + userInfo.avatar)
            document.getElementById("authorSide").innerText = userInfo.name
            document.getElementById("nameUser").innerText = userInfo.name
            // document.getElementById("birthdaySide").innerText=userInfo.birthDay;
        });
    }
}

function displayAccount() {
    let result = ""
    result += " <div class='nav-item dropdown'>" +
        "    <a href='#' data-toggle='dropdown' class='nav-link dropdown-toggle user-action'>" +
        "      <img class='avatar' id='avatar'  alt='Avatar' >" +
        "       <span  id='nameUser'></span><b class='caret'></b></a>" +
        "<div class='dropdown-menu'>" +
        "<a href='http://localhost:63342/case4-FE/profile.html' class='dropdown-item'><i class='fa fa-user-o'></i> Profile</a></a>" +
        "<a href='#' class='dropdown-item'><i class='fa fa-calendar-o'></i> Calendar</a></a>" +
        "<a href='#' class='dropdown-item'><i class='fa fa-sliders'></i> Settings</a></a>" +
        "<div class='dropdown-divider' ></div>" +
        "<a href='#' class='dropdown-item' onclick='logOutUserView()' ><i class='fa fa-power-off'></i> Logout</a></a>" +
        "</div>" +
        "</div>"

    return result

}

function getInfoLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function logOutUserView() {
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
    location.reload();
}

function loginUserView() {
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
            getAdminInfo()
            $('#login-register-Modal').modal("hide")
            console.log(response);
        },
        "error": function (response) {
            document.getElementById("alertHeader").innerText = "Fail!"
            if (response.status === 403 || response.status === 401) {
                document.getElementById("alertContent").innerText = "Your username or password is wrong ,try again please !"
            } else {
                document.getElementById("alertContent").innerText = response.responseText
            }
            $('#alert').removeClass('fade').addClass('show');
            // $('#alertlogin').addClass('show');
        }
    };
    $.ajax(settings).done();
    // $('#alertlogin').removeClass('fade');
    //
    // $('#alertlogin').addClass('show');
    event.preventDefault()
}


function displayTop10Like(){
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/userView/top-10-like",
        success: function (data) {
            console.log(data)
            document.getElementById("treadingPost").innerHTML = displayTable(data)
        }
    })
}
function displayTable(data){
    let result = ""
    result +=
        "    <div class='close-icon'>" +
        "        <i class='fa fa-times'></i>" +
        "    </div>" +
        "    <h4>Treading Post</h4>"
    for (let i=0;i<data.length;i++){
        result += "<div class='single-blog-post style-1 d-flex flex-wrap mb-30'>"
        result += "<div class='blog-thumbnail'>" + "<img src='http://localhost:8080/Image/" + data[i].picture +"' > </div>"
        result += "<div class='blog-content'>" + "<a href='#' class='post-tag'>The Best</a>" + "<a href='#' class='post-title' onclick='showSingleBlog("+data[i].id+")'>"
            + data[i].title + "</a>"
        result += "<div class='post-meta'><a href='#' class='post-date'>" + data[i].createAt + "</a>"
        result += "<a href='#' class='post-author'>By" + data[i].userInfo.name+"</a></div></div></div>"
    }
result+="</div>";
    return result;
}
function showSingleBlog(idBlog) {
    localStorage.setItem("blogId", idBlog)
    location.href = "http://localhost:63342/case4-FE/single-post.html"
}