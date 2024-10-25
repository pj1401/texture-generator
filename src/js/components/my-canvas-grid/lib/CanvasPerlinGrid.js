/**
 * @file The CanvasPerlinGrid class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import GridPixel from './GridPixel.js'
import NoiseGrid from './NoiseGrid.js'
import PerlinNoise from './perlin-noise/index.js'

/**
 * Represents an offscreen canvas. Generates an image using perlin noise.
 */
export default class CanvasPerlinGrid extends OffscreenCanvas {
  /**
   * @type {PerlinNoise}
   */
  #perlin

  /**
   * @type {NoiseGrid}
   */
  #perlinGrid

  /**
   * Initialises the object.
   *
   * @param {NoiseGrid} noiseGrid - The grid object.
   */
  constructor (noiseGrid) {
    super(noiseGrid.width, noiseGrid.height)
  }

  /**
   * Generates the image.
   *
   * @param {NoiseGrid} noiseGrid - The grid object.
   */
  generateImage (noiseGrid) {
    this.#updateGrid(noiseGrid)
    this.#perlin = new PerlinNoise(this.#perlinGrid.seed)
    this.#generateGridColors()
  }

  /**
   * Updates the grid.
   *
   * @param {NoiseGrid} noiseGrid - The grid object.
   */
  #updateGrid (noiseGrid) {
    this.#perlinGrid = noiseGrid
    this.width = noiseGrid.width
    this.height = noiseGrid.height
  }

  /**
   * Generates a colour for every pixel in the image.
   */
  #generateGridColors () {
    const renderingContext2D = this.getContext('2d')

    // Step through each pixel and generate a colour.
    for (let x = 0; x < this.#perlinGrid.width; x++) {
      for (let y = 0; y < this.#perlinGrid.height; y++) {
        const pixel = new GridPixel(x, y)
        pixel.color = this.#getColorString(pixel)
        this.#colorPixel(renderingContext2D, pixel)
      }
    }
  }

  /**
   * Get the colour of the pixel.
   *
   * @param {GridPixel} pixel - The pixel where the noise is generated.
   * @returns {string} The css string value of the color.
   */
  #getColorString (pixel) {
    const noise = this.#getNoiseValue(pixel)
    const colorValue = this.#getColorValue(noise)
    return `rgb(${colorValue}, ${colorValue}, ${colorValue})`
  }

  /**
   * Computes the noise value on (x, y) with scaling.
   *
   * @param {GridPixel} pixel - The pixel where the noise is generated.
   * @returns {number} The noise value.
   */
  #getNoiseValue (pixel) {
    return this.#perlin.generatePerlinNoise(pixel.x * this.#perlinGrid.scale, pixel.y * this.#perlinGrid.scale)
  }

  /**
   * Coverts the noise value from [-1, 1] to [0, 255].
   *
   * @param {number} noiseValue - The noise value.
   * @returns {number} The rgb colour value.
   */
  #getColorValue (noiseValue) {
    const noiseOffset = 1
    const colorScale = 128
    return Math.floor((noiseValue + noiseOffset) * colorScale)
  }

  /**
   * Colours a pixel on the grid.
   *
   * @param {OffscreenCanvasRenderingContext2D} renderingContext2D - Rendering context for the canvas.
   * @param {GridPixel} pixel - The pixel to be filled.
   */
  #colorPixel (renderingContext2D, pixel) {
    renderingContext2D.fillStyle = pixel.color
    renderingContext2D.fillRect(pixel.x, pixel.y, pixel.width, pixel.height)
  }
}
