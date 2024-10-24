/**
 * @file The Point class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { GridComponent } from './GridComponent.js'

/**
 * Represents a point on a grid.
 */
export class Point extends GridComponent {
  /**
   * Returns a string representing the object.
   *
   * @returns {string} A string that represents the current object.
   */
  toString () {
    return `P(${this.x}, ${this.y})`
  }
}
