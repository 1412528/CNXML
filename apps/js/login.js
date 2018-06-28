function Login(){
    var uid = $("#inputUsername").val();
    var password = $("#inputPassword").val();
    var user = {
        uid: uid,
        pass: password
    }
    var Dia_chi_Dich_vu = "http://localhost:3001"
    var Tham_so="login"
    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}/${Tham_so}`
    var Xu_ly_HTTP = new XMLHttpRequest()
    Xu_ly_HTTP.open("POST",  Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.setRequestHeader('Content-Type', 'application/json');
    Xu_ly_HTTP.send(JSON.stringify(user));
    var data = JSON.stringify(Xu_ly_HTTP.responseText); 
    console.log(data);
}