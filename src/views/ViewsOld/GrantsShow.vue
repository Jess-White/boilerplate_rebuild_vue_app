<template>
  <div class="grants-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Saved <span class="text-primary">Grants</span>.
                </h2>
                <p class="lead text-white-gray">
                    View saved grants.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">03b</h3>
                    </div> 
                    <h4>View Saved Grant</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container my-4">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h2 class="text-center">Title: {{grant.title}}</h2>
          <h4 class="text-justify">RFP URL: {{grant.rfp_url}}</h4>
          <h4 class="text-justify">Deadline: {{grant.deadline}}</h4>
        </div>
        <div class="col-sm-4 mb-2" v-for="section in grant.sections">
            <div>Test Div</div>
            <div class="card">
              <div class="card-body text-info">
                <h4 class="text-justify">Section Title: {{section.title}}</h4>
                <p class="card-text">Text: {{section.text}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div> 
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <router-link class="btn btn-info m-2" v-bind:to="'/grants/' + grant.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyGrant()">Delete</button>
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
        grant: {},
  };
},
created: function() {
  axios 
    .get("/api/grants/" + this.$route.params.id)
    .then(response => {
      this.grant = response.data
    });
},
methods: {
  destroyGrant: function() {
    axios
      .delete("/api/grants/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/grants");
      });
  }
},
watch: {
  $route: function() {
    axios
    .get("/api/grants/" + this.$route.params.id)
    .then(response => {
      this.grant = response.data;
    });
  }
}  
};

</script>