var express = require('express'); // An Express application is essentially a series of middleware function calls.
var bodyParser = require('body-parser') //use body parser as express can't handle json format
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json()) //use act as an application-level middleware, see: https://expressjs.com/en/guide/using-middleware.html
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb://abdelraouf:abc123@ds111065.mlab.com:11065/learning-node'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})


app.get('/messages', (req, res) =>{
    Message.find({}, (err, messages)=>{
        res.send(messages)
    })
})

app.get('/messages/:user', (req, res) =>{
    var user = req.params.user
    Message.find({name: user}, (err, messages)=>{
        res.send(messages)
    })
})



// async means the function returns a promise
app.post('/messages', async (req, res) =>{
  
    try {

    var message = new Message(req.body)
    // await means you're waiting asynchronously for a promise resolution
    // https://stackoverflow.com/questions/52307293/will-await-keyword-in-javascript-slow-down-the-application?noredirect=1&lq=1
    // https://stackoverflow.com/questions/42677043/understanding-async-await-patterns-in-javascript
    var savedMessage = await message.save()
    
    console.log('saved')
    var censored = await Message.findOne({message: 'badword'})
    
    
    if(censored){
        console.log('censored word found', censored)
        await Message.deleteMany({_id: censored.id})
    }else{
        io.emit('message', req.body)
    }
        
    res.sendStatus(200)  
  } catch (error) {
        res.sendStatus(500)
        return console.error(error)
  }
})

io.on('connection', (socket)=>{
    console.log('a user connected on socket')
})

mongoose.connect(dbUrl, { useNewUrlParser: true },(err)=>{
    console.log('a user connected on mongo')
})

var server = http.listen(3000, () =>{
    console.log('server is listening on port', server.address().port)
})