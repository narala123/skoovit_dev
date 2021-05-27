const EventEmitter = require('events');
const db = require('../models');
const plansService = require('../services/planService');
const eventNames = require('../config/event-emitter-constants');
class Events {
    constructor() {
        this.eventNames = eventNames;
        this.em = new EventEmitter();
        this.db = db;
        this.plansService = plansService;
        this.intializeListeners();
        
    }
    intializeListeners() {        
        this.em.on(this.eventNames.Assign_Plan_To_User, async(data)=>{
        let planDetails = await this.plansService.getFreePlan() || {};        
        planDetails["userId"] = data["userId"];  
        //console.log(planDetails,"planDetails");
        await this.plansService.createActivePlan(planDetails);
        await this.plansService.createPlanHistory(planDetails);
      })
    }  
}
let em = new Events().em;
module.exports = em;