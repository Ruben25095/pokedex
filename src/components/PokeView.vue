<script setup>
import axios from 'axios';
import { useRoute,useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
const router = useRouter();
const datapokemon = ref()








const back = () => {
    router.push('/');


}





onMounted (async()=>{
   
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`);
         datapokemon.value = await response.json();
       console.log(datapokemon.value);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
   
   
})
//getData();






</script>


<template>
 
    <main class="flex flex-col   justify-center items-center w-screen h-screen space-x-2 pt-0">
       <div class="bg-gradient-to-t from-gray-400 to-indigo-600 w-full h-full  flex flex-col justify-center items-center space-y-4">

        <div class="flex bg-gray-500 w-2/4 flex-row justify-center items-start space-x-20">
<div>
        <div class="flex  bg-blue-600  flex-col mt-8 ">
                <img class="flex  bg-gradient-to-br  from-orange-300 to-gray-100  border-6 border-indigo-600 rounded-xl  w-80 h-100" :src="datapokemon?.sprites.front_default || 'https://via.placeholder.com/150'" :alt="'No encontrado'"/>
            
      
    </div>

                  <div class="flex mt-10 justify-center items-center flex-col">
                    <p class="text-white text-4xl">{{ datapokemon?.name?.toUpperCase() || 'No encontrado' }}</p>
                  </div>  
    </div>
            
    <div class="flex flex-col mt-20 justify-start items-center  bg-gradient-to-br from-gary-600 to-black p-30 mb-10 w-150 h-150 p-4 rounded-xl">
            <h1 class="text-white text-2xl">Caracteristicas Generales</h1>
        <div class="flex flex-row p-5 justify-center items-center bg-blue-500 w-100s h-60">
        <div class="flex flex-col pl-20 space-x-20 justify-center items-center">
      
        <p class="text-lg  text-white mt-2">Altura</p>
         <p class="text-lg  justify-center items-center "> {{ datapokemon?.height || 'No encontrado' }}</p>
            <p class="flex text-white text-lg mt-2">Peso</p>
        <p class="text-lg  justify-center items-center "> {{ datapokemon?.weight || 'No encontrado' }} </p>
        

        </div>
     
            <div class="flex flex-col  justify-center items-center w-1/2">
                  <p class="text-lg text-white pr-4 mt-4">Habilidades</p>
        <p class="pr-6" v-for="pokemon in datapokemon?.abilities" :key="pokemon.ability.name">
      {{ pokemon.ability.name }}
    </p>
 
           <p class="text-lg pr-4 text-white mt-4">Tipo</p>
     <p >
   {{ datapokemon?.types.map(type => type.type.name).join(', ') || 'No encontrado' }}
    </p>

            </div>
     
   
  
        </div>
      
   

<div class="flex flex-col mt-3 justify-start items-center w-150 h-150 p-4 rounded-xl">
      <p class=" text-white text-xl justify-center items-center font-bold mt-4">Estadísticas</p>
      <ul class="flex flex-row space-x-5  justify-start items-start space-y-1">
        <li class="bg-blue-500 text-white p-2 rounded" v-for="stat in datapokemon?.stats" :key="stat.stat.name">
          {{ stat.stat.name }}: {{ stat.base_stat }}
        </li>
      </ul>
       

    </div>
    </div>
    
    

    

    </div>
    <div class="flex justify-center items-center mb-20">
        <button @click="back" class="bg-gradient-to-br from-green-400 to-blue-500 text-white px-4 py-2 rounded-full hover:bg-gradient-to-br hover:from-green-600 hover:to-blue-700 hover:cursor-pointer">Volver</button>
        </div>
      </div>
   
    </main>
</template>