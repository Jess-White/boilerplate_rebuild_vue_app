<template>

  <div class="boilerplates-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Library to <span class="text-primary">View and Edit </span>Saved Boilerplates.
                </h2>
                <p class="lead text-white-gray">
                    Click on any tile to open a saved boilerplate, view, and edit.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">04</h3>
                    </div> 
                    <h4>Boilerplates Index</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

        <div class="row my-4">
        <form class="col-6 offset-3"
        v-on:submit.prevent="createBoilerplate()">
        <h1 class="text-center mb-5">New Boilerplate</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Title: </label>
          <input class="form-control" type="text" v-model="title">
        </div>

        <div class="form-group">
          <label>Text: </label>
          <input class="form-control" type="text" v-model="text">
        </div>

        <div class="form-group">
          <label>Wordcount: </label>
          <input class="form-control" type="text" v-model="wordcount">
        </div>

          <input class="btn btn-info m-4" type="submit" value="Add New Boilerplate">

        </form>
        </div>

    <div class="container">
      <h1 class="text-center my-5">Boilerplates</h1>
      <div class="row">
        <div class="col-sm-4 mb-2" v-for="boilerplate in boilerplates">
          <router-link v-bind:to="'/boilerplates/' + boilerplate.id">
            <div class="card">
              <div class="card-body text-info">
                <h5 class="card-name">{{boilerplate.title}}</h5>
                <!-- <p class="card-text">Category: {{boilerplate.category.name}}</p>
                <p class="card-text">Organization: {{boilerplate.organization.name}}</p> -->
                <p class="card-text">Text: {{boilerplate.text}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
</style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        id: "",
        organization_id: "",
        category_id: "",
        title: "",
        text: "",
        wordcount: "",
        errors: [],

        currentBoilerplate: {},
        boilerplates: []
      };
    },
  created: function() {
    axios
      .get("/api/boilerplates")
      .then(response => {
        this.categories = response.data;
      });

    axios
      .get("/api/users")
      .then(response => {
        this.users = response.data;
      });
  },
  methods: {
    createBoilerplate: function() {
      var clientParams = {
      organization_id: this.organizationId,
      category_id: this.categoryId,
      title: this.title,
      text: this.text,
      wordcount: this.wordcount
    };

    axios
      .post("/api/boilerplates/", clientParams)
      .then(response => {
        this.$router.push("/boilerplates/" + response.data.id);
      }).catch(error => {
        this.errors = error.response.data.
          errors;
        this.status = error.response.status;
      });
    }
  }
};


</script>