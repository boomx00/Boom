
exports.up = function(knex) {
    return knex.schema.alterTable('restaurants', table => {
        table.boolean('verified').defaultTo(0) ;
      })
};

exports.down = function(knex) {
    return knex.schema.alterTable('restaurants', table => {
        table.dropColumn('verified');
      })
};
