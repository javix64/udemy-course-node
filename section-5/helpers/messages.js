require('colors');

const showMenu = () => {

    return new Promise(resolve=>{
        console.log('=========================='.green);
        console.log('   Choose an option    '.green);
        console.log('==========================\n'.green);

        console.log(`${`1.`.green} Create task`);
        console.log(`${`2.`.green} List task`);
        console.log(`${`3.`.green} List task done`);
        console.log(`${`4.`.green} List task pending`);
        console.log(`${`5.`.green} Do task`);
        console.log(`${`6.`.green} Delete task`);
        console.log(`${`0.`.green} Exit \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question('Select an option: ', (opt)=>{
            readline.close()
            resolve(opt);
        })
    })

}

const pause = () => {
    return new Promise(resolve=>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPress ${'ENTER'.green} to continue\n`, (opt)=>{
            readline.close()
            resolve();
        })
    })


}

module.exports = {
    showMenu,
    pause
}
