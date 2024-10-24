/**
 * @file Tests for the NoiseGrid.js file.
 * @module test/NoiseGrid.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import NoiseGrid from '../src/js/components/my-canvas-grid/lib/NoiseGrid.js'

describe('Using non numbers', () => {
  test('New grid with NaN as seed', () => {
    expect(() => new NoiseGrid(400, 400, NaN)).toThrow(TypeError)
  })
})
