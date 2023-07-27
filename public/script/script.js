$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;
  
      trigger.click(function () {
        hamburger_cross();      
      });
  
      function hamburger_cross() {
  
        if (isClosed == true) {          
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {   
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
    }
    
    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });  
  });

// servers
const express = require('express');
const path = require('path');
const app = express();

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// app.get('/', (req, res) => {
//     res.send('home page');
// });

// app.get('/about', (req, res) => {
//     res.send('About us');
// });


app.get('/', (req, res) => {
   res.sendFile(path.join (__dirname,"index.html")); 
})

app.get('/about',(req, res) => {
    res.sendFile(path.join(__dirname,"about.html"));
})

app.get('/services',(req,res) => {
    res.sendFile(path.join(__dirname,"services.html"));
})

app.get('/hello', (req,res) => {
    res.render('hello.pug');
})
app.listen(3000, ()=>console.log('listening on port 3000'));

