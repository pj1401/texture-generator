/**
 * @file Tests for the Vector.js file.
 * @module test/Vector.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { Vector } from '../src/Vector.js'

/**
 * Represents a test case for vector dot products.
 */
class DotProductTestCase {
  /**
   * Initialises the object.
   *
   * @param {Vector} vectorA - The starting vector.
   * @param {Vector} vectorB - A different vector.
   * @param {number} expected - The expected dot product.
   */
  constructor (vectorA, vectorB, expected) {
    this.vectorA = vectorA
    this.vectorB = vectorB
    this.expected = expected
  }

  /**
   * Run the test case.
   */
  runTest () {
    const actual = this.vectorA.dotProduct(this.vectorB)
    expect(actual).toBeCloseTo(this.expected)
  }
}

test('Dot products', () => {
  const testCases = getDotProductTestCases()

  for (const testCase of testCases) {
    testCase.runTest()
  }
})

/**
 * Returns an array of dot product test cases.
 *
 * @returns {[DotProductTestCase]} An array of test cases.
 */
function getDotProductTestCases () {
  return [
    new DotProductTestCase(new Vector(-0.7, -0.9), new Vector(0.3, 0.1), -0.3),
    new DotProductTestCase(new Vector(0.358, 0.799), new Vector(0.688, 0.616), 0.738488),
    new DotProductTestCase(new Vector(-7, 3), new Vector(0.219, 0.822), 0.933),
    new DotProductTestCase(new Vector(-4, 6), new Vector(8, 2), -20),
    new DotProductTestCase(new Vector(-0.993, 0.12), new Vector(0, 0), 0),
    new DotProductTestCase(new Vector(1, 1), new Vector(-1, -1), -2),
    new DotProductTestCase(new Vector(1, 0), new Vector(0.5, 0.5), 0.5)
  ]
}
