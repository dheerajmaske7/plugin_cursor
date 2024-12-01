chrome.storage.local.get("customCursor", (data) => {
  if (data.customCursor) {
      const style = document.createElement("style");
      style.textContent = `
          * {
              cursor: url("${data.customCursor}") 16 16, auto !important; /* Centered */
          }
          input, textarea, button, select {
              cursor: url("${data.customCursor}") 16 16, auto !important;
          }
      `;
      document.head.appendChild(style);
      console.log("Custom cursor applied successfully!");
  } else {
      document.body.style.cursor = "auto"; // Reset to default cursor
      console.log("Custom cursor disabled!");
  }
});
