# AquaWorld 3D – Interactive Underwater World

A responsive browser-based Computer Graphics project built with HTML, CSS, JavaScript and Three.js.

## Run the project locally

1. Download or clone this repository.
2. Open the `AquaWorld3D` folder in a code editor such as Visual Studio Code.
3. Start a local web server:
   - **VS Code Live Server:** right-click `index.html` and choose **Open with Live Server**.
   - **Python:** run `python -m http.server 8000` from this folder, then visit `http://localhost:8000`.
4. Keep an internet connection available. Three.js modules and Google Fonts are loaded from CDNs.

> Do not open `index.html` directly using a `file://` URL. ES modules and the browser import map require a local HTTP server.

## Publish with GitHub Pages

1. Push the project files to the repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` (or the folder containing `index.html`), then save.
5. Open the published Pages URL after GitHub finishes deployment.

## Controls

- Drag: rotate the camera
- Scroll / pinch: zoom
- Daylight / Night: change underwater lighting
- Pause / Play: pause or resume animation
- Feed fish: release floating food particles
- Reset view: return camera to its starting position

On touch devices, drag with one finger and pinch with two fingers over the 3D canvas. Scroll the page outside the canvas.

## Troubleshooting

- **Blank 3D area:** use a modern browser with WebGL enabled and make sure the page is served over HTTP/HTTPS.
- **Module or network error:** check the internet connection; the Three.js modules are loaded from jsDelivr.
- **Controls do not respond:** tap or drag directly on the 3D canvas.
- **Still not working:** open the browser developer console and check the first red error message.

## Computer Graphics concepts demonstrated

- 3D modeling with primitive geometries
- Translation, rotation and scaling transformations
- Hierarchical modeling (fish body, fins and tail)
- Perspective projection and camera controls
- Materials, lighting, fog and transparency
- Keyframe-like procedural animation using time functions
- Particle systems for bubbles and floating particles
- Responsive rendering with WebGL

## Important academic note

This is a visual simulation for learning and demonstration. The creature models are stylized procedural models, not scientifically accurate biological models. The sound button is a visual placeholder and does not play audio.
