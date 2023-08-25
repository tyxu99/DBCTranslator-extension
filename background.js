chrome.runtime.onInstalled.addListener(() => {
  // chrome.storage.local
  //   .set({
  //     DBCTranslatorDBClickHandler: () => {
  //       const selection = document.getSelection();
  //       const range = selection.getRangeAt(0);
  //       const { left, top, width, height } = range.getBoundingClientRect();
  //       const lines = range.getClientRects();
  //       console.log(left, top, width, height, lines, selection.toString());
  //     },
  //   })
  //   .then((val) => {
  //     console.log("handler setted" + val);
  //     chrome.storage.local.get("DBCTranslatorDBClickHandler").then((res) => {
  //       console.log("=========", res);
  //     });
  //   });
  chrome.storage.local.set({currentTab: ''});
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  const badgeText = await chrome.action.getBadgeText({ tabId: tab.id });
  const newBadgeText = badgeText === "OFF" ? "ON" : "OFF";
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: newBadgeText,
  });

  chrome.storage.local.set({ currentTab: tab.url, [tab.url]: newBadgeText });
});
