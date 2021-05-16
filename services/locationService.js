const db = require("../models")
class LocationService {
    constructor(){
        this.db =  db;
    }
    async createCountry(data){
        try{
            //console.log(data,"-------");
            let countryCreation = await this.db.countries.create(data);                       
            return countryCreation;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    };
    async createState(data){
        try{
            //console.log(data,"-------");
            let satateCreation = await this.db.states.create(data);                       
            return satateCreation;
        }catch(e){
            //console.error("error",e)
            return e.message;
        }
    }
}

module.exports = new LocationService();