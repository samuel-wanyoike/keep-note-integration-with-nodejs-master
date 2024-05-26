const connection  = require('./db');
sql = connection();

/* constructor to initialize category with category_name, category_description 
and category_creation_date as its properties*/

const Category = function(cateory){
  this.category_name = category.category_name;
  this.category_description = category.category_description;
  this.category__creation_date = cateory.category__creation_date
};

/* 
  create should be a function that calls the query function on sql object
  to persist category data in MySQL notesdb schema using insert query
*/

Category.create = (newCategory, result) => {
  sql.query('INSERT INTO category SET ?', newCategory, (err, res)=> {
    if(err){
      console.error('error creating category: ', err);
      result(err, null);
      return;
    }
    console.log('category created: ', {id: res.insertId, ...newCategory});
    result(null, {id: res.insertId, ...newCategory });
  });
};


/* 
  findById should be a function that calls the query function on sql object 
  to fetch the category by the provided Id from the notesdb schema using select query
*/

Category.findById = (categoryId, result) => {
  sql.query("SELECT * FROM Category WHERE category_id = ?", categoryId, (err, res) => {
    if (err) {
      console.error("Error finding category by ID: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Category found: ", res[0]);
      result(null, res[0]);
      return;
    }
    // Category with the specified ID not found
    result({ kind: "not_found" }, null);
  });
};

/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the categories or categories with specific name from the notesdb 
  schema using select query
*/

Category.getAll = (name, result) => {
  let sqlQuery = 'SELECT * FROM category';
  if(name){
    sqlQuery += 'WHERE category_name = ?';
  }
  sql.query(sqlQuery, name, (err, res)=> {
    if(err){
      console.error('error fetching categories:',err);
      result(err, null);
      return;
    }
    console.log('fetched categories: ', res);
    result(null, res);
  });
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the category for the given id from the notesdb schema using update query
*/

Category.updateById = (categoryId, updatedCategory, result) => {
  sql.query(
    'UPDATE category SET category_name = ?, category_description = ?, category_creation_date = ? WHERE category_id = ?',
    [updatedCategory.category_name, updatedCategory.category_description, updatedCategory.category_creation_date, categoryId],
    (err, res) => {
      if (err) {
        console.error('error updating category: ', err);
        result(err, null);
        return;
      }
      if(res.affectedRows == 0){
        result({kind: 'not_found'}, null);
        return;
      }
      console.log('category updated: ', {id: categoryId, ...updatgedCategory});
      result(null, {id: categoryId, ...updatedCategory})
    }
  )
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the category for the given id from the notesdb schema using delete query
*/
Category.remove = (categoryId, result) => {
  sql.query("DELETE FROM category WHERE category_id = ?", categoryId, (err, res) => {
    if (err) {
      console.error("Error deleting category: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // If no rows were affected, it means the category with the given ID was not found
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Category deleted with ID: ", categoryId);
    result(null, res);
  });
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the categories from the notesdb schema using delete query
*/

Category.removeAll = (result) => {
  sql.query('DELETE FROM category', (err,res) => {
    if(err) {
      console.error('error deleting categories: ', err);
      result(err, null);
      return; 
    }
    console.log('All categories deleted');
    result(null, res);
  })
  
};

module.exports = Category;
