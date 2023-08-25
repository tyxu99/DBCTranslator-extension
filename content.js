console.log("contentjs exec");

document.addEventListener(
  "dblclick",
  () => {
    chrome.storage.local.get("currentTab").then((res) => {
      if (res.currentTab) {
        chrome.storage.local.get(res.currentTab).then((resp) => {
          const isEnabledForCurrentTab = resp[res.currentTab];
          if (isEnabledForCurrentTab && isEnabledForCurrentTab === "ON") {
            const selection = document.getSelection();
            const selectedText = selection.toString();
            const range = selection.getRangeAt(0);
            const { width, height } = range.getBoundingClientRect();

            console.log(selectedText, width, height);

            const mark = document.createElement("mark");
            mark.style.position = "relative";
            mark.style.borderRadius = "5px";
            mark.style.background = "yellow";
            range.surroundContents(mark);

            const div = document.createElement("div");
            div.style.width = "0px";
            div.style.height = "0px";
            div.style.position = "absolute";
            div.style.left = Math.ceil(width) + "px";
            div.style.top = Math.ceil(height) + "px";
            div.style.background = "yellow";
            div.style.borderRadius = "10px";
            div.style.transition = "all .2s linear";

            mark.onmouseenter = () => {
              mark.appendChild(div);
              setTimeout(() => {
                div.style.width = "200px";
                div.style.height = "100px";
              }, 200);
            };
            mark.onmouseleave = () => {
              div.style.height = "0px";
              div.style.width = "0px";
              setTimeout(() => {
                mark.removeChild(div);
              }, 200);
            };
          }
        });
      }
    });
  },
  { passive: false }
);
