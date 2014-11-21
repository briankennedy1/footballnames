PlayerNameDB = new Meteor.Collection('playerNameDB');


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
    }

  });
  Template.HomePage.events({
    'change #teamSelect' : function(event, template){
      var teamName = template.find('#teamSelect').value;
      console.log(teamName)
      return Session.set("teamName", teamName);
    }

  });



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
