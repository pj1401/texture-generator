/**
 * @file The Attribute class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.1.0
 */

/**
 * Represents an attribute.
 */
export default class Attribute {
  name
  oldValue
  newValue

  /**
   * Initialises the object.
   *
   * @param {string} name of the attribute.
   * @param {any} oldValue the old attribute value.
   * @param {any} newValue the new attribute value.
   */
  constructor (name, oldValue, newValue) {
    this.name = name
    this.oldValue = oldValue
    this.newValue = newValue
  }
}
