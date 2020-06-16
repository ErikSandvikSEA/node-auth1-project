exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const jobTitles = [
    {
      name: "CEO", // will get id 1
    },
    {
      name: "CFO", // will get id 2
    },
    {
      name: "Controller",
    },
    {
      name: "VP of Sales", 
    },
    {
      name: "VP of Finance", 
    },
    {
      name: "CTO", 
    },
    {
      name: "Business Director", 
    },
    {
      name: "Commercial Leader", 
    },
    {
      name: "Commercial Lead", 
    },
    {
      name: "Operations Lead",
    },
    {
      name: "Commercial Intern", 
    }
  ];

  return knex("jobTitle")
    .insert(jobTitles)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
