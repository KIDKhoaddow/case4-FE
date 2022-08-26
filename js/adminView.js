var userList = null

function getAllStudent() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin",
        success: function (data) {
            userList = data;
            document.getElementById("tableUser").innerHTML = displayTable(data);
        }
    })
}

function displayTable(data) {
    let result = ""
    result += "<thead>"
    result += "<tr>"
    result += "<th>Stt</th>"
    result += "<th>Avatar</th>"
    result += "<th>User Name</th>"
    result += "<th>Name</th>"
    result += "<th>Birthday</th>"
    result += "<th>Phone</th>"
    result += "<th>Address</th>"
    result += "<th>Action</th>"
    result += "</tr></thead>"
    result += "  <tbody><tr class='tr-shadow'>"
    for (let i = 0; i < data.length; i++) {

        result += "<td>" + (i + 1) + "</td>"
        result += "<td>" + data[i].avatar + "</td>"
        result += "<td>" + data[i].user.username + "</td>"
        result += "<td>" + data[i].name + "</td>"
        result += "<td>" + data[i].birthDay + "</td>"
        result += "<td>" + data[i].phoneNumber + "</td>"
        result += "<td>" + data[i].address + "</td>"
        result += "<td><div class='table-data-feature'>"
        result += "<button class='item' data-toggle='tooltip' data-placement='top' title='Info'>"
        result += "<i class='zmdi zmdi-info'></i></button>"
        result += "<button class='item' data-toggle='tooltip' data-placement='top' title='Ban'>"
        result += "<i class='fa fa-ban'></i>"
        result += "</button></div></td>"
        result += "<tr class='spacer'></tr>"
    }
    result += "</tbody>"
    return result
}

getAllStudent();