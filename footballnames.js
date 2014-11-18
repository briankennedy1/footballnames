PlayerNameDB = new Meteor.Collection('playerNameDB');


Router.route('/', function () {
  this.render('HomePage');
});

Router.route('/player', function(){
  this.render('PlayerDetails')
});

if (Meteor.isClient) {

  Template.HomePage.helpers({
  
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
