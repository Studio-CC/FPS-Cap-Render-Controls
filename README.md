# FPS-Cap-Render-Controls
A Module For Capping FPS and Providing Render Controls in Three.js

## Features

- FPS capping to any target frame rate (e.g. 30, 60 FPS) to reduce CPU/GPU load
- Smooth and consistent rendering intervals using delta time correction
- Seamless integration with existing `three.js` render loops
- Simple control interface with `start()` and `stop()` methods

## Installation

```js
import { renderLoop } from './renderLoop.js'
