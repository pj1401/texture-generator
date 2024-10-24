/**
 * @file The Vecor class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { GridComponent } from './GridComponent.js'

/**
 * Represents a vector.
 */
export class Vector extends GridComponent {
  /**
   * Compute the dot product between the current vector and vectorB.
   *
   * @param {Vector} vectorB - A different vector.
   * @returns {number} - The dot product.
   */
  dotProduct (vectorB) {
    return this.x * vectorB.x + this.y * vectorB.y
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string} A string that represents the current object.
   */
  toString () {
    return `V[${this.x}, ${this.y}]`
  }
}
