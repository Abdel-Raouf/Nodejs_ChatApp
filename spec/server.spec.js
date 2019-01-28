var request = require('request');

describe('calc', () => {
    it('should mulitply 2 and 2', () => {
        expect(2*2).toBe(4)
    });
})

describe('get messages', () =>{
    it('should return 200 ok', (done) =>{
        // we need to make an http get request but we can't natively do it, so we will use an externall library
        request.get('http://localhost:3000/messages', (err, res) =>{
            // console.log(res.body)
            expect(res.statusCode).toEqual(200)
            // https://jasmine.github.io/tutorials/async
            done();
        })
    })
    it('should return a list, thats not empty', (done) =>{
        // we need to make an http get request but we can't natively do it, so we will use an externall library
        request.get('http://localhost:3000/messages', (err, res) =>{
            // console.log(JSON.parse(res.body))
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            // https://jasmine.github.io/tutorials/async
            done();
        })
    })
})

describe('get messages from user', () =>{
    it('should return 200 ok', (done) =>{
        // we need to make an http get request but we can't natively do it, so we will use an externall library
        request.get('http://localhost:3000/messages/abdelraouf', (err, res) =>{
            // console.log(res.body)
            expect(res.statusCode).toEqual(200)
            // https://jasmine.github.io/tutorials/async
            done();
        })
    })
    it('name should be abdelraouf', (done) =>{
        // we need to make an http get request but we can't natively do it, so we will use an externall library
        request.get('http://localhost:3000/messages/kmal', (err, res) =>{
            // console.log(JSON.prase(res.body))
            expect(JSON.parse(res.body)[0].name).toEqual('kmal')
            // https://jasmine.github.io/tutorials/async
            done();
        })
    })

})