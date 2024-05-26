const categoryService = require("../service/category.service.js");

/* Call the create method of categoryService object and return the result back*/
exports.create = (newCategory, result) => {
    categoryService.create(newCategory, result)
};

/* Call the getAll method of categoryService object and return the result back */
exports.findAll = (name, result) => {
    categoryService.getAll(name, result) 
};

/* Call the findById method of categoryService object and return the result back */
exports.findOne = (id, result) => {
    categoryService.findById(id, result)
};

/* Call the updateById method of categoryService object and return the result back */
exports.update = (id, category, result)=> {
    categoryService.updateById(id, category, result)
};

/* Call the remove method of categoryService object and return the result back */
exports.delete = (id, result)=>{
    categoryService.remove(id, result) 
};

/* Call the removeAll method of categoryService object and return the result back */
exports.deleteAll = (result) => {
    categoryService.removeAll(result)
};