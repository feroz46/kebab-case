const API = "https://YOUR-RENDER-URL.onrender.com";

// Take Token
function takeToken() {
  fetch(API + "/token", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").innerText =
        "Your Token Number: " + data.tokenNumber;
    });
}

// Admin Call Next
function callNext() {
  fetch(API + "/next", { method: "DELETE" })
    .then(res => res.json())
    .then(data => alert(data.message));
}
