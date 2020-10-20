const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send("Your pizza is on the way!");
})

app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again!")
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
})

app.get('/greetings', (req, res) => {
    //get values from request
    const name = req.query.name;
    const race = req.query.race;

    //validate values
    if(!name) {
        //name was not provided
        return res.status(400).send('Please provide a name');
    }

    if(!race) {
        //race was not provided
        return res.status(400).send('Please provide a race');
    }
    //both name and race are valid so process
    const greeting = `Greeting ${name} the ${race}, welcom to Midgard.`;

    //send response
    res.send(greeting);
})

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const sum = a + b;
    const response = `The sum of ${a} and ${b} is ${sum}`

    res.send(response);


})

app.get('/cipher', (req, res) => {
    //convert string to all caps
    let text = req.query.text.toUpperCase();
    const shift = parseInt(req.query.shift);

    console.log(text + " " + shift);
    //separate into array of char
    let textArr = text.split('');

    console.log(textArr);
    //shift each char however many numbers down
    textArr = textArr.map(char => {
         const coded = char.charCodeAt(0) + shift
        return (
            String.fromCharCode(coded)
        );
    })

    console.log(textArr)

    const response = textArr.join('');
    //return converted string
    console.log(response)
    res.send(response);
})

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers.map(num => parseInt(num));
    const winning = [];
    

    console.log(numbers)

    for(let i = 0; i < 6; i ++ ) {
        let num = Math.floor(Math.random() * Math.ceil(20));
        winning.push(num);
    }

    const match = winning.filter(num => {
        return(
            numbers.includes(num)
        )
    })

    console.log(winning);
    console.log(match);

    let response = '';
    console.log(response);

    switch(match.length) {
        case  4 :
            response = 'Congratulations, you win a free ticket';
            break;
        case 5 :
            response = 'Congratulations, you win $100!';
            break;
        case 6 :
            response = 'Wow! Unbelievable! You ocould have won the mega millions!';
            break;

        default:
            response = 'Sorry, you lose.';

    }

    console.log(response)

    res.send(response);

})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});