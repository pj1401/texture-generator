/**
 * @file Tests for the RandomGradient.js file.
 * @module test/RandomGradient.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import { Point } from '../src/Point.js'
import { RandomGradient } from '../src/RandomGradient.js'

test('Generate random gradient', () => {
  const randomGradients = [
    { gradient: new RandomGradient(new Point(0, 0)), expected: { x: 1, y: 0 } },
    { gradient: new RandomGradient(new Point(1, 2)), expected: { x: 0.101279206, y: 0.994858041 } },
    { gradient: new RandomGradient(new Point(2, 2)), expected: { x: 0.007886916, y: -0.999968898 } },
    { gradient: new RandomGradient(new Point(1, 3)), expected: { x: 0.937233865, y: -0.348701422 } },
    { gradient: new RandomGradient(new Point(2, 3)), expected: { x: -0.037835073, y: 0.999283997 } },
    { gradient: new RandomGradient(new Point(6, 4)), expected: { x: -0.722342956, y: 0.691534998 } },
    { gradient: new RandomGradient(new Point(10, 20)), expected: { x: -0.992802137, y: 0.119766091 } },
    { gradient: new RandomGradient(new Point(11, 21)), expected: { x: -0.821464307, y: 0.570259934 } },
    { gradient: new RandomGradient(new Point(100, 200)), expected: { x: -0.145267742, y: -0.989392381 } },
    { gradient: new RandomGradient(new Point(101, 201)), expected: { x: 0.263549536, y: -0.964645864 } }
  ]

  for (const randomGradient of randomGradients) {
    expect(randomGradient.gradient.x).toBeCloseTo(randomGradient.expected.x)
    expect(randomGradient.gradient.y).toBeCloseTo(randomGradient.expected.y)
  }
})

test('Randomise gradient using a seed', () => {
  const randomGradients = [
    { gradient: new RandomGradient(new Point(0, 0), 1), expected: { x: 0.332503, y: 0.943102 } },
    { gradient: new RandomGradient(new Point(0, 0), 337837103), expected: { x: 0.976169, y: -0.21701 } },
    { gradient: new RandomGradient(new Point(1, 2), 1), expected: { x: -0.8898, y: -0.456349 } },
    { gradient: new RandomGradient(new Point(1, 2), 337837103), expected: { x: 0.412568, y: -0.910927 } },
    { gradient: new RandomGradient(new Point(2, 2), 1), expected: { x: -0.399695, y: -0.916648 } },
    { gradient: new RandomGradient(new Point(2, 2), 337837103), expected: { x: 0.768991, y: 0.63926 } },
    { gradient: new RandomGradient(new Point(1, 3), 1), expected: { x: -0.681893, y: 0.731452 } },
    { gradient: new RandomGradient(new Point(1, 3), 337837103), expected: { x: -0.553916, y: -0.832572 } },
    { gradient: new RandomGradient(new Point(2, 3), 1), expected: { x: 0.095355, y: 0.995443 } },
    { gradient: new RandomGradient(new Point(2, 3), 337837103), expected: { x: 0.927418, y: -0.374026 } },
    { gradient: new RandomGradient(new Point(6, 4), 1), expected: { x: -0.636747, y: -0.771073 } },
    { gradient: new RandomGradient(new Point(6, 4), 337837103), expected: { x: -0.999511, y: -0.031285 } },
    { gradient: new RandomGradient(new Point(10, 20), 1), expected: { x: -0.330403, y: -0.94384 } },
    { gradient: new RandomGradient(new Point(10, 20), 337837103), expected: { x: 0.531923, y: 0.846793 } },
    { gradient: new RandomGradient(new Point(11, 21), 1), expected: { x: -0.450734, y: 0.892658 } },
    { gradient: new RandomGradient(new Point(11, 21), 337837103), expected: { x: 0.845248, y: -0.534374 } },
    { gradient: new RandomGradient(new Point(100, 200), 1), expected: { x: -0.006231, y: 0.999981 } },
    { gradient: new RandomGradient(new Point(100, 200), 337837103), expected: { x: 0.604265, y: 0.796783 } },
    { gradient: new RandomGradient(new Point(101, 201), 1), expected: { x: 0.502014, y: -0.864859 } },
    { gradient: new RandomGradient(new Point(101, 201), 337837103), expected: { x: -0.990532, y: -0.137282 } }
  ]

  for (const randomGradient of randomGradients) {
    expect(randomGradient.gradient.x).toBeCloseTo(randomGradient.expected.x)
    expect(randomGradient.gradient.y).toBeCloseTo(randomGradient.expected.y)
  }
})

test('Setting seed to non number', () => {
  expect(() => new RandomGradient(new Point(0, 0), '1')).toThrow(TypeError)
  expect(() => new RandomGradient(new Point(0, 0), 'number')).toThrow(TypeError)
  expect(() => new RandomGradient(new Point(0, 0), NaN)).toThrow(TypeError)
})

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
