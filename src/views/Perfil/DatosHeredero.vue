<template>
    <form >    
    <div class="card  bg-gradient-success opacity-10">  
    <div class="card-header border-0">
        <div class="row align-items-center">
            <div class="col">
                <h3 class="mb-0">Datos Heredero</h3>
            </div>
            <div class="col text-right">
                <base-button type="primary" @click="guardar" class="btn btn-sm btn-primary">Actualizar</base-button>
            </div>
        </div>        
        <transition name="slide-fade">
            <base-alert class="mensaje my-2" :type="mensaje.tipoMensaje" ref="mensaje"  v-if="mensaje.show"><strong>{{mensaje.mensaje}}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="mensaje.show=false">
                    <span aria-hidden="true">&times;</span>
                </button>
            </base-alert>
        </transition>
    </div>
    <form @submit.prevent  class="card col-lg-12  bg-gradient-success opacity-10">        
        
        <div class="pl-lg-4">
            <div class="row">
                <div class="col-lg-6">
                    <base-input alternative=""
                                label="Cedula"
                                placeholder="Cedula"
                                input-classes="form-control-alternative"
                                v-model="model.cedula"
                                type="number"
                    />
                </div>
                <div class="col-lg-6">
                    <base-input alternative=""
                                label="Correo"
                                placeholder="jesse@example.com"
                                input-classes="form-control-alternative"
                                v-model="model.correo"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <base-input alternative=""
                                label="Nombre"
                                placeholder="Nombre"
                                input-classes="form-control-alternative"
                                v-model="model.nombre"
                    />
                </div>
                <div class="col-lg-6">
                    <base-input alternative=""
                                label="Apellido"
                                placeholder="Apellido"
                                input-classes="form-control-alternative"
                                v-model="model.apellido"
                    />
                </div>
            </div><div class="row">
                <div class="col-lg-6">
                    <base-input alternative=""
                                label="Telefono"
                                placeholder="Telefono"
                                input-classes="form-control-alternative"
                                v-model="model.telefono"
                                type="number"
                    />
                </div>
                <div class="col-md-6">      
                <base-input alternative=""
                                label="Fecha de Nacimiento"
                                placeholder="Fecha"
                                input-classes="form-control-alternative">
                                <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    @load="this.fecha_nacimiento = this.model.fecha_nacimiento"
                                    :config="{dateFormat:'Y-m-d'}"
                                    class="form-control datepicker"
                                    v-model="model.fecha_nacimiento">
                                </flat-picker>
                    </base-input>
                </div>
            </div>
        </div>
    </form>
    </div>
    </form>
</template>
<script>
  import axios from 'axios'
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  export default {
    name: 'datos-heredero',
    components:{
      flatPicker
    },
    data() {
      return {
        model: {
          cedula: '',
          correo: '',
          nombre: '',
          apellido: '',
          fecha_nacimiento: new Date(),
          telefono:'',
          cedula_afiliado:''
        },
        mensaje:{
            mensaje: `Respuesta enviada.`,
            show: false,
            tipoMensaje: ""
        },
        cedula: '',
        correo: '',
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        telefono:''
      }
    },
    beforeMount: async function() {
        const resGet = JSON.parse(localStorage.getItem('heredero'))
        try {           
            if(resGet.status==200 || resGet.status == 201){
                this.model = resGet.data
                this.model.fecha_nacimiento = resGet.data.fecha_nacimiento + new Date().getTimezoneOffset()*60000
                this.cedula = resGet.data.cedula
                this.correo = resGet.data.correo
                this.nombre = resGet.data.nombre
                this.apellido = resGet.data.apellido
                this.fecha_nacimiento = resGet.data.fecha_nacimiento
                this.telefono = resGet.data.telefono
            }
            
        } catch (error) {
            this.mostrarMensaje("Error al cargar","warning")
            console.log(error)
        }        
    },
    methods:{        
        mostrarMensaje(texto, tipo){
            this.mensaje.tipoMensaje = tipo
            this.mensaje.mensaje = texto
            this.mensaje.show = true
            setTimeout(() => {if(this.mensaje.show) {this.mensaje.show = this.mensaje.false}} ,4000)                   
        },
        guardar: async function (){
            if(this.model.cedula == "" || this.model.correo == "" || this.model.nombre == "" || 
               this.model.fecha_nacimiento == "" || this.model.apellido == ""  || this.model.telefono== ""){
                   this.mostrarMensaje("Debe llenar todos los datos para poder guardar","warning")
                   return
               }
            if(!this.validarEmail(this.model.correo)){
                this.mostrarMensaje("Ingrese un correo valido","warning")
                return false
            }
            if(this.model.cedula == this.cedula && this.model.correo == this.correo && this.model.nombre == this.nombre && 
               this.model.fecha_nacimiento == this.fecha_nacimiento  && this.model.apellido == this.apellido  && this.model.telefono== this.telefono){
                this.mostrarMensaje("No ha realizado ningun cambio","warning")
            }else{
                const resGet = JSON.parse(localStorage.getItem('afiliado'))
                this.model.cedula_afiliado = resGet.data.cedula          
                let data = {
                    cedula: this.model.cedula,
                    nombre: this.model.nombre,
                    apellido: this.model.apellido,
                    correo: this.model.correo,
                    telefono: this.model.telefono,
                    cedula_afiliado: this.model.cedula_afiliado
                }
                if(this.fecha_nacimiento != this.model.fecha_nacimiento){
                    data.fecha_nacimiento = this.model.fecha_nacimiento
                }
                const resCon = JSON.parse(localStorage.getItem('heredero')) 
                if(resCon.status == 200 || resCon.status == 201){
                    try {                         
                        const resCon = JSON.parse(localStorage.getItem('heredero'))
                        const resPut = await axios.put('https://mundototalsalud.com:3000/herederos/'+ resCon.data._id,data, {
                            headers:{
                                Authorization: 'Bearer '+ localStorage.getItem('token')
                            } 
                        })
                        if(resPut.status == 201){
                            this.mostrarMensaje("Datos actualizados","success")
                            this.cedula = this.model.cedula
                            this.correo = this.model.correo
                            this.nombre = this.model.nombre 
                            this.apellido = this.model.apellido
                            this.fecha_nacimiento = this.model.fecha_nacimiento
                            this.telefono = this.model.telefono
                            localStorage.setItem('heredero',JSON.stringify(resPut))
                        }
                        else{
                            this.mostrarMensaje("Error al actualizar, intente mas tarde","warning")
                        }
                    } catch (error) {
                        this.mostrarMensaje("Error al actualizar, intente mas tarde","warning")
                        console.log(error)
                    }
                }else{
                    try {                         
                        const resPost = await axios.post('https://mundototalsalud.com:3000/herederos',data, {
                            headers:{
                                Authorization: 'Bearer '+ localStorage.getItem('token')
                            } 
                        })
                        if(resPost.status == 200){
                            this.mostrarMensaje("Datos actualizados","success")
                            this.cedula = this.model.cedula
                            this.correo = this.model.correo
                            this.nombre = this.model.nombre
                            this.apellido = this.model.apellido
                            this.fecha_nacimiento = this.model.fecha_nacimiento
                            this.telefono = this.model.telefono
                            localStorage.setItem('heredero',JSON.stringify(resPost))
                        }
                        else{
                            this.mostrarMensaje("Error al actualizar, intente mas tarde","warning")
                        }
                    } catch (error) {
                        this.mostrarMensaje("Error al actualizar, intente mas tarde","warning")
                        console.log(error)
                    }
                }
            }
           
        },
        validarEmail(valor) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(valor)        
        }
    }
  };
</script>
<style></style>