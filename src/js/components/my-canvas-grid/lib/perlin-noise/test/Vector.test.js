/**
 * @file Tests for the Vector.js file.
 * @module test/Vector.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { Vector } from '../src/Vector.js'

test('Dot products', () => {
  const testValues = [{
    vectorA: new Vector(-0.7, -0.9),
    vectorB: new Vector(0.3, 0.1),
    expected: -0.3
  }, {
    vectorA: new Vector(0.358, 0.799),
    vectorB: new Vector(0.688, 0.616),
    expected: 0.738488
  }, {
    vectorA: new Vector(-7, 3),
    vectorB: new Vector(0.219, 0.822),
    expected: 0.933
  }, {
    vectorA: new Vector(-4, 6),
    vectorB: new Vector(8, 2),
    expected: -20
  }, {
    vectorA: new Vector(-0.993, 0.12),
    vectorB: new Vector(0, 0),
    expected: 0
  }, {
    vectorA: new Vector(1, 1),
    vectorB: new Vector(-1, -1),
    expected: -2
  }, {
    vectorA: new Vector(1, 0),
    vectorB: new Vector(0.5, 0.5),
    expected: 0.5
  }
  ]

  for (const test of testValues) {
    expect(test.vectorA.dotProduct(test.vectorB)).toBeCloseTo(test.expected)
  }
})
