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
              <button v-on:click="showEditOrganizationFormMethod()">Edit Organization</button>
              <button class="btn btn-info m-2" v-on:click="destroyOrganization()">Delete</button>
          </div>
        </div>
      </div>
    </div> 
  </div>

  <div v-if="showEditOrganizationForm">
    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <div class="experience-card clearfix">
                    <h4>Edit Organization</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container my-4">
      <div class="row">
        <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateOrganization()">
          <h1 class="text-center mb-5">Edit Organization</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>

          <div class="form-group">
            <label>Organization Name: </label>
            <input class="form-control" type="text" v-model="organization.name">
          </div>

          <input class="btn btn-info m-2" type="submit" value="Save">
        </form>

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
    },
      showEditOrganizationForm: false
  };
},
created: function() {
  axios 
    .get("/api/organizations/" + this.$route.params.id)
    .then(response => {
      this.organization = response.data;
      console.log(response.data);
      this.organization = response.data;
    });
},
methods: {
  destroyOrganization: function() {
    axios
      .delete("/api/organizations/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/organizations");
      });
  },
  updateOrganization: function() {
    var clientParams = {
      name: this.organization.name
    };

  const jwt = localStorage.getItem("jwt")
  axios
  .patch("/api/organizations/" + this.$route.params.id, clientParams, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  })
  .then(response => {
    this.$router.push("/organizations/");
  }).catch(error => {
    if (error.response.status === 401) {
      this.$router.push("/login/");
    }
    this.errors = error.response.data.errors;
  });
  },
  showEditOrganizationFormMethod: function () {
    this.showEditOrganizationForm = !this.showEditOrganizationForm;
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