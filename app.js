var stdin = process.stdin;
stdin.setEncoding('utf-8');

process.stdout.write('To set a timer, use this format: seconds/minutes/hours. You can also enter the word exit to stop the application.\n');
process.stdout.write('How long would you like the timer for?\n ');

class Clock 
{
    constructor(seconds)
    {
        this._seconds = seconds;
        this.setTime = function(seconds){this._seconds = seconds};
        this.getTime = function(){return this._seconds};
    }

    // async means the function will return a promise
    async startTimer()
    {
        for (let i = this._seconds; i >= 0; i--)
        {
            this._seconds--;
            if (i == 0)
            {
                this.endTimer();
            }

            let promise = new Promise((resolve, reject)=>
            {
                setTimeout(()=> resolve(displayText(this.getTime())), 1000);
            });

            await promise;
        }
    }

    async endTimer()
    {
        let promise = new Promise((res, rej)=>
        {
            setTimeout((res)=>{displayText('Timer has ended!'), process.exit(0)}, 1000);
        });

        await promise;
    }
}

stdin.on('data', (data)=>
{
    if (data == null || data == 'undefined')
    {
        displayText('Unexpected input detected, exiting the application now.');
        process.exit(1);
    }

    if (data.trim() == 'exit')
    {
        displayText('Stopping the application now.');
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
    // process data/time into seconds and pass into Clock instance
    // start the timer

    let seconds = parseInt(data, 10);
    let clock = new Clock(seconds);
    clock.startTimer();
});

function convertToSeconds(data)
{
    let dataArray = data.split('/');
    if (dataArray.length == 1)
    {
        return dataArray[0];
    }
    else if (dataArray.length == 2)
    {
        return dataArray[0] + (dataArray[1] * 60);
    }
    else if (dataArray.length == 3)
    {
        return dataArray[0] + dataArray[1] * 60 + (dataArray[2] * 24) * 60;
    }
    else
    {
        displayText('Too many numbers in input.');
        process.exit(1);
    }
}

function displayText(msg)
{
    if (typeof msg == 'number')
    {
        msg = msg.toString();
    }

    let stdout = process.stdout;

    stdout.clearLine();
    stdout.cursorTo(0);
    stdout.write(msg);
    return;
}