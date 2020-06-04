<template>
  <div class="organizations-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Saved <span class="text-primary">Organizations.</span>
                </h2>
                <p class="lead text-white-gray">
                    View saved organization profiles.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05c</h3>
                    </div> 
                    <h4>View Saved Organization</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
    
    <div class="container my-4 min-spacer">
       <div class="row">
         <div class="col-md-6 offset-md-3">
          <h2 class="text-center">Organization Name:</h2>
          <h4 class="text-center">{{organization.name}}</h4>
  <!--         need method for user id, category -->
          <div class="row">
            <div class="mx-auto col-md-12">
              <router-link class="btn btn-info m-2" v-bind:to="'/organizations/' + organization.id + '/edit'">Edit</router-link>
              <button class="btn btn-info m-2" v-on:click="destroyOrganization()">Delete</button>
          </div>
        </div>
      </div>
    </div> 
  </div>


  </div>

</template>

<style scoped>
.min-spacer {
  min-height: 200px;
}
</style>

<script>
  var axios = require('axios');

  export default {
    data: function() {
      return {
        organization: {
          id: "",
          name: ""
    }
  };
},
created: function() {
  axios 
    .get("/api/organizations/" + this.$route.params.id)
    .then(response => {
      this.organization = response.data
    });
},
methods: {
  destroyOrganization: function() {
    axios
      .delete("/api/organizations/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/organizations");
      });
  }
},
watch: {
  $route: function() {
    axios
    .get("/api/organizations/" + this.$route.params.id)
    .then(response => {
      this.organization = response.data;
    });
  }
}  
};

</script>