
exports.up = function(knex) {
  return knex.schema
    .createTable('restaurant_employee',(table)=>{
        table.integer('restaurant_id').unsigned().references('id').inTable('Restaurants').onDelete('CASCADE');
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('restaurant_employee');
};
