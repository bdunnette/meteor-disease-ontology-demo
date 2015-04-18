Pages = new Meteor.Pagination(Diseases, {
  perPage: 10,
  sort: {
    name: 1
  }
});

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
    var diseaseCount = Diseases.find().count();
    var diseasesToUpdate = Diseases.find({xrefs: {$exists: false}}).count();
    console.log(diseaseCount + ' diseases in database, ' + diseasesToUpdate + ' with incomplete data');
    if (diseaseCount === 0) {
      var importDiseases = Meteor.call('getDisease', 'DOID:4');
    }
    var diseasesUpdated = Meteor.call('updateDiseases');
    setInterval(function() {
      console.log(Diseases.find({xrefs: {$exists: false}}).count() + ' diseases to update');
      var diseasesUpdated = Meteor.call('updateDiseases');
    }, 1800000);
  });
}
