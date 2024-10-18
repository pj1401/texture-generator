/**
 * @file The texture-generator component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { cssTemplate } from './my-texture-generator.css.js'
import { htmlTemplate } from './my-texture-generator.html.js'

customElements.define('my-texture-generator',
  /**
   * Represents a my-texture-generator element.
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
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      const canvas = this.shadowRoot.querySelector('#canvas-grid').getContext('2d')
      canvas.fillStyle = 'green'
      canvas.fillRect(10, 10, 380, 380)
    }
  }
)
