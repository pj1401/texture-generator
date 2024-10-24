/**
 * @file The canvas-grid component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import CanvasPerlinGrid from './lib/CanvasPerlinGrid.js'
import NoiseGrid from './lib/NoiseGrid.js'

import { htmlTemplate } from './my-canvas-grid.html.js'

customElements.define('my-canvas-grid',
  /**
   * Represents a my-canvas-grid element.
   */
  class extends HTMLElement {
    /**
     * @type {HTMLCanvasElement}
     */
    #canvasElement

    /**
     * @type {CanvasPerlinGrid}
     */
    #offScreenCanvas

    /**
     * @type {CanvasRenderingContext2D}
     */
    #renderingContext2D

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

      this.#offScreenCanvas = new CanvasPerlinGrid(this.#perlinGrid)

      this.renderCanvasImage()
    }

    /**
     * Renders the image.
     */
    renderCanvasImage () {
      this.#offScreenCanvas.generateImage(this.#perlinGrid)
      this.#renderingContext2D.drawImage(this.#offScreenCanvas, 0, 0)
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
  }
)
