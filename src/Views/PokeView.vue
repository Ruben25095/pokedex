<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
const router = useRouter();
const datapokemon = ref(null);

const back = () => {
    router.push('/');
}

onMounted(async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`);
        datapokemon.value = await response.json();
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
});
</script>

<template>
    <main class="min-h-screen w-full bg-gradient-to-t from-gray-400 to-indigo-600 flex flex-col items-center p-4 md:p-10">
        
        <div v-if="datapokemon" class="w-full max-w-5xl bg-gray-500/30 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                <div class="flex flex-col items-center">
                    <div class="relative group">
                        <img 
                            class="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-orange-300 to-gray-100 border-8 border-indigo-600 rounded-2xl shadow-lg transform transition-transform group-hover:scale-105" 
                            :src="datapokemon?.sprites.other['official-artwork'].front_default || datapokemon?.sprites.front_default" 
                            :alt="datapokemon?.name"
                        />
                    </div>
                    <h1 class="text-white text-4xl md:text-6xl font-black mt-6 tracking-wider drop-shadow-md">
                        {{ datapokemon?.name?.toUpperCase() }}
                    </h1>
                </div>

                <div class="flex flex-col space-y-6">
                    
                    <div class="bg-black/40 p-6 rounded-2xl text-white">
                        <h2 class="text-2xl font-bold mb-4 border-b border-white/20 pb-2">Características</h2>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-300 font-bold">Altura</p>
                                <p class="text-xl">{{ datapokemon?.height / 10 }} m</p>
                                <p class="text-indigo-300 font-bold mt-3">Peso</p>
                                <p class="text-xl">{{ datapokemon?.weight / 10 }} kg</p>
                            </div>
                            <div>
                                <p class="text-indigo-300 font-bold">Tipo</p>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="t in datapokemon?.types" :key="t.type.name" class="bg-indigo-500 px-2 py-1 rounded text-sm uppercase">
                                        {{ t.type.name }}
                                    </span>
                                </div>
                                <p class="text-indigo-300 font-bold mt-3">Habilidades</p>
                                <p class="capitalize text-sm" v-for="a in datapokemon?.abilities" :key="a.ability.name">
                                    {{ a.ability.name }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-blue-600/40 p-6 rounded-2xl text-white">
                        <p class="text-xl font-bold mb-4">Estadísticas Base</p>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div v-for="stat in datapokemon?.stats" :key="stat.stat.name" class="bg-blue-500/50 p-2 rounded-lg text-center">
                                <p class="text-xs uppercase opacity-80">{{ stat.stat.name }}</p>
                                <p class="text-lg font-bold">{{ stat.base_stat }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="flex justify-center mt-10">
                <button @click="back" class="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-10 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95">
                    VOLVER AL INICIO
                </button>
            </div>
        </div>

        <div v-else class="text-white text-2xl animate-pulse mt-20">
            Cargando Pokémon...
        </div>
    </main>
</template>