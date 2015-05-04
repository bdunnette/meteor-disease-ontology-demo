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
