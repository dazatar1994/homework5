const express = require('express')
const {v4: uuid} = require('uuid')
const logger = require("./middleware/logger")
const err404 = require("./middleware/err404")
const uploadRouter = require("./routes/upload")
const indexRouter = require('./routes/index')

class Book {
	constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()){
		this.id = id;
    	this.title = title;
    	this.description = description;
    	this.authors = authors;
    	this.favorite = favorite;
    	this.fileCover = fileCover;
    	this.fileName = fileName;
	}
}

const stor = {
	book: [],
};

const app = express()
app.use('/upload', uploadRouter)
app.use(express.json())
app.use(logger)
app.use('/', indexRouter)
app.use(err404)



app.get('/api/books', (req, res)=>{
	const {book} = stor
	res.json(book)
})
app.get('/api/books/:id', (req, res)=>{
	const {book} = stor
	const {id} = req.params

	const idx = book.findIndex(el => il.id == id)

	if(idx !== -1){
		res._construct.json(book[idx])
	}
	else{
		res.status(404)
		res.json('404')
	}
})
app.post('/api/books/', (req, res)=>{
	const {book} = stor
	const {title, description, authors, favorite, fileCover, fileName} = req.body

	const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
	book.push(newBook)
	res.status(201)
	res.json(newBook)
})
app.put('/api/books/:id', (req, res)=>{
	const {book} = stor
	const {title, description, authors, favorite, fileCover, fileName} = req.body
	const {id} = req.params
	const idx = book.findIndex(el => el.id === id)

	if(idx !== -1){
		book[idx] = {
			...book[idx],
			title, description, authors, favorite, fileCover, fileName
		}

		res.json(book[idx])
	}
	else{
		res.status(404)
		res.json('404')
	}
})
app.delete('/api/books/:id', (req, res)=>{
	const {book} = stor
	const {id} = req.params
	const idx = book.findIndex(el => el.id === id)

	if(idx !== -1){
		book.splice(idx, 1)
		req.status(201)
		req.json('deleted')
	}
	else{
		res.status(404)
		res.json('404')
	}
})


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
	console.log('Запущено на порту ' + PORT)
})