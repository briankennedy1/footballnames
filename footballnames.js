PlayerNameDB = new Meteor.Collection('playerNameDB');
PlayerTagsDB = new Meteor.Collection('playerTagDB');
TeamNameDB = new Meteor.Collection('teamNameDB');
/*
    A "tags" collection where tags like "feminine" and "cowboy"
    would be stored and INCREMENTED every time someone adds a tag. That way I can
    pull from that DB and say "15 people have the cowboy" tag, but link to the result
    by pulling from PlayerNameDB and pull the specific players.
    
    To show the value do something like:
    var searchTags=PlayerTagsDB.find({'violent': search}).count();
      console.log(searchTags);

    This is the find that can get into a specific field
    PlayerNameDB.find({}, { sort: {team: 1}, fields: {team: true} });

*/

Router.route('/', function () {
  this.render('HomePage');
});

Router.route('/player/:_id', {
  // Router.route('/:_id/:firstName:lastName:jerseyNumber', {
  template: 'PlayerDetails',
  name: 'playerDetailsRoute',
  data: function () {
   return PlayerNameDB.findOne({_id: this.params._id});
  }
});

Router.route('/tags', {
  template: 'TagList',
  name: 'allTags'
});

if (Meteor.isClient) {

  Template.HomePage.helpers({
    teamList : function(){
      teamList = TeamNameDB.find({});
      return teamList;
    },
    player : function(){
      var teamName = Session.get("teamName");
      if (teamName === "All" ) {
        return PlayerNameDB.find({});
      }
      return PlayerNameDB.find({team:teamName}, { sort: {lastName: 1} });
    },
    homePageStyle  : function(){
      return Session.get("teamName");
    }
  });

  Template.PlayerDetails.helpers({
    player : function(){
      return PlayerNameDB.find({});
    }

  });

  Template.TagList.helpers({
    player : function(){
      return PlayerNameDB.find({},{ sort: {tagstwo: -1}});
    }
  });

  Template.HomePage.events({
    'change #teamSelect' : function(event, template){
      var teamName = template.find('#teamSelect').value;
      return Session.set("teamName", teamName);
    }

  });

  Template.PlayerDetails.events({
    'submit #addTag' : function(event, template){
      var tagToAdd = template.find('#tagField').value.toLowerCase().trim();
      if(/\s/g.test(tagToAdd) === true) {
        alert("No white space please") 
        return false
      } else if (/\W/g.test(tagToAdd) === true) {
        alert("Keep it to normal letters.")
        return false
      } else if (/\w{3,16}/g.test(tagToAdd) === false) {
        alert("Too short or too long, you decide.")
        return false
      };
      PlayerNameDB.update({_id: this._id}, {$addToSet: {tagstwo:tagToAdd}});
      
      // if tagToAdd already exists in PlayerTagsDB then +1 the number of tags
      //  and return false
      /*
      if (PlayerTagsDB.find.) {

        alert("This tag already exists")
        return false
      };
      // else insert the tagToAdd and give it a +1
        
        alert("Tag added to the DB!")

        REMOVE NEEDS TO -1 THE NUMBER OF TAGS!
      */

        return false;
    },
    'click #removeTag' : function(e){
      var tag = this.toString();
      var id = e.currentTarget.name;
      PlayerNameDB.update({_id: id}, {$pull : {tagstwo : tag}});
    }

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    
  });
}