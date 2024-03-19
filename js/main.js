const SDK = window.AFREECA.ext;
const extensionSDK = SDK();
let num = null;
let broadInfo = null; // 방송 정보
const allSubObjects = [];

const init = (broad) => {
    broadInfo = broad;
    handleBroadInfoChanged(broad);
}

// 재귀적으로 모든 하위 요소를 찾아서 배열에 추가하는 함수
function findAllSubObjects(element) {
    allSubObjects.push(element);
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
        findAllSubObjects(children[i]);
    }
}

async function sendWebhookMessage(url, message) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        if (response.ok) {
            console.log('메시지가 성공적으로 전송되었습니다.');
        } else {
            console.error('메시지 전송에 실패했습니다. 상태 코드:', response.status);
        }
    } catch (error) {
        console.error('오류가 발생했습니다:', error);
    }
}

function sendNotify() {
    const message = {
        content: localStorage.getItem("message-content"),
        username: localStorage.getItem("profile-name"),
        avatar_url: localStorage.getItem("profile-address"),
    };
    sendWebhookMessage(localStorage.getItem("address"), message).then(r => console.log(r));
}

const handleBroadInfoChanged = (broadInfo) => {
// 메시지를 보내는 함수
    const req = new XMLHttpRequest();
    req.open("POST", "https://live.afreecatv.com/afreeca/player_live_api.php");
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("bid=%7B" + broadInfo["bjId"] + "%7D")
    if (req.responseXML.getElementById("RESULT").getValue(0) === 1) {
        if (num !== broadInfo["broadNo"]) {
            sendNotify();
            num = broadInfo["broadNo"];
        }
    }
}

extensionSDK.handleInitialization(init);

extensionSDK.handleBroadInfoChanged(handleBroadInfoChanged)

document.getElementById("save").onclick = function () {
    const info = document.getElementById("info");
    findAllSubObjects(info);
    allSubObjects.forEach(element => {
        if (element.className === "tb") {
            if (element.value !== null) {
                localStorage.setItem(element.id, element.value);
            }
        }
    });
}