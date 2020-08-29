<template>
  <div class="organizations-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Library to View and Edit <span class="text-primary">Saved</span> Organizations.
                </h2>
                <p class="lead text-white-gray">
                    Click on any tile to open a saved organization, view, and edit.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">08</h3>
                    </div> 
                    <h4>Organizations</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container my-4">
      
      <div class="row mb-4"></div>
      <form class="col-6 offset-3"
      v-on:submit.prevent="createOrganization()">
        <h1 class="text-center mb-5">New Organization</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Organization Name </label>
          <input class="form-control" type="text" v-model="name">
        </div>

        <input class="btn btn-info" type="submit" value="Add New Organization">
      </form>
    </div>

    <div class="container my-4">
      <h1 class="text-center mb-5">Organizations</h1>
      <div class="row">
        <div class="col-sm-4 mb-2" v-for="organization in organizations">
          <router-link v-bind:to="'/organizations/' + organization.id">
            <div class="card">
              <div class="card-body text-info">
                <h5 class="card-name">{{organization.name}}</h5>
              </div>
            </div>
          </router-link>
          <div>
            <button v-on:click="organization.showEditOrganizationForm = !organization.showEditOrganizationForm">Edit Organization</button>

            <div v-if="organization.showEditOrganizationForm">
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
                        <button class="btn btn-info m-2" v-on:click="destroyOrganization()">Delete</button>
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
        organizations: [],
        id: "",
        name: "",
        errors: []
      };
      showEditOrganizationForm: false
    },
  created: function() {
    axios
    .get("/api/organizations/")
    .then(response => {
      this.organizations = response.data;
    });
  },
  methods: {
    createOrganization: function() {
        var clientParams = {
        name: this.name
      };

      axios
        .post("/api/organizations/", clientParams)
        .then(response => {
          this.$router.push("/organizations");
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          this.status = error.response.status;
        });
      },
    destroyOrganization: function() {
      axios
        .delete("/api/organizations/" + this.$route.params.id)
        .then(response => {
          this.$router.push("/organizations/");
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
        }
      }
    };


</script>
