<script setup>
const emit = defineEmits(['siguiente', 'anterior'])

const props = defineProps({
  pagina: Number,
  inicio: Number,
  fin: Number,
  maxlength: Number,
})
</script>

<template>
  <div class="flex flex-row space-x-5 bg-transparent justify-center items-center">

    <button 
      @click="emit('anterior')"
      class="flex justify-center items-center bg-blue-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
       :disabled="pagina<=1"
    >
      Volver
    </button>

    <span class="flex w-10 h-10 bg-blue-600 rounded-full justify-center items-center text-2xl">
      {{ pagina }}
    </span>

    <button
      @click="  emit('siguiente')"
      class="flex justify-center items-center bg-blue-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
      :disabled="fin>=maxlength" 
    >
      Siguiente
    </button>

  </div>
</template>