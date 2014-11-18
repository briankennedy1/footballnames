PlayerNameDB = new Meteor.Collection('playerNameDB');


Router.route('/', function () {
  this.render('HomePage');
});

Router.route('/player/:_id', {
  template: 'PlayerDetails',
  name: 'PlayerDetails',
  data: function () {
    return PlayerNameDB.findOne({_id: this.params._id});
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

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
