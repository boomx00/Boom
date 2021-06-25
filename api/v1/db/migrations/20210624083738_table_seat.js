
exports.up = function(knex) {
  return knex.schema
    .alterTable('tables',(table)=>{
        table.integer('amount');
        table.boolean('usable');
        table.boolean('used');
        table.boolean('reserved');
    })
};

exports.down = function(knex) {
    return knex.schema
        .alterTable('tables',(table)=>{
            table.dropColumn('amount');
            table.dropColumn('usable');
            table.dropColumn('used');
            table.dropColumn('reserved');
        })
  
};
