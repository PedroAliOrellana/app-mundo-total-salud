<template>
    <div>
        <base-header type="gradient-success opacity-6" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <solicitud-afiliacion  title="Solicitudes de Afiliación"></solicitud-afiliacion>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import SolicitudAfiliacion from './Solicitudes/SolicitudAfiliacion'
  export default {
    name: 'afiliacion',
    components: {
      SolicitudAfiliacion
    }
  };
</script>
<style></style>
