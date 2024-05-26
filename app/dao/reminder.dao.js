const connection = require('./db');
sql = connection();

/* constructor to initialize reminder with reminder_name, reminder_description and
reminder_creation_date as its properties*/

const Reminder = function(reminder){
  this.reminder_name = reminder.reminder_name;
  this.reminder_description = reminder.reminder_description;
  this.reminder_creation_date = reminder.reminder_creation_date;
};


/* 
  create should be a function that calls the query function on sql object
  to persist reminder data in MySQL notesdb schema using insert query
*/

Reminder.create = (newReminder, result) => {
  sql.query("INSERT INTO reminder SET ?", newReminder, (err, res) => {
    if (err) {
      console.error("Error creating reminder: ", err);
      result(err, null);
      return;
    }
    console.log("Reminder created: ", { id: res.insertId, ...newReminder });
    result(null, { id: res.insertId, ...newReminder });
  });
};


/* 
  findById should be a function that calls the query function on sql object 
  to fetch the reminder by the provided Id from the notesdb schema using select query
*/

Reminder.findById = (reminderId, result) => {
  sql.query("SELECT * FROM reminder WHERE reminder_id = ?", reminderId, (err, res) => {
    if (err) {
      console.error("Error finding reminder by ID: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Reminder found: ", res[0]);
      result(null, res[0]);
      return;
    }
    // Reminder with the specified ID not found
    result({ kind: "not_found" }, null);
  });
};


/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the reminders or reminders with specific title from the notesdb 
  schema using select query
*/

Reminder.getAll = (name, result) => {
  let sqlQuery = "SELECT * FROM Reminder";
  if (name) {
    sqlQuery += " WHERE reminder_name = ?";
  }
  sql.query(sqlQuery, name, (err, res) => {
    if (err) {
      console.error("Error fetching reminders: ", err);
      result(err, null);
      return;
    }
    console.log("Fetched reminders: ", res);
    result(null, res);
  });
};
/* 
  updateById should be a function that calls query function on sql object 
  to update the reminder for the given id from the notesdb schema using update query
*/

Reminder.updateById = (reminderId, updatedReminder, result) => {
  sql.query(
    "UPDATE Reminder SET reminder_name = ?, reminder_description = ?, reminder_creation_date = ? WHERE reminder_id = ?",
    [updatedReminder.reminder_name, updatedReminder.reminder_description, updatedReminder.reminder_creation_date, reminderId],
    (err, res) => {
      if (err) {
        console.error("Error updating reminder: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // If no rows were affected, it means the reminder with the given ID was not found
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Reminder updated: ", { id: reminderId, ...updatedReminder });
      result(null, { id: reminderId, ...updatedReminder });
    }
  );
};
/* 
  remove should be a function that calls query function on sql object 
  to delete the reminder for the given id from the notesdb schema using delete query
*/
Reminder.remove = (reminderId, result) => {
  sql.query("DELETE FROM Reminder WHERE reminder_id = ?", reminderId, (err, res) => {
    if (err) {
      console.error("Error deleting reminder: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // If no rows were affected, it means the reminder with the given ID was not found
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Reminder deleted with ID: ", reminderId);
    result(null, res);
  });
}

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the reminders from the notesdb schema using delete query
*/
Reminder.removeAll = (result) => {
  sql.query("DELETE FROM Reminder", (err, res) => {
    if (err) {
      console.error("Error deleting reminders: ", err);
      result(err, null);
      return;
    }
    console.log("All reminders deleted");
    result(null, res);
  });
};

module.exports = Reminder;
