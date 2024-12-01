chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ customCursor: null });
  });
  