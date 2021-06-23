
exports.up = function(knex) {
  return knex.schema
    .alterTable('reservations',(table)=>{
        table.integer('people');
        table.string('status').defaultTo('review');
    })
};

exports.down = function(knex) {
  return knex.schema
    .alterTable('reservations',(table)=>{
      table.dropColumn('people');
      table.dropColumn('status');
    })
};
