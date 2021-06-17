
exports.up = function(knex) {
    return knex.schema.alterTable('users', table => {
        table.string('name');
        table.string('phone');
      })
    
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('name');
        table.dropColumn('phone');
      })
};
