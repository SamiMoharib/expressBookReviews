const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
    const all_books = new Promise((resolve,reject)=>{

        if(books){
           return res.status(300).json(books);
          resolve(books)
        }
        else
        {
           return res.status(404).json({message: 'No list of the books found'})
          reject({error: 'No Book Library was found'})
        }
})
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let ISBN = req.params.isbn

    const book_by_isbn = new Promise((resolve, reject)=>{
  
      let book = books[ISBN]
      if(book)
      {
         return res.status(200).json(book)
        resolve(book)
      }
      else{
         return res.status(404).json({message: `No Book is found for the ISBN: ${ISBN}`})
        reject({error: `No Book is found for the ISBN: ${ISBN}`})
      }
    })
  
    
    
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let arr = Object.entries(books)
    const book_author = new Promise((resolve, reject)=>{
  
      let book_by_author = arr.filter((item)=>item[1].author === author)
      if(book_by_author)
      {
        
         return res.status(200).json(book_by_author[0][1])
         resolve(book_by_author)
      }
      else{
         return res.status(404).json({message: `No Book is found for the author: ${author}`})
        reject({message: `No Book is found for the author: ${author}`})
      }
    })
  
   
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let arr = Object.entries(books)
  
    const book_title = new Promise((resolve,reject)=>{
      let book_by_title = arr.filter((item)=>item[1].title === title)
      if(book_by_title)
      {
         return res.status(200).json(book_by_title[0][1])
        resolve(book_by_title[0][1])
      }
      else{
         return res.status(404).json({message: `No Book is found for the title: ${title}`})
        reject({message: `No Book is found for the title: ${title}` })
      }
    })
    
    
 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let ISBN = req.params.isbn

    let book = books[ISBN]
    if(book)
    {
      res.status(200).json(book.reviews)
    }
    else{
      res.status(404).json({message: `No Book is found for the ISBN: ${ISBN}`})
    }
   
});

module.exports.general = public_users;
