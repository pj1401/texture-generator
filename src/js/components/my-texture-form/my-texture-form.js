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
      this.shadowRoot.querySelector('#seed').addEventListener('change',
        (event) => this.#dispatchFormChangeEvent(event, 'seed'))
      this.shadowRoot.querySelector('#width').addEventListener('change',
        (event) => this.#dispatchFormChangeEvent(event, 'width'))
      this.shadowRoot.querySelector('#height').addEventListener('change',
        (event) => this.#dispatchFormChangeEvent(event, 'height'))
    }

    /**
     * Dispatches an event when an input is changed.
     *
     * @param {event} event - The event.
     * @param {string} attributeName - The name of the changed attribute.
     */
    #dispatchFormChangeEvent (event, attributeName) {
      this.dispatchEvent(new window.CustomEvent('texture-form:change', {
        bubbles: true,
        detail: { name: attributeName, value: event.target.value }
      }))
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.shadowRoot.querySelector('#seed').removeEventListener('change', this.#dispatchFormChangeEvent)
      this.shadowRoot.querySelector('#width').removeEventListener('change', this.#dispatchFormChangeEvent)
      this.shadowRoot.querySelector('#height').removeEventListener('change', this.#dispatchFormChangeEvent)
    }
  }
)
