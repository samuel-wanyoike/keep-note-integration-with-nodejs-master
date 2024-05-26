const noteService = require("../service/note.service.js");

/* Call the create method of noteService object and return the result back*/
exports.create = (newNote, result) => {
    noteService.create(newNote, result)
};
;

/* Call the getAll method of noteService object and return the result back */
exports.findAll = (title, result) => {
    noteService.getAll(title, result) 
};;

/* Call the findById method of noteService object and return the result back */
exports.findOne = (id, result) => {
    noteService.findById(id, result)
};;

/* Call the updateById method of noteService object and return the result back */
exports.update = (id, note, result)=> {
    noteService.updateById(id, note, result)
};
;

/* Call the remove method of noteService object and return the result back */
exports.delete = (id, result)=>{
    noteService.remove(id, result) 
};;

/* Call the removeAll method of noteService object and return the result back */
exports.deleteAll = (result) => {
    noteService.removeAll(result)
};
