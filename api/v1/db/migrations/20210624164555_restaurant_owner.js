
exports.up = function(knex) {
  return knex.schema
    .alterTable('restaurants',(table)=>{
        table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    })
  
};

exports.down = function(knex) {
  return knex.schema   
    .alterTable('restaurants',(table)=>{
        table.dropColumn('owner_id');
    })
};
