<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">                 
                <div class="card bg-secondary shadow border-0">
                    <!-- <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
                    </div> -->
                    <div class="card-body px-lg-5 py-lg-5">
                        <transition name="slide-fade">
                            <base-alert class="mensaje" :type="mensaje.tipoMensaje" ref="mensaje"  v-if="mensaje.show"><strong>{{mensaje.mensaje}}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="mensaje.show=false">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </base-alert>
                        </transition>
                       <!--  <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div> -->                        
                        <form role="form">                            
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Correo"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Contraseña"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <!-- <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox> -->
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="ingresar">Ingresar</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6" @click="modals.modal3 = true">
                        <a href="#" class="text-light"><small><strong>Olvido su Contraseña?</strong></small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/identifcacion/register" class="text-light"><small><strong>Registrarse</strong></small></router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
            <modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                
                <template> 
                    <div class="col-ms-6" @click="modals.modal3 = true">
                        <small><strong>Le enviaremos el formulario de recuperar contraseña al siguente correo</strong></small>
                    </div>
                    <transition name="slide-fade">
                            <base-alert class="mensaje" :type="mensaje.tipoMensaje" ref="mensaje"  v-if="mensaje.show"><strong>{{mensaje.mensaje}}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="mensaje.show=false">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </base-alert>
                        </transition>                   
                    <form role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Correo"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click="recuperarContrasena">Recuperar</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
    </div>
        </div>           
</template>
<script>

  import axios from 'axios'
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        },
        modals:{
            modal3: false
        },
        mensaje:{
            mensaje: `Respuesta enviada.`,
            show: false,
            tipoMensaje: ""
        }
      }
    },
    methods:{
        ingresar: async function(){
            if(this.model.password==""||this.model.email==""){
                this.mostrarMensaje("Ingrese sus datos","warning")
                return false                
            }
            if(!this.model.password.length >= 8){
                this.mostrarMensaje("Contraseña muy corta","warning")
                return false
            }
            if(!this.validarEmail(this.model.email)){
                this.mostrarMensaje("Ingrese un correo valido","warning")
                return false
            }
            let datos={
                "email":this.model.email,
                "password":this.model.password
            }
            try {
                const resPost = await axios.post('http://159.203.124.21:3000/sessions',datos)
                if(resPost.status != 200){
                    this.mostrarMensaje("Credenciales invalidas","warning")
                }else{                        
                    const resAfiliado = await axios('http://159.203.124.21:3000/suscriptores/correo/'+ resPost.data.user.email)
                    localStorage.setItem('afiliado', JSON.stringify(resAfiliado)) 
                    const resConyugue = await axios.get('http://159.203.124.21:3000/conyugues/'+ resAfiliado.data.cedula) 
                    localStorage.setItem('conyugue', JSON.stringify(resConyugue)) 
                    const resHeredero = await axios.get('http://159.203.124.21:3000/herederos/'+ resAfiliado.data.cedula) 
                    localStorage.setItem('heredero', JSON.stringify(resHeredero))
                    localStorage.setItem('token',resPost.data.jwt)
                    localStorage.setItem('usuario',JSON.stringify(resPost.data.user))
                    const resGet = await axios('http://159.203.124.21:3000/funcionalidadesRol/menu/'+ resPost.data.user.id_rol)
                    localStorage.setItem('menu',JSON.stringify(resGet.data))
                    this.$router.push('/')
                }                
            } catch (error) {
                this.mostrarMensaje("Error de conexión","warning")
                console.log(error)
            }
        },
        mostrarMensaje(texto, tipo){
            this.mensaje.tipoMensaje = tipo
            this.mensaje.mensaje = texto
            this.mensaje.show = true
            setTimeout(() => {if(this.mensaje.show) {this.mensaje.show = this.mensaje.false}} ,4000)                   
        },
        validarEmail(valor) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(valor)        
        },
        recuperarContrasena: async function(){
            if(this.model.email == ""){                
                this.mostrarMensaje("Ingrese su correo","warning")
                return false
            }
            if(!this.validarEmail(this.model.email)){
                this.mostrarMensaje("Ingrese un correo valido","warning")
                return false
            }
            try {
                const resGet = await axios('http://159.203.124.21:3000/users/restaurar/'+ this.model.email)
               if(resGet.status != 200){
                    this.mostrarMensaje("Correo no registrado","warning")
                }else{
                    this.mostrarMensaje("Revise su correo para recuperar su contraseña","success")
                    setTimeout(() => {this.$router.push({path:'/'})},3000)
                }                
            } catch (error) {
                this.mostrarMensaje("Error de conexión","info")
                console.log(error)
            }
        }
    }
  }
</script>
<style>
    .mensaje {
        text-align: center;
    }
</style>
