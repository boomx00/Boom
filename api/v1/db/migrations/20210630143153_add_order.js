
exports.up = function(knex) {
  return knex.schema
    .createTable('new_orders',(table)=>{
            table.integer('order_id').unsigned();
            table.foreign('order_id').references('id').inTable('orders').onDelete("CASCADE");
            table.integer('restaurant_id').unsigned();
            table.foreign('restaurant_id').references('id').inTable('restaurants').onDelete("CASCADE");
            table.integer('menu_id').unsigned()
            table.foreign('menu_id').references('id').inTable('menus').onDelete("CASCADE");
            table.integer('quantity').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('new_orders')
};
