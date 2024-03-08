const SDK = window.AFREECA.ext;
const extensionSDK = SDK();
function init() {
	isLoggedIn = !!auth.obscureUserId;
	isBJ = auth.isBJ;
	broadInfo = broad;
	playerInfo = player;

}

extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    init();
});

const handleBroadInfoChanged =(broadInfo)=>{
	console.log(broadInfo);

    const req = new XMLHttpRequest();
    req.open("POST", );
}

extensionSdk.handleBroadInfoChanged(handleBroadInfoChanged);

document.getElementById("save").onclick = function(){
    var info = document.getElementById("info");
    info.array.forEach(element => {
        if (element.className == "tb"){
        localStorage.setItem(element.id, element.value);
        }
    });
}