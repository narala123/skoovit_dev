let fs = require("fs");

class Models {
  constructor() {
    this.collection = this.init();
  }

  init() {
    return {
      Admin:require("./admin"),
      UserRoles: require("./userRoles"),
      Countries: require("./countries"),
      States: require("./states"),
      Cities: require("./cities"),
      User: require("./user"),
      Plans: require("./plans"),
      ActivePlans: require("./active-plan"),
      UserPlanTransactions: require("./user-plans-transactions"),
      UserProfiles:require("./user-profile"),
      Languages:require("./languages"),
      Categories:require("./categories"),
      SubCategories:require("./sub-categories"),
      Educations:require("./education"),
      GlobalAds:require("./global-ads"),
      RegionAds:require("./region-ads"),
      Followers:require("./followers"),
      UserPosts:require("./user-posts"),
      Skills:require("./skills"),
      UserPostComments:require("./user-post-comments"),
      UserPostSubComments:require('./user-post-subcomments'),
      RequirementPosts:require('./user-requirement-post'),
      UserAdvProfiles:require('./user-advertisement'),
      Notifications:require('./notifications'),
      SavedRequirements:require('./user-saved-requirements'),
      AppliedRequirements:require('./user-applied-requirements'),
      Services:require('./services')
    };
  }
}

module.exports = new Models().collection;
