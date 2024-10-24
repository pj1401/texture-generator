/**
 * @file Tests for the NoiseGrid.js file.
 * @module test/NoiseGrid.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import NoiseGrid from '../src/js/components/my-canvas-grid/lib/NoiseGrid.js'

describe('Initialising objects', () => {
  test('New NoiseGrid', () => {
    const noiseGrid = new NoiseGrid(400, 400, 1)

    expect({
      width: noiseGrid.width,
      height: noiseGrid.height,
      seed: noiseGrid.seed
    }).toEqual({
      width: 400,
      height: 400,
      seed: 1
    })
  })

  test('New NoiseGrid with undefined seed', () => {
    const noiseGrid = new NoiseGrid(400, 400, undefined)

    expect({
      width: noiseGrid.width,
      height: noiseGrid.height,
      seed: noiseGrid.seed
    }).toEqual({
      width: 400,
      height: 400,
      seed: 0
    })
  })
})

describe('Using non numbers', () => {
  test('New grid with NaN as seed', () => {
    expect(() => new NoiseGrid(400, 400, NaN)).toThrow(TypeError)
  })
})
