<template>
  <div class="funding-orgs-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Library to View and Edit <span class="text-primary">Saved</span> Funding Organizations.
                </h2>
                <p class="lead text-white-gray">
                    Click on any tile to open a saved funding organization, view, and edit.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">08</h3>
                    </div> 
                    <h4>Funding Organizations</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container my-4">
      
      <div class="row mb-4"></div>
      <form class="col-6 offset-3"
      v-on:submit.prevent="createFundingOrg()">
        <h1 class="text-center mb-5">New Funding Organization</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Funding Organization Name </label>
          <input class="form-control" type="text" v-model="name">
        </div>

        <div class="form-group">
          <label>Funding Organization Website </label>
          <input class="form-control" type="text" v-model="website">
        </div>

        <div class="form-group col-md-6">
          Organization
          <select v-model="organization_id">
            <option value="">Select an Organization</option>
            <option v-bind:value="organization.id" v-for="organization in organizations">{{organization.name}}
            </option>
          </select>
        </div>

        <input class="btn btn-info" type="submit" value="Add New Funding Organization">
      </form>
    </div>

    <div class="container my-4">
      <h1 class="text-center mb-5">Funding Organizations</h1>
      <div class="row">
        <div class="col-sm-4 mb-2" v-for="funding_org in funding_orgs">
          <router-link v-bind:to="'/funding_orgs/' + funding_org.id">
            <div class="card">
              <div class="card-body text-info">
                <h5 class="card-name">{{funding_org.name}}</h5>
              </div>
            </div>
          </router-link>
          <div>
            <button v-on:click="funding_org.showEditFundingOrgForm = !funding_org.showEditFundingOrgForm">Edit Funding Organization</button>

            <div v-if="funding_org.showEditFundingOrgForm">
                  <div class="container my-4">
                    <div class="row">
                      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateFundingOrg()">
                        <h1 class="text-center mb-5">Edit Funding Organization</h1>
                        <ul>
                          <li class="text-danger" v-for="error in errors">{{ error }}</li>
                        </ul>

                        <div class="form-group">
                          <label>Funding Organization Name: </label>
                          <input class="form-control" type="text" v-model="funding_org.name">
                        </div>

                        <input class="btn btn-info m-2" type="submit" value="Save">
                        <button class="btn btn-info m-2" v-on:click="destroyFundingOrg()">Delete</button>
                      </form>

                    </div>
                  </div>
            </div>
          </div>
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
        funding_orgs: [],
        organizations: [],
        id: "",
        name: "",
        organization_id: "",
        website: "",
        errors: []
      };
      showEditFundingOrgForm: false
    },
  created: function() {
    axios
    .get("/api/funding_orgs/")
    .then(response => {
      this.funding_orgs = response.data;
    });
    axios
    .get("/api/organizations/")
    .then(response => {
      this.organizations = response.data;
      console.log(response.data);
    })
  },
  methods: {
    createFundingOrg: function() {
        var clientParams = {
        name: this.name,
        organization_id: this.organization_id,
        website: this.website
      };

      axios
        .post("/api/funding_orgs/", clientParams)
        .then(response => {
          this.funding_orgs.push(response.data);
          this.name = "";
          this.organization_id = "";
          this.website = "";
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          this.status = error.response.status;
        });
      },
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

