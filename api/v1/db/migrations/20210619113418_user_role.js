
exports.up = function (knex) {
    return knex.schema
        .createTable('role_types', (table) => {
            table.increments('id');
            table.string('name');
            table.integer('level');
        })
        .createTable('user_roles', (table) => {
            table.integer('user_id').unsigned().references('id').inTable('users');
            table.integer('type_id').unsigned().references('id').inTable('role_types').defaultTo('1');
        })
        .then(() => {
            return knex('role_types').insert({
                id: 1,
                name: 'Customer',
                level: 1
            })
        })
        .then(() => {
            return knex('role_types').insert({
                id: 2,
                name: 'Restaurant Staff',
                level: 2
            })
        })
        .then(() => {
            return knex('role_types').insert({
                id: 3,
                name: 'Restaurant Owner',
                level: 3
            })
        })
        .then(() => {
            return knex('role_types').insert({
                id: 4,
                name: 'Admin',
                level: 4
            })
        })
        .then(()=>{
            return knex('role_types').insert({
                id: 5,
                name:'Restaurant Manager',
                level: 5
            })
        })

};

exports.down = function (knex) {
    return knex.schema
    .dropTable('role_types')
    .dropTable('user_roles')
};
