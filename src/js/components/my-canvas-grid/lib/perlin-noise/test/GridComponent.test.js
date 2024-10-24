/**
 * @file Tests for the GridComponent.js file.
 * @module test/GridComponent.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import { GridComponent } from '../src/GridComponent.js'

test('Instantiate abstract class', () => {
  expect(() => new GridComponent(1, 2)).toThrow(Error)
  expect(() => new GridComponent(1, 2)).toThrow('Can\'t instantiate abstract class.')
})
