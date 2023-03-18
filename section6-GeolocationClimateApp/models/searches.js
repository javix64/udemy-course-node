const fs = require('fs');
const axios = require('axios');

class Searches {
    history = [];
    dbPath = './db/database.json'

    constructor(){
        this.readDb();
    }

    get capitalizedHistory(){
        return this.history.map((place)=>{
            let words = place.split(' ');
            words = words.map( p=> p[0].toUpperCase() + p.substring(1) )
            return words.join(' ');
        })
    }

    get paramsMapBox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }
    
    get paramsOpenWeatherMap(){
        return {
            'appid':process.env.OPENWEATHERMAP_KEY,
            'lang':'en',
            'units':'metric'
        }
    }

    async city(place=""){
        try{
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })
            const resp = await instance.get();
            return resp.data.features.map(place=>({
                id:place.id,
                name:place.place_name,
                lon:place.center[0],
                lat:place.center[1]
            }));
        }catch(error){
            console.error(error);
            return [];
        }
    }

    async climateCity(lat, lon){
        try{
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeatherMap, lat, lon}
            })
            const {data} = await instance.get();

            return {
                desc: data.weather[0].description,
                min: data.main.temp_min,
                max: data.main.temp_max,
                temp: data.main.temp
            }
        }catch(err){
            console.error('error climatePlace', err);
        }
    }

    addToHistory(place = ''){
        if( this.history.includes( place.toLocaleLowerCase() ) ) return;
        this.history = this.history.splice(0,5);
        this.history.unshift( place.toLocaleLowerCase() );
        this.writeDb();
    }

    writeDb(data){
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    readDb(){
        if( !fs.existsSync(this.dbPath) ) return;
        const unParsedData = fs.readFileSync( this.dbPath, {encoding:'utf-8'} );
        const { history } = JSON.parse(unParsedData);
        this.history = history;
    }

}

module.exports = Searches
