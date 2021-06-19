
exports.up = function(knex) {
    return knex.schema.alterTable('restaurants', table => {
        table.boolean('verified').defaultTo(0) ;
        table.string('status').defaultTo('unsent');
      })
};

exports.down = function(knex) {
    return knex.schema.alterTable('restaurants', table => {
        table.dropColumn('verified');
        table.dropColumn('status');
      })
};
