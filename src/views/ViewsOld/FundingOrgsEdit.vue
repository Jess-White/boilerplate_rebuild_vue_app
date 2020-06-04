<template>
  <div class="funding-orgs-edit">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to <span class="text-primary">Edit</span> Funding Organizations.
                </h2>
                <p class="lead text-white-gray">
                    Edit and update saved funding organizations.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">07b</h3>
                    </div> 
                    <h4>Edit Funding Organizations</h4>
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
            <label>Funding Organization Name: </label>
            <input class="form-control" type="text" v-model="funding_org.name">
          </div>

          <div class="form-group">
            <label>Funding Organization Website: </label>
            <input class="form-control" type="text" v-model="funding_org.website">
          </div>

          <input class="btn btn-info m-2" type="submit" value="Save">
          <button class="btn btn-info m-2" v-on:click="destroyFundingOrg()">Delete</button>
        </form>

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
      funding_org: {
        id: "",
        organization_id: "",
        name: "",
        website: ""
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/funding_orgs/" + this.$route.params.id)
      .then(response => {
        this.funding_org = response.data;
      });
  },
  methods: {
    destroyFundingOrg: function() {
      axios
        .delete("/api/funding_orgs/" + this.$route.params.id)
        .then(response => {
          this.$router.push("/funding_orgs/");
        });
    },
    updateFundingOrg: function() {
      var clientParams = {
        name: this.funding_org.name
      };

    const jwt = localStorage.getItem("jwt")
    axios
    .patch("/api/funding_orgs/" + this.$route.params.id, clientParams, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    .then(response => {
      this.$router.push("/funding_orgs/");
    }).catch(error => {
      if (error.response.status === 401) {
        this.$router.push("/login/");
      }
      this.errors = error.response.data.errors;
    });
    }
  }
};
</script>