<template>
  <div class="bios-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Saved <span class="text-primary">Staff Bios</span>For Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    View saved staff bios for your organization.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05b</h3>
                    </div> 
                    <h4>View Saved Bio</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Name: {{bio.first_name}} {{bio.last_name}}</h4>
        <h4 class="text-center">Title: {{bio.title}}</h4>
        <h4 class="text-center">Bio: {{bio.bio}}</h4>
        <h4 class="text-center">Organization: {{bio.organization_id}}</h4>
       </div>
       <div>
          <router-link class="btn btn-info m-2" v-bind:to="'/bios/' + bio.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyBio()">Delete</button>
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
        bio: {
          id: "",
          organizationId: "",
          first_name: "",
          last_name: "",
          text: "",
          errors: []
        }
      };
    },
    created: function() {
      axios 
        .get("/api/bios/" + this.$route.params.id)
        .then(response => {
          this.bio = response.data
        });
    },
    methods: {
      destroyBio: function() {
        axios
          .delete("/api/bios/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/bios");
          });
      }
    },
    watch: {
      $route: function() {
        axios
        .get("/api/bios/" + this.$route.params.id)
        .then(response => {
          this.bios = response.data;
        });
      }  
    }
};
</script>