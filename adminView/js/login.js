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
        "success":function (response) {
            localStorage.setItem("userAdmin",JSON.stringify(response))
            for (let i = 0; i < response.roles.length; i++) {
                if (response.roles[i].authority === "ROLE_ADMIN") {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("type", response.type);
                    $('#alertlogin').removeClass('alert-danger');
                    $('#alertlogin').addClass('alert-primary');
                    $('#alertHeader').removeClass('alert-danger');
                    $('#alertHeader').addClass('alert-primary');
                    $('#alertlogin').removeClass('fade');
                    $('#alertlogin').addClass('show');
                    document.getElementById("alertHeader").innerText="Success!"
                    document.getElementById("alertContent").innerText="Login Success"
                    document.getElementById("bodyLogin").setAttribute("data-animsition-out-duration","50000")
                    location.href = "http://localhost:63342/case4-FE/adminView.html";
                }
            }
            console.log(response);
        },
        "error":function (response){
            document.getElementById("alertHeader").innerText="Fail!"
            if(response.status===403||response.status===401){
                document.getElementById("alertContent").innerText="Your username or password is wrong ,try again please !"
            }else   {
                document.getElementById("alertContent").innerText=response.responseText
            }
            $('#alertlogin').removeClass('fade');
            $('#alertlogin').addClass('show');
        }
    };
    $.ajax(settings).done();
    // $('#alertlogin').removeClass('fade');
    //
    // $('#alertlogin').addClass('show');
    event.preventDefault()
}
