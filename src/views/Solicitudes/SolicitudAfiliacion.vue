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
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Nombre</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Auspiciador</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Tipo de pago</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Fecha</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Banco</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Monto</th>
          <th class="bg-gradient-success" style="color:rgba(0, 0, 0, 0.678); font-size:0.75rem">Referencia</th>
          </template>

        <template slot-scope="{row}">
          <td class="text-right">
            <base-button type="secondary" size="sm" @click="aceptarSolicitud(row)"><font-awesome-icon icon="thumbs-up"/></base-button>
            <base-button type="danger" @click="eliminarSolicitud(row)" size="sm"><font-awesome-icon icon="trash-alt"/></base-button>
          </td>
          <th scope="row" class="bg-gradient-white">
            <div class="media align-items-center">
              <div class="media-body">
                <span>{{row.nombre +" "+ row.apellido}}</span>
              </div>
            </div>
          </th>
          <td class="bg-gradient-white align-items-center">
            {{row.cedula_auspiciador}}
          </td>
          <td class="bg-gradient-white">
            <div >{{row.tipo_pago}}
            </div>
          </td>
          <td class="bg-gradient-white">
            <div class="media align-items-center" >
              <span>{{dias[new Date(row.fecha_pago).getDate()-1] + '-'+ meses[new Date(row.fecha_pago).getMonth()] +'-'+ new Date(row.fecha_pago).getFullYear()}}</span>
            </div>
          </td>
          <td class="bg-gradient-white">
            <div class="d-flex align-items-center">{{row.banco_pago}}              
            </div>
          </td>  
          <td class="bg-gradient-white">
            <div class="d-flex align-items-center">{{row.monto_pago}}              
            </div>
          </td>
          <td class="bg-gradient-white">
            <div class="d-flex align-items-center">{{row.referencia_pago}}              
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
    name: 'solicitud-afiliacion',
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
          ]
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
      eliminarSolicitud: async function(solicitud){
        if(confirm("Confirma que desea eliminar la solicitud de "+ solicitud.nombre + " " + solicitud.apellido)){
         try {
             const resElim = await axios.put('http://159.203.124.21:3000/solicitudesAfiliacion/'+ solicitud.cedula,{estatus:3},{
                      headers:{
                          Authorization: 'Bearer '+ localStorage.getItem('token')
                      }
              })
              if(resElim.status == 201){
                this.mostrarMensaje('Solicitud Eliminada',"success")
              }
          } catch (error) {
            this.mostrarMensaje("Error de conexión",'warning')
          }
          let i = this.tableData.findIndex(elemento => elemento._id === solicitud._id)
          this.tableData.splice(i,1)  
        }
        
      },
      newValue(value){
        this.value = value
      },
      aceptarSolicitud: async function(solicitud){
        if(confirm("Confirma la aprobación de la solicitud de "+ solicitud.nombre + " " + solicitud.apellido)){
          try {
            const resAus = await axios.get('http://159.203.124.21:3000/suscriptores/'+solicitud.cedula_auspiciador)
            let data = {
              cedula:solicitud.cedula,
              nombre:solicitud.nombre,
              apellido:solicitud.apellido,
              fecha_nacimiento:solicitud.fecha_nacimiento,
              correo:solicitud.correo,
              telefono:solicitud.telefono,
              cedula_auspiciador:solicitud.cedula_auspiciador,
              cedula_abuelo:resAus.data.cedula_auspiciador,
              cedula_bisabuelo:resAus.data.cedula_abuelo
            }
            const resPost = await axios.post('http://159.203.124.21:3000/suscriptores',data,{
                          headers:{
                              Authorization: 'Bearer '+ localStorage.getItem('token')
                          }
            })
            if(resPost.status == 200)
            {
              let datos = {
                email: solicitud.correo,
                id_rol: "5f8df88afd87cd2da035c3cb"
              }
              const resUser = await axios.post('http://159.203.124.21:3000/users',datos)
              if(resUser.status ==200){
                const resPass = await axios.get('http://159.203.124.21:3000/users/restaurar/'+ solicitud.correo)
                if(resPass.status == 200){
                  const resSolicitud = await axios.put('http://159.203.124.21:3000/solicitudesAfiliacion/'+ solicitud.cedula,{estatus:2},{
                          headers:{
                              Authorization: 'Bearer '+ localStorage.getItem('token')
                          }
                  })
                  if(resSolicitud.status == 201){
                    this.mostrarMensaje('Solicitud aprobada, usuario enviado al correo',"success")
                    let i = this.tableData.findIndex(elemento => elemento._id === solicitud._id) 
                    this.tableData.splice(i,1)
                  }else{
                    console.log(resSolicitud)
                    this.mensaje("El error fue al actualizar info",'warning')
                  }                  
                }else{
                console.log(resPass)
                this.mensaje("El error fue al enviar contraseña",'warning')
                }
              }else{
                console.log(resUser)
                this.mensaje("El error fue al crear",'warning')
              }      
            }
          } catch (error) {
            this.mostrarMensaje("Error de conexión",'warning')
          }
          
        }
      }
    },
    computed:{
      solicitudesPaginadas(){
        return this.paginate(this.tableData)
      }
    },
    beforeMount: async function(){
      const resGet = await axios('http://159.203.124.21:3000/solicitudesAfiliacion')
      this.tableData = resGet.data
     
    }
  }
</script>
<style>
</style>
