var stdin = process.stdin;
stdin.setEncoding('utf-8');

console.log('Please enter a numeric value, or type exit to close the program');

class Clock 
{
    constructor(seconds)
    {
        var _seconds = seconds;
        console.log(this.seconds);
        this.setTime = function(seconds){_seconds = seconds};
        this.getTime = function(){return _seconds};
    }

    startTimer()
    {
        console.log('starting timer');
        for (let i = this._seconds; i > 0; i--)
        {
            if (this._seconds == 0)
            {
                this.endTimer();
            }
            else
            {
                setTimeout(()=>{}, 1000);
                console.log(this._seconds);
            }
        }
    }

    endTimer()
    {
        console.log('Time has ended.');
        process.exit();
    }
}

stdin.on('data', (data)=>
{
    if (data.trim() == 'exit')
    {
        console.log('exiting now.');
        process.exit();
    }

    stdin.emit('input', data.trim());
});

stdin.on('input', (data)=>
{
    // process data/time into seconds and pass into Clock instance
    // start the timer

    let seconds = parseInt(data, 10);
    let clock = new Clock(seconds);
    // clock.startTimer();
})