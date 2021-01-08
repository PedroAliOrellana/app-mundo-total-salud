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
                        <form role="form">
                            <base-input class="input-group-alternative"
                                        placeholder="Codigo de Confirmación"
                                        type="number"
                                        label="Codigo de confirmación (enviado al correo)"
                                        v-model="confirmacion.codigo">
                            </base-input>
                            <base-input class="input-group-alternative"
                                        placeholder="Contraseña"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="confirmacion.password"
                                        @blur="validar_clave(confirmacion.password)">
                            </base-input>
                             <div class="text-center text-muted mb-1" v-if="confirmacion.verificacion">
                                <small>La contraseña debe ser tener mas de 8 letras, contener numeros, mayusculas, minusculas y un caracter especial (!"#$%/()=?¡*-.,)</small>
                            </div>
                            <base-input class="input-group-alternative"
                                        placeholder="Confirmar contraseña"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="confirmacion.cpassword">
                            </base-input>
                            <div class="text-center text-muted mb-1" v-if="confirmacion.password != confirmacion.cpassword">
                                <small>La contraseñas deben coincidir</small>
                            </div>
                            <!-- <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox> -->
                            <div class="text-center">
                                <base-button type="primary" :disabled="(confirmacion.verificacion || (confirmacion.password != confirmacion.cpassword))" @click="crearContrasena" class="my-4">Registrar</base-button>
                            </div>
                        </form>
                    </div>
                </div>
               
            </div>
        </div>
</template>
<script>

  import axios from 'axios'

  export default {
    name: 'confirmar',
    data() {
      return {
        confirmacion: {
          cpassword: '',
          password: '',
          codigo:'',
          verificacion:true
        },
        mensaje:{
            mensaje: `Respuesta enviada.`,
            show: false,
            tipoMensaje: ""
        }
      }
    },
    methods:{        
        validar_clave(contrasenna){
			if(contrasenna.length >= 8)
			{	
				var mayuscula = false;
				var minuscula = false;
				var numero = false;
				var caracter_raro = false;				
				for(var i = 0;i<contrasenna.length;i++)
				{
					if(contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90){
						mayuscula = true;
					}
					else if(contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122){
						minuscula = true;
					}
					else if(contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57){
						numero = true;
					}
					else{
						caracter_raro = true;
					}
				}
				if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true){
                    /* this.mostrarMensaje("Paso la prueba", "success") */
                    this.confirmacion.verificacion = false
                    return true;
				}
            }
             /* this.mostrarMensaje("No paso la prueba", "info") */
            this.confirmacion.verificacion = true
            return false;
        },
        crearContrasena: async function(){
            if(this.confirmacion.codigo == ''){
                this.mostrarMensaje("Ingrese el código que le llegó a su correo", "warning")
                return 
            }
            try {
                const resPost = await axios.put('https://mundototalsalud.com:3000/users',{
                                                id: this.confirmacion.codigo,
                                                password: this.confirmacion.password})                
                if(resPost.status == 204){
                    this.mostrarMensaje("El codigo ingresado no es valido, confirme en su correo o solicite un codigo nuevo", "warning")
                    return 
                }else{
                    this.mostrarMensaje("Contraseña creada ", "success")
                    setTimeout(() => {this.$router.push({path:'/'})},3000)
                }
            } catch (error) {
                this.mostrarMensaje("Error al conectar con el servidor " + error,"info")
            }
        },
        mostrarMensaje(texto, tipo){
            this.mensaje.tipoMensaje = tipo
            this.mensaje.mensaje = texto
            this.mensaje.show = true
            setTimeout(() => {if(this.mensaje.show) {this.mensaje.show = this.mensaje.false}} ,4500)                   
        }
    }
  }
</script>
<style>
</style>
