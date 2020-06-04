<template>
  <div class="boilerplates-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Saved <span class="text-primary">Boilerplates</span>.
                </h2>
                <p class="lead text-white-gray">
                    View saved boilerplate text organized by category or wordcount. Save text from successful grant applications, donor materials, shareholder reports, and your website. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">03b</h3>
                    </div> 
                    <h4>View Saved Boilerplate</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container my-4">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h2 class="text-center">Title: {{boilerplate.title}}</h2>
          <h4 class="text-justify">Boilerplate Text: {{boilerplate.text}}</h4>
          <h4 class="text-justify">Boilerplate Organization: {{boilerplate.organization.name}}</h4>
          <h4 class="text-justify">Boilerplate Category: {{boilerplate.category.name}}</h4>
        </div>
      </div> 
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <router-link class="btn btn-info m-2" v-bind:to="'/boilerplates/' + boilerplate.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyBoilerplate()">Delete</button>
        </div>
      </div>
    </div>

  </div>

</template>

<style></style>

<script>
  var axios = require('axios');

  export default {
    data: function() {
      return {
        boilerplate: {}
  };
},
created: function() {
  axios 
    .get("/api/boilerplates/" + this.$route.params.id)
    .then(response => {
      this.boilerplate = response.data
    });
},
methods: {
  destroyBoilerplate: function() {
    axios
      .delete("/api/boilerplates/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/boilerplates");
      });
  }
},
watch: {
  $route: function() {
    axios
    .get("/api/boilerplates/" + this.$route.params.id)
    .then(response => {
      this.boilerplate = response.data;
    });
  }
}  
};

</script>