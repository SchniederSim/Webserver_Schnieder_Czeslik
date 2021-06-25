window.onload = init_page;

function init_page(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
}



// function printUsers(){
//     console.log("Try to request users");
//     socket.emit('getAllUsers');
// }