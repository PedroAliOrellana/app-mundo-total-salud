<template>
  <div>
    <base-header class="header pb-4 pt-5 pt-lg-4 d-flex align-items-center"
    style="min-height: 250px;  background-size: cover; background-position: center top;">
            <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>         
    </base-header>
    <div>                                
    <form class="col-lg-12">
      <div class="card  bg-gradient-success opacity-10">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Gestion de Roles</h3>
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
          <form @submit.prevent  class="card col-lg-12 bg-gradient-success opacity-10">    
            <div class="row my-3">              
              <div class="col-lg-2">                
              </div>
              <div class="col-lg-6">
                <base-dropdown>
                  <base-button slot="title" type="default" class="dropdown-toggle">{{rol.nombre}}</base-button>
                    <div class="scrollable-menu">
                        <a class="dropdown-item" v-for="item in roles" :value="item.value" v-text="item.nombre" :key="item.nombre" @click="CargarFunciones(item)" ></a >                                        
                    </div>
                </base-dropdown>
              </div> 
            </div>
            <div class="row">
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Nombre"
                            placeholder="Nombre"
                            input-classes="form-control-alternative"
                            v-model="rol.nombre"
                />
              </div>
              <div class="col-lg-6">
                <base-input alternative=""
                            label="Descripción"
                            placeholder="Descripción"
                            input-classes="form-control-alternative"
                            v-model="rol.descripcion"
                />
              </div> 
            </div>            
            <div class="col text-right my-2">
              <base-button type="primary" @click="Guardar" class="btn btn-sm btn-primary">Agregar Rol</base-button>
            </div>
        </form>
      </div>
    </form>
  </div>
  <div class="col-lg-12 my-2">
    <div class="card shadow bg-gradient-success opacity-10" :class="type === 'dark' ? 'bg-default': ''">
      <div class="card-header border-0"
          :class="type === 'dark' ? 'bg-transparent': ''">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
              Funcionalidades
            </h3>
          </div>
        </div>
        <hr class="my-3">      
      </div>

      <div class="table-responsive">
        <base-table class="table align-items-center table-flush"
                    :class="type === 'dark' ? 'table-dark': ''"
                    :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                    tbody-classes="list"
                    :data="funcionalidades">
          <template slot="columns">
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem"></th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Nombre</th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Descripción</th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Icono</th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Url Vista</th>
            <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Funcionalidades</th>
            </template>

          <template slot-scope="{row}">
            <th scope="row" class="bg-gradient-success">            
            </th>      
            <th scope="row" class="bg-gradient-white">
              <div>{{row.nombre}}
              </div>
            </th>          
            <th scope="row" class="bg-gradient-white">
              <div class="media align-items-center">
                <div class="media-body">
                  <span>{{row.descripcion}}</span>
                </div>
              </div>
            </th>
            <td class="bg-gradient-white align-items-center">
              {{row.icono}}
            </td>
            <td class="bg-gradient-white">
              <div>
                <span class="status">{{row.url_vista}}</span>
              </div>
            </td> 
            <td class="bg-gradient-white">
              <div class="row">
                {{row.children}}
              </div>
              <!-- <div>
                {{row.children[1].nombre}}
              </div> -->
              <!-- <div :v-if="row.children.length > 0">
                <div :v-for="item in row.children" :key="item">
                  <span>{{item._id}}</span>
                </div>
              </div> -->
            </td>       

          </template>

        </base-table>
      </div>

      <div class="card-footer d-flex justify-content-end"
          :class="type === 'dark' ? 'bg-transparent': ''">
        <base-pagination @input="newValue" :value="value" :pageCount="Math.ceil(tableData.length/perPage)" :perPage="perPage"></base-pagination>
      </div>

    </div>
  </div>

</div>

                             
</template>
                   
<script>
  import axios from 'axios'

  export default {
    components: {
    },
    name: 'user-profile',
    data() {
      return {       
        mensaje:{
            mensaje: `Respuesta enviada.`,
            show: false,
            tipoMensaje: ""
        },        
        tableData: [
        ],
        perPage:4,        
        value:1,
        meses : [
          "01","02","03","04","05","06","07","08","09","10","11","12"
          ],
        dias : [
          "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"
          ],
        familia:{
          bisabuelo:'',
          abuelo:'',
          padre:'',
          hijo:'',
          niento:'',
          bisnieto:''          
        },
        roles:[],
        rol:{
          nombre:'Seleccione Rol',
          descripcion: '',
          _id:''
        },
        funcionalidades:[]
      }
    },
    methods:{
      mostrarMensaje(texto, tipo){
        this.mensaje.tipoMensaje = tipo
        this.mensaje.mensaje = texto
        this.mensaje.show = true
        setTimeout(() => {if(this.mensaje.show) {this.mensaje.show = this.mensaje.false}} ,4000)                   
      },
      paginate(solicitudes){
        let value = this.value
        let perPage = this.perPage
        let from = (value * perPage) - perPage
        let to = (value * perPage)
        return solicitudes.slice(from,to)  
      },
      newValue(value){
        this.value = value
      },
      CargarFunciones: async function(rol){
        this.rol.nombre = rol.nombre
        this.rol.descripcion = rol.descripcion
        this.rol._id = rol._id
        console.log(rol._id)
        const resGet = await axios('http://localhost:3000/funcionalidadesRol/menu/'+ rol._id)
        this.funcionalidades = resGet.data.funcionalidad
      },
      Guardar(){

      }
    },
    computed:{
      solicitudesPaginadas(){
        return this.paginate(this.tableData)
      }
    },
    beforeMount: async function(){
        const resGet = await axios('http://localhost:3000/roles') 
        this.roles = resGet.data
        console.log(this.roles)
    }
  };
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

