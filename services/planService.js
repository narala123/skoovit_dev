const db = require("../models");
class PlanService {
  constructor() {
    this.db = db;
  }
  async createPlan(data) {
    try {
      //console.log(data,"-------");
      let createPlan = await this.db.Plans.create(data);
      return createPlan;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  };

  async createActivePlan(data) {
    try {
      console.log(data,"------Active plans-");
      let createPlan = await this.db.ActivePlans.create(data);
      return createPlan;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  };

  async createPlanHistory(data) {
    try {
      //console.log(data,"-------");
      let createPlan = await this.db.UserPlanTransactions.create(data);
      return createPlan;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  };

  async getFreePlan() {
    try {
      //console.log(data,"-------");
      let freePlan = await this.db.Plans.findOne({planType:"Free"},{_id:1,planType:1});
      return freePlan;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }; 

  async getPlans() {
    try {
      //console.log(data,"-------");
      let getPlans = await this.db.Plans.find({}).sort({
        createDate: -1,
      });
      return getPlans;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  };

  async getPlan(id) {
    try {
      //console.log(data,"-------");
      let getPlan = await this.db.Plans.findOne({ _id: id });
      return getPlan;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  };

  async updatePlan(id, data) {
    try {
      //console.log(data,"-------");
      let updatePlan = await this.db.Plans.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      );
      return updatePlan;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
  async deletePlan(id) {
    try {
      //console.log(data,"-------");
      let deletePlan = await this.db.Plans.deleteOne({ _id: id });
      return deletePlan;
    } catch (e) {
      //console.error("error",e)
      return e.message;
    }
  }
}

module.exports = new PlanService();
