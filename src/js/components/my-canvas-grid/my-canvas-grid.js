/**
 * @file The canvas-grid component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import PerlinNoise from './lib/perlin-noise/index.js'

import { htmlTemplate } from './my-canvas-grid.html.js'

customElements.define('my-canvas-grid',
  /**
   * Represents a my-canvas-grid element.
   */
  class extends HTMLElement {
    #ctx
    #width
    #height
    #scale
    #perlin

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this custom element and
      // append the templates to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      // TODO: A method that generates a noise value for every pixel in the grid.
      // TODO: The noise value has a corresponding colour.

      const canvas = this.shadowRoot.querySelector('#canvas-grid')
      this.#ctx = canvas.getContext('2d')

      this.#width = canvas.width
      this.#height = canvas.height
      this.#scale = 0.05
      this.#perlin = new PerlinNoise(0, 0)

      this.generatePerlinNoise()
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
     * Generates the image.
     */
    generatePerlinNoise () {
      // Step through each pixel and generate a colour.
      for (let x = 0; x < this.#width; x++) {
        for (let y = 0; y < this.#height; y++) {
          const noise = this.getNoiseValue(x, y)
          const color = this.getColorValue(noise)
          this.colorPixel(color, x, y)
        }
      }
    }

    /**
     * Computes the noise value on (x, y) with scale.
     *
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @returns {number} The noise value.
     */
    getNoiseValue (x, y) {
      return this.#perlin.perlin(x * this.#scale, y * this.#scale)
    }

    /**
     * Coverts the noise value from [-1, 1] to [0, 255].
     *
     * @param {number} noiseValue - The noise value.
     * @returns {number} The rgb colour value.
     */
    getColorValue (noiseValue) {
      const noiseOffset = 1
      const colorScale = 128
      return Math.floor((noiseValue + noiseOffset) * colorScale)
    }

    /**
     * Colours a pixel on the grid.
     *
     * @param {number} colorValue - The colour value in rgb.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    colorPixel (colorValue, x, y) {
      const pixelWidth = 1
      const pixelHeight = 1
      this.#ctx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`
      this.#ctx.fillRect(x, y, pixelWidth, pixelHeight)
    }
  }
)
