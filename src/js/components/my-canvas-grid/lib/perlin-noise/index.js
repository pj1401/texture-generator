/**
 * @file The PerlinNoise class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import { checkIfNumber } from './src/errorHandlers.js'
import { Point } from './src/Point.js'
import { RandomGradient } from './src/RandomGradient.js'
import { Vector } from './src/Vector.js'

/**
 * Represents 2D perlin noise.
 */
export default class PerlinNoise {
  /**
   * The perlin value.
   *
   * @type {number}
   */
  #perlinValue

  /**
   * A seed that is used to randomise the gradients.
   *
   * @type {number}
   */
  #seed

  /**
   * Initialises the object.
   *
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {number} [seed=0] - Optional seed used to randomise.
   */
  constructor (x, y, seed = 0) {
    checkIfNumber(x)
    checkIfNumber(y)
    checkIfNumber(seed)

    this.#seed = seed
    this.#computePerlinNoise(x, y)
  }

  /**
   * Returns the noise based on the coordinates.
   *
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @returns {number} The perlin noise.
   */
  perlin (x, y) {
    checkIfNumber(x)
    checkIfNumber(y)
    this.#computePerlinNoise(x, y)

    return this.#perlinValue
  }

  /**
   * Computes the perlin noise.
   *
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  #computePerlinNoise (x, y) {
    const gridPoints = this.#findGridPoints(x, y)
    const randomGradients = this.#createRandomGradients(gridPoints)
    const vectors = this.#computeVectors(gridPoints, x, y)
    const dotProducts = this.#computeDotProducts(randomGradients, vectors)

    // The fade smoothens the interpolations.
    const fadeX = this.#fade(vectors[0].x)
    const fadeY = this.#fade(vectors[0].y)

    // Determine the interpolations on the x-axis.
    const interpolationsX = this.#interpolateAxis(dotProducts, fadeX)

    this.#perlinValue = this.#interpolate(interpolationsX[0], interpolationsX[1], fadeY)
  }

  /**
   * Determine the corners.
   *
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @returns {object} The grid points.
   */
  #findGridPoints (x, y) {
    const point0 = new Point(Math.floor(x), Math.floor(y))

    return {
      point00: point0,
      point10: new Point(point0.x + 1, point0.y),
      point01: new Point(point0.x, point0.y + 1),
      point11: new Point(point0.x + 1, point0.y + 1)
    }
  }

  /**
   * Create random gradients for each corner.
   *
   * @param {{Point}} corners - The grid points.
   * @returns {[RandomGradient]} The randomised gradients.
   */
  #createRandomGradients (corners) {
    const randomGradients = []
    for (const corner of Object.values(corners)) {
      randomGradients.push(new RandomGradient(corner, this.#seed))
    }
    return randomGradients
  }

  /**
   * Compute the vectors from the corners to (x, y).
   *
   * @param {object} corners - The grid points.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @returns {[Vector]} The vectors.
   */
  #computeVectors (corners, x, y) {
    const dx0 = x - corners.point00.x
    const dy0 = y - corners.point00.y
    const dx1 = x - corners.point11.x
    const dy1 = y - corners.point11.y

    return [
      new Vector(dx0, dy0),
      new Vector(dx1, dy0),
      new Vector(dx0, dy1),
      new Vector(dx1, dy1)
    ]
  }

  /**
   * Determine the dot products.
   *
   * @param {[RandomGradient]} randomGradients - The randomised gradients.
   * @param {[Vector]} vectors - The vectors.
   * @returns {[number]} The dot products.
   */
  #computeDotProducts (randomGradients, vectors) {
    const dotProducts = []
    for (let i = 0; i < randomGradients.length; i++) {
      dotProducts.push(randomGradients[i].dotProduct(vectors[i]))
    }
    return dotProducts
  }

  /**
   * Determine the interpolations on an axis.
   *
   * @param {[number]} dotProducts - The dot products.
   * @param {number} fadeValue - The fade value to soften the interpolations.
   * @returns {[number]} The interpolated values on the axis.
   */
  #interpolateAxis (dotProducts, fadeValue) {
    const interpolations = []
    for (let i = 0; i <= dotProducts.length / 2; i += 2) {
      interpolations.push(this.#interpolate(dotProducts[i], dotProducts[i + 1], fadeValue))
    }
    return interpolations
  }

  /**
   * Interpolate between two values.
   *
   * @param {number} dotProdA - Dot product.
   * @param {number} dotProdB - Dot product.
   * @param {number} fade - The fade value.
   * @returns {number} The interpolation.
   */
  #interpolate (dotProdA, dotProdB, fade) {
    return dotProdA + fade * (dotProdB - dotProdA)
  }

  /**
   * Softens the interpolations.
   *
   * @param {number} difference - The difference between points on the x- or y-axis.
   * @returns {number} The fade value.
   */
  #fade (difference) {
    return difference * difference * difference * (difference * (difference * 6 - 15) + 10)
  }

  /**
   * Returns the current perlin noise value.
   *
   * @returns {number} The perlin noise value.
   */
  valueOf () {
    return this.#perlinValue
  }
}
