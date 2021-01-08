<template>
  <div class="card  bg-gradient-success opacity-10">    
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Datos Bancarios</h3>
        </div>        
        <div class="col text-right">
          <base-button type="primary" @click="limpiar" class="btn btn-sm btn-primary">Agregar</base-button>
        </div>        
      </div>
      <transition name="slide-fade">
            <base-alert class="mensaje my-3" :type="mensaje.tipoMensaje" ref="mensaje"  v-if="mensaje.show"><strong>{{mensaje.mensaje}}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="mensaje.show=false">
                    <span aria-hidden="true">&times;</span>
                </button> 
            </base-alert>
      </transition>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="tableData">
        <template slot="columns">
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.8rem">Acciones</th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.8rem">Tipo</th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.8rem">Banco</th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.8rem">Nro de Cuenta</th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.8rem">Cedula</th>          
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.8rem">Nombre</th>
        </template>
        
        <template slot-scope="{row}">
          <td>
            <base-button type="secondary" size="sm" @click="verBanco(row)"><font-awesome-icon icon="search"/></base-button>
            <base-button type="danger" @click="eliminar(row._id)" size="sm"><font-awesome-icon icon="trash-alt"/></base-button>
          </td>          
          <th scope="row" class="bg-gradient-white" style="color:rgba(0, 0, 0, 0.678); font-size:1rem">
            {{row.tipo}}
          </th>
          <td  class="bg-gradient-white"> 
            {{row.banco}}
          </td>
          <td class="bg-gradient-white">
            {{row.nro_de_cuenta}}
          </td>
          <td class="bg-gradient-white" style="color:rgba(0, 0, 0, 0.678); font-size:1rem"><!-- 
            <i class="fas fa-arrow-up text-success mr-3"
               :class="row.bounceRateDirection === 'up' ? 'text-success': 'text-danger'">
            </i> -->
            {{row.cedula}}
          </td>
           <td class="bg-gradient-white" style="color:rgba(0, 0, 0, 0.678); font-size:1rem">
            {{row.nombre}}
          </td>
        </template>

      </base-table>
    </div>

    <modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg ">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0 bg-gradient-success opacity-10">
                
                <template> 
                    <div class="card-header border-0">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0">Datos Bancarios</h3>
                        </div>   
                      </div>
                    </div>
                    <transition name="slide-fade">
                            <base-alert class="mensaje my-3" :type="mensaje.tipoMensaje" ref="mensaje"  v-if="mensaje.show"><strong>{{mensaje.mensaje}}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="mensaje.show=false">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </base-alert>
                        </transition>                   
                    <form role="form" class="bg-gradient-success opacity-10">
                        <div class="pl-lg-4">
                          <div class="row">
                              <div class="col-lg-6">
                                  <base-input alternative=""
                                              label="Cedula"
                                              placeholder="Cedula"
                                              input-classes="form-control-alternative"
                                              type="number"
                                              v-model="banco.cedula"
                                  />
                              </div>
                              <div class="col-lg-6">
                                  <base-input alternative=""
                                              label="Nombre"
                                              placeholder="Nombre"
                                              input-classes="form-control-alternative"
                                              v-model="banco.nombre"
                                  />
                              </div>
                              <div class="col-lg-6">
                                  <base-input alternative=""
                                              label="Nombre"
                                              placeholder="Nombre"
                                              input-classes="form-control-alternative"
                                              v-model="banco._id"
                                              style="display: none"
                                  />
                              </div>
                              
                          </div>
                          <div class="row">
                              <div class="col-lg-6">
                                  <base-input alternative=""
                                              label="Nro de Cuenta"
                                              placeholder="Numero de cuenta"
                                              input-classes="form-control-alternative"
                                              type="number"
                                              v-model="banco.nro_de_cuenta"
                                  />
                              </div>
                              <div class="col-lg-6" v-if="banco.tipo == 'Otro'">
                                  <base-input alternative=""
                                              label="Tipo de pago"
                                              placeholder="Tipo de pago"
                                              input-classes="form-control-alternative"
                                              v-model="banco.banco"
                                  />
                              </div>
                          </div>
                            <div class="col-lg-6 my-4">
                                <base-dropdown>
                                    <base-button slot="title" type="default" v-text="banco.tipo" class="dropdown-toggle"></base-button>
                                        <div class="scrollable-menu">
                                            <a class="dropdown-item"  @click="banco.tipo = 'Transferencia'">Transferencia</a>
                                            <a class="dropdown-item"  @click="banco.tipo = 'Pago Movil'">Pago Movil</a>
                                         <!--    <a class="dropdown-item"  @click="banco.tipo = 'Otro'">Otro</a>                                       
                                        --> </div>
                                </base-dropdown>
                            </div>
                            <div class="col-lg-6" v-if="banco.tipo != 'Otro'">
                                <base-dropdown>
                                    <base-button slot="title" label="P" type="default" v-text="banco.banco" class="dropdown-toggle"></base-button>
                                        <div class="scrollable-menu">
                                            <a class="dropdown-item" v-for="item in bancos" :value="item.value" v-text="item.nombre" :key="item.nombre" @click="banco.banco = item.nombre"></a >                                        
                                        </div>
                                </base-dropdown>
                            </div>                          
                          
                          <div class="text-right">
                                <base-button type="secondary" @click="limpiar" class="my-4">Limpiar</base-button>
                                <base-button type="primary" @click="guardar" class="my-4">Guardar</base-button>
                          </div>
                      </div>
                    </form>
                </template>
            </card>
      </modal>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'datos-bancarios',
    data() {
      return {
        tableData: [        
        ],
        modals:{
            modal3: false
        },
        configuracion:{
          modificar: false
        },
        banco:{
          nomnbre:'',
          cedula: '',
          nro_de_cuenta:'',
          banco: "Seleccione Banco",
          tipo:'Seleccione tipo de pago',
          _id:''
        },
        mensaje:{
            mensaje: `Respuesta enviada.`,
            show: false,
            tipoMensaje: ""
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
    beforeMount: async function (){
      const afiliado = JSON.parse(localStorage.getItem('afiliado')).data
      const resGet = await axios('http://localhost:3000/bancosSuscriptor/'+ afiliado._id)
      this.tableData = resGet.data
    },
    methods:{        
        mostrarMensaje(texto, tipo){
            this.mensaje.tipoMensaje = tipo
            this.mensaje.mensaje = texto
            this.mensaje.show = true
            setTimeout(() => {if(this.mensaje.show) {this.mensaje.show = this.mensaje.false}} ,4000)                   
        },
        verBanco(row){
            this.banco.banco = row.banco
            this.banco.nombre = row.nombre
            this.banco.tipo = row.tipo
            this.banco.cedula = row.cedula
            this.banco.nro_de_cuenta = row.nro_de_cuenta
            this.banco._id = row._id
            this.modals.modal3 = true
        },
        limpiar(){
            this.banco.banco = "Seleccione Banco"
            this.banco.nombre = ""
            this.banco.tipo = 'Seleccione tipo de pago'
            this.banco.cedula = ""
            this.banco.nro_de_cuenta = ""
            this.banco._id = ""
            this.modals.modal3=true
        },
        eliminar: async function(id){
          let prueba = confirm("¿Desea eliminar este metodo de pago?")
          if(prueba){             
             try {
                const resPut = await axios.delete('http://localhost:3000/bancosSuscriptor/'+ id,{
                        headers:{
                            Authorization: 'Bearer '+ localStorage.getItem('token')
                        } 
                    })
                if(resPut.status == 200){
                    let i = this.tableData.findIndex(elemento => elemento._id === id) 
                    this.tableData.splice(i,1)
                    this.mostrarMensaje("Metodo de pago Eliminado","success")    
                }            
              } catch (error) {
                      console.log(error)
                      this.mostrarMensaje("Error de conexión","warning")                
              }
          }
        },
        guardar:async function(){
          if(this.banco.banco == "Seleccione Banco" || this.banco.nombre == "" || this.banco.tipo == 'Seleccione tipo de pago' ||
             this.banco.cedula == "" || this.banco.nro_de_cuenta == ""){
                this.mostrarMensaje("Para guardar hay que llenar todos los datos","warning")
                return
          }
          if(this.banco._id == ''){              
              let data = {
                tipo: this.banco.tipo,
                nombre: this.banco.nombre,
                nro_de_cuenta: this.banco.nro_de_cuenta,
                banco: this.banco.banco,
                cedula: this.banco.cedula,
                suscriptor: JSON.parse(localStorage.getItem('afiliado')).data._id
              }              
              try{
                const resPost = await axios.post('http://localhost:3000/bancosSuscriptor',data,{
                        headers:{
                            Authorization: 'Bearer '+ localStorage.getItem('token')
                        } 
                    })
                if(resPost.status == 200){
                    this.mostrarMensaje("Metodo de pago agregado","success")             
                    this.tableData.push(resPost.data)  
                    this.modals.modal3 = false          
                  }
                } catch (error) {
                    this.mostrarMensaje("Error de conexión","warning")                
                }
          }else{
              let data = {
                tipo: this.banco.tipo,
                nombre: this.banco.nombre,
                nro_de_cuenta: this.banco.nro_de_cuenta,
                banco: this.banco.banco,
                cedula: this.banco.cedula
              }
              try {
                const resPut = await axios.put('http://localhost:3000/bancosSuscriptor/'+ this.banco._id,data,{
                        headers:{
                            Authorization: 'Bearer '+ localStorage.getItem('token')
                        } 
                    })
                if(resPut.status == 201){
                    this.mostrarMensaje("Metodo de pago Modificado","success")  
                    let i = this.tableData.findIndex(elemento => elemento._id === this.banco._id)
                    this.tableData[i] = this.banco
                    this.modals.modal3 = false    
                }
              } catch (error) {
                    console.log(error)
                    this.mostrarMensaje("Error de conexión","warning")                
              }
              
          }
               
        }
    }
  }
</script>
<style>
    .dropdown-toggle{   
        width: 650px;
        font-size: 1rem;
    }
    .scrollable-menu {
        width: 650px;
        height: auto;
        max-height: 180px;
        overflow-x: hidden;
    }
    .titulos{
      font-size:1rem;
      color: rgba(0, 0, 0, 0.678);
    }
</style>
