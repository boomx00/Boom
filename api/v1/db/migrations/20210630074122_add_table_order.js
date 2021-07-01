const TableController = require("../../controllers/TableController");

exports.up = function(knex) {
  return knex.schema
    .alterTable('orders',(table)=>{
        table.integer('restaurant_id').unsigned().references('id').inTable('restaurants').onDelete('CASCADE');
        table.integer('table_id').unsigned().references('id').inTable('tables').onDelete('CASCADE');
        table.boolean('status').defaultTo(0);
        table.integer('total')
    })
    .alterTable('order_details',(table)=>{
        table.integer('table_id').unsigned().references('id').inTable('tables').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema  
        .alterTable('orders',(table)=>{
            table.dropForeign('restaurant_id');
            table.dropForeign('table_id');
            table.dropColumn('restaurant_id');
            table.dropColumn('table_id');
            table.dropColumn('status');
            table.dropColumn('total');  
        })
        .alterTable('order_details',(table)=>{
            table.dropForeign('table_id');
            table.dropColumn('table_id');
        })
};


