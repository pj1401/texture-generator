/**
 * @file The hello-world component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { cssTemplate } from './my-hello-world.css.js'
import { htmlTemplate } from './my-hello-world.html.js'

customElements.define('my-hello-world',
  /**
   * Represents a my-hello-world element.
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

      this.shadowRoot.querySelector('h2').textContent = 'Hello World Component!'
    }
  }
)
