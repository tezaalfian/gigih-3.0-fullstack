const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// simple REST API CRUD Book
const books = [
    {
        id: 1,
        title: 'Harry Potter and the Chamber of Secrets',
        writer: 'J.K. Rowling',
        year: 1998
    }
];

app.get('/books', (req, res) => {
    res.json(books);
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const book = books.find(book => book.id == id);
    if (!book) {
        res.status(404).send('Book not found!');
    }
    res.json(book);
})

app.post('/books', (req, res) => {
    const { title, writer, year } = req.body;
    const book = {
        id: books.length + 1,
        title,
        writer,
        year
    }
    books.push(book);
    res.send('Add new book success!');
})

app.put('/books/:id', (req, res) => {
    const id = req.params.id
    const { title, writer, year } = req.body;
    const index = books.findIndex((book) => book.id === parseInt(id));
    if (index < 0) {
        res.status(404).send('Book not found!');
    }
    books[index] = {
        id: books[index].id,
        title,
        writer,
        year
    }
    res.send('Update book success!');
})

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const index = books.findIndex((book) => book.id === id);
    books.splice(index, 1);
    res.send('Delete book success!');
})