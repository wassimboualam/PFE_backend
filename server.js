const con = require("./config/connect");

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SHOW TABLES", function (err,result,fields) {
    console.log(result);
    console.log(fields);
  });
});
