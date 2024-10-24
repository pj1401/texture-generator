/**
 * @file The texture-form component module.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import '../my-canvas-grid/'
import '../my-texture-form/'

import { cssTemplate } from './my-texture-form.css.js'
import { htmlTemplate } from './my-texture-form.html.js'

customElements.define('my-texture-form',
  /**
   * Represents a my-texture-form element.
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
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.shadowRoot.querySelector('#seed').addEventListener('change', (event) => {
        this.dispatchEvent(new window.CustomEvent('texture-form:change', { bubbles: true, detail: { name: 'seed', value: event.target.value } }))
      })
      this.shadowRoot.querySelector('#width').addEventListener('change', (event) => {
        this.dispatchEvent(new window.CustomEvent('texture-form:change', { bubbles: true, detail: { name: 'width', value: event.target.value } }))
      })
      this.shadowRoot.querySelector('#height').addEventListener('change', (event) => {
        this.dispatchEvent(new window.CustomEvent('texture-form:change', { bubbles: true, detail: { name: 'height', value: event.target.value } }))
      })
      this.shadowRoot.addEventListener('submit')
    }
  }
)
