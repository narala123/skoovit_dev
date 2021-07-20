const db = require("../models");
class PlanService {
  constructor() {
    this.db = db;
  }
  async createPlan(data) {
    try {
      //console.log(data,"-------");
      let createPlan = await this.db.Plans.create(data);
      return {
        data: createPlan,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };

  async createActivePlan(data) {
    try {
      //console.log(data, "------Active plans-");
      let createPlan = await this.db.ActivePlans.create(data);
      return {
        data: createPlan,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };

  async createPlanHistory(data) {
    try {
      //console.log(data,"-------");
      let createPlan = await this.db.UserPlanTransactions.create(data);
      return {
        data: createPlan,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };

  async getFreePlan() {
    try {
      //console.log(data,"-------");
      let freePlan = await this.db.Plans.findOne({ planType: "Free" }, { _id: 1, planType: 1 });
      return {
        data: freePlan,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };

  async getPlans() {
    try {
      //console.log(data,"-------");
      let getPlans = await this.db.Plans.find({}).sort({
        createDate: -1,
      });
      return {
        data: getPlans,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  };

  async getPlan(id) {
    try {
      //console.log(data,"-------");
      let getPlan = await this.db.Plans.findOne({ _id: i });
      return {
        data: getPlan,
        status: true
      };
    } catch (e) {
      //console.error("error",e)      
      return {
        data: e.message,
        status: false
      }
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
      return {
        data: updatePlan,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
  async deletePlan(id) {
    try {
      //console.log(data,"-------");
      let deletePlan = await this.db.Plans.deleteOne({ _id: id });
      return {
        data: deletePlan,
        status: true
      };
    } catch (e) {
      //console.error("error",e)
      return {
        data: e.message,
        status: false
      }
    }
  }
}

module.exports = new PlanService();
