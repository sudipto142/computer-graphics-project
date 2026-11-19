# AquaWorld 3D – Interactive Underwater World

A responsive browser-based Computer Graphics project built with HTML, CSS, JavaScript and Three.js.

## Run the project
1. Extract `AquaWorld3D.zip`.
2. Open the folder in a code editor.
3. Run it through a local web server (recommended: VS Code Live Server).
   - ES modules do not reliably run when opening `index.html` directly as a `file://` URL.
4. Internet connection is required because Three.js and Google Fonts are loaded from CDNs.

## Controls
- Drag: rotate the camera
- Scroll / pinch: zoom
- Daylight / Night: change underwater lighting
- Pause / Play: pause or resume animation
- Feed fish: release floating food particles
- Reset view: return camera to its starting position

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
