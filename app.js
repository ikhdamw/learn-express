const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000

const data = [
    {id: 1, name: 'miza', isMarried: false},
    {id: 2, name: 'rizal', isMarried: true},
    {id: 3, name: 'santi', isMarried: true},
]

// sepecify the view engine and the extension
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index', { family: data });
})

app.get('/add', (req, res) => {
    res.render('add');
})

app.post('/add', (req, res) => {
    const {isMarried, name} = req.body
    let status;
    if (isMarried === 'true') {
        status = true
    } else if (isMarried === 'false') {
        status = false
    }
    data.push({
        id: data.length+1,
        name: name,
        isMarried: status
    });
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    const {id} = req.params
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === Number(id)) {
            data.splice(i, 1)
        }
    }
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    const {id} = req.params
    let choosedData = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === Number(id)) {
            choosedData.push(data[i])
        }
    }
    res.render('edit', { data: choosedData })
})

app.post('/edit/:id', (req, res) => {
    const {id} = req.params
    const {name, isMarried} = req.body
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === Number(id)) {
            data[i].name = name
            if (isMarried === 'true') {
                data[i].isMarried = true
            } else if (isMarried === 'false') {
                data[i].isMarried = false
            }
        }
    }
    res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))