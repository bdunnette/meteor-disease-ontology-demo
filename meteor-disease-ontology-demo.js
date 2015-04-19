Pages = new Meteor.Pagination(Diseases, {
  perPage: 10,
  sort: {
    name: 1
  },
  filters: {
    oboUrl: {
      $exists: false
    }
  }
});

if (Meteor.isClient) {
  Template.diseases.helpers({

  });

  Template.diseases.events({

  });
}

if (Meteor.isServer) {
  Meteor.methods({

  });
  Meteor.startup(function() {
    var oboFile = Diseases.findOne({
      oboUrl: "http://purl.obolibrary.org/obo/doid.obo"
    });
    Queue.add({
      command: 'Meteor.call("getOBO","http://purl.obolibrary.org/obo/doid.obo");',
      priority: 1
    });
    Queue.run();
  });
}
