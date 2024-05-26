const reminderService = require("../service/reminder.service.js");

/* Call the create method of reminderService object and return the result back*/
exports.create = (newReminder, result) => {
    reminderService.create(newReminder, result)
};

/* Call the getAll method of reminderService object  and return the result back*/
exports.findAll = (name, result) => {
    reminderService.getAll(name, result) 
};;

/* Call the findById method of reminderService object  and return the result back*/
exports.findOne = (id, result) => {
    reminderService.findById(id, result)
};;

/* Call the updateById method of reminderService object  and return the result back*/
exports.update = (id, reminder, result)=> {
    reminderService.updateById(id, reminder, result)
};
;

/* Call the remove method of reminderService object  and return the result back*/
exports.delete = (id, result)=>{
    reminderService.remove(id, result) 
};;

/* Call the removeAll method of reminderService object  and return the result back*/
exports.deleteAll = (result) => {
    noteService.removeAll(result)
};;
