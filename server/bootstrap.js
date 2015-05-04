Meteor.startup(function () {
  var diseaseCount = Diseases.find().count();
  console.log(diseaseCount + ' diseases in database');
  Queue.add({command: 'Meteor.call("updateDiseases");'});
  Queue.setInterval('updateDiseases', 'Meteor.call("updateDiseases");', 10000);
  Queue.run();
});
