/**
 * Module handles database management
 *
 * Server API calls the methods in here to query and update the SQLite database
 */

// Initialize the database
const dbFile = "./.data/master.db";
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;
    try {
    } catch (dbError) {
      console.error(dbError);
    }
  });
// Our server script will call these methods to connect to the db
module.exports = {

  getFood: async () => {
    // We use a try catch block in case of db errors
    try {
      return await db.all("SELECT price_adult, price_child FROM m_food LIMIT 1");
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },

  getCar: async kind => {
    // We use a try catch block in case of db errors
    try {
        return await db.all("SELECT * FROM m_car WHERE kind = ? ORDER BY CAST(upper_limit AS INTEGER) ASC", kind);
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },

  getHotel: async level => {
    // We use a try catch block in case of db errors
    try {
        return await db.all("SELECT price_adult, price_child FROM m_hotel WHERE level = ?", level);
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },

  getProject: async id => {
    // We use a try catch block in case of db errors
    try {
      if (id) {
        return await db.all("SELECT price_adult, price_child FROM m_project WHERE id = ?", id);
      }
      else {
        return await db.all("SELECT id, name FROM m_project");
      }
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },

  getTicket: async id => {
    // We use a try catch block in case of db errors
    try {
      if (id) {
        return await db.all("SELECT price_adult, price_child from m_ticket where id = ?", id);
      }
      else {
        return await db.all("SELECT id, name from m_ticket");
      }
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },

  /**
   * Process a user vote
   *
   * Receive the user vote string from server
   * Add a log entry
   * Find and update the chosen option
   * Return the updated list of votes
   */
  processVote: async vote => {
    // Insert new Log table entry indicating the user choice and timestamp
    try {
      // Check the vote is valid
      const option = await db.all(
        "SELECT * from Choices WHERE language = ?",
        vote
      );
      if (option.length > 0) {
        // Build the user data from the front-end and the current time into the sql query
        await db.run("INSERT INTO Log (choice, time) VALUES (?, ?)", [
          vote,
          new Date().toISOString()
        ]);

        // Update the number of times the choice has been picked by adding one to it
        await db.run(
          "UPDATE Choices SET picks = picks + 1 WHERE language = ?",
          vote
        );
      }

      // Return the choices so far - page will build these into a chart
      return await db.all("SELECT * from Choices");
    } catch (dbError) {
      console.error(dbError);
    }
  },

  /**
   * Get logs
   *
   * Return choice and time fields from all records in the Log table
   */
  getLogs: async () => {
    // Return most recent 20
    try {
      // Return the array of log entries to admin page
      return await db.all("SELECT * from Log ORDER BY time DESC LIMIT 20");
    } catch (dbError) {
      console.error(dbError);
    }
  },

  /**
   * Clear logs and reset votes
   *
   * Destroy everything in Log table
   * Reset votes in Choices table to zero
   */
  clearHistory: async () => {
    try {
      // Delete the logs
      await db.run("DELETE from Log");

      // Reset the vote numbers
      await db.run("UPDATE Choices SET picks = 0");

      // Return empty array
      return [];
    } catch (dbError) {
      console.error(dbError);
    }
  }
};
