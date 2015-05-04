/*****************************************************************************/
/* DiseaseTemplate: Event Handlers */
/*****************************************************************************/
Template.DiseaseTemplate.events({
});

/*****************************************************************************/
/* DiseaseTemplate: Helpers */
/*****************************************************************************/
Template.DiseaseTemplate.helpers({
  defText: function(){
    if (this.def) {
      var defText = this.def.match(/"(.*?)"/)[1].replace('"','');
      return defText;
    }
  },

  defLinks: function(){
    if (this.def) {
      var defLinksStr = null;
      this.def.replace(/\[(.*?)\]/g, function(outside,inside){defLinksStr = inside;});
      var defLinks = [];
      defLinksStr.split(",").forEach(function(link){
        defLinks.push(link.replace('url:','').replace(' ','').replace('\\',''));
      })
      return defLinks;
    }
  }
});

/*****************************************************************************/
/* DiseaseTemplate: Lifecycle Hooks */
/*****************************************************************************/
Template.DiseaseTemplate.created = function () {
};

Template.DiseaseTemplate.rendered = function () {
};

Template.DiseaseTemplate.destroyed = function () {
};
