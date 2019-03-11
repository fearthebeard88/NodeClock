var stdin = process.stdin;
stdin.setEncoding('utf-8');

console.log('To set a timer, use this format: seconds/minutes/hours. You can also enter the word exit to stop the application.');
console.log('How long would you like the timer for? ');

class Clock 
{
    constructor(seconds)
    {
        this._seconds = seconds;
        this.setTime = function(seconds){_seconds = seconds};
        this.getTime = function(){return _seconds};
    }

    // async means the function will return a promise
    async startTimer()
    {
        for (let i = this._seconds; i >= 0; i--)
        {
            if (i == 0)
            {
                this.endTimer();
            }

            let promise = new Promise((resolve, reject)=>
            {
                setTimeout(()=> resolve(i), 1000);
            });

            let secondsRemaining = await promise;
            console.log(secondsRemaining);
        }
    }

    async endTimer()
    {
        let promise = new Promise((res, rej)=>
        {
            setTimeout((res)=>{process.exit();}, 1000);
        });

        let placeholder = await promise;

        console.log('Time has ended.');
        
    }
}

stdin.on('data', (data)=>
{
    if (data == null || data == 'undefined')
    {
        console.log('Unexpected input detected, exiting the application now.');
        process.exit();
    }

    if (data.trim() == 'exit')
    {
        console.log('Stopping the application now.');
        process.exit();
    }

    let seconds = convertToSeconds(data);

    stdin.emit('input', data.trim());
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
    for (data of dataArray)
    {
        
    }
}