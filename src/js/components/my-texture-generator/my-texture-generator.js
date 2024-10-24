/**
 * @file The texture-generator component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import '../my-canvas-grid/'
import '../my-texture-form/'

import { cssTemplate } from './my-texture-generator.css.js'
import { htmlTemplate } from './my-texture-generator.html.js'

customElements.define('my-texture-generator',
  /**
   * Represents a my-texture-generator element.
   */
  class extends HTMLElement {
    /**
     * @type {HTMLElement}
     */
    #canvasGrid

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this custom element and
      // append the templates to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.#canvasGrid = this.shadowRoot.querySelector('my-canvas-grid')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.shadowRoot.addEventListener('texture-form:change', (event) => this.#onFormChange(event))
    }

    /**
     * Handle the form change event.
     *
     * @param {event} event - The texture-form:change event.
     */
    #onFormChange (event) {
      this.#canvasGrid.setAttribute(event.detail.name, event.detail.value)
    }
  }
)
