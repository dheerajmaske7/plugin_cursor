# Custom Cursor Plugin

A Chrome extension that allows users to customize their cursor by uploading and using their own images.

## Features
![Feature ](assets/demo.png)
![Feature ](assets/Layout_ui.jpeg)

- Upload custom images to use as cursor
- Automatic outline generation for better cursor visibility
- Image resizing to optimal cursor dimensions (32x32)
- Option to disable custom cursor and return to default
- Supports transparent PNG images

## How It Works

The plugin processes uploaded images in the following way:
1. Reads the uploaded image file
2. Generates a white outline around the image for better visibility
3. Resizes the image to standard cursor dimensions (32x32 pixels)
4. Stores the processed image in Chrome's local storage
5. Applies the custom cursor across web pages

## Installation

1. Clone this repository:
 
git clone https://github.com/dheerajmaske7/plugin_cursor.git

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the plugin directory

## Usage

1. Click the plugin icon in your Chrome toolbar
2. Click "Choose File" to upload your cursor image
3. The image will be automatically processed and applied
4. To disable the custom cursor, click the "Disable Custom Cursor" button

## Technical Details

- Built using vanilla JavaScript
- Uses HTML5 Canvas for image processing
- Implements Chrome Storage API for persistence
- Supports PNG images with transparency

## Contributing

Feel free to submit issues and enhancement requests!

Dheeraj Maske
