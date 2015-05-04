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
    updateDiseasesFromApi: function() {
      var diseasesToUpdate = Diseases.find({xrefs: {$exists: false}});
      console.log(diseasesToUpdate.count() + ' diseases to update');
      diseasesToUpdate.forEach(function(disease) {
        var updateCommand = 'Meteor.call("getDisease", "' + disease.id + '");';
        Queue.add({
          command: updateCommand
        });
      });
      return diseasesToUpdate.count();
    },

    updateDiseases: function() {
      var diseaseCount = Diseases.find().count();
      if (diseaseCount < 1) {
        console.log('Downloading OBO file...')
        Queue.add({command: 'Meteor.call("getOBOFile", "http://purl.obolibrary.org/obo/doid.obo");'});
      } else {
        var oboFile = Diseases.findOne({oboUrl: "http://purl.obolibrary.org/obo/doid.obo"});
        if (oboFile.oboContent && !oboFile.stanzas) {
          console.log('Parsing OBO file...')
          Queue.add({command: 'Meteor.call("parseOBOStanzas", "http://purl.obolibrary.org/obo/doid.obo");'});
        } else if (oboFile.stanzas.length > diseaseCount) {
          console.log('Updating ' + oboFile.stanzas.length + ' diseases from OBO file (' + diseaseCount + ' currently in database)')
          Queue.add({command: 'Meteor.call("parseOBOHeader", "http://purl.obolibrary.org/obo/doid.obo");'});
          Queue.add({command: 'Meteor.call("parseOBOTerms", "http://purl.obolibrary.org/obo/doid.obo");'});
        }
      }
    }
  });

  Meteor.startup(function () {
    var diseaseCount = Diseases.find().count();
    console.log(diseaseCount + ' diseases in database');
    Queue.add({command: 'Meteor.call("updateDiseases");'});
    Queue.setInterval('updateDiseases', 'Meteor.call("updateDiseases");', 3600000);
    Queue.run();
  });
}
