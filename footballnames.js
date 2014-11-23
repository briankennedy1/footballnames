PlayerNameDB = new Meteor.Collection('playerNameDB');
PlayerTags = new Meteor.Collection('playerTagDB');

/*
  Thinking about making a couple new meteor collections.
  One would be team names so I can just pull them from a collection instead
    of dealing with 1500 results with team names repeated.
  The other would be a "tags" collection where tags like "feminine" and "cowboy"
    would be stored and INCREMENTED every time someone adds a tag. That way I can
    pull from that DB and say "15 people have the cowboy" tag, but link to the result
    by pulling from PlayerNameDB and pull the specific players: 
    "PlayerNameDB.find({}, { sort: {tags: 1}, fields: {tags: true} });"


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
     var teamList = PlayerNameDB.find({}, { sort: {team: 1}, fields: {team: true} });
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
    },
    tag : function(){
      return PlayerNameDB.find({_id: this._id},{ fields: {tagstwo: true} });
    }

  });
  Template.HomePage.events({
    'change #teamSelect' : function(event, template){
      var teamName = template.find('#teamSelect').value;
      console.log(teamName)
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
    'click #removeTag' : function(){
      console.log(this._id.tagstwo);
      //PlayerNameDB.remove(this.tagstwo);
    }

  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
