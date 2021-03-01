<template>
  <input type="text" 
    class="form-control my-2" 
    placeholder="ingrese nombre"
    v-model.trim="tarea.nombre"
    />
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" v-model="tarea.categorias" value="javascript" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
      JavaScript
      </label>
    </div>
    <div class="form-check form-check-inline mt-3">
      <input class="form-check-input" type="checkbox" v-model="tarea.categorias" value="node" id="flexCheckDefault2">
      <label class="form-check-label" for="flexCheckDefault2">
      Node.js
      </label>
    </div>
  <br>
    <div class="form-check form-check-inline mt-3">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-model="tarea.prioridad" value="urgente">
  <label class="form-check-label" for="flexRadioDefault1">
    Urgente
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  v-model="tarea.prioridad" value="normal">
  <label class="form-check-label" for="flexRadioDefault2">
    Normal
  </label>
</div>

<div class="mt-3">
  <input type="number" class="form-control" v-model.number="tarea.numero">
</div>

<button 
 class="btn btn-primary mt-2"
 :disabled="btnDisabled"
>
Enviar
</button>
</template>

<script>
export default {
  props:{
    tarea: Object
  },
  computed:{
  btnDisabled(){
      return this.tarea.nombre.trim() === '' ?  true : false;
    }
  }
}
</script>

