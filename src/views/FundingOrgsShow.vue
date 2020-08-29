<template>
  <div class="funding-orgs-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Saved <span class="text-primary">Funding Organizations.</span>
                </h2>
                <p class="lead text-white-gray">
                    View saved funding organization profiles.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05c</h3>
                    </div> 
                    <h4>View Saved Funding Organization</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
    
    <div class="container my-4 min-spacer">
       <div class="row">
         <div class="col-md-6 offset-md-3">
          <h2 class="text-center">Funding Organization Name:</h2>
          <h4 class="text-center">{{funding_org.name}}</h4>
          <h2 class="text-center">Funding Organization Website:</h2>
          <h4 class="text-center">{{funding_org.website}}</h4>
          <h2 class="text-center">Funding Organization Organization:</h2>
          <h4 class="text-center">{{funding_org.organization_id}}</h4>
          <div class="row">
            <div class="mx-auto col-md-12">
              <button v-on:click="showEditFundingOrgFormMethod()">Edit Funding Org</button>
              <button class="btn btn-info m-2" v-on:click="destroyFundingOrg()">Delete</button>
          </div>
        </div>
      </div>
    </div> 
  </div>

  <div v-if="showEditFundingOrgForm">
       <div class="pt100 pb50 bg-dark">
           <div class="container">
               <div class="row align-items-center">
               <div class="col-lg-8 mr-auto pb50 ml-auto">
                   <div class="experience-card clearfix">
                       <h4>Edit Funding Org</h4>
                   </div>
               </div>
           </div>
           </div>
       </div>

       <div class="container my-4">
         <div class="row">
           <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateFundingOrg()">
             <h1 class="text-center mb-5">Edit Funding Org</h1>
             <ul>
               <li class="text-danger" v-for="error in errors">{{ error }}</li>
             </ul>

             <div class="form-group">
               <label>Funding Org Name: </label>
               <input class="form-control" type="text" v-model="funding_org.name">
             </div>

             <div class="form-group">
               <label>Funding Org Website: </label>
               <input class="form-control" type="text" v-model="funding_org.website">
             </div>

             <div class="form-group col-md-6">
               Organization
               <select v-model="funding_org.organization_id">
                 <option value="this.funding_org.organization_id">{{this.funding_org.organization_id}}</option>
                 <option v-bind:value="organization.id" v-for="organization in organizations">{{organization.name}}
                 </option>
               </select>
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
        funding_org: {
          id: "",
          name: "",
          website: "",
          organization_id: "",
    },
    organizations: [],
    showEditFundingOrgForm: false
  };
},
created: function() {
  axios 
    .get("/api/funding_orgs/" + this.$route.params.id)
    .then(response => {
      this.funding_org = response.data;
    });
  axios
  .get("/api/organizations/")
  .then(response => {
    this.organizations = response.data;
    console.log(response.data);
  })
},
methods: {
  destroyFundingOrg: function() {
    axios
      .delete("/api/funding_orgs/" + this.$route.params.id)
      .then(response => {
        this.$router.push("/funding_orgs");
      });
  },
updateFundingOrg: function() {
  var clientParams = {
    name: this.funding_org.name,
    website: this.funding_org.website,
    organization_id: this.funding_org.organization_id
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
  },
  showEditFundingOrgFormMethod: function () {
    this.showEditFundingOrgForm = !this.showEditFundingOrgForm;
    }
  },
  watch: {
    $route: function() {
      axios
      .get("/api/funding_orgs/" + this.$route.params.id)
      .then(response => {
        this.funding_orgs = response.data;
      });
    }
  }  
};

</script>