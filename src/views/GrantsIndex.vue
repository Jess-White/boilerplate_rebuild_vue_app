<template>
  <div class="grants-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Library to View and Edit <span class="text-primary">Saved</span> Grants.
                </h2>
                <p class="lead text-white-gray">
                    Click on any tile to open a saved grant, view and edit all sections, create pdfs, and reuse grant materials. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">02</h3>
                    </div> 
                    <h4>Saved Grants</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="container">
      
      <h1 class="text-center my-5">Grants</h1>
      <div class="row">
        <div class="col-sm-4 mb-2" v-for="grant in grants">
        <router-link v-bind:to="'/grants/' + grant.id">
          <div class="card">
            <div class="card-body text-info">
              <h5 class="card-name">{{grant.name}}</h5>
              <p class="card-text">{{grant.title}}</p>
              <p class="card-text">{{grant.purpose}}</p>
              <p class="card-text">{{grant.funding_org}}</p>
              <p class="card-text">{{grant.funding_org_rfp_webpage}}</p>
              <p class="card-text">{{grant.deadline}}</p>
              <p class="card-text">{{grant.date_submitted}}</p>
              <p class="card-text">{{grant.organization_id}}</p>

            </div>
          </div>
          </router-link>
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
        grants: []
      };
    },
  created: function() {
    axios
      .get("/api/grants")
      .then(response => {
        this.grants = response.data;
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.$router.push("/login/");
        };
        if (error.response.status === 500) {
          alert("server error")
        }
      });
  },
  methods: {
      destroyGrant: function() {
        axios
          .delete("/api/grants/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/");
          });
      },
      updateSection: function(inputSection) {
        var clientParams = { 
          content: inputSection.content
        };

        axios
          .patch("/api/sections/" + inputSection.id, clientParams)
          .then(response => {
            console.log(response.data);
            this.currentSection.changed = false;
          });
      },
      addBoilerplate: function(inputSection) {
        var clientParams = {
          content: inputSection.content
        };

        axios
          .patch("/api/sections/" + inputSection.id, clientParams)
          .then(response => {
            console.log(response.data);
            this.currentSection.content = this.currentSection.content + this.currentBoilerplate.boilerplate_text;
          });
      },
      finalizeGrant: function() {
        axios 
          .get("/api/grants/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/grants/" + this.$route.params.id + "/finalize");
          });
      },
      printableGrant: function() {
        axios 
          .get("/api/grants/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/grants/" + this.$route.params.id + "/printable");
          });
      },
      createPDF: function() {
        var doc = new jsPDF();
          doc.fromHTML($('#content').html(), 20, 20, {'width': 500});
          // "elementHandlers": specialElementHandlers
          doc.save('grant.pdf');
      }
    },
    watch:  {
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