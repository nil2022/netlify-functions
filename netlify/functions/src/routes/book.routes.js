const bookController = require('../controllers/books.controller')
const validateBookDetails = require('../middlewares/validateBookDetails')
const authjwt = require('../middlewares/auth.jwt')

module.exports = function (app) {
    /* ----- ADD A BOOK API -------- */
    app.post('/api/book/add', [authjwt.verifyToken, validateBookDetails.isBookDetailsProvided], bookController.addOneBook)
    /* ----- VIEW A LIST OF ALL BOOKS API -------- */
    app.get('/api/book/viewall', [authjwt.verifyToken], bookController.fetchAllBooks)
    /* ----- VIEW A BOOK BY ID API -------- */
    app.get('/api/book/viewbyid', [authjwt.verifyToken], bookController.fetchById)
    /* ----- UPDATE A BOOK API -------- */
    app.put('/api/book/updatebook', [authjwt.verifyToken, validateBookDetails.isBookPresent], bookController.updateBook)
    /* ----- DELETE A BOOK API -------- */
    app.delete('/api/book/deletebook', [authjwt.verifyToken, validateBookDetails.isBookPresent], bookController.deleteBook)
}