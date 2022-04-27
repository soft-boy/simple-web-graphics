import KeyboardMixin from './mixins/keyboard'
import MouseMixin from './mixins/mouse'

window._graphics = null

class Base {}
class SimpleWebGraphics extends KeyboardMixin(MouseMixin(Base)) {
  constructor(canvasElement) {
    super(canvasElement)

    this.canvas = canvasElement
    this.ctx = canvasElement.getContext('2d')
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export function makeGraphicsWindow(canvasElement) {
  window._graphics = new SimpleWebGraphics(canvasElement)
}

export function runGraphics(startWorld, updateWorld, drawWorld) {
  window.world = {}

  const iterateGraphics = () => {
    if (window.end) {
      window._graphics.clearCanvas()
      return
    }
    window.requestAnimationFrame(iterateGraphics)
    updateWorld(window.world)
    window._graphics.clearCanvas()
    drawWorld(window.world)
  }

  window.world = startWorld(window.world)
  iterateGraphics()
}

export function endGraphics() {
  window.end = true
}

export { 
  drawPixel,
  drawLine,
  drawCircle,
  fillCircle,
  drawEllipse,
  fillEllipse,
  drawRectangle,
  fillRectangle,
  drawPolygon,
  fillPolygon,
  drawString
} from './mixins/draw'

export {
  loadImage,
  drawImage,
  getImageWidth,
  getImageHeight
} from './mixins/image'

export {
  getMousePosition,
  getMouseButton,
  onMousePress,
  onMouseRelease,
  onWheelForward,
  onWheelBackward,
  onMouseMotion,
  hideMouse,
  showMouse,
  moveMouse
} from './mixins/mouse'

export {
  isKeyPressed,
  onKeyPress,
  onAnyKeyPress,
  onKeyRelease,
  onAnyKeyRelease,
  sameKeys,
  getKeyName
} from './mixins/keyboard'

export { 
  convertToComponents,
  convertToAngle,
  pointInPolygon,
} from './mixins/math'

export { 
  getWindowWidth,
  getWindowHeight,
  getScreenSize,
} from './mixins/misc'
