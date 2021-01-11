<template>
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-8">
            <div class="card bg-secondary shadow border-0">
                <!-- <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Sign up with</small>
                    </div>
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
                    <!-- <div class="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                    </div> -->
                    <transition name="slide-fade">
                        <base-alert class="mensaje" :type="mensaje.tipoMensaje" ref="mensaje"  v-if="mensaje.show"><strong>{{mensaje.mensaje}}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="cerrarMensaje">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </base-alert>
                    </transition> 
                    <form-wizard next-button-text="Siguiente" back-button-text="Regresar"
                    finish-button-text="Enviar" title="" subtitle="" color="#5e72e4" step-size="sm"
                    @on-change="onChange" @on-complete="onComplete">                                              
                        <tab-content title="Datos de Auspiciador" icon="ni ni-badge" :before-change="validarPrimerStep">
                            <div class="col-md-12 my-4">                                  
                                <a>
                                    <div><strong>Ingrese la cedula de su auspiciador para poder continuar</strong> </div>
                                </a>
                            </div> 
                             <form :inline="true" class="text-center">
                                <div class="row">
                                    <div class="col-md-2">
                                        <a  class="text-light">
                                            <small></small>
                                        </a>
                                    </div>                                                        
                                    <!-- <base-dropdown>
                                        <base-button slot="title" type="secondary" v-model="model" class="dropdown-toggle">
                                            V
                                        </base-button>
                                        <a class="dropdown-item" >V</a>
                                        <a class="dropdown-item" >J</a>
                                    </base-dropdown> -->
                                    <div class="col-md-4">
                                        <base-input placeholder="Cedula"
                                                    addon-right-icon="ni ni-square-pin"
                                                    v-model="auspiciador.cedula"
                                                    :disabled="configuracion.cestatus"
                                                    type="number">
                                        </base-input>
                                    </div>
                                    <div class="text-center">
                                        <base-button type="primary" @click="buscarAuspiciador" :disabled="configuracion.cestatus">Buscar</base-button>
                                    </div>
                                    <div class="col-md-1">
                                        <a  class="text-light">
                                            <small></small>
                                        </a>
                                    </div> 
                                    <div class="text-center">
                                        <base-button type="primary" @click="limpiar" :disabled="!configuracion.cestatus">Limpiar</base-button>
                                    </div>
                                </div>
                            </form>
                            <hr class="my-4" />
                            <form :inline="true" class="text-center">   
                                <div class="row">                             
                                    <div class="col-md-6">
                                        <base-input placeholder="Nombre Auspiciador"
                                                    addon-right-icon="ni ni-single-02"
                                                    v-model="auspiciador.nombre"
                                                    disabled>
                                        </base-input>
                                    </div>  
                                    <div class="col-md-6">
                                        <base-input placeholder="Apellido Auspiciador"
                                                    addon-right-icon="ni ni-single-02"
                                                    v-model="auspiciador.apellido"
                                                    disabled>
                                        </base-input>
                                    </div>      
                                </div>                       
                            </form>
                        </tab-content>
                         <tab-content title="Detalles personales" icon="ni ni-circle-08" :before-change="validarSegundoStep">
                             <form role="form">
                                 <div class="col-md-12 my-4">                                  
                                <a>
                                    <div><strong> Ingrese sus datos personales, para las fechas primero coloque el año, luego el mes y finalmente el dia</strong></div>
                                </a>
                            </div> 
                                <div class="row">                             
                                    <div class="col-md-4">
                                        <base-input placeholder="Cedula"
                                                    addon-right-icon="ni ni-square-pin"
                                                    v-model="afiliado.cedula"
                                                    type="number">
                                        </base-input>
                                    </div>  
                                    <div class="col-md-8">
                                        <base-input placeholder="Correo"
                                                    addon-left-icon="ni ni-email-83"
                                                    v-model="afiliado.correo"
                                                    @blur="validarEmail(afiliado.correo)">
                                        </base-input>
                                    </div>
                                     <div class="col-md-6">
                                        <base-input placeholder="Nombre"
                                                    addon-right-icon="ni ni-single-02"
                                                    v-model="afiliado.nombre">
                                        </base-input>
                                    </div>  
                                    <div class="col-md-6">
                                        <base-input placeholder="Apellido"
                                                    addon-right-icon="ni ni-single-02"
                                                    v-model="afiliado.apellido">
                                        </base-input>
                                    </div> 
                                    <div class="col-md-6">      
                                    <base-input alternative=""
                                                    placeholder="Fecha"
                                                    input-classes="form-control-alternative">
                                                    <flat-picker slot-scope="{focus, blur}"
                                                        @on-open="focus"
                                                        @on-close="blur"
                                                        :config="{dateFormat:'Y-m-d'}"
                                                        class="form-control datepicker"
                                                        v-model="afiliado.fecha_nacimiento">
                                                    </flat-picker>
                                        </base-input>
                                    </div>
                                     <div class="col-md-6">
                                        <base-input placeholder="Telefono"
                                                    addon-right-icon="ni ni-collection"
                                                    v-model="afiliado.telefono"
                                                    type="number">
                                        </base-input>
                                    </div> 
                                </div> 

                               <!--  <div class="text-muted font-italic">
                                    <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                                </div> -->
                               
                             <!--    <div class="text-center">
                                    <base-button type="primary" class="my-4">Create account</base-button>
                                </div> -->
                            </form>
                         </tab-content>
                         <tab-content title="Detalles de Pago" icon="ni ni-credit-card" :before-change="validarTercerStep">
                            <div class="col-md-12 my-4">                                  
                                <a>
                                    <div><strong>Ingrese los datos del pago de su afiliación</strong> </div>
                                </a>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <base-dropdown>
                                        <base-button slot="title" type="default" v-text="configuracion.tipoPago" class="dropdown-toggle"></base-button>
                                            <div class="scrollable-menu">
                                                <a class="dropdown-item"  @click="seleccionarTipoPago('Transferencia')">Transferencia</a>
                                                <a class="dropdown-item"  @click="seleccionarTipoPago('Pago Movil')">Pago Movil</a>
                                                <a class="dropdown-item"  @click="seleccionarTipoPago('Efectivo')">Efectivo</a>
                                                <a class="dropdown-item"  @click="seleccionarTipoPago('Punto')">Punto</a>                                        
                                            </div>
                                    </base-dropdown>
                                </div>
                            </div>
                            <hr class="my-4" />
                            <div v-if="configuracion.tipoPago == 'Transferencia' || configuracion.tipoPago == 'Pago Movil'">
                                <div class="row">
                                    <div class="col-md-12">
                                        <base-dropdown>
                                            <base-button slot="title" label="P" type="success" v-text="configuracion.banco" class="dropdown-toggle"></base-button>
                                                <div class="scrollable-menu">
                                                    <a class="dropdown-item" v-for="item in bancos" :value="item.value" v-text="item.nombre" :key="item.nombre" @click="seleccionarItemBanco(item.nombre)"></a >                                        
                                                </div>
                                        </base-dropdown>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="row">
                                    <div class="col-lg-6">
                                        <base-input alternative=""
                                                    label="Cedula"
                                                    placeholder="Cedula"
                                                    input-classes="form-control-alternative"
                                                    v-model="pago.cedula"
                                                    type="number">
                                        </base-input>
                                    </div>
                                    <div class="col-lg-6">
                                        <base-input alternative=""
                                                    label="Monto"
                                                    placeholder="Monto"
                                                    input-classes="form-control-alternative"
                                                    v-model="pago.monto"
                                                    type="number">
                                        </base-input>
                                    </div>
                                    <div class="col-md-6">      
                                    <base-input alternative=""
                                                    label="Fecha"
                                                    placeholder="fecha"
                                                    input-classes="form-control-alternative">
                                                    <flat-picker slot-scope="{focus, blur}"
                                                        @on-open="focus"
                                                        @on-close="blur"
                                                        :config="{dateFormat:'Y-m-d'}"
                                                        class="form-control datepicker"
                                                        v-model="pago.fecha">
                                                    </flat-picker>
                                        </base-input>
                                    </div>
                                    
                                    <div class="col-lg-6">
                                        <base-input alternative=""
                                                    label="Referencia"
                                                    placeholder="Referencia"
                                                    input-classes="form-control-alternative"
                                                    v-model="pago.referencia"
                                                    type="number"
                                        />
                                    </div>
                                </div>
                            </div><div v-if="configuracion.tipoPago == 'Efectivo' || configuracion.tipoPago == 'Punto'">
                                <hr class="my-4" />
                                <div class="row">                                    
                                    <div class="col-lg-6">
                                        <base-input alternative=""
                                                    label="Monto"
                                                    placeholder="Monto"
                                                    input-classes="form-control-alternative"
                                                    v-model="pago.monto"
                                                    type="number">
                                        </base-input>
                                    </div>
                                    <div class="col-md-6">      
                                        <base-input alternative=""
                                                        label="Fecha"
                                                        placeholder="fecha"
                                                        input-classes="form-control-alternative">
                                                        <flat-picker slot-scope="{focus, blur}"
                                                            @on-open="focus"
                                                            @on-close="blur"
                                                            :config="{dateFormat:'Y-m-d'}"
                                                            class="form-control datepicker"
                                                            v-model="pago.fecha">
                                                        </flat-picker>
                                        </base-input>
                                    </div>                                    
                                    <div class="col-lg-6">
                                        <base-input alternative=""
                                                    label="Referencia"
                                                    placeholder="Referencia"
                                                    input-classes="form-control-alternative"
                                                    v-model="pago.referencia"
                                                    type="number"
                                        />
                                    </div>
                                </div>
                            </div>                             
                        </tab-content> 
                        <tab-content title="Completar Solicitud" icon="ni ni-check-bold" :before-change="validarCuartoStep">
                             <div class="row contrato">
                                 <img src="img/contrato/Contrato-de-licencia.png" alt="">
                                 <img src="img/contrato/Contrato-de-licencia2.png" alt="">
                             </div>
                            <div class="row my-4">
                                <div class="col-12">
                                    <base-checkbox class="custom-control-alternative" v-model="configuracion.checkContrato">
                                        <span class="text-muted">Estoy de acuerdo con el Contrato</span>
                                    </base-checkbox>
                                </div>                                
                            </div>
                        </tab-content>
                    </form-wizard>    
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small></small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/identifcacion/login" class="text-light">
                        <small>Ingresar en su cuenta</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import axios from 'axios'

  export default {
    name: 'register',
    components:{      
      FormWizard,
      TabContent,
      flatPicker
    },
    data() {
      return {
        auspiciador:{
            cedula: '',
            nombre: '',
            apellido: '',
        },
        mensaje:{
            mensaje: `Respuesta enviada.`,
            show: false,
            tipoMensaje: ""
        },
        afiliado:{
            cedula: '',
            correo: '',
            nombre: '',
            apellido: '',
            fecha_nacimiento: new Date(),
            telefono: '',
            correoValido: ''
        },
        configuracion: {
          cestatus: false,
          banco: "Seleccione Banco",
          checkContrato: false,
          tipoPago:'Seleccione tipo de pago',
          datosAuspiciador:{}
        },
        pago:{
            banco:'',
            cedula:'',
            monto:'',
            fecha: new Date(),
            referencia:''
        },
        bancos:[{value:"0196", nombre:"ABN AMRO BANK"},
                {value:"0156", nombre:"100%BANCO"},
                {value:"0172", nombre:"BANCAMIGA BANCO MICROFINANCIERO, C.A."},
                {value:"0171", nombre:"BANCO ACTIVO BANCO COMERCIAL, C.A."},
                {value:"0166", nombre:"BANCO AGRICOLA"},
                {value:"0175", nombre:"BANCO BICENTENARIO"},
                {value:"0128", nombre:"BANCO CARONI, C.A. BANCO UNIVERSAL"},
                {value:"0164", nombre:"BANCO DE DESARROLLO DEL MICROEMPRESARIO"},
                {value:"0102", nombre:"BANCO DE VENEZUELA S.A.I.C.A."},
                {value:"0114", nombre:"BANCO DEL CARIBE C.A."},
                {value:"0149", nombre:"BANCO DEL PUEBLO SOBERANO C.A."},
                {value:"0163", nombre:"BANCO DEL TESORO"},
                {value:"0176", nombre:"BANCO ESPIRITO SANTO, S.A."},
                {value:"0115", nombre:"BANCO EXTERIOR C.A."},
                {value:"0003", nombre:"BANCO INDUSTRIAL DE VENEZUELA."},
                {value:"0173", nombre:"BANCO INTERNACIONAL DE DESARROLLO, C.A."},
                {value:"0105", nombre:"BANCO MERCANTIL C.A."},
                {value:"0191", nombre:"BANCO NACIONAL DE CREDITO"},
                {value:"0116", nombre:"BANCO OCCIDENTAL DE DESCUENTO."},
                {value:"0138", nombre:"BANCO PLAZA"},
                {value:"0108", nombre:"BANCO PROVINCIAL BBVA"},
                {value:"0104", nombre:"BANCO VENEZOLANO DE CREDITO S.A."},
                {value:"0168", nombre:"BANCRECER S.A. BANCO DE DESARROLLO"},
                {value:"0134", nombre:"BANESCO BANCO UNIVERSAL"}, 
                {value:"0177", nombre:"BANFANB"},
                {value:"0146", nombre:"BANGENTE"},
                {value:"0174", nombre:"BANPLUS BANCO COMERCIAL C.A"},
                {value:"0190", nombre:"CITIBANK."},
                {value:"0121", nombre:"CORP BANCA."},
                {value:"0157", nombre:"DELSUR BANCO UNIVERSAL"},
                {value:"0151", nombre:"FONDO COMUN"},
                {value:"0601", nombre:"INSTITUTO MUNICIPAL DE CREDITO POPULAR"},
                {value:"0169", nombre:"MIBANCO BANCO DE DESARROLLO, C.A."},
                {value:"0137", nombre:"SOFITASA"}]
        }
    },
    
    methods: {
        onChange: function(){

        },
        mostrarMensaje(texto, tipo){
            this.mensaje.tipoMensaje = tipo
            this.mensaje.mensaje = texto
            this.mensaje.show = true
            setTimeout(() => {if(this.mensaje.show) {this.mensaje.show = this.mensaje.false}} ,4000)                   
        },
        seleccionarItemBanco(item){
            this.configuracion.banco = item
        },
        seleccionarTipoPago(item){
            this.configuracion.tipoPago = item
        },
        validarPrimerStep(){
            if(this.auspiciador.nombre == ""){
                this.mostrarMensaje("Debe buscar un auspiciador","warning")
                return false
            }else{
                return true
            }
            
        },
        validarSegundoStep: async function(){           
            if(this.afiliado.monto == "" || this.afiliado.apellido == "" || this.afiliado.cedula == ""||
               this.afiliado.correo == "" || this.afiliado.telefono == ""){
                    this.mostrarMensaje("Ingrese todos los datos requeridos","warning")
                    return false
               }else if(!this.validarEmail(this.afiliado.correo)){
                   this.mostrarMensaje("Ingrese un correo valido","warning")
                    return false
               }else {
                   if(this.afiliado.cedula.length < 6 || this.afiliado.cedula.length > 8){
                        this.mostrarMensaje("Cédula demaciado corta", "warning")
                        return false
                    }
                    try {
                        const resGet = await axios('http://161.35.140.26:3000/suscriptores/' + this.afiliado.cedula)
                        if(resGet.status == 200){
                            this.mostrarMensaje("Usted ya se encuentra registrado!","warning")
                            return false                 
                        }
                        else{
                            const resGet = await axios('http://161.35.140.26:3000/solicitudesAfiliacion/' + this.afiliado.cedula)
                            if(resGet.status == 200){
                                this.mostrarMensaje("Usted posee una solicitud activa", "warning")
                                return false
                            }                    
                        }
                    } catch (error) {
                        this.mostrarMensaje("Algo salió mal", "info")  
                        console.log(error)
                        return false
                    }
                    return true 
                }       
        },
        buscarAuspiciador: async function(){
            if(this.auspiciador.cedula == ""){                       
                this.mostrarMensaje("Ingresa una cedula","warning")
                return false
            }
            try{
                const resGet = await axios('http://161.35.140.26:3000/suscriptores/' + this.auspiciador.cedula)
                if(resGet.status == 200){                    
                    this.activarControles()
                    this.auspiciador.nombre = resGet.data.nombre                
                    this.auspiciador.apellido = resGet.data.apellido
                    this.configuracion.auspiciador = resGet.data  
                    this.mostrarMensaje("Auspiciador encontrado!","success")                   
                }
                else if(resGet.status == 204){
                    this.mostrarMensaje("Cedula no registrada", "info")
                }
                
            }catch (error) {    
                this.mostrarMensaje("Algo salió mal", "info")  
                console.log(error)
            }
        }, 
        validarTercerStep(){
            if(this.configuracion.tipoPago == "Efectivo" || this.configuracion.tipoPago == "Punto"){
                if(this.pago.monto == "" || this.pago.referencia == "") {                   
                    this.mostrarMensaje("Ingrese todos los datos requeridos","warning")
                    return false
                }else{
                    return true;
                }  
            }else{
                if(this.pago.nombre == "" || this.pago.referencia == "" || this.pago.cedula == ""||
                    this.configuracion.banco == "Seleccione Banco") {
                    if(this.configuracion.banco == "Seleccione Banco"){
                        this.mostrarMensaje("Seleccione un Banco","warning")
                        return false
                    }
                    this.mostrarMensaje("Ingrese todos los datos requeridos","warning")
                    return false
                }else{
                    return true;
                }
            }
            
        },
        validarCuartoStep(){  
            if(!this.configuracion.checkContrato){
                this.mostrarMensaje("Debe aceptar los terminos del contrato","warning")
                return false
            }else{
                return true
            }
        },
        onComplete: async function(){
            let datos = {
                "nombre": this.afiliado.nombre,
                "apellido":this.afiliado.apellido,
                "cedula":this.afiliado.cedula,
                "correo":this.afiliado.correo,
                "telefono":this.afiliado.telefono,
                "fecha_nacimiento":this.afiliado.fecha_nacimiento,
                "cedula_auspiciador":this.auspiciador.cedula,
                "tipo_pago": this.configuracion.tipoPago,
                "cedula_pago":this.pago.cedula,
                "monto_pago":this.pago.monto,
                "fecha_pago":this.pago.fecha,
                "referencia_pago":this.pago.referencia,
                "banco_pago":this.configuracion.banco
            }
            try {
                const resPost = await axios.post('http://161.35.140.26:3000/solicitudesAfiliacion', datos)
                if(resPost.status == 201){
                this.mostrarMensaje("Solicitud Enviada","success")
                setTimeout(() => {this.$router.push({path:'/'})},3000)
                return true  
                }else{
                    this.mostrarMensaje("Error al conectar con el servidor","info")
                    return false
                }
            } catch (error) {
                this.mostrarMensaje("Error al conectar con el servidor","info")
                return false
            }
                                           
        },
        activarControles(){
            if(this.configuracion.cestatus){
                this.auspiciador.nombre = ""
                this.auspiciador.apellido = ""
                this.auspiciador.cedula = ""
            }
            this.configuracion.cestatus = !this.configuracion.cestatus
        },
        limpiar(){
            this.activarControles()
        },
        cerrarMensaje(){
            this.mensaje.show = false  
        },
        validarEmail(valor) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           if(!re.test(valor)){
              this.mostrarMensaje("Ingrese un correo valido","warning") 
              this.afiliado.correoValido = false
           }else{
              this.afiliado.correoValido = true
           }
           return re.test(valor)        
        }        
    }
}
</script>
<style>
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    } 
    .mensaje {
        text-align: center;
    }
    
    .contrato {
        width:auto;
        height: auto;
        max-width: 900px;
        max-height: 300px;
        overflow-x: auto;
    }
    .dropdown-toggle{   
        width: 600px;
        font-size: 1rem;
    }
    .scrollable-menu {
        width: 600px;
        height: auto;
        max-height: 180px;
        overflow-x: hidden;
    }
</style>
