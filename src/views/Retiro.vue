<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <sretiro  title="Solicitudes de Retiro"></sretiro>
                </div>
            </div>
           <!--  <div class="row mt-5">
                <div class="col">
                    <projects-table type="dark" title="Dark Table"></projects-table>
                </div>
            </div> -->
        </div>

    </div>
</template>
<script>
  import sretiro from './Solicitudes/SRetiro'
  export default {
    name: 'retiro',
    components: {
      sretiro
    }
  };
</script>
<style></style>
