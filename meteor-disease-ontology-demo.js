Pages = new Meteor.Pagination(Diseases, {
  perPage: 10,
  sort: {
    name: 1
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
    updateDiseases: function() {
      var diseasesToUpdate = Diseases.find({xrefs: {$exists: false}});
      console.log(diseasesToUpdate.count() + ' diseases to update');
      diseasesToUpdate.forEach(function(disease) {
        var updateCommand = 'Meteor.call("getDisease", "' + disease.id + '");';
        Queue.add({
          command: updateCommand
        });
      });
      return diseasesToUpdate.count();
    }
  });
  Meteor.startup(function () {
    var diseaseCount = Diseases.find().count();
    var diseasesToUpdate = Diseases.find({xrefs: {$exists: false}}).count();
    console.log(diseaseCount + ' diseases in database, ' + diseasesToUpdate + ' with incomplete data');
    if (diseaseCount === 0) {
      Queue.add({
        command: 'Meteor.call("getDisease", "DOID:4");'
      });
    }
    Queue.add({command:'Meteor.call("updateDiseases");'});
    Queue.setInterval('updateDiseases', 'Meteor.call("updateDiseases");', 60000);
    Queue.run();
  });
}