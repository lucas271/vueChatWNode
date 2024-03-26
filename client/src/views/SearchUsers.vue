<template>
    <NavbarComponent/>
    <v-container class="h-100 d-flex flex-column mt-14">
        <v-card class="pa-4 flex-shrink-1 flex-grow-1 overflow-y-auto" elevation="0">
            <v-card-title class="text-wrap text-center mb-3">Usuários para adicionar</v-card-title>
            <v-alert v-if="errors.length > 0" title="ERRO" icon="mdi-alert-circle" type="error">
                <ul class="">
                    <li v-for="(error, index) in errors" v-bind:key="index">
                        {{ error }}
                    </li>
                </ul>
                <v-btn class="mt-4" @click="() => getUsers(page - 1)"> Tentar Novamente </v-btn>
            </v-alert>
            <v-row v-if="!loading" >
                <template v-if='users.length > 0'>
                  <v-col cols='12' md="4" lg="3" sm="6" v-for="(item, index) in users" v-bind:key="index" >
                      <v-card-item class="rounded-b-xl rounded-t-lg elevation-3">
                          <div class="d-flex align-center my-3">
                              <v-avatar>
                                  <v-img cover src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"/> 
                              </v-avatar>
                              <v-card-title class="mx-3">{{item.name}}</v-card-title>
                          </div>
                          <v-card-subtitle class="my-3">{{ item.email }}</v-card-subtitle>
                          <v-btn  variant="tonal" rounded="sm" @click="() => {sendRequest(item.id, user?.id || '', page - 1)}">Pedir amizade</v-btn>
                      </v-card-item>
                  </v-col>
                <template>
                <template v-else>
                  <v-alert text='Nenhum outro usuario no site :(' title='está vazio aqui...'/>
                </template>
            </v-row>
            <div v-else class="h-75 d-flex align-center justify-center" >
                <v-progress-circular indeterminate width="12" size="100"></v-progress-circular>            
            </div>
        </v-card>

        <footer class="h-10 my-4" v-if='totalUser > 0'>
            <v-pagination v-model='page' :length='Math.ceil(totalUsers / limit)'  rounded="lg" class="w-100 mx-auto" >
            </v-pagination>
        </footer>
    </v-container>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import {useFriendRequestStore} from '@/store/friendRequestStore'
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';

const {sendRequest} = useFriendRequestStore()

const {users, user, limit, totalUsers, errors, loading} = storeToRefs(useUserStore())
const {getUsers} = useUserStore()

const page = ref<number>(1)

watch(page, async (newPage) => {
    await getUsers(newPage - 1)
})

</script>

<style scoped>

</style>
