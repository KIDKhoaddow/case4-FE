function loadNavBar(){
    let result=""
    var settings = {
        "url": "http://localhost:8080/userView/listCategory",
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {

        for (let i=0 ;i<response.length;i++){
            result+="<li><a href='catagory-post.html' onclick='saveCategoryName("+response[i].id+")'> "+ response[i].name +"</a></li>"
        }
        document.getElementById("dropDownCategory").innerHTML=result;
        console.log(response);
    });

}
function showModalLoginRegister() {
    let result = ""
    result = "<div class='modal fade' id='login-register-Modal' tabindex='-1' role='dialog' aria-labelledby='largeModalLabel'\n" +
        "     aria-hidden='true'>\n" +
        "    <div class='modal-dialog modal-lg' role='document'>\n" +
        "        <div class='modal-content'>\n" +
        "            <div class='modal-header'>\n" +
        "                <ul class='nav nav-tabs' id='myTab' role='tablist'>\n" +
        "                    <li class='nav-item'>\n" +
        "                        <a class='nav-link active' id='home-tab' data-toggle='tab' href='#loginModal' onclick='openLoginForm()' role='tab'\n" +
        "                           aria-controls='login' aria-selected='true'>Login</a>\n" +
        "                    </li>\n" +
        "                    <li class='nav-item'>\n" +
        "                        <a class='nav-link' id='profile-tab' data-toggle='tab' onclick='openRegisterForm()' href='#registerModal' role='tab'\n" +
        "                           aria-controls='register' aria-selected='false'>Register</a>\n" +
        "                    </li>\n" +
        "                </ul>\n" +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
        "               <span aria-hidden='true'>&times;</span></button>" +
        "            </div>\n" +
        "            <div class='modal-body'>\n" +
        "                <div class='tab-content' id='myTabContent'>\n" +
        "                    <div class='tab-pane fade show active' id='loginModal' role='tabpanel' aria-labelledby='login-tab'>\n" +
        "                        <form action='' method='post' class='form-horizontal'>\n" +
        "                            <div class='row form-group'>\n" +
        "                                <div class='col col-md-3'>\n" +
        "                                    <label for='login-username' class=' form-control-label'>Email</label>\n" +
        "                                </div>\n" +
        "                                <div class='col-12 col-md-9'>\n" +
        "                                    <input type='text' id='username' name='login-username' placeholder='Enter username...'\n" +
        "                                           class='form-control'>\n" +
        "                                    <span class='help-block'>Please enter your username</span>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class='row form-group'>\n" +
        "                                <div class='col col-md-3'>\n" +
        "                                    <label for='password' class=' form-control-label'>Password</label>\n" +
        "                                </div>\n" +
        "                                <div class='col-12 col-md-9'>\n" +
        "                                    <input type='password' id='password' name='login-password'\n" +
        "                                           placeholder='Enter Password...' class='form-control'>\n" +
        "                                    <span class='help-block'>Please enter your password</span>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </form>\n" +
        "                    </div>\n" +
        "                    <div class='tab-pane fade' id='registerModal' role='tabpanel' aria-labelledby='register-tab'>\n" +
        "                        <form action='' method='post' class='form-horizontal'>\n" +
        "                            <div class='row form-group'>\n" +
        "                                <div class='col col-md-3'>\n" +
        "                                    <label for='register-username' class=' form-control-label'>Email</label>\n" +
        "                                </div>\n" +
        "                                <div class='col-12 col-md-9'>\n" +
        "                                    <input type='text' id='register-username' name='register-username' placeholder='Enter username...'\n" +
        "                                           class='form-control'>\n" +
        "                                    <span class='help-block'>Please enter your username</span>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class='row form-group'>\n" +
        "                                <div class='col col-md-3'>\n" +
        "                                    <label for='register-password' class=' form-control-label'>Password</label>\n" +
        "                                </div>\n" +
        "                                <div class='col-12 col-md-9'>\n" +
        "                                    <input type='password' id='register-password' name='register-password'\n" +
        "                                           placeholder='Enter Password...' class='form-control'>\n" +
        "                                    <span class='help-block'>Please enter your password</span>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class='row form-group'>\n" +
        "                                <div class='col col-md-3'>\n" +
        "                                    <label for='re-register-password' class=' form-control-label'>Re-Password</label>\n" +
        "                                </div>\n" +
        "                                <div class='col-12 col-md-9'>\n" +
        "                                    <input type='password' id='re-register-password' name='re-register-password'\n" +
        "                                           placeholder='Enter Re-Password...' class='form-control'>\n" +
        "                                    <span class='help-block'>Please enter your re-password</span>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </form>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class='modal-footer'>\n" +
        "                <button type='submit' class='btn btn-primary btn-sm' id='buttonSubmit'>\n" +
        "                    <i class='fa fa-dot-circle-o'></i> Submit\n" +
        "                </button>\n" +
        "                <button type='reset' class='btn btn-danger btn-sm' id='buttonReset'>\n" +
        "                    <i class='fa fa-ban'></i> Reset\n" +
        "                </button>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>\n"
    document.getElementById("modal").innerHTML = result;
    $('#login-register-Modal').modal("show")
}
