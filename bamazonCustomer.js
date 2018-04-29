var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function (error) {


  if (error) throw error;
  //console.log('conected as id: ' + connection.threadId);

  connection.query('SELECT * FROM products', function (error, res) {
    if (error) throw error;
    console.log(res);

    buyItem()

    //connection.end();
  });

});
function buyItem() {
  // query the database for all items being auctioned
  connection.query("SELECT product_name FROM products", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to purchase?"
        },
        {
          name: "order",
          type: "input",
          message: "How many would you like to buy?"
        }
      ]).then(function (answer) {
        // get the information of the chosen item
        //console.log(answer.choice)
        //console.log( answer.order)
        var choice = answer.choice;
        var order = answer.order;
        //console.log(choice)
        console.log(order)
        connection.query('SELECT stock_quantity FROM products WHERE product_name=?', [choice], function (err, res) {
          //console.log(JSON.stringify(res[0].stock_quantity))
          var quantity = JSON.stringify(res[0].stock_quantity)
          //console.log(quantity)
          var updated = quantity - order;

          // var orderTotal= quantity * price
          console.log(updated)
          connection.query('UPDATE products SET stock_quantity=? WHERE product_name=?', [updated, choice],function(err, res)
          {console.log(res.affectedRows)})
          
          if (order > quantity) {
            console.log("Insufficient quantity! Please try another order")
            buyItem();
          }
          else if (order <= quantity) {
            connection.query('SELECT price FROM products WHERE product_name=?', [choice], function (err, results2) {
              console.log(JSON.stringify(results2[0].price))
              var price = JSON.stringify(results2[0].price)
              var orderTotal = order * price
              console.log("Your total for this order is: " + orderTotal);
            })

          }

          // console.log(res)

        });
        //  buyItem();

      });
  });
}



