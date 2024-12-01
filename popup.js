document.getElementById("imageUpload").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = async function () {
          // Create canvas for original image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          // Get image data to detect non-transparent pixels
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Create outline canvas
          const outlineCanvas = document.createElement("canvas");
          outlineCanvas.width = img.width + 10; // Extra space for outline
          outlineCanvas.height = img.height + 10;
          const outlineCtx = outlineCanvas.getContext("2d");

          // Fill with transparent background
          outlineCtx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height);

          // Add outline
          for (let y = 0; y < canvas.height; y++) {
              for (let x = 0; x < canvas.width; x++) {
                  const index = (y * canvas.width + x) * 4;
                  const alpha = data[index + 3]; // Alpha channel
                  if (alpha > 128) { // Opaque pixel
                      // Draw white outline around pixel
                      outlineCtx.fillStyle = "white";
                      outlineCtx.fillRect(x + 4, y + 5, 1, 1); // Current pixel
                      outlineCtx.fillRect(x + 4 - 1, y + 5, 1, 1); // Left
                      outlineCtx.fillRect(x + 4 + 1, y + 5, 1, 1); // Right
                      outlineCtx.fillRect(x + 4, y + 5 - 1, 1, 1); // Top
                      outlineCtx.fillRect(x + 4, y + 5 + 1, 1, 1); // Bottom
                  }
              }
          }

          // Draw original image on top of outline
          outlineCtx.drawImage(canvas, 5, 5);

          // Resize for cursor
          const cursorCanvas = document.createElement("canvas");
          cursorCanvas.width = 32;
          cursorCanvas.height = 32;
          const cursorCtx = cursorCanvas.getContext("2d");
          cursorCtx.drawImage(outlineCanvas, 0, 0, 32, 32);

          // Convert to base64 PNG
          const cursorImage = cursorCanvas.toDataURL("image/png");

          // Save in storage
          chrome.storage.local.set({ customCursor: cursorImage }, () => {
              document.getElementById("status").textContent = "Cursor updated successfully!";
          });
      };
  };
  reader.readAsDataURL(file);
});

// Disable cursor button
document.getElementById("disableCursor").addEventListener("click", () => {
  chrome.storage.local.set({ customCursor: null }, () => {
      document.getElementById("status").textContent = "Custom cursor disabled!";
  });
});
