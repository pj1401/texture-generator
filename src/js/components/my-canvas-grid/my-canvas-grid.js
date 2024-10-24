/**
 * @file The canvas-grid component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import GridPixel from './lib/GridPixel.js'
import NoiseGrid from './lib/NoiseGrid.js'
import PerlinNoise from './lib/perlin-noise/index.js'

import { htmlTemplate } from './my-canvas-grid.html.js'

customElements.define('my-canvas-grid',
  /**
   * Represents a my-canvas-grid element.
   */
  class extends HTMLElement {
    #canvasElement

    /**
     * @type {CanvasRenderingContext2D}
     */
    #renderingContext2D

    /**
     * @type {PerlinNoise}
     */
    #perlin

    /**
     * @type {NoiseGrid}
     */
    #perlinGrid

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this custom element and
      // append the templates to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.#canvasElement = this.shadowRoot.querySelector('#canvas-grid')
      this.#renderingContext2D = this.#canvasElement.getContext('2d')

      this.#perlinGrid = new NoiseGrid(this.#canvasElement.width, this.#canvasElement.height)

      this.renderCanvasImage()
    }

    /**
     * Watches the attributes for changes on the element.
     *
     * @returns {string[]} A string array of the attributes.
     */
    static get observedAttributes () {
      return ['width', 'height', 'seed']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (this.#attributeHasChanged('seed', name, oldValue, newValue)) {
        this.#perlinGrid.seed = parseInt(newValue)
        this.renderCanvasImage()
      } else if (this.#attributeHasChanged('width', name, oldValue, newValue)) {
        this.#canvasElement.width = parseInt(newValue)
        this.#perlinGrid.width = this.#canvasElement.width
        this.renderCanvasImage()
      } else if (this.#attributeHasChanged('height', name, oldValue, newValue)) {
        this.#canvasElement.height = parseInt(newValue)
        this.#perlinGrid.height = this.#canvasElement.height
        this.renderCanvasImage()
      }
    }

    /**
     * Checks if the value of the attribute has changed.
     *
     * @param {string} attributeName - The attribute name.
     * @param {string} name - The attribute name that is passed by the browser.
     * @param {any} oldValue - The old attribute value.
     * @param {any} newValue - The new attribute value.
     * @returns {boolean} True if the value of the attribute has changed.
     */
    #attributeHasChanged (attributeName, name, oldValue, newValue) {
      return name === attributeName && newValue !== oldValue
    }

    /**
     * Generates the image.
     */
    renderCanvasImage () {
      this.#perlin = new PerlinNoise(0, 0, this.#perlinGrid.seed)
      this.#generateGridColors()
    }

    /**
     * Generates a colour for every pixel in the image.
     */
    #generateGridColors () {
      // Step through each pixel and generate a colour.
      for (let x = 0; x < this.#perlinGrid.width; x++) {
        for (let y = 0; y < this.#perlinGrid.height; y++) {
          const pixel = new GridPixel(x, y)
          pixel.color = this.#getColorString(pixel)
          this.#colorPixel(pixel)
        }
      }
    }

    /**
     * Get the colour of the pixel.
     *
     * @param {GridPixel} pixel - The pixel where the noise is generated.
     * @returns {string} The css string value of the color.
     */
    #getColorString (pixel) {
      const noise = this.#getNoiseValue(pixel)
      const colorValue = this.#getColorValue(noise)
      return `rgb(${colorValue}, ${colorValue}, ${colorValue})`
    }

    /**
     * Computes the noise value on (x, y) with scaling.
     *
     * @param {GridPixel} pixel - The pixel where the noise is generated.
     * @returns {number} The noise value.
     */
    #getNoiseValue (pixel) {
      return this.#perlin.perlin(pixel.x * this.#perlinGrid.scale, pixel.y * this.#perlinGrid.scale)
    }

    /**
     * Coverts the noise value from [-1, 1] to [0, 255].
     *
     * @param {number} noiseValue - The noise value.
     * @returns {number} The rgb colour value.
     */
    #getColorValue (noiseValue) {
      const noiseOffset = 1
      const colorScale = 128
      return Math.floor((noiseValue + noiseOffset) * colorScale)
    }

    /**
     * Colours a pixel on the grid.
     *
     * @param {GridPixel} pixel - The pixel to be filled.
     */
    #colorPixel (pixel) {
      this.#renderingContext2D.fillStyle = pixel.color
      this.#renderingContext2D.fillRect(pixel.x, pixel.y, pixel.width, pixel.height)
    }
  }
)
