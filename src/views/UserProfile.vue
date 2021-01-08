<template>
    <div>
        <base-header class="header pb-4 pt-5 pt-lg-4 d-flex align-items-center"
                     style="min-height: 450px; background-image: url(img/theme/Yoco.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Bienvenido {{model.firstName}}</h1>
                        <p class="text-white mt-0 mb-5">Este es tu perfil, aqui podras modificar tus datos personales, agregar tus datos bancarios, agregar un conyugue(si aplica) y un heredero</p>
                        <!-- <a href="#!" class="btn btn-info">Editar perfil</a> -->
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <!-- <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img src="img/theme/Perfi2.jpg" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <base-button size="sm" type="info" class="mr-4">Connect</base-button>
                                <base-button size="sm" type="default" class="float-right">Message</base-button>
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <span class="heading">22</span>
                                            <span class="description">Auspiciados</span>
                                        </div>
                                        <div>
                                            <span class="heading">10</span>
                                            <span class="description">Photos</span>
                                        </div>
                                        <div>
                                            <span class="heading">89</span>
                                            <span class="description">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>
                                    Pedro Orellana<span class="font-weight-light">, 27</span>
                                </h3>
                                <div class="h5 font-weight-300">
                                    <i class="ni location_pin mr-2"></i>Bucharest, Romania
                                </div>
                                <div class="h5 mt-4">
                                    <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                                </div>
                                <div>
                                    <i class="ni education_hat mr-2"></i>University of Computer Science
                                </div>
                                <hr class="my-4" />
                                <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                                <a href="#">Show more</a>
                            </div>
                        </div>
                    </div>
                </div>
 -->
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8 text-left">                                    
                                    <h2 class="text-muted mb-1">Datos</h2>
                                </div>
                                <!-- <div class="col-4 text-left">
                                    <a href="#!" class="btn btn-sm btn-primary">Actualizar</a>
                                </div> -->
                            </div>
                        </div>
                        <template>
                            <div>                                
                                <tabs :fill="false">   
                                    <tab-pane>
                                        <span slot="title" class="nav-link-icon d-block">Personales</span>
                                        <datos-personales></datos-personales>
                                    </tab-pane>
                                    <tab-pane>
                                        <span slot="title" class="nav-link-icon d-block">Conyugue</span>
                                        <datos-conyugue></datos-conyugue>
                                    </tab-pane>
                                    <tab-pane>
                                        <span slot="title" class="nav-link-icon d-block">Heredero</span>
                                        <datos-heredero></datos-heredero>
                                    </tab-pane><tab-pane>
                                        <span slot="title" class="nav-link-icon d-block">Bancarios</span>
                                        <datos-bancarios></datos-bancarios>
                                    </tab-pane>
                                </tabs>
                            </div>                            
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DatosPersonales from './Perfil/DatosPersonales.vue';
import DatosConyugue from './Perfil/DatosConyugue.vue';
import DatosHeredero from './Perfil/DatosHeredero.vue';
import DatosBancarios from './Perfil/DatosBancarios.vue';

  export default {
    components: {
      DatosPersonales,
      DatosConyugue,
      DatosHeredero,
      DatosBancarios
    },
    name: 'user-profile',
    data() {
      return {
        model: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
        }
      }
    },
    beforeMount(){
        this.model.firstName = JSON.parse(localStorage.getItem('afiliado')).data.nombre 
    }
  };
</script>
<style></style>
