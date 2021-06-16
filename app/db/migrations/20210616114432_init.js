
exports.up = function (knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id');
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.timestamps(true, true);
        })
        .createTable('user_profiles', (table) => {
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('id').inTable('users').onDelete("CASCADE");
            table.string('first_name')
            table.string('last_name')
        })
        .createTable('restaurants', (table) => {
            table.increments('id');
            table.string('name');
            table.string('address');
            table.string('logo_url');
        })
        .createTable('tables', (table) => {
            table.increments('id');
            table.integer('restaurant_id').unsigned();
            table.foreign('restaurant_id').references('id').inTable('restaurants').onDelete("CASCADE");
            table.integer('table_number').notNullable();
        })
        .createTable('menus', (table) => {
            table.increments('id')
            table.integer('restaurant_id').unsigned();
            table.foreign('restaurant_id').references('id').inTable('restaurants').onDelete("CASCADE");
            table.string('name').notNullable();
            table.string('description');
            table.string('img_url');
            table.timestamps(true, true);
        })
        .createTable('reservations', (table) => {
            table.increments('id');
            table.integer('restaurant_id').unsigned();
            table.foreign('restaurant_id').references('id').inTable('restaurants').onDelete("CASCADE");
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('id').inTable('users').onDelete("CASCADE");
            table.integer('table_id').unsigned();
            table.foreign('table_id').references('id').inTable('tables').onDelete("CASCADE");
            table.date('reservation_date').notNullable();
            table.integer('reservation_time').notNullable();
        })
        .createTable('orders', (table) => {
            table.increments('id')
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('id').inTable('users').onDelete("CASCADE");
            table.timestamps(true, true);
        })
        .createTable('order_details', (table) => {
            table.integer('order_id').unsigned();
            table.foreign('order_id').references('id').inTable('orders').onDelete("CASCADE");
            table.integer('restaurant_id').unsigned();
            table.foreign('restaurant_id').references('id').inTable('restaurants').onDelete("CASCADE");
            table.integer('menu_id').unsigned()
            table.foreign('menu_id').references('id').inTable('menus').onDelete("CASCADE");
            table.integer('quantity').notNullable();
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTable('user_profiles')
        .dropTable('order_details')
        .dropTable('orders')
        .dropTable('reservations')
        .dropTable('tables')
        .dropTable('menus')
        .dropTable('users')
        .dropTable('restaurants')
};
