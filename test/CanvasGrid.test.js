/**
 * @file Tests for the my-canvas-grid.js file.
 * @module test/CanvasGrid.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

jest.mock('../src/js/components/my-canvas-grid/')

test('Image is generated after form is changed', () => {
  const canvasGrid = require('../src/js/components/my-canvas-grid/generatePerlinNoise')
  console.log(canvasGrid)
  expect(canvasGrid).toHaveBeenCalled()
})
