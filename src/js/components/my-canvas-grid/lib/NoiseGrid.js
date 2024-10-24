/**
 * @file The NoiseGrid class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import Grid from './Grid.js'
import { checkIfNumber } from './errorHandlers.js'

/**
 * Represents a grid containing some form of noise.
 */
export default class NoiseGrid extends Grid {
  /**
   * The scale of the noise. Determines how "detailed" the noise looks.
   */
  #scale

  #seed

  /**
   * Initialises the object.
   *
   * @param {number} width - The width of the grid.
   * @param {number} height - The height of the grid.
   * @param {number} [seed=0] - Optional seed used to randomise.
   */
  constructor (width, height, seed = 0) {
    super(width, height)

    this.seed = seed
    this.#scale = 0.05
  }

  /**
   * Returns the scale of the noise.
   *
   * @returns {number} The scale of the noise.
   */
  get scale () {
    return this.#scale
  }

  /**
   * Returns the seed used to generate the noise.
   *
   * @returns {number} The seed.
   */
  get seed () {
    return this.#seed
  }

  /**
   * Sets the seed that is used to generate the noise.
   */
  set seed (seed) {
    checkIfNumber(seed)
    this.#seed = seed
  }
}
