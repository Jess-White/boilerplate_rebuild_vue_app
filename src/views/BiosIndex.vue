<template>
  <div class="bios-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    We're a small <span class="text-primary">Archi</span>tecture Studio.
                </h2>
                <p class="lead text-white-gray">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">06</h3>
                    </div> 
                    <h4>Bios Library</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container pt100 pb50">

    <h1 class="text-center mb-5">Bios</h1>
    <div class="row">



      <div class="col-md-4 mb50" v-for="bio in bios">

      <router-link v-bind:to="'/bios/' + bio.id">

        <div class="testimonial-card testimonial testimonial-col">

        <div class="card">

          <div class="card-body text-info">
            <h5 class="card-name">{{bio.first_name}} {{bio.last_name}}</h5>
                        <!-- need to add organization -->
            <p class="card-text">{{bio.text}}</p>
            <p class="card-text">{{bio.organization_id}}</p>
          </div>
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
        bios: []
      };
    },
  created: function() {
    axios
    .get("/api/bios")
    .then(response => {
      this.bios = response.data;
    });
  },
  methods: {}
};


</script>