/**
 * @file Tests for the NoiseGrid.js file.
 * @module test/NoiseGrid.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import NoiseGrid from '../src/js/components/my-canvas-grid/lib/NoiseGrid.js'

/**
 * Represents a test case for NoiseGrid.
 */
class NoiseGridTestCase {
  /**
   * Initialises the object.
   *
   * @param {NoiseGrid} noiseGrid - The grid object to test.
   * @param {object} expected - The expected values
   */
  constructor (noiseGrid, expected) {
    this.noiseGrid = noiseGrid
    this.expected = expected
  }

  /**
   * Run the test case.
   */
  runTest () {
    expect({
      width: this.noiseGrid.width,
      height: this.noiseGrid.height,
      seed: this.noiseGrid.seed
    }).toEqual(this.expected)
  }
}

describe('Initialising NoiseGrid objects', () => {
  test('New NoiseGrid', () => {
    const testCase = new NoiseGridTestCase(new NoiseGrid(400, 400, 1), {
      width: 400,
      height: 400,
      seed: 1
    })

    testCase.runTest()
  })

  test('New NoiseGrid with undefined seed', () => {
    const testCase = new NoiseGridTestCase(new NoiseGrid(400, 400, undefined), {
      width: 400,
      height: 400,
      seed: 0
    })

    testCase.runTest()
  })
})

describe('Using non numbers', () => {
  test('New grid with NaN as seed', () => {
    expect(() => new NoiseGrid(400, 400, NaN)).toThrow(TypeError)
  })
})
