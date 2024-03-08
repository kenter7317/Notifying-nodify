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
    req.open("POST", localStorage.getItem("adress"));
    req.send()
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    req.send(JSON.stringify({
        "content": localStorage.getItem("message-content"),
        "embeds": null,
        "username": localStorage.getItem("profile-name"),
        "avatar_url": localStorage.getItem("profile-adress"),
        "attachments": []
      }))
}

extensionSdk.handleBroadInfoChanged(handleBroadInfoChanged);

