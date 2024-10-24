/**
 * @file The GridComponent class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { checkIfNumber } from './errorHandlers.js'

/**
 * Represents a component on a grid.
 */
export class GridComponent {
  /**
   * The x-component.
   *
   * @type {number}
   */
  #x

  /**
   * The y-component.
   *
   * @type {number}
   */
  #y

  /**
   * Initialises the object.
   *
   * @param {number} x - The x-component.
   * @param {number} y - The y-component.
   */
  constructor (x, y) {
    if (this.constructor === GridComponent) {
      throw new Error('Can\'t instantiate abstract class.')
    }
    this.x = x
    this.y = y
  }

  /**
   * Returns the x-component.
   *
   * @returns {number} x - The x-component.
   */
  get x () {
    return this.#x
  }

  /**
   * Sets the x-component.
   *
   * @param {number} x - The x-component.
   */
  set x (x) {
    checkIfNumber(x)
    this.#x = x
  }

  /**
   * Returns the y-component.
   *
   * @returns {number} y - The y-component.
   */
  get y () {
    return this.#y
  }

  /**
   * Sets the y-component.
   *
   * @param {number} y - The y-component.
   */
  set y (y) {
    checkIfNumber(y)
    this.#y = y
  }
}
