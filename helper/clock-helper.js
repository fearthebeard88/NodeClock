var stdin = process.stdin;
stdin.setEncoding('utf-8');

module.exports = {
    convertToSeconds(data)
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
            // seconds = seconds
            // minutes = seconds * 60
            // hours = minutes * 60 (seconds * 60 * 60)
            return dataArray[0] + dataArray[1] * 60 + (dataArray[2] * 60) * 60;
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