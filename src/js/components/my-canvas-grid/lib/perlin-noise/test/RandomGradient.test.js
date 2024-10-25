/**
 * @file Tests for the RandomGradient.js file.
 * @module test/RandomGradient.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import { Point } from '../src/Point.js'
import { RandomGradient } from '../src/RandomGradient.js'
import { Vector } from '../src/Vector.js'

/**
 * Represents a test case for randomised gradients.
 */
class RandomGradientTestCase {
  /**
   * Initialises the object.
   *
   * @param {Point} point - The point on the grid.
   * @param {Vector} expected - The expected vector.
   * @param {number} [seed=0] - Optional seed used to randomise.
   */
  constructor (point, expected, seed = 0) {
    this.gradient = new RandomGradient(point, seed)
    this.expected = expected
  }

  /**
   * Run the test case.
   */
  runTest () {
    expect(this.gradient.x).toBeCloseTo(this.expected.x)
    expect(this.gradient.y).toBeCloseTo(this.expected.y)
  }
}

describe('Randomised gradients', () => {
  test('Generate random gradient', () => {
    const testCases = getRandomGradientTestCases()

    for (const testCase of testCases) {
      testCase.runTest()
    }
  })

  test('Randomise gradient using a seed', () => {
    const testCases = getRandomGradientTestCasesWithSeed()

    for (const testCase of testCases) {
      testCase.runTest()
    }
  })

  test('Seed is undefined', () => {
    const testCases = [
      { gradient: new RandomGradient(new Point(0, 0)), expected: { x: 1, y: 0 } },
      { gradient: new RandomGradient(new Point(1, 2)), expected: { x: 0.101279206, y: 0.994858041 } }
    ]

    for (const testCase of testCases) {
      expect(testCase.gradient.x).toBeCloseTo(testCase.expected.x)
      expect(testCase.gradient.y).toBeCloseTo(testCase.expected.y)
    }
  })
})

/**
 * Returns an array of random gradient test cases.
 *
 * @returns {[RandomGradientTestCase]} An array of test cases.
 */
function getRandomGradientTestCases () {
  return [
    new RandomGradientTestCase(new Point(0, 0), new Vector(1, 0)),
    new RandomGradientTestCase(new Point(1, 2), new Vector(0.101279206, 0.994858041)),
    new RandomGradientTestCase(new Point(2, 2), new Vector(0.007886916, -0.999968898)),
    new RandomGradientTestCase(new Point(1, 3), new Vector(0.937233865, -0.348701422)),
    new RandomGradientTestCase(new Point(2, 3), new Vector(-0.037835073, 0.999283997)),
    new RandomGradientTestCase(new Point(100, 200), new Vector(-0.145267742, -0.989392381))
  ]
}

/**
 * Returns an array of random gradient test cases using seeds.
 *
 * @returns {[RandomGradientTestCase]} An array of test cases.
 */
function getRandomGradientTestCasesWithSeed () {
  return [
    new RandomGradientTestCase(new Point(0, 0), new Vector(0.332503, 0.943102), 1),
    new RandomGradientTestCase(new Point(0, 0), new Vector(0.976169, -0.21701), 337837103),
    new RandomGradientTestCase(new Point(1, 2), new Vector(-0.8898, -0.456349), 1),
    new RandomGradientTestCase(new Point(1, 2), new Vector(0.412568, -0.910927), 337837103),
    new RandomGradientTestCase(new Point(2, 2), new Vector(-0.399695, -0.916648), 1),
    new RandomGradientTestCase(new Point(2, 2), new Vector(0.768991, 0.63926), 337837103),
    new RandomGradientTestCase(new Point(6, 4), new Vector(-0.636747, -0.771073), 1),
    new RandomGradientTestCase(new Point(6, 4), new Vector(-0.999511, -0.031285), 337837103),
    new RandomGradientTestCase(new Point(11, 21), new Vector(-0.450734, 0.892658), 1),
    new RandomGradientTestCase(new Point(11, 21), new Vector(0.845248, -0.534374), 337837103),
    new RandomGradientTestCase(new Point(100, 200), new Vector(-0.006231, 0.999981), 1),
    new RandomGradientTestCase(new Point(100, 200), new Vector(0.604265, 0.796783), 337837103)
  ]
}

describe('exceptions', () => {
  test('Setting seed to non number', () => {
    expect(() => new RandomGradient(new Point(0, 0), '1')).toThrow(TypeError)
    expect(() => new RandomGradient(new Point(0, 0), 'number')).toThrow(TypeError)
    expect(() => new RandomGradient(new Point(0, 0), NaN)).toThrow(TypeError)
  })
})

// This test is only used for debugging.
// The tested method has to be made public for the test to run.

/*
test('Generate random values', () => {
  const randomGradient = new RandomGradient(new Point(1, 2))

  const testValues = [
    { x: 1, y: 2, expected: 0.233853228964775 },
    { x: 5, y: 3, expected: 0.177478756372574 },
    { x: 10, y: 20, expected: 0.4808927688193 },
    { x: 100, y: 200, expected: 0.726797822735644 },
    { x: 0.5, y: 0.5, expected: 0.336138185735856 }
  ]

  for (const value of testValues) {
    expect(randomGradient.random(value.x, value.y)).toBeCloseTo(value.expected)
  }
})
 */
