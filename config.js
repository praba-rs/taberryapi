const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    connectionLimit : 10, 
    host: "localhost",
	  port: '3306' ,
    user: "praba",
    password: "data1234",
    database: "tablematnjs",
  },
};
module.exports = config;

