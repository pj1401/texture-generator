/**
 * @file Tests for the PerlinNoise class.
 * @module test/PerlinNoise.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

import PerlinNoise from '../index.js'

test('Perlin noise values', () => {
  const perlinNoises = [
    { perlin: new PerlinNoise(1.3, 2.1), expected: 0.093744 },
    { perlin: new PerlinNoise(5.5, 3.7), expected: -0.177968 },
    { perlin: new PerlinNoise(10.0, 20.0), expected: 0 },
    { perlin: new PerlinNoise(100.0, 200.0), expected: 0 },
    { perlin: new PerlinNoise(0, 0.5), expected: -0.056895 },
    { perlin: new PerlinNoise(0.1, 0.5), expected: -0.05546 },
    { perlin: new PerlinNoise(0.2, 0.5), expected: -0.051994 },
    { perlin: new PerlinNoise(0.3, 0.5), expected: -0.042475 },
    { perlin: new PerlinNoise(0.4, 0.5), expected: -0.023314 },
    { perlin: new PerlinNoise(0.5, 0.5), expected: 0.006776 },
    { perlin: new PerlinNoise(0.5, 0.6), expected: -0.00591 },
    { perlin: new PerlinNoise(0.5, 0.7), expected: -0.028887 },
    { perlin: new PerlinNoise(0.5, 0.8), expected: -0.059371 },
    { perlin: new PerlinNoise(0.5, 0.9), expected: -0.092953 },
    { perlin: new PerlinNoise(0.5, 1), expected: -0.126147 }
  ]

  for (const perlinNoise of perlinNoises) {
    expect(perlinNoise.perlin.valueOf()).toBeCloseTo(perlinNoise.expected)
  }
})

test('Changing coordinates', () => {
  const perlin = new PerlinNoise(1.3, 2.1)
  expect(perlin.valueOf()).toBeCloseTo(0.093744)

  perlin.perlin(3.5, 2.1)

  expect(perlin.valueOf()).toBeCloseTo(0.22739)
})

test('Using a seed', () => {
  const perlinNoises = [
    { perlin: new PerlinNoise(1.3, 2.1, 4783), expected: 0.028378 },
    { perlin: new PerlinNoise(5.5, 3.7, 4783), expected: -0.223627 },
    { perlin: new PerlinNoise(10, 20, 4783), expected: 0 },
    { perlin: new PerlinNoise(1.3, 2.1, 6829), expected: 0.206701 },
    { perlin: new PerlinNoise(5.5, 3.7, 6829), expected: 0.169030 },
    { perlin: new PerlinNoise(10, 20, 6829), expected: 0 },
    { perlin: new PerlinNoise(1.3, 2.1, 7001), expected: -0.166117 },
    { perlin: new PerlinNoise(5.5, 3.7, 7001), expected: 0.183346 },
    { perlin: new PerlinNoise(10, 20, 7001), expected: 0 },
    { perlin: new PerlinNoise(0, 0.5, 24815821), expected: -0.3184 },
    { perlin: new PerlinNoise(0.1, 0.5, 24815821), expected: -0.391194 },
    { perlin: new PerlinNoise(0.2, 0.5, 24815821), expected: -0.442847 },
    { perlin: new PerlinNoise(0.3, 0.5, 24815821), expected: -0.45581 },
    { perlin: new PerlinNoise(0.4, 0.5, 24815821), expected: -0.421792 },
    { perlin: new PerlinNoise(0.5, 0.5, 24815821), expected: -0.344707 },
    { perlin: new PerlinNoise(0.5, 0.6, 24815821), expected: -0.350501 },
    { perlin: new PerlinNoise(0.5, 0.7, 24815821), expected: -0.325892 },
    { perlin: new PerlinNoise(0.5, 0.8, 24815821), expected: -0.272131 },
    { perlin: new PerlinNoise(0.5, 0.9, 24815821), expected: -0.197691 },
    { perlin: new PerlinNoise(0.5, 1, 24815821), expected: -0.114196 }
  ]

  for (const perlinNoise of perlinNoises) {
    expect(perlinNoise.perlin.valueOf()).toBeCloseTo(perlinNoise.expected)
  }
})

test('NaN in coordinates', () => {
  expect(() => new PerlinNoise(NaN, 2)).toThrow(TypeError)
})

test('Non number in coordinates', () => {
  expect(() => new PerlinNoise(1, 'number')).toThrow(TypeError)
  expect(() => new PerlinNoise('4', 3)).toThrow(TypeError)
})

test('Changing coordinates to non number', () => {
  const perlin = new PerlinNoise(1.3, 2.1)
  expect(perlin.valueOf()).toBeCloseTo(0.093744)

  expect(() => { perlin.perlin('1.3', 2.1) }).toThrow(TypeError)

  expect(perlin.valueOf()).toBeCloseTo(0.093744)
})

test('Setting seed to non number', () => {
  expect(() => new PerlinNoise(1.3, 2.1, '4783')).toThrow(TypeError)
  expect(() => new PerlinNoise(1.3, 2.1, 'number')).toThrow(TypeError)
  expect(() => new PerlinNoise(1.3, 2.1, NaN)).toThrow(TypeError)
})

/*
test('Fade', () => {
  const perlin = new PerlinNoise(1.3, 2.1)

  const fadeValues = [
    { difference: 0, expected: 0 },
    { difference: 0.1, expected: 0.00856 },
    { difference: 0.3, expected: 0.16308 },
    { difference: 0.5, expected: 0.5 },
    { difference: 0.7, expected: 0.836912 }
  ]

  for (const fadeValue of fadeValues) {
    expect(perlin.fade(fadeValue.difference)).toBeCloseTo(fadeValue.expected)
  }
})
*/

/*
test('Interpolation', () => {
  const perlin = new PerlinNoise(1.3, 2.1)

  const testValues = [
    {
      a: 0.129869565800774,
      b: -0.105517730672436,
      fade: 0.16308,
      expected: 0.091482605491923
    }, {
      a: 0.595001439253961,
      b: -0.87287104641861,
      fade: 0.16308,
      expected: 0.355620794290478
    }, {
      a: 0.84860770827331,
      b: -0.830807742805546,
      fade: 0.5,
      expected: 0.008899982733882
    }, {
      a: 0,
      b: -0.762921343630262,
      fade: 0.5,
      expected: -0.381460671815131
    },
    {
      a: 0.0088999827338817,
      b: 0,
      fade: 0.83692,
      expected: 0.001451409184241
    }, {
      a: 0.124762150584332,
      b: 0.701096327945958,
      fade: 0,
      expected: 0.124762150584332
    }, { a: 0.5, b: -0.5, fade: 0.5, expected: 0 },
    { a: 0.5, b: 0.5, fade: 0.5, expected: 0.5 }
  ]

  for (const value of testValues) {
    expect(perlin.interpolate(value.a, value.b, value.fade)).toBeCloseTo(value.expected)
  }
})
*/
