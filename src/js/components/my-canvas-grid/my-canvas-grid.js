/**
 * @file The canvas-grid component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

// import PerlinNoise from './lib/perlin-noise/index.js'

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
      // TODO: Step through each pixel and generate a colour.

      const noise = this.getNoiseValue()
      const color = this.getColorValue(noise)
      this.fillPixel(color)
    }

    /**
     * Colours a pixel on the grid.
     *
     * @param {number} colorValue - The colour value in rgb.
     */
    fillPixel (colorValue) {}
  }
)
