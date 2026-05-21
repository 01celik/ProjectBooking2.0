/**
 * ========== USER MODEL ==========
 * Database layer for user authentication operations
 * Handles signup, login, and password hashing
 */

// Import the configured Supabase client
const { supabase } = require("../db/supabase.js");
const bcrypt = require("bcrypt");

/**
 * checkExistingEmail - Check if email already exists in database
 *
 * USED FOR: Registration form to prevent duplicate accounts
 * @param {string} email - Email address to check
 * @returns {array} Array of user records (empty if email not registered)
 */
module.exports.checkExistingEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email);

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * signUp - Register new user account
 *
 * FLOW:
 * 1. Hash password using bcrypt (12 rounds for security)
 * 2. Insert user record with hashed password 
 * 3. Fetch and return the newly created user record
 *
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} birthDate - User's birthdate
 * @param {string} zipCode - User's zip code
 * @param {string} country - User's country
 * @param {string} phoneNumber - User's phone number
 * @param {string} email - User's email address (should be unique)
 * @param {string} password - Plain text password (will be hashed)
 * @returns {object} New user object
 */
module.exports.signUp = async (
  firstName,
  lastName,
  birthDate,
  zipCode,
  country,
  phoneNumber,
  email,
  password,
) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert user and return the inserted row immediately using .select()
    const { data, error } = await supabase
      .from('user')
      .insert([
        {
          firstName,
          lastName,
          birthDate,
          zipCode,
          country,
          phoneNumber,
          email,
          password: hashedPassword,
        }
      ])
      .select()
      .single(); // Returns an object instead of an array

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * login - Authenticate user and return user data if credentials valid
 *
 * FLOW:
 * 1. Query database for user with matching email
 * 2. If user not found, return false immediately
 * 3. If user found, compare provided password with stored hash using bcrypt
 * 4. If password matches, remove password field and return user object
 * 5. If password doesn't match, return false
 *
 * @param {string} email - User's email address
 * @param {string} password - Plain text password to verify
 * @returns {object|false} User object if credentials valid, false otherwise
 */
module.exports.login = async (email, password) => {
  try {
    // Query user by email
    const { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .maybeSingle(); // Returns null safely instead of throwing an error if not found

    // If no user with this email exists, return false immediately
    if (error || !user) {
      return false;
    }

    /**
     * Compare provided password with stored hash
     * bcrypt.compare handles the hash comparison securely
     * Returns boolean: true if match, false if no match
     */
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      // Password is correct - remove sensitive data before returning
      delete user.password;
      return user;
    }

    // Password is incorrect
    return false;
  } catch (error) {
    // Log internal errors without exposing to client
    console.error("Database error during login:", error);
    throw error;
  }
};