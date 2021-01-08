<template>
    <div>
        <base-header type="gradient-success opacity-6" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <antecesores  title="Antecesores"></antecesores>                    
                </div>
                <div class="col-md-12 my-2">
                    <hijos  title="Hijos"></hijos>                    
                </div>
                <div class="col-md-12 my-2">
                    <nietos  title="Nietos"></nietos>                    
                </div>
                <div class="col-md-12 my-2">
                    <bisnietos  title="Bisnietos"></bisnietos>                    
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import Antecesores from './Linea/Antecesores'
  import Hijos from './Linea/Hijos'
  import Nietos from './Linea/Nietos'
  import Bisnietos from './Linea/Bisnietos'

  export default {
    name: 'afiliacion',
    components: {
      Antecesores,
      Hijos,
      Nietos,
      Bisnietos
    }
  };
</script>
<style></style>
