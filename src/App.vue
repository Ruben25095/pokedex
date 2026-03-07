<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const volverAlInicio = async () => {
  // 1. Borramos el rastro de la página guardada
  localStorage.removeItem('paginacion_pokemon');
  
  // 2. Navegamos al inicio
  await router.push('/');

  // 3. Forzamos una recarga ligera si ya estamos en el inicio 
  // para que el componente de la lista vuelva a leer el localStorage (ahora vacío)
  window.location.reload(); 
};
</script>





<template>
  <div class="flex flex-col bg-black min-h-screen w-full">
    <nav class="bg-gradient-to-br from-gray-600 to-blue-500 p-4 shadow-xl">
      <ul class="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-lg md:text-xl text-white">
        <li class="cursor-pointer transition-transform hover:scale-110" @click="volverAlInicio">
          <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="105" r="90" fill="rgba(0,0,0,0.15)" />
            <path d="M10 100 A90 90 0 0 1 190 100 L10 100 Z" fill="#E53935"/>
            <path d="M10 100 A90 90 0 0 0 190 100 L10 100 Z" fill="#FFFFFF"/>
            <rect x="10" y="92" width="180" height="16" fill="#000000"/>
            <circle cx="100" cy="100" r="28" fill="#000000"/>
            <circle cx="100" cy="100" r="18" fill="#FFFFFF"/>
            <circle cx="100" cy="100" r="90" fill="none" stroke="#000000" stroke-width="4"/>
          </svg>
        </li>

        <li class="cursor-pointer hover:text-red-300 transition-colors font-bold" @click="volverAlInicio">
          Pokemon
        </li>
        <li><router-link to="/about" class="hover:text-blue-200">About</router-link></li>
        <li><router-link to="/login" class="hover:text-blue-200">Login</router-link></li> 
      </ul>
    </nav>

    <router-view/>
  </div>
</template>

<style scoped>





</style>
