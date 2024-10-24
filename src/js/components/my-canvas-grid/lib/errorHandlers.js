/**
 * @file Error handlers.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Determines whether or not the passed argument is a number.
 *
 * @param {object} value - The value to be tested.
 * @throws {TypeError} The passed argument is not a number.
 */
export function checkIfNumber (value) {
  if (Number.isNaN(value) || typeof value !== 'number') {
    throw new TypeError('The passed argument is not a number.')
  }
}
