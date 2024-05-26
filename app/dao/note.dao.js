const connection  = require('./db');

/*
variable to store connection object to perform CRUD operations using connection module
*/
var sql = connection;

/* constructor to initialize note with note_title, note_content, note_status,
 note_creation_date,note_id and reminder_id  as its properties*/
const Note = function(note) {
  this.note_title = note.note_title;
  this.note_content = note.note_content;
  this.note_status = note.note_status;
  this.note_creation_date = note.note_creation_date;
  this.note_id = note.note_id;
  this.reminder_id = note.reminder_id;
};

/* 
  create should be a function that calls the query function on sql object to persist note 
  data in MySQL notesdb schema using insert query. Write separate insert queries to insert row
  in Note, NoteCategory and NoteReminder tables
*/

Note.create = (newNote, result) => {
  sql.query('INSERT INTO note (note_title, note_content, note_status) VALUES(?, ?, ?)',
[newNote.note_title, newNote.note_content, newNote.note_status],
(err, res) => {
  if(err) {
    console.error('Error inserting note: ', err);
    result(err, null);
    return;
  }

  console.log('Note added: ', {id: res.insertId, ...newNote});
  const noteId = res.insertId;

  result(null, {id: noteId, ...newNote});
} 
);

sql.query(
  'INSERT INTO notecategory (note_id, category_id) VALUES (?, ?)',
  [noteId, newNote.category_id],
  (err, res) => {
    if(err) {
      console.error('Error inserting into notecategory:', err);
      result(err, null);
      return;
    }
    console.log('Notecategory added: ', {note_id: noteId, category_id: newNote.category_id})
  }
);

sql.query(
  'INSERT INTO notereminder (note_id, reminder_id) VALUES (?, ?)',
  [noteId, newNote.reminder_id],
  (err, res) => {
    if(err){
      console.error('error inserting into notereminder', err);
      result(err, null);
      return
    }
    console.log('notereminder added: ', {note_id: noteId, reminder_id: newNote.reminder_id})
  } 
)
};


/* 
  findById should be a function that calls the query function on sql object 
  to fetch the note by the provided Id from the notesdb schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables
*/

Note.findById = (noteId, result) => {
  sql.query(
    'SELECT n.*, nc.category_id, nr.reminder_id FROM note n '+
    'LEFT JOIN notecategory nc ON n.note_id = nc.note_id'+
    'LEFT JOIN notereminder nr ON n.note_id = nr.note_id'+
    'WHERE n.note_id = ?',
    noteId,
    (err, res)=> {
      if(err){
        console.error('error finding note by ID:', err);
        result(err, null);
        return;
      }

      if(res.length){
        console.log('found note: ', res[0]);
        result(null, res[0]);
        return;
      }

      result({kind: 'not_found'}, null);
    }
  )
};


/* 
  getAll should be a function that calls the query function on sql object to fetch all 
  the notes or notes with specific title from the notesdb   schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables.
*/

Note.getAll = (title, reuslt) => {
  let sqlQuery = 'SELECT n.* nc.category_id, nr.reminder_id FROM note n '+
  'LEFT JOIN notecategory nc ON n.note_id = nc.note_id'+
  'LEFT JOIN notereminder nr ON  n.note_id = nr.note_id';

  if(title){
    sqlQuery += 'WHERE n.note_title = ?';
  }

  sql.query(sqlQuery, title, (err, res) => {
    if(err){
      console.error('error fetching notes', err);
      result(err, null);
      return;
    }

    console.log('fetched notes: ', res);
    result(null, res);
  })
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the note for the given id from the notesdb schema using update query
*/

Note.updateById = (noteId, updateNote, result) => {
  sql.query(
    'UPDATE note SET note_title = ?, note_content = ?, note_status = ? WHERE note_id =?',
    [updateNote.note_title, updateNote.note_content, updateNote.note_status, noteId],
    (err, res) => {
      if(err){
        console.error('error updating note: ', err);
        result(err, null);
        return;
      }

      if(res.affectedRows == 0){
        result({kind: 'not_found'}, null);
        return;
      }

      console.log('note updated: ', {id: noteId, ...updateNote}) 
    }
  )
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the note for the given id from the notesdb schema using delete query
*/
Note.remove = (noteId, result) => {
  sql.query(
    'DELETE FROM note WHERE  note_id = ?',
    noteId,
    (err, res) => {
      if (err) {
        console.error('error deleting note: ', err);
        result(err, null);
        return;
      }
      if(res.affectedRows == 0) {
        result({kind: 'not_found'}, null);
        return;
      }

      console.log('Note deleting with ID: ', noteId);
      result(null, res);
    }

  )
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the notes from the notesdb schema using delete query
*/
Note.removeAll = (result) => {
  sql.query( 'DELETE FROM note',
    (err, res)=> {
      if(err){
        console.error('error deleting notes: ', err);
        result(err, null);
        return;
      }

      console.log('all notes deleted');
      result(null, res);
    }
  )
};

module.exports = Note;
