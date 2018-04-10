/**
 * Check if key existed from environment variable, otherwise use
 * the value passed as second argument of this function
 *
 * @param {string} key key you are trying to access from env variable
 * @param {mixed} value alternative value in case key doesn't exist
 * @return {mixed} either value from env[key] or second argument value
 */
export default function env(key, value) {
  process.env[key] = process.env[key] ? process.env[key] : value

  return process.env[key]
}
