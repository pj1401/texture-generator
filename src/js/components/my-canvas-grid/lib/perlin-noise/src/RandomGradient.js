/**
 * @file The RandomGradient class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import { checkIfNumber } from './errorHandlers.js'
import { Point } from './Point.js'
import { Vector } from './Vector.js'

/**
 * Represents the gradient of a line.
 */
export class RandomGradient extends Vector {
  /**
   * Initialises the object.
   *
   * @param {Point} point - The point on the grid.
   * @param {number} [seed=0] - Optional seed used to randomise.
   */
  constructor (point, seed = 0) {
    super(point.x, point.y)
    checkIfNumber(seed)

    this.#randomiseGradient(point.x, point.y, seed)
  }

  /**
   * Randomises a gradient.
   *
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} seed - Optional seed used to randomise.
   */
  #randomiseGradient (x, y, seed) {
    const angle = this.#getRandomAngle(x, y, seed) * 2 * Math.PI

    this.x = Math.cos(angle)
    this.y = Math.sin(angle)
  }

  /**
   * Generates a random value between 0 and 1 based on the input coordinates x and y.
   *
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} seed - Optional seed used to randomise.
   * @returns {number} A value between 0 and 1.
   */
  #getRandomAngle (x, y, seed) {
    /**
     * See @link https://en.wikipedia.org/wiki/Perlin_noise#Implementation
     * randomGradient()
     */
    // Prime numbers are used to combine x and y.
    let finalSeed = x * 374761393 + y * 668265263 + seed * 961748941
    finalSeed = (finalSeed ^ (finalSeed >> 13)) * 1274126177
    finalSeed = (finalSeed ^ (finalSeed >> 16))

    // Convert to a value between 0 and 1.
    return (finalSeed & 0x7fffffff) / 0x7fffffff
  }
}
