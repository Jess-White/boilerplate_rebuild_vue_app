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
            <h4 class="text-center">Organization Name: {{grant.organization_name}}</h4>

            <h4 class="text-center">Funding Organization: {{grant.funding_org_name}}</h4>
            <h4 class="text-center">Funding Organization RFP Webpage: {{grant.rfp_url}}</h4>        
            <h4 class="text-center">Deadline: {{grant.deadline}}</h4>
            <h4 class="text-center">Date Submitted: {{grant.submitted}}</h4>
            <h4 class="text-center">Organization: {{grant.organization_id}}</h4>

            <h4>Sections</h4>
            <ul >
              <li v-for="section in grant.sections" :key="section.id">{{section}}</li>
            </ul>

            <h4>Reports</h4>
              <ul >
                <li v-for="report in grant.reports" :key="report.id">{{report}}</li>
              </ul>

            <div>
              <button v-on:click="showEditGrantFormMethod()">Edit Grant</button>
             </div>
          </div>
          <div v-if="showEditGrantForm">
            <div class="pt100 pb50 bg-dark">
                <div class="container">
                    <div class="row align-items-center">
                    <div class="col-lg-8 mr-auto pb50 ml-auto">
                        <div class="experience-card clearfix">
                            <h4>Edit Grant</h4>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="container my-4">
              <div class="row">
                <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateGrant()">
                  <h1 class="text-center mb-5">Edit Grant</h1>
                  <ul>
                    <li class="text-danger" v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="form-group">
                    <label>Grant Title: </label>
                    <input class="form-control" type="text" v-model="grant.title">
                  </div>
                  <div class="form-group">
                    <label>RFP Webpage: </label>
                    <input class="form-control" type="text" v-model="grant.rfp_url">
                  </div>
                  <div class="form-group">
                    <label>Deadline: </label>
                    <input class="form-control" type="text" v-model="grant.deadline">
                  </div>
                  <div class="form-group">
                    <label>Purpose: </label>
                    <input class="form-control" type="text" v-model="grant.purpose">
                  </div>
                  <div class="form-group col-md-6">
                    Organization
                    <select v-model="grant.organization_id">
                      <option value="this.grant.organization_id">{{this.grant.organization_id}}</option>
                      <option v-bind:value="organization.id" v-for="organization in organizations">{{organization.name}}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    Funding Org
                    <select v-model="grant.funding_org_id">
                      <option value="this.grant.funding_org_id">{{this.grant.funding_org_id}}</option>
                      <option v-bind:value="funding_org.id" v-for="funding_org in funding_orgs">{{funding_org.name}}
                      </option>
                    </select>
                  </div>
                  <input class="btn btn-info m-2" type="submit" value="Save">
                </form>
             </div>
          </div>
        </div>
          <div>
              <div class="card text-center section-editor">
              <div class="card-header">
                <h1>Method One</h1>
                <ul class="nav nav-tabs card-header-tabs">
                  <li class="nav-item" v-for="section in grant.sections" >
                    <!-- <span class="nav-link tab-text" :class="{active: section == currentSection}" @click="currentSection = section">{{ section.display_category }}</span> -->
                    {{section}}
                  </li>
                </ul>
              </div>
                <div class="card-body row">
                <div class="col-md-3 offset-md-1">
                  <h4 class="text-center mb-5">Choose a Boilerplate</h4>
                <div>
                <div class="form-group">
                  <select class="form-control" v-model="currentBoilerplate" @change="handleChange">
                    <option v-for="boilerplate in boilerplates" :value="boilerplate"> {{ boilerplate.text}} </option>
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
              <form v-on:submit.prevent="createSection()">
                <div class="form-group">
                  <label>Section Title </label>
                  <input class="form-control" type="text" v-model="title">
                </div>
                <div class="form-group">
                  <label>Section Text </label>
                  <textarea class="form-control" type="text" v-model="text"></textarea>
                  {{text}}
                  {{title}}
                </div>
                <div class="form-group">
                  <label>Section Sort Order </label>
                  <input class="form-control" type="integer" v-model="sort_order">
                </div>
                <input class="btn btn-info" type="submit" value="Add New Section">
              </form>
              <!-- <form>
                <h1>Top Text Box</h1>
                <h4 class="text-center mb-5">{{ currentSection.display_category }}</h4>
                <div class="form-group">
                  <textarea class="form-control" v-model="currentSection.content" rows="15"></textarea>
                </div>
              </form>
              <h5 class="card-title">{{ currentSection.display_category }}</h5>
              <div>
                <h1>Bottom Text Box</h1>
                <textarea 
                class="card-text" 
                v-on:input="currentSection.changed = true"  
                v-model="currentSection.content" 
                rows="15" 
                >
                </textarea>
              </div> -->
              <!-- <div>
                <button class="btn" :class="{'btn-danger': currentSection.changed, 'btn-primary': !currentSection.changed}" @click="updateSection(currentSection)">
                  Save This Section
                </button>
              </div> -->
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
var axios = require("axios");
export default {
  data: function () {
    return {
      grant: {
        id: "",
        organization_id: "",
        organization_name: "",
        title: "",
        funding_org_id: "",
        funding_org_url: "",
        funding_org_name: "",
        rfp_url: "",
        deadline: "",
        submitted: "",
        successful: "",
        purpose: "",
        errors: [],
        sections: [],
        reports: [],
      },
      currentSection: { text: "" },
      currentBoilerplate: "",
      boilerplates: [],
      text: "",
      title: "",
      sort_order: "",
      showEditGrantForm: false,
      errors: [],
    };
  },
  created: function () {
    axios.get("/api/grants/" + this.$route.params.id).then((response) => {
      this.grant = response.data;
      console.log(response.data);
      // console.log(this.grant);
      // console.log(this.grant.sections);
      // this.currentSection = response.data.sections[0];
    });
    axios.get("/api/boilerplates").then((response) => {
      this.boilerplates = response.data;
      // console.log(response.data);
    });
    axios.get("/api/organizations/").then((response) => {
      this.organizations = response.data;
      // console.log(response.data);
    });
    axios.get("/api/funding_orgs/").then((response) => {
      this.funding_orgs = response.data;
      // console.log(response.data);
    });
  },
  methods: {
    destroyGrant: function () {
      axios.delete("/api/grants/" + this.$route.params.id).then((response) => {
        this.$router.push("/grants");
      });
    },
    updateGrant: function () {
      var clientParams = {
        title: this.grant.title,
        organization_id: this.grant.organization_id,
        funding_org_id: this.grant.funding_org_id,
        rfp_url: this.grant.rfp_url,
        deadine: this.grant.deadline,
        purpose: this.grant.purpose,
      };
      const jwt = localStorage.getItem("jwt");
      axios
        .patch("/api/grants/" + this.$route.params.id, clientParams, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          this.$router.push("/grants/");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$router.push("/login/");
          }
          this.grant.errors = error.response.data.errors;
        });
    },
    showEditGrantFormMethod: function () {
      this.showEditGrantForm = !this.showEditGrantForm;
    },
    createSection: function () {
      var clientParams = {
        grant_id: this.grant.id,
        title: this.title,
        text: this.text,
        sort_order: this.sort_order,
      };
      axios
        .post("/api/sections/", clientParams)
        .then((response) => {
          this.grant.sections.push(response.data);
          this.title = "";
          this.text = "";
          this.sort_order = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    updateSection: function (inputSection) {
      var clientParams = {
        content: inputSection.content,
      };

      axios
        .patch("/api/sections/" + inputSection.id, clientParams)
        .then((response) => {
          console.log(response.data);
          this.currentSection.changed = false;
        });
    },
    handleChange: function () {
      this.text += this.currentBoilerplate.text;
    },
    addBoilerplate: function (inputSection) {
      var clientParams = {
        text: inputSection.text,
      };

      axios
        .patch("/api/sections/" + inputSection.id, clientParams)
        .then((response) => {
          console.log(response.data);
          if (this.currentSection.text === null) {
            this.currentSection.text = this.currentBoilerplate.text;
          } else {
            this.currentSection.text += this.currentBoilerplate.text;
          }
        });
    },
    finalizeGrant: function () {
      axios.get("/api/grants/" + this.$route.params.id).then((response) => {
        this.$router.push("/grants/" + this.$route.params.id + "/finalize");
      });
    },
    printableGrant: function () {
      axios.get("/api/grants/" + this.$route.params.id).then((response) => {
        this.$router.push("/grants/" + this.$route.params.id + "/printable");
      });
    },
    reuseGrant: function () {
      axios
        .get("/api/grants/" + this.$route.params.id + "/copy")
        .then((response) => {
          this.$router.push("/grants/" + response.data.id);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          console.log((this.status = error.response.status));
        });
    },
  },
  watch: {
    $route: function () {
      axios.get("/api/grants/" + this.$route.params.id).then((response) => {
        this.grant = response.data;
      });
    },
  },
};
</script>







