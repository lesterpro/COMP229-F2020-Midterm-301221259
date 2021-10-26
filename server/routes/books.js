/*
Class: COMP229 – Web Application Development
File: add.ejs
Author: YuKit Tam
StudentID: 301221259
WebApp Name: Mid-Term Test
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    // jump to add book page
     res.render('books/details', {
      title: 'Add Book'
    });
});



// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    //init a book object base on the form input 
     let newBook = book({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
     });


    //create the book object in db
    book.create(newBook, (err, book) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
        //back to book list page
          res.redirect('../books');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  //Get the book id from the previous page
  let id = req.params.id;

  //load the book object from db base on the bookid
  book.findById(id, (err, bookToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view, send the book object to the edit page
          res.render('books/details', 
          {title: 'Edit Book', 
          books: bookToEdit
          });      

      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    //Get the book id from the previous page
     let id = req.params.id

     //create a book object base on the req.body 
     let updatedBook = book({
         "_id": id,
         "Title": req.body.title,
         "Description": req.body.description,
         "Price": req.body.price,
         "Author": req.body.author,
         "Genre": req.body.genre
     });
 
     //update db with the id and details
     book.updateOne({_id: id}, updatedBook, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the contact list
             res.redirect('/books');
         }
     });



});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    //Get the book id from the previous page
     let id = req.params.id;

     //delete the book object in db, base on the id
     book.remove({_id: id}, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
              // refresh the contact list
              res.redirect('/books');
 
         }
     });


});


module.exports = router;
