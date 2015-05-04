/*****************************************************************************/
/* DiseaseTemplate: Event Handlers */
/*****************************************************************************/
Template.DiseaseTemplate.events({});

/*****************************************************************************/
/* DiseaseTemplate: Helpers */
/*****************************************************************************/
Template.DiseaseTemplate.helpers({
  defText: function() {
    if (this.def) {
      var defText = this.def.match(/"(.*?)"/)[1].replace('"', '');
      return defText;
    }
  },

  defLinks: function() {
    if (this.def) {
      var defLinksStr = null;
      this.def.replace(/\[(.*?)\]/g, function(outside, inside) {
        defLinksStr = inside;
      });
      var defLinks = [];
      defLinksStr.split(",").forEach(function(link) {
        defLinks.push(link.replace('url:', '').replace(' ', '').replace('\\', ''));
      })
      return defLinks;
    }
  },

  aka: function() {
    if (this.synonym) {
      if (Array.isArray(this.synonym)) {
        var synonyms = [];
        this.synonym.forEach(function(syn) {
          var synText = syn.match(/"(.*?)"/)[1].replace('"', '');
          synonyms.push(synText);
        });
        return synonyms;
      } else {
        var synText = this.synonym.match(/"(.*?)"/)[1].replace('"', '');
        return synText;
      }
    }
  }
});

/*****************************************************************************/
/* DiseaseTemplate: Lifecycle Hooks */
/*****************************************************************************/
Template.DiseaseTemplate.created = function() {};

Template.DiseaseTemplate.rendered = function() {};

Template.DiseaseTemplate.destroyed = function() {};
