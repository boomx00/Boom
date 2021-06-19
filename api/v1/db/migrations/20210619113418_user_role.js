
exports.up = function (knex) {
    return knex.schema
        .createTable('role_types', (table) => {
            table.integer('id').primary();
            table.string('name');
            table.integer('level');
        })
        .createTable('user_roles', (table) => {
            table.integer('user_id').reference('id').inTable('users');
            table.integer('type_id').reference('id').inTable('role_types');
        })
        .then(() => {
            return knex('role_types').insert({
                id: 0,
                name: 'Customer',
                level: 0
            })
        })
        .then(() => {
            return knex('role_types').insert({
                id: 1,
                name: 'Restaurant Staff',
                level: 1
            })
        })
        .then(() => {
            return knex('role_types').insert({
                id: 2,
                name: 'Restaurant Owner',
                level: 2
            })
        })
        .then(() => {
            return knex('role_types').insert({
                id: 5,
                name: 'Admin',
                level: 5
            })
        })

};

exports.down = function (knex) {

};
