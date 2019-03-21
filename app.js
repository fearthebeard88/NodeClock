var stdin = process.stdin;
stdin.setEncoding('utf-8');
const {convertToSeconds, stdOverwrite} = require('./helper/clock-helper');
const Clock = require('./model/Clock');

// let i = 3;
// let test = function(time)
// {
//     if (i <= -1)
//     {
//         clearInterval(test);
//         process.exit();
//     }

//     console.log(i);
//     i--;
// }

// setInterval(test, 1000, i);

process.stdout.write('To set a timer, use this format: seconds/minutes/hours. You can also enter the word exit to stop the application.\n');
process.stdout.write('How long would you like the timer for?\n ');

stdin.on('data', (data)=>
{
    if (data == null || data == 'undefined')
    {
        stdOverwrite('Unexpected input detected, exiting the application now.');
        process.exit(1);
    }

    if (data.trim() == 'exit')
    {
        stdOverwrite('Stopping the application now.');
        process.exit(2);
    }

    let seconds = convertToSeconds(data);
    if (typeof seconds == 'string')
    {
        seconds.trim();
        seconds = parseInt(seconds, 10);
    }

    stdin.emit('input', seconds);
});

stdin.on('input', (data)=>
{
    let clock = new Clock(data);
    clock.startTimer();
});

