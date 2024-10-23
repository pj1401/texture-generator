/**
 * @file Tests for the CanvasGrid.js file.
 * @module test/CanvasGrid.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import CanvasGrid from '../src/js/components/my-canvas-grid/lib/CanvasGrid.js'

describe('Generate noise', () => {
  test('Generate the image after attributes are changed', () => {
    const canvasGrid = new CanvasGrid(400, 400, 0)

    canvasGrid.generatePerlinNoise(256, 256, 463)
    expect(canvasGrid.colorPixel()).toHaveBeenCalled()
  })
})
