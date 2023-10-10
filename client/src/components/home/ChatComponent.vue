<template>
    <v-col cols="auto" class="flex-grow-1 h-100 w-75">
        <v-card class="h-100 pa-3">
        <div class="d-flex align-center mb-4">
            <v-avatar>
                <v-img cover src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"/> 
            </v-avatar>
            <v-card-title style="height: 10%;">Nome pessoa</v-card-title>
        </div>


            <v-card class=" h-75 d-flex flex-column w-100 overflow-auto elevation-0" style="">
                <v-hover v-for="(item, index) in [39203290, 3230293029, 3029302]" v-bind:key="index">
                    <template v-slot:default="{isHovering, props: hover}" >
                        <div v-bind="hover" class="d-flex w-100 my-4">
                            <v-menu>
                                <template #activator="{isActive ,props}">
                                    <v-chip dark v-bind="props" class="h-auto overflow-hidden rounded-xl w-auto px-3 py-0 ml-auto " prepend-icon="mdi-chevron-down" style="max-width: 75%;">
                                        <v-list class="bg-transparent d-flex w-100 pa-0 ma-0">
                                            <v-list-item class="flex-shrink-1 text-wrap">
                                                {{ text }}
                                            </v-list-item>
                                            <v-list-item style="width: fit-content;" class="mx-2 pa-1">
                                                <sub >
                                                21:52
                                                </sub>
                                                <v-icon v-if='isHovering || isActive' size="small" icon="mdi-chevron-down">
                                                </v-icon>
                                            </v-list-item>
                                        </v-list>
                                    </v-chip>
                                </template>
                                <v-card class="w-auto ml-auto">
                                    <v-list>
                                        <v-list-item>remover</v-list-item>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </div>
                    </template>
                </v-hover>
            </v-card>
        
            <v-card-text class="flex-grow-1 flex-shrink-1 d-flex justify-center align-center" style="height: 15%;">
                <v-text-field
                v-model="inputMessage"
                label="Enviar Mensagem"
                type="text"
                no-details
                outlined
                append-outer-icon="send"
                @keyup.enter="inputMessage"
                hide-details
                class="align-center"
                />
                <v-btn class="mx-2 rounded-lg h-100 rounded-circle"><v-icon icon="mdi-send"></v-icon></v-btn>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputMessage = ref<string>('')
const text = 'ssssssssssssssssssssssssss'

</script>

<style scoped>
 .scrollbar::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px gray;
}

/* Handle */
.scrollbar::-webkit-scrollbar-thumb {
  background: gray;
}

/* Handle on hover */
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>