<template>
  <div class="card shadow bg-gradient-success opacity-10"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
      </div>
      <hr class="my-3">
      <transition name="slide-fade">
        <base-alert class="mensaje my-2" :type="mensaje.tipoMensaje" ref="mensaje"  v-if="mensaje.show"><strong>{{mensaje.mensaje}}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="mensaje.show=false">
                <span aria-hidden="true">&times;</span>
            </button>
        </base-alert>
      </transition>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="solicitudesPaginadas">
        <template slot="columns">
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem"></th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Código</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Nombre</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Telefono</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Estado</th>
          </template>

        <template slot-scope="{row}">
          <th scope="row" class="bg-gradient-success">            
          </th>      
          <th scope="row" class="bg-gradient-white">
            <div>{{row.cedula}}
            </div>
          </th>          
          <th scope="row" class="bg-gradient-white">
            <div class="media align-items-center">
              <div class="media-body">
                <span>{{row.nombre +" "+ row.apellido}}</span>
              </div>
            </div>
          </th>
          <td class="bg-gradient-white align-items-center">
            {{row.telefono}}
          </td>
          <td class="bg-gradient-white">
            <div>
              <badge class="badge-dot mr-4" type="success">
              <span class="status">{{row.parentesco}}</span>
            </badge>
            </div>
          </td>        

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination @input="newValue" :value="value" :pageCount="Math.ceil(tableData.length/perPage)" :perPage="perPage"></base-pagination>
    </div>

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'antecesores',
    components:{
    },
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        tableData: [
        ],
        perPage:8,
        mensaje:{
            mensaje: `Respuesta enviada.`,
            show: false,
            tipoMensaje: ""
        },
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
        }
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
      }
    },
    computed:{
      solicitudesPaginadas(){
        return this.paginate(this.tableData)
      }
    },
    beforeMount: async function(){
      const resAfi = JSON.parse(localStorage.getItem('afiliado'))
      const resGet = await axios('http://localhost:3000/suscriptores/' + resAfi.data.cedula_auspiciador)
      let data = {
          cedula:"Código",
          nombre: "Master",
          apellido: "",
          estatus: 1,
          parentesco:''
        }
      if(resGet.status == 200){
        resGet.data.parentesco = "Padre"
        this.tableData.push(resGet.data)        
        const resAbu = await axios('http://localhost:3000/suscriptores/' + resAfi.data.cedula_abuelo)
         if(resAbu.status == 200){
            resAbu.data.parentesco = "Abuelo"
            this.tableData.push(resAbu.data)        
            const resBisa = await axios('http://localhost:3000/suscriptores/' + resAfi.data.cedula_bisabuelo)
            if(resBisa.status == 200){
              resBisa.data.parentesco = "Bisabuelo"
              this.tableData.push(resBisa.data)
            }else{
              data.parentesco = "Bisabuelo"    
              this.tableData.push(data)
            }
         }else{
            data.parentesco = "Abuelo"    
            this.tableData.push(data)
         }     
      }else{            
        data.parentesco = "Padre"    
        this.tableData.push(data)
      }
      
      console.log(resGet.status)     
    }
  }
</script>
<style>
</style>
