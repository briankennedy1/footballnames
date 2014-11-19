PlayerNameDB = new Meteor.Collection('playerNameDB');


Router.route('/', function () {
  this.render('HomePage');
});

Router.route('/:firstName/:lastName/:jerseyNumber', {
  template: 'PlayerDetails',
  name: 'player.show',
  data: function () {
   return PlayerNameDB.findOne({firstName: this.params.firstName});
  }
});
Router.route('/first/:firstName', {
  template: 'NameDetails',
  name: 'firstName.show',
  data: function () {
    return PlayerNameDB.findOne({firstName: this.params.firstName});
  }
});



if (Meteor.isClient) {

  Template.HomePage.helpers({
  
    player : function(){
      return PlayerNameDB.find({});
    }

  });
  Template.PlayerDetails.helpers({
  
    player : function(){
      return PlayerNameDB.find({});
    }

  });
  Template.NameDetails.helpers({
 
    name : function(){
      return PlayerNameDB.find({});
    }


  });
  Template.PlayerDetails.events({

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
