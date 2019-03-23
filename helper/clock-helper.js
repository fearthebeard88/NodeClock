var stdin = process.stdin;
stdin.setEncoding('utf-8');
const divider = '/';

module.exports = {
    convertToSeconds(data)
    {
        let dataArray = data.split(divider);
        if (dataArray.length == 1)
        {
            return parseInt(dataArray[0], 10);
        }
        else if (dataArray.length == 2)
        {
            let seconds = parseInt(dataArray[0], 10);
            let minutes = parseInt(dataArray[1], 10);
            return seconds + (minutes * 60);
        }
        else if (dataArray.length == 3)
        {
            let seconds = parseInt(dataArray[0], 10);
            let minutes = parseInt(dataArray[1], 10);
            let hours = parseInt(dataArray[2], 10);
            return seconds + (minutes * 60) + ((hours * 60) * 60);
        }
        else
        {
            stdOverwrite('Too many numbers in input.');
            process.exit(1);
        }
    },

    stdOverwrite(msg)
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
}