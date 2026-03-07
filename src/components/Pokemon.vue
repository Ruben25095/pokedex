<script setup>
// 1. IMPORTACIONES CRUCIALES (Verifica que estén todas)
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Paginacion from './Paginacion.vue';

const router = useRouter();
const pagina = ref(1);
const inicio = ref(0);
const PostXpage = 18;
const fin = ref(PostXpage);
const Pokemons = ref([]);

// 2. FUNCIÓN PARA CARGAR EL ESTADO PREVIO
const cargarEstadoPrevio = () => {
  const guardado = localStorage.getItem('paginacion_pokemon');
  if (guardado) {
    try {
      const data = JSON.parse(guardado);
      pagina.value = data.pagina || 1;
      inicio.value = data.inicio || 0;
      fin.value = data.fin || PostXpage;
    } catch (e) {
      console.error("Error al leer localStorage", e);
    }
  }
};

// 3. VIGILAR CAMBIOS Y GUARDAR (Watch)
watch([pagina, inicio, fin], ([newPag, newIni, newFin]) => {
  const estado = { pagina: newPag, inicio: newIni, fin: newFin };
  localStorage.setItem('paginacion_pokemon', JSON.stringify(estado));
});

onMounted(async () => {
  // Primero restauramos la posición donde se quedó el usuario
  cargarEstadoPrevio();

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=300');
    // Accedemos a response.data.results (Axios envuelve la respuesta en 'data')
    Pokemons.value = response.data.results;
  } catch (error) {
    console.error("Error cargando pokemons:", error);
  }
});

const pokemonid = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const pokeview = (name) => {
  router.push(`/pokemon/${name}`);
};

const maxlength = computed(() => Pokemons.value.length);

const Siguiente = () => {
  if (fin.value < maxlength.value) {
    pagina.value++;
    inicio.value += PostXpage;
    fin.value += PostXpage;
  }
};

const Anterior = () => {
  if (pagina.value > 1) {
    pagina.value--;
    inicio.value -= PostXpage;
    fin.value -= PostXpage;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-600 to-blue-500 pb-10">
    <div class="container mx-auto px-4 pt-6">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        <div 
          v-for="pokemon in Pokemons.slice(inicio, fin)" 
          :key="pokemon.name" 
          class="flex flex-col items-center w-full transition-transform hover:scale-105"
        > 
          <div class="relative w-full aspect-[4/5] max-w-[160px]">
            <img 
              @click="pokeview(pokemon.name)" 
              class="w-full h-full object-contain bg-gradient-to-br from-blue-600 to-gray-300 border-4 border-gray-600 rounded-xl shadow-lg cursor-pointer hover:from-orange-600 hover:to-gray-100 transition-colors" 
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonid(pokemon.url)}.png`" 
              :alt="pokemon.name"
            />
          </div>
          <p class="mt-2 font-bold capitalize text-white text-sm drop-shadow-md">
            {{ pokemon.name }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <Paginacion
        @siguiente="Siguiente"
        @anterior="Anterior"
        :pagina="pagina"
        :maxlength="maxlength"
        :inicio="inicio"
        :fin="fin"   
      />
    </div>
  </div>
</template>