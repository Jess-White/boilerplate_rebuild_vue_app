<template>
  <div class="dashboard">
    
    <div>
      <h3>Recent Grants:</h3>
      <h3>Recent Reports:</h3>
      <h3>Your Organizations:</h3>
      <ul v-for="organization in currentUser.organization_users">
        <li>{{ organization.organization_name }}</li>
      </ul>


    </div>

    <div>
      <h3>User First Name: {{ currentUser.first_name }}</h3>
      <h3>User Last Name: {{ currentUser.last_name }}</h3>
      <h3>User email: {{ currentUser.email }}</h3>
    </div>

    <div class="container my-4">
              <div class="row">
                <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="createOrganizationUser()">
                  <h1 class="text-center mb-5">Select an Organization</h1>
                  <!-- <ul>
                    <li class="text-danger" v-for="error in errors">{{ error }}</li>
                  </ul> -->
                  <!-- <div class="form-group col-md-6"> -->
                    <select v-model="organization_id">
                      <!-- <option value="this.organization.id">{{this.organization_id}}</option> -->
                      <option v-bind:value="organization.id" v-for="organization in organizations">{{organization.name}}
                      </option>
                    </select>
                  <!-- </div> -->
                  <input class="btn btn-info m-2" type="submit" value="Save">
                </form>
             </div>
          </div>


  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      currentUser: {},
      organizations: [],
      organization_id: "",
    };
  },
  created: function () {
    axios
      .get("api/users/" + localStorage.getItem("user_id"))
      .then((response) => {
        this.currentUser = response.data;
        console.log(response.data);
      });
    axios.get("/api/organizations/").then((response) => {
      this.organizations = response.data;
      // console.log(response.data);
    });
  },
  methods: {
    createOrganizationUser: function () {
      var clientParams = {
        organization_id: this.organization_id,
        user_id: this.currentUser.id,
      };
      axios
        .post("/api/organization_users/", clientParams)
        .then((response) => {
          this.currentUser.organization_users.push(response.data);
          this.organization_id = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>