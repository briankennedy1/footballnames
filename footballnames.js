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
Router.route('/:firstName', {
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
    player : function(){
      return PlayerNameDB.find({});
    }

  });
  Template.PlayerDetails.events({
    /*
      'click a.firstName' : function(event,template){
      var firstNameVar = template.find('.firstName').innerHTML;
      console.log(firstNameVar);
      Session.set("firstNameVar", firstNameVar);
    }
    */
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
