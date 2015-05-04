/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
  updateDiseases: function() {
    var diseaseCount = Diseases.find().count();
    if (diseaseCount < 1) {
      console.log('Downloading OBO file...')
      Queue.add({
        command: 'Meteor.call("getOBOFile", "http://purl.obolibrary.org/obo/doid.obo");'
      });
    } else {
      var oboFile = Diseases.findOne({
        oboUrl: "http://purl.obolibrary.org/obo/doid.obo"
      });
      if (oboFile.oboContent && !oboFile.stanzas) {
        console.log('Parsing OBO file...')
        Queue.add({
          command: 'Meteor.call("parseOBOStanzas", "http://purl.obolibrary.org/obo/doid.obo");'
        });
      } else if (oboFile.stanzas.length > diseaseCount) {
        console.log('Updating ' + oboFile.stanzas.length + ' diseases from OBO file (' + diseaseCount + ' currently in database)')
        Queue.add({
          command: 'Meteor.call("parseOBOHeader", "http://purl.obolibrary.org/obo/doid.obo");'
        });
        Queue.add({
          command: 'Meteor.call("parseOBOTerms", "http://purl.obolibrary.org/obo/doid.obo");'
        });
      }
    }
  }
});
