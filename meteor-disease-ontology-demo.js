Pages = new Meteor.Pagination(Diseases);

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.diseases.helpers({

  });

  Template.diseases.events({

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
