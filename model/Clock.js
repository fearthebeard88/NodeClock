const {stdOverwrite} = require('../helper/clock-helper');

class Clock 
{
    constructor(seconds)
    {
        this._seconds = seconds;
        this.setTime = (seconds)=>{this._seconds = seconds};
        this.getTime = ()=>{return this._seconds;}
    }

    startTimer()
    {
        let timer = function()
        {
            if (this.getTime() <= 0)
            {
                this.endTimer(timer);
            }

            stdOverwrite(this.convertToStandard(this.getTime()));
            this.setTime(this.getTime() - 1);
        }

        setInterval(timer.bind(this), 1000);
    }

    convertToStandard(time)
    {
        if (time <= 60 && time > 10)
        {
            return `:${time}`;
        }

        if (time < 10)
        {
            return `:0${time}`;
        }

        let minutes = (time/60).toFixed(2);
        return minutes;
    }

    endTimer(timer)
    {
        clearInterval(timer);
        stdOverwrite('Timer has ended.');
        process.exit();
    }
}

module.exports = Clock;