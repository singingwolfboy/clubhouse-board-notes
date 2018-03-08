console.info("Hello from the Chrome extension!");
chrome.runtime.sendMessage({ command: "init" });

const contentIsLoaded = (content) => {
  const authBtn = document.createElement("button")
  authBtn.appendChild(document.createTextNode("Auth"))
  authBtn.addEventListener("click", onClick = event => {
    chrome.runtime.sendMessage({ command: "auth" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    })
  });

  const listBtn = document.createElement("button")
  listBtn.appendChild(document.createTextNode("List"))
  listBtn.addEventListener("click", onClick = event => {
    chrome.runtime.sendMessage({ command: "list" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    })
  });

  const loadBtn = document.createElement("button")
  loadBtn.appendChild(document.createTextNode("Load"))
  loadBtn.addEventListener("click", onClick = event => {
    chrome.runtime.sendMessage({ command: "load" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    })
  });

  const el = document.createElement("div");
  el.id = "notes";
  el.appendChild(authBtn);
  el.appendChild(listBtn);
  el.appendChild(loadBtn);
  el.style.position = "absolute";
  el.style.bottom = "0";
  el.style.width = "100%";
  el.style.height = "100px";
  el.style.background = "white";
  el.style.borderTop = "1px solid #ccc";

  content.appendChild(el);
}

const checkForContent = () => {
  const content = document.querySelector("#content");
  if (content) {
    contentIsLoaded(content);
  } else {
    setTimeout(checkForContent, 100);
  }
}

checkForContent();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("message from backend:", request);
})
