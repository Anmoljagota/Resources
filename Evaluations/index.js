const http = require("http");
const fs = require("fs");
const cowsay = require("cowsay");
const readTerminal = process.argv[2];
const dns = require("dns");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeaders("Content-Type", "text/html");
    res.end("<h1>WELCOME TO EMPLOYEE MANAGEMENT SYSTEM</h1>");
  } else if (req.url === "/writeinfile") {
    fs.writeFile("employee.txt", "Employee names are as follows:", (err) => {
      if (err) {
        res.end("Error in writing to file");
      } else {
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Data has been written in the file</h1>");
      }
    });
  } else if (req.url == "/enternames") {
    let arr = ["Aman", "Albert", "Varun", "Rajat", "Nrupul"];
    arr.forEach((element) => {
      fs.appendFile("employee.txt", element + "\n", (err) => {
        if (err) {
          res.end(err);
        } else {
          res.end("All the names added in the file");
        }
      });
    });
  } else if (req.url === "/alldetails") {
    fs.readFile("employee.txt", "utf-8", (err, data) => {
      if (err) {
        res.end(err);
      } else {
        // console.log(cowsay.say({ text: data }));
        res.end(cowsay.say({ text: data }));
      }
    });
  } else if (req.url === "/address") {
    dns.lookup(readTerminal, (err, addresses) => {
      if (err) {
        res.end(err);
      } else {
        res.end("The IP Address is " + addresses);
      }
    });
  } else if (req.url === "/delete") {
    fs.unlink("employee.txt", (err) => {
      if (err) {
        res.end(err);
      } else {
        res.end("<h1>File has been deleted</h1>");
      }
    });
  } else {
    res.end("invalid endpoint");
  }
});

server.listen(3000, (err, listen) => {
  if (err) {
    console.log("error in starting the server");
  } else {
    console.log("server is running on port 3000");
  }
});
