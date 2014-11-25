PlayerNameDB = new Meteor.Collection('playerNameDB');
PlayerTags = new Meteor.Collection('playerTagDB');
TeamNameDB = new Meteor.Collection('teamNameDB');
/*
    A "tags" collection where tags like "feminine" and "cowboy"
    would be stored and INCREMENTED every time someone adds a tag. That way I can
    pull from that DB and say "15 people have the cowboy" tag, but link to the result
    by pulling from PlayerNameDB and pull the specific players: 

    PlayerNameDB.find({}, { sort: {team: 1}, fields: {team: true} });

*/

Router.route('/', function () {
  this.render('HomePage');
});

Router.route('/:_id/:firstName:lastName:jerseyNumber/', {
  template: 'PlayerDetails',
  name: 'player.show',
  data: function () {
   return PlayerNameDB.findOne({_id: this.params._id});
  }
});


if (Meteor.isClient) {

  Template.HomePage.helpers({
    teamList : function(){
      teamList = TeamNameDB.find({}, {});
      return teamList;
    },
    player : function(){
      var teamName = Session.get("teamName");
      if (teamName === "All" ) {
        return PlayerNameDB.find({});
      }
      return PlayerNameDB.find({team:teamName});
    }

  });
  Template.PlayerDetails.helpers({
  
    player : function(){
      return PlayerNameDB.find({});
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
      if (/\s/g.test(tagToAdd) === true) {
        alert("No white space please") 
        return false
      };
      PlayerNameDB.update({_id: this._id}, {$addToSet: {tagstwo:tagToAdd}});
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
