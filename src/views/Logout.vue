

<template>
  <div class="logout">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Form to <span class="text-primary">Logout</span> of Your User Profile.
                </h2>
                <p class="lead text-white-gray">
                    
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">10c</h3>
                    </div> 
                    <h4>User Logout</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    
    this.$parent.userEmail = '';
    localStorage.removeItem("jwt");

    this.$router.push("/login");
  }
};
</script>