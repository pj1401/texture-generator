/**
 * @file The canvas-grid component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { htmlTemplate } from './my-canvas-grid.html.js'

customElements.define('my-canvas-grid',
  /**
   * Represents a my-canvas-grid element.
   */
  class extends HTMLElement {
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

      const canvas = this.shadowRoot.querySelector('#canvas-grid').getContext('2d')
      canvas.fillStyle = 'green'
      canvas.fillRect(10, 10, 380, 380)
    }
  }
)
