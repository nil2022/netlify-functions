const Books = require('../models/book.model')

/* ----- ADD A BOOK CONTROLLER ----- */
exports.addOneBook = async (req, res) => {
    const { title, author, ISBN, publisher, price, language  } = req.body;
    
    const checkExistingTitle = await Books.findOne({
        title: title
    })
    const checkExistingISBN = await Books.findOne({
        ISBN:ISBN
    })

    if(checkExistingTitle || checkExistingISBN) {
        console.log("Book with provided title/ISBN already Exists!")
        res.status(403).send("Book with provided title/ISBN already Exists!")
        return
    }

    const bookObj = {
        title: title,
        author: author,
        ISBN: ISBN,
        publisher: publisher,
        price:price,
        language: language
    }

    try {
        const addBook = await Books.create(bookObj)
        const response = {
            title: addBook.title,
            author: addBook.author,
            ISBN: addBook.ISBN,
            publisher: addBook.publisher,
            price: addBook.price,
            language: addBook.language
        }
        // throw new Error("Manual Error")
        res.status(201).send({
            message: 'Book added Succesfully',
            response 
        })
    } catch (error) {
        console.log('Some error happened while adding book:', error.message)
        res.status(500).send({
        message: 'Some internal error occured'
    })
    }
}

/* ----- VIEW A LIST OF ALL BOOKS CONTROLLER ----- */
exports.fetchAllBooks = async (req, res) => {

    try {
        const viewAllBooks = await Books.find()
        // throw new Error("Manual Error")
        res.status(200).send({
            message: 'All Books fetched Successfully',
            viewAllBooks 
        })
    } catch (error) {
        console.log('Some error happened while fetching books:', error.message)
        res.status(500).send({
        message: 'Some error happened while fething data'
    })
    }
}

/* ----- VIEW A SPECIFIC BOOK BY ID ('_id' OR 'ISBN') CONTROLLER ----- */
exports.fetchById = async (req, res) => {
    const id  = req.query.id;
    try {    
            if(!id) throw new Error('Book id is not provided')
            const fetchBookbyId = await Books.find({
                _id: id
            })
            res.status(200).send({
                message: "Fetched Successfully",
                Response: fetchBookbyId
        })    
    } catch (error) {
        console.log("Error: ", error.message)
            res.status(403).send("Either Book id not provided or incorrect id provided")
            return
    } 
}

/* ----- UPDATE A BOOK DETAIL CONTROLLER ----- */
exports.updateBook = async (req, res) => {
    const id = req.query.id
    const { price } = req.body;
    try {
            if(!id || !price) throw new Error("id or price not provided")
            const updateBook = await Books.findOneAndUpdate({
                _id: id
            },{
                price:price,
                updatedAt: Date.now()
            }).exec();
            console.log("Book Updated", updateBook)
            res.status(200).send({
                message: "Book updated Successfully",
            })

    } catch (error) {
        console.log("Some error happened when updating the record:", error.message);
        res.status(500).send({
            message: 'id or price not provided'
        })
    }
}

/* ----- DELETE A BOOK CONTROLLER ----- */
exports.deleteBook = async (req, res) => {
    const id = req.query.id
    try {
        const bookdata = await Books.findOneAndDelete({ _id: id }).exec()
        // if (bookdata == null) throw new Error('Book not Present')
        console.log('Request to delete user for', bookdata)
        res.status(200).send({
          message: 'Book record has been deleted successfully'
        })
      } catch (error) {
        console.log(`Error while deleting the record, ${error}`)
        res.status(500).send({
          message: `Error while deleting the record, Book not Present `
        })
      }
}

