/**
 * @file The GridPixel class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import { GridComponent } from './perlin-noise/src/GridComponent.js'

/**
 * Represents a pixel on a grid.
 */
export default class GridPixel extends GridComponent {
  #width = 1
  #height = 1
  #color

  /**
   * Initialises the object.
   *
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {string} color The css string value of the color.
   */
  constructor (x, y, color) {
    super(x, y)
    this.color = color
  }

  /**
   * Returns the width of the pixel.
   *
   * @returns {number} The width of the pixel.
   */
  get width () {
    return this.#width
  }

  /**
   * Returns the height of the pixel.
   *
   * @returns {number} The height of the pixel.
   */
  get height () {
    return this.#height
  }

  /**
   * Returns the color of the pixel.
   *
   * @returns {string} The color as a string.
   */
  get color () {
    return this.#color
  }

  /**
   * Sets the color of the pixel.
   */
  set color (color) {
    this.#color = color
  }
}
