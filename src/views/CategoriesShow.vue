<template>
  <div class="categories-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Each Saved<span class="text-primary">Category</span>For Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    View saved categories for your organization.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05b</h3>
                    </div> 
                    <h4>View Saved Category</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Name: {{category.name}}</h4>
        <h4 class="text-center">Organization: {{category.organization_id}}</h4>
       </div>
       <div>
         <button v-on:click="showEditCategoryFormMethod()">Edit Category</button>
          <button class="btn btn-info m-2" v-on:click="destroyCategory()">Delete</button>
        </div>
     </div> 

     <div v-if="showEditCategoryForm">
       <div class="pt100 pb50 bg-dark">
           <div class="container">
               <div class="row align-items-center">
               <div class="col-lg-8 mr-auto pb50 ml-auto">
                   <div class="experience-card clearfix">
                       <h4>Edit Category</h4>
                   </div>
               </div>
           </div>
           </div>
       </div>

       <div class="container my-4">
         <div class="row">
           <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateCategory()">
             <h1 class="text-center mb-5">Edit Category</h1>
             <ul>
               <li class="text-danger" v-for="error in errors">{{ error }}</li>
             </ul>

             <div class="form-group">
               <label>Category Name: </label>
               <input class="form-control" type="text" v-model="category.name">
             </div>

             <div class="form-group col-md-6">
               Organization
               <select v-model="category.organization_id">
                 <option value="this.category.organization_id">{{this.category.organization_id}}</option>
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

<style></style>

<script>
var axios = require('axios');

  export default {
    data: function() {
      return {
        category: {
          id: "",
          name: "",
          organization_id: "",
          errors: []
        },
        showEditCategoryForm: false,
        organizations: []
      };
    },
    created: function() {
      axios 
        .get("/api/categories/" + this.$route.params.id)
        .then(response => {
          this.category = response.data
        });
      axios
      .get("/api/organizations/")
      .then(response => {
        this.organizations = response.data;
        console.log(response.data);
      })
    },
    methods: {
      destroyCategory: function() {
        axios
          .delete("/api/categories/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/categories");
          });
      },
    updateCategory: function() {
      var clientParams = {
        name: this.category.name,
        organization_id: this.category.organization_id
      };

    const jwt = localStorage.getItem("jwt")
    axios
    .patch("/api/categories/" + this.$route.params.id, clientParams, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    .then(response => {
      this.$router.push("/categories/");
    }).catch(error => {
      if (error.response.status === 401) {
        this.$router.push("/login/");
      }
      this.errors = error.response.data.errors;
    });
    },
    showEditCategoryFormMethod: function () {
      this.showEditCategoryForm = !this.showEditCategoryForm;
    }
  },
    watch: {
      $route: function() {
        axios
        .get("/api/categories/" + this.$route.params.id)
        .then(response => {
          this.categories = response.data;
        });
      }  
    }
};
</script>