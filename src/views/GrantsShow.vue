<template>
  <div class="grants-show">

    <div class="pt100 pb50 bg-dark">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 mr-auto pb50 ml-auto">
            <h2 class="h1 font300 text-white">
              Use This Section to Enter<span class="text-primary"> Grant Text.</span>
            </h2>
            <p class="lead text-white-gray">
              Choose Grant Text from the library and add it to each section. When you have added all of the text you need, hit Finalize Grant to view your draft. 
            </p>
            <div class="experience-card clearfix">
              <div class="experience-inner">
                <h3 class="experience-text">01b</h3>
              </div> 
              <h4>Grant Builder: Add Grant</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-4">
        <div class="row">
          <div class="col-md-6 offset-md-3 mb-4">
            <h4 class="text-center">Grant Name: {{grant.title}}</h4>
            <h4 class="text-center">Purpose: {{grant.purpose}}</h4>
            <h4 class="text-center">Funding Organization: {{grant.funding_org}}</h4>
            <h4 class="text-center">Funding Organization RFP Webpage: {{grant.rfp_url}}</h4>        
            <h4 class="text-center">Deadline: {{grant.deadline}}</h4>
            <h4 class="text-center">Date Submitted: {{grant.submitted}}</h4>
            <h4 class="text-center">Organization: {{grant.organization_id}}</h4>
          </div>

          <div>
            <div class="card text-center section-editor">
              <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                  <li class="nav-item" v-for="section in grant.sections" >
                    <span class="nav-link tab-text" :class="{active: section == currentSection}" @click="currentSection = section">{{ section.display_category }}</span>
                  </li>
                </ul>
              </div>

              <div class="card-body row">
                <div class="col-md-3 offset-md-1">
                  <h4 class="text-center mb-5">Choose a Boilerplate</h4>
                <div>

                <div class="form-group">
                  
                  <select class="form-control" v-model="currentBoilerplate">
                    <option v-for="boilerplate in boilerplates" :value="boilerplate"> {{ boilerplate.title}} </option>
                  </select>
                </div>
              </div>

              <p class="text-justify">
                {{ currentBoilerplate.text }}
              </p>

              <div>
                <button class="btn btn-info m-2" v-on:click="addBoilerplate(currentSection)">Add Boilerplate</button>
              </div>
            </div>

            <div class="col-md-8">
              <form>
                <h4 class="text-center mb-5">{{ currentSection.display_category }}</h4>
                <div class="form-group">
                  <textarea class="form-control" v-model="currentSection.content" rows="15"></textarea>
                </div>
              </form>

              <h5 class="card-title">{{ currentSection.display_category }}</h5>
              <div>
                <textarea 
                class="card-text" 
                v-on:input="currentSection.changed = true"  
                v-model="currentSection.content" 
                rows="15" 
                >
                </textarea>
              </div>

              <div>
                <button class="btn" :class="{'btn-danger': currentSection.changed, 'btn-primary': !currentSection.changed}" @click="updateSection(currentSection)">
                  Save This Section
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div>
        <router-link class="btn btn-info m-2" v-bind:to="'/grants/' + grant.id + '/edit'">Edit</router-link>
        <button class="btn btn-info m-2" v-on:click="destroyGrant()">Delete</button>

      </div>

      <div>
        <button class="btn btn-info m-2" v-on:click="finalizeGrant">Finalize Grant</button>

        <button class="btn btn-info m-2" v-on:click="printableGrant">Printable Grant</button>

        <button class="btn btn-info m-2" v-on:click="reuseGrant">Reuse Grant</button>

      </div>
    </div>
  </div>
</div> 
</template>

<style scoped>
.tab-text {
  font-size: 0.9rem;
}

.changed-red {
  border: solid red 1px;
}
.section-editor {
  min-height: 550px;
}
</style>

<script>
  var axios = require('axios');

  export default {
    data: function() {
      return {
        grant: {
          id: "",
          organization_id: "",
          title: "",
          funding_org_id: "",
          funding_org_url: "",
          funding_org_name: "",
          rfp_url: "",
          deadline: "",
          submitted: "",
          successful: "",
          purpose: ""
        },
        sections: [],
        currentSection: {text: ""},
        currentBoilerplate: {},
        boilerplates: []
  };
},
created: function() {
  axios 
    .get("/api/grants/" + this.$route.params.id)
    .then(response => {
      this.grant = response.data;
      // this.currentSection = response.data.sections[0];
    });
  axios
    .get("/api/boilerplates")
    .then(response => {
      this.boilerplates = response.data;
      console.log(response.data);
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
        if (this.currentSection.content === null) {
          this.currentSection.content = this.currentBoilerplate.boilerplate_text;
        } else {
          this.currentSection.content += this.currentBoilerplate.boilerplate_text;
        }
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
  reuseGrant: function() {
    axios 
      .get("/api/grants/" + this.$route.params.id + "/copy")
      .then(response => {
        this.$router.push("/grants/" + response.data.id);

      })
      .catch(error => {
                console.log(error.response.data.
                  errors);
                console.log(this.status = error.response.status);});
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