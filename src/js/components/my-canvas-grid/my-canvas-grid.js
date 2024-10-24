/**
 * @file The canvas-grid component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import Attribute from './lib/Attribute.js'
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
      const attributeValue = new Attribute(name, oldValue, newValue)

      if (this.#attributeHasChanged('seed', attributeValue)) {
        this.#perlinGrid.seed = parseInt(newValue)
      } else if (this.#attributeHasChanged('width', attributeValue)) {
        this.#updateAttribute('width', parseInt(newValue))
      } else if (this.#attributeHasChanged('height', attributeValue)) {
        this.#updateAttribute('height', parseInt(newValue))
      }
      this.renderCanvasImage()
    }

    /**
     * Checks if the value of the attribute has changed.
     *
     * @param {string} attributeName - The attribute name.
     * @param {Attribute} attribute - The attribute name that is passed by the browser.
     * @returns {boolean} True if the value of the attribute has changed.
     */
    #attributeHasChanged (attributeName, attribute) {
      return attribute.name === attributeName && attribute.newValue !== attribute.oldValue
    }

    /**
     * Updates an attribute.
     *
     * @param {string} attributeName - The attribute name.
     * @param {number} newValue - The new attribute value.
     */
    #updateAttribute (attributeName, newValue) {
      this.#canvasElement[attributeName] = newValue
      this.#perlinGrid[attributeName] = this.#canvasElement[attributeName]
    }
  }
)
