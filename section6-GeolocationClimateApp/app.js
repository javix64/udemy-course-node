const {readInput,inquirerMenu, pause, listPlaces} = require('./helpers/inquirer')
require('colors');
require('dotenv').config()
const Searches = require('./models/searches');
console.clear();


const main = async() =>{
    let opt = 0;
    const searches = new Searches();

    do {
        console.clear();
        opt = await inquirerMenu();
        switch( opt ) {
            case 1:
                const place = await readInput('City: ');
                const places = await searches.city(place);
                const id = await listPlaces(places);

                if(id==='0') continue;
                
                const {lat, lon, name} = places.find(l=> l.id===id);
                searches.addToHistory(name);
                const {desc, min, max, temp} = await searches.climateCity(lat, lon);
                
                console.log('\nCity information\n'.green);
                console.log('City:',name);
                console.log('Lat:',lat);
                console.log('Lon:',lon);
                console.log('Description:',desc);
                console.log('Temperature min:',min);
                console.log('Temperature max:',max);
                console.log('Currently temperature :',temp);
                break;

            case 2:
                console.log('\nHistory\n'.green);
                searches.capitalizedHistory.forEach((place,i)=>{
                    const idx = `${i+1}`.green;
                    console.log(`${idx} ${place}`)
                })
                break;
        }

        if(opt!==0) await pause();

    }while(opt!==0);

}


main();
