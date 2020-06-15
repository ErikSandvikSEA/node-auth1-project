exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      //id: 1
      username: 'Saul Greenburg',
      password: '123ABC',
      jobTitle_id: 1,
      jobTitle_name: 'CEO'
    },
    {
      //id: 2
      username: 'Thad Scheister',
      password: 'NONONO',
      jobTitle_id: 2,
      jobTitle_name: 'CFO'
    },
    {
      //id: 3
      username: 'Chuck Johnson',
      password: 'ControlEveryThing1!',
      jobTitle_id: 3,
      jobTitle_name: 'Controller'
    },
    {
      //id: 4
      username: 'Allison Huntington-Beech',
      password: 'BurnTheMidnightOil',
      jobTitle_id: 4,
      jobTitle_name: 'VP of Sales'
    },
    {
      //id: 5
      username: 'John Checkers',
      password: 'PearlJam1993',
      jobTitle_id: 5,
      jobTitle_name: 'VP of Finance'
    },
    {
      //id: 6
      username: 'Ankur Malleswari',
      password: '010101',
      jobTitle_id: 6,
      jobTitle_name: 'CTO'
    },
    {
      //id: 7
      username: 'Ricardo Rocatti',
      password: 'BomDia',
      jobTitle_id: 7,
      jobTitle_name: 'Business Director'
    },
    {
      //id: 8
      username: 'Jennifer Kerry-Seleck',
      password: 'Ingredientz',
      jobTitle_id: 8,
      jobTitle_name: 'Commercial Leader'
    },
    {
      //id: 9
      username: 'Karsten Swashbuck',
      password: 'DontLoseSleep',
      jobTitle_id: 9,
      jobTitle_name: 'Commercial Lead'
    },
    {
      //id: 10
      username: 'Jock Mickey',
      password: 'LetsParty',
      jobTitle_id: 10,
      jobTitle_name: 'Operations Lead'
    },
    {
      //id: 1
      username: 'Gary Xi',
      password: 'XtraFre$h',
      jobTitle_id: 11,
      jobTitle_name: 'Commercial Intern'
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
