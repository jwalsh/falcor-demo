// index.js
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');

var express = require('express');
var app = express();

var fs = require('fs');

var Food = function(name, description, rank) {
  this.name = name;
  this.description = description;
  this.rank = (new Date()).getTime() % 10;
};

var User = function(name) {
  this.name = name;
};

var food = [];
var foodList = fs.readFileSync('data/food.txt', 'utf8')
      .split(/\r?\n/)
      .filter(function(n) {
        return n;
      });

var foodTimer = setInterval(function() {
  var name = foodList.pop();
  food.push(new Food(name, name, 10));
}, 1000);

app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new Router([
    {
      route: 'greeting',
      get: function() {
        console.log('get greeting');
        return {path: ['greeting'], value: 'Falcor'};
      }
    },
    {
      route: 'food',
      get: function() {
        console.log('get food');
        return {path: ['food'], value: food};
      }
    },
    {
      route: 'dairy',
      get: function() {
        console.log('get dairy');
        return {path: ['food', 'dairy'], value: food};
      }
    }
  ]);
}));

// serve static files from current directory
app.use(express.static(__dirname + '/'));

var server = app.listen(3000);
console.log('Express running...');
