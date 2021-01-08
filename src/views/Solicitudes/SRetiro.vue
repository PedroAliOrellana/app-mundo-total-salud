<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">Ver todas</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>Nombre</th>
          <th>Tipo Retiro</th>
          <th>Estado</th>
          <th>Metodo de pago</th>
          <th>Banco</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.budget}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
          <td>
            <div >{{row.tipo_pago}}
              <!-- <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Ryan Tompson">
                <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Romina Hadid">
                <img alt="Image placeholder" src="img/theme/team-2-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Alexander Smith">
                <img alt="Image placeholder" src="img/theme/team-3-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Jessica Doe">
                <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
              </a> -->
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">{{row.banco}}              
            </div>
          </td>  
          

          <td class="text-right">
            <base-button type="secondary" size="sm"><i class="ni ni-check-bold"></i></base-button>
            <base-button type="secondary" size="sm"><i class="fas fa-search" @click="activarModal"></i></base-button>
            <base-button type="secondary" size="sm"><i class="ni ni-fat-remove"></i></base-button>
            <!-- <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </template>
            </base-dropdown> -->
          </td>

        </template>

      </base-table>
    </div>

 <!--    <div class="col-md-4">

        <modal v-if="modal"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <small>Sign in with</small>
                    </div>
                    <div class="btn-wrapper text-center">
                        <base-button type="neutral">
                            <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/github.svg">
                            Github
                        </base-button>

                        <base-button type="neutral">
                            <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/google.svg">
                            Google
                        </base-button>
                    </div>
                </template>
                <template>
                    <div class="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                    </div>
                    <form role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83">
                        </base-input>
                        <base-input alternative
                                    type="password"
                                    placeholder="Password"
                                    addon-left-icon="ni ni-lock-circle-open">
                        </base-input>
                        <base-checkbox>
                            Remember me
                        </base-checkbox>
                        <div class="text-center">
                            <base-button type="primary" class="my-4">Sign In</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
    </div> -->  

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'sretiro',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        modal: false,
        tableData: [
          {
            img: 'img/theme/bootstrap.jpg',
            title: 'Pedro Orellana',
            budget: 'SAP',
            status: 'pending',
            statusType: 'warning',
            completion: "295479231",
            banco: "Banesco",
            tipo_pago: "Transferencia"
          },
           {
            img: 'img/theme/bootstrap.jpg',
            title: 'Pedro Orellana',
            budget: 'VP',
            status: 'pending',
            statusType: 'warning',
            completion: "295479231",
            banco: "Banesco",
            tipo_pago: "Transferencia"
          },
           {
            img: 'img/theme/bootstrap.jpg',
            title: 'Pedro Orellana',
            budget: 'SAP',
            status: 'pending',
            statusType: 'warning',
            completion: "295479231",
            banco: "Banesco",
            tipo_pago: "Transferencia"
          },
           {
            img: 'img/theme/bootstrap.jpg',
            title: 'Pedro Orellana',
            budget: 'VP',
            status: 'pending',
            statusType: 'warning',
            completion: "295479231",
            banco: "Banesco",
            tipo_pago: "Transferencia"
          },
           {
            img: 'img/theme/bootstrap.jpg',
            title: 'Pedro Orellana',
            budget: 'VP',
            status: 'pending',
            statusType: 'warning',
            completion: "295479231",
            banco: "Banesco",
            tipo_pago: "Transferencia"
          },
        ]
      }
    },
    methods:{
      activarModal(){
        this.modal = true
      }
    }
  }
</script>
<style>
</style>
