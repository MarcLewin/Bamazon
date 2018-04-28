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
       //start()
       buyItem()
        //connection.end();
    });

});

function start(){


}

function buyItem() {
    // query the database for all items being auctioned
    connection.query("SELECT product_name FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
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
        ])
    
        .then(function(answer) {
          // get the information of the chosen item
          console.log(answer.choice)
         console.log( parseInt(answer.order))
        //   var chosenItem;
        //   for (var i = 0; i < results.length; i++) {
        //     if (results[i].product_name === answer.choice) {
        //       chosenItem = results[i];
        //     }
        //   }
        });
    });
  }
  
        //   // determine if bid was high enough
        //   if (chosenItem.highest_bid < parseInt(answer.bid)) {
        //     // bid was high enough, so update db, let the user know, and start over
        //     connection.query(
        //       "UPDATE auctions SET ? WHERE ?",
        //       [
        //         {
        //           highest_bid: answer.bid
        //         },
        //         {
        //           id: chosenItem.id
        //         }
        //       ],
        //       function(error) {
        //         if (error) throw err;
        //         console.log("Bid placed successfully!");
        //         start();
        //       }
        //     );
        //   }
        //   else {
        //     // bid wasn't high enough, so apologize and start over
        //     console.log("Your bid was too low. Try again...");
        //     start();
        //   }

//were part of the entire bid function
        //         });
//     });
//   }