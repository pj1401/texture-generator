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
   * @param {number} [seed=0] - Optional seed used to randomise.
   */
  constructor (seed = 0) {
    checkIfNumber(seed)

    this.#seed = seed
    this.#computePerlinNoise(new Point(0, 0))
  }

  /**
   * Returns the noise based on the coordinates.
   *
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @returns {number} The perlin noise.
   */
  generatePerlinNoise (x, y) {
    this.#computePerlinNoise(new Point(x, y))

    return this.#perlinValue
  }

  /**
   * Computes the perlin noise.
   *
   * @param {Point} point - The point that the noise is generated on.
   */
  #computePerlinNoise (point) {
    const gridPoints = this.#getGridPoints(point)
    const randomGradients = this.#getRandomGradients(gridPoints)
    const vectors = this.#getVectors(gridPoints, point)
    const dotProducts = this.#getDotProducts(randomGradients, vectors)

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
   * @param {Point} point - The point that the noise is generated on.
   * @returns {[Point]} The grid points.
   */
  #getGridPoints (point) {
    const point0 = new Point(Math.floor(point.x), Math.floor(point.y))

    return [
      point0,
      new Point(point0.x + 1, point0.y),
      new Point(point0.x, point0.y + 1),
      new Point(point0.x + 1, point0.y + 1)
    ]
  }

  /**
   * Create random gradients for each corner.
   *
   * @param {[Point]} corners - The grid points.
   * @returns {[RandomGradient]} The randomised gradients.
   */
  #getRandomGradients (corners) {
    const randomGradients = []
    for (const corner of corners) {
      randomGradients.push(new RandomGradient(corner, this.#seed))
    }
    return randomGradients
  }

  /**
   * Compute the vectors from the corners to (x, y).
   *
   * @param {[Point]} corners - The grid points.
   * @param {Point} point - The point that the noise is generated on.
   * @returns {[Vector]} The vectors.
   */
  #getVectors (corners, point) {
    const dx0 = point.x - corners[0].x
    const dy0 = point.y - corners[0].y
    const dx1 = point.x - corners[3].x
    const dy1 = point.y - corners[3].y

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
  #getDotProducts (randomGradients, vectors) {
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
