
exports.up = function(knex) {
  return knex.schema
    .createTable('employee_type',(table)=>{
        table.increments('id');
        table.string('name');
        table.integer('level');
    })
    .alterTable('restaurant_employee',(table)=>{
        table.integer('role').unsigned().references('id').inTable('employee_type')
    })
    .then(()=>{
        return knex('employee_type').insert({
            id:1,
            name:'Manager',
            level: 1,
        })  
    })
    .then(()=>{
        return knex('employee_type').insert({
            id:2,
            name:'Assistant Manager',
            level: 2,
        })  
    })
    .then(()=>{
        return knex('employee_type').insert({
            id:3,
            name:'Head Chef',
            level:3
        })
    .then(()=>{
        return knex('employee_type').insert({
            id:4,
            name:'Cashier',
            level:4
        })
    })
    .then(()=>{
        return knex('employee_type').insert({
            id:5,
            name:'Waiter',
            level:5
        })
    })
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('employee_type')
};
