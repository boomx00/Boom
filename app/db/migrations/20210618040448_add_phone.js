
exports.up = function(knex) {
    return knex.schema.alterTable('user_profiles', table => {
        table.string('phone');
      })
};

exports.down = function(knex) {
    return knex.schema.alterTable('user_profiles', table => {
        table.string('phone');
      })
};
