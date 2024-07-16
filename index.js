import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
let endorsementID = document.getElementById("endorsment-items")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")



const appSettings = {
    databaseURL : "https://review-app-database-471b9-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDb = ref(database, "endorsements")

publishBtn.addEventListener("click", function(){
    console.log("heyy, this button works")
    let user = {
        sender : fromEl.value,
        recipient : toEl.value,
        message : inputEl.value
    }
    
    push(endorsementsInDb, user)
    // addEndorsement(inputElValue)
    clearInputFields()
   
})

onValue(endorsementsInDb, function(snapshot){

    if (snapshot.exists()){
        let endorsementArray = Object.entries(snapshot.val())
        endorsementID.innerHTML = ""
        console.log(endorsementArray)
        for(let i=endorsementArray.length - 1; i>=0; i--){
            let endorsementItem = endorsementArray[i]
            addEndorsement(endorsementItem)
            console.log("adding " + endorsementItem[1].message)   
        }
        
    }else{
        console.log("no items in the endorsement array!")
    }
})

function addEndorsement(newItem){
    let newEndorsementSender = newItem[1].sender
    let newEndorsementRecipient = newItem[1].recipient
    let newEndorsementMessage = newItem[1].message

    let newElement = document.createElement("li")

    let senderElement = document.createElement("span")
    senderElement.classList.add("sender");
    senderElement.textContent = `From ${newEndorsementSender}`;

    let recipientElement = document.createElement("span");
    recipientElement.classList.add("recipient");
    recipientElement.textContent = `To ${newEndorsementRecipient}`;

    let messageElement = document.createElement("span");
    messageElement.classList.add("message");
    messageElement.textContent = newEndorsementMessage;


    newElement.appendChild(senderElement);
    newElement.appendChild(messageElement);
    newElement.appendChild(recipientElement);

    endorsementID.appendChild(newElement)
}

function clearInputFields(){
    inputEl.value = ""
    toEl.value = ""
    fromEl.value = ""
    
}