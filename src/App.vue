<template>
  <div id="app">

    <header class='mobile-header'>
        <div class='clearfix container'>
            <div class='float-right'>
                <button class='menu-button'><i class='icon-menu'></i> Menu</button>
            </div>
        </div>
    </header><!--mobile header-->
    <section class="page-wrapper">
        <div class="page-content">

            <aside class="left-nav visible-desktop left-darknav">
                <div class="nav-container">
                    <div class="nav-parent">
                        <div class="row-brand text-center">
                          

                            <a href="index.html">
                                <!-- <font-awesome-icon :icon="['far', 'edit']" class="fa-10x text-info" /><br><br> -->
                                
                            </a><br>
                            
                            
                        </div>
                        <div class="row-navbar text-center">
                            <h1 class="text-info display-5">boilerplate</h1>
                            <br>
                            <ul class="list-unstyled verticle-nav">

                                <li><router-link to="/about">About</router-link></li>

                                <li><router-link to="/grants">Grants</router-link></li>

                                <li><router-link to="/boilerplates">Boilerplates</router-link></li>

                                <li><router-link to="/bios">Bios</router-link></li>

                                <li><router-link to="/organizations">Organizations</router-link></li>

                                <li><router-link to="/funding_orgs">Funding Orgs</router-link></li>

                                <li><router-link to="/categories">Categories</router-link></li>

                                <li><router-link to="/users/new">Sign Up</router-link></li>
                                
                                <li><router-link to="/login">Login</router-link></li>

                                <li><router-link to="/logout">Logout</router-link></li>
                            </ul>
                        </div>
                        <div class="row-social text-center">
                            <ul class="list-inline">
                                <li class="list-inline-item"><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li class="list-inline-item"><a href="#"><i class="fa fa-twitter"></i></a></li>
                                <li class="list-inline-item"><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                <li class="list-inline-item"><a href="#"><i class="fa fa-instagram"></i></a></li>
                                <li class="list-inline-item"><a href="#"><i class="fa fa-behance"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
            <main class="main-content">
                
                <router-view/>

                <footer class="footer bg-dark">
                    <div class="container"> 
                        <div class="row">
                            <div class="col-lg-4">
                                <h5>Call us today - +01 574-5832-583</h5>
                                <span>
                                    <a href="#" class="social-icon si-dark si-facebook si-dark-round">
                                        <i class="fa fa-facebook"></i>
                                        <i class="fa fa-facebook"></i>
                                    </a>
                                    <a href="#" class="social-icon si-dark si-twitter si-dark-round">
                                        <i class="fa fa-twitter"></i>
                                        <i class="fa fa-twitter"></i>
                                    </a>
                                    <a href="#" class="social-icon si-dark si-g-plus si-dark-round">
                                        <i class="fa fa-google-plus"></i>
                                        <i class="fa fa-google-plus"></i>
                                    </a>
                                    <a href="#" class="social-icon si-dark si-skype si-dark-round">
                                        <i class="fa fa-skype"></i>
                                        <i class="fa fa-skype"></i>
                                    </a>
                                </span>
                            </div>
                            <div class="col-lg-8 text-right">
                                <ul class="list-inline">
                                    <li class="list-inline-item">
                                        <a href="#">About us</a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="#">News</a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="#">Terms & conditions</a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="#">Privacy & policy</a> 
                                    </li>
                                </ul>
                                <span class="text-white-gray font300">&copy; Copyright 2014-2017. All Right Reserved</span>
                            </div>
                        </div>
                    </div>
                </footer><!--footer-->
            </main><!--main content-->
        </div>
    </section>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<script>
var axios = require('axios')

  export default {
    data: function() {
      return {
        userEmail: ""
      };
    },
    created: function() {
      const email = localStorage.getItem("userEmail");
      if (email) {
        this.userEmail = email;
      }
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      }
      console.log(axios.defaults.headers)
    }
  }

</script>


