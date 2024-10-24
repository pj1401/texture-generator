/**
 * @file The Grid class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import { checkIfNumber } from './errorHandlers.js'

/**
 * Represents a grid.
 */
export default class Grid {
  #width
  #height

  /**
   * Initialises the object.
   *
   * @param {number} width - The width of the grid.
   * @param {number} height - The height of the grid.
   */
  constructor (width, height) {
    this.width = width
    this.height = height
  }

  /**
   * Returns the width of the grid.
   *
   * @returns {number} The width of the grid.
   */
  get width () {
    return this.#width
  }

  /**
   * Sets the width of the grid.
   */
  set width (width) {
    checkIfNumber(width)
    this.#width = width
  }

  /**
   * Returns the height of the grid.
   *
   * @returns {number} The height of the grid.
   */
  get height () {
    return this.#height
  }

  /**
   * Sets the height of the grid.
   */
  set height (height) {
    checkIfNumber(height)
    this.#height = height
  }
}
