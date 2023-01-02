const dom = {
    roomNameCreator: document.querySelector('#room-name'),
    createButton: document.querySelector('#create-room-btn'),
    roomFeed: document.querySelector('#room-feed'),
    joinForm: document.querySelector('#join-form'),
    joinCode: document.querySelector("#code"),
    username: document.querySelector("#username"),
    joinButton: document.querySelector('#submit-btn')
}
let rooms = [];

dom.createButton.onclick = e => {
    e.preventDefault();
    if(!dom.roomNameCreator.value){
        dom.roomNameCreator.placeholder = "ERROR";
    } else{
        const roomName = dom.roomNameCreator.value;
        const code = roomid(5);
        rooms.push({name: roomName, id: code});
        dom.roomFeed.innerHTML += `<li>Name : ${roomName} - Code : ${code}</li>`;
    }
}

dom.joinButton.onclick = e => {
    e.preventDefault();
    if(!dom.joinCode.value || !dom.username.value){
        dom.joinCode.placeholder = "ERROR";
        dom.username.placeholder = "ERROR";
    } else{
        if(rooms.some(e => e.id == dom.joinCode.value)){
            dom.joinForm.submit();
        } else{
            dom.joinCode.value = "";
            dom.joinCode.placeholder = "ERROR";
        }
    }
}

function roomid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}