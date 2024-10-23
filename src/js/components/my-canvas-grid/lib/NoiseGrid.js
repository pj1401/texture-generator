/**
 * @file The NoiseGrid class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

/**
 * Represents a grid containing some form of noise.
 */
export default class NoiseGrid {
  #width
  #height
  #seed

  /**
   * Initialises the object.
   *
   * @param {number} width - The width of the grid.
   * @param {number} height - The height of the grid.
   * @param {number} [seed=0] - Optional seed used to randomise.
   */
  constructor (width, height, seed = 0) {
    this.width = width
    this.height = height
    this.seed = seed
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
    this.#checkIfNumber(width)
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
    this.#checkIfNumber(height)
    this.#height = height
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
    this.#checkIfNumber(seed)
    this.#seed = seed
  }

  /**
   * Determines whether or not the passed argument is a number.
   *
   * @param {object} value - The value to be tested.
   * @throws {TypeError} The passed argument is not a number.
   */
  #checkIfNumber (value) {
    if (Number.isNaN(value) || typeof value !== 'number') {
      throw new TypeError('The passed argument is not a number.')
    }
  }
}
