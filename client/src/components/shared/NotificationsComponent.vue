<template>
    <v-menu v-if="user">
        <template #activator="{props}">
        <v-badge  :content="errors.length > 0 ? '!' : friendRequests.length" :model-value="friendRequests.length > 0 || errors.length > 0" :color="errors && 'red'">
            <v-icon v-bind="props" icon="mdi-bell-outline">
            </v-icon>
        </v-badge>
        </template>
        <v-card>
        <v-list class="w-auto" max-height="40vh">
            <template v-if="!loading">
            <template v-if="errors.length > 0">
            <v-list-item v-for="(error, index) in errors" v-bind:key="index" class="bg-red">
                <v-list-item-title><v-icon icon="mdi-alert"/> {{ error }}</v-list-item-title>
            </v-list-item>
            </template>

            <template v-if="friendRequests.length > 0">
                <v-list-item v-for="request in friendRequests" v-bind:key="request.id" class="pa-3">
                <div class="d-flex">
                    <v-avatar :icon="request.profilePic || 'mdi-face-man-profile'"></v-avatar>
                    <div>
                    <v-list-item-title>{{request.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{request.email}}</v-list-item-subtitle>
                    </div>
                </div>


                <div class="d-flex my-4">
                    <v-btn class="mr-2" @click="() => user && friendRequestResponse(user.id, request.id || '', true, request.friendRequestSent[0].id)">Aceitar</v-btn>
                    <v-btn @click="() => user &&  friendRequestResponse(user.id ,request.id || '', false, request.friendRequestSent[0].id)">Rejeitar</v-btn>
                </div>

                <v-divider thickness="2"></v-divider>
                </v-list-item>
            </template>
            <template v-else>
                <v-list-item>
                <v-list-item-title class="">Nenhuma notificação <v-icon icon="mx-1 mdi-emoticon-sad-outline"></v-icon></v-list-item-title>
                </v-list-item>
            </template>
            </template>
            <template v-else>
            <v-list-item>
                <v-progress-circular indeterminate width="12" size="100"></v-progress-circular>            
            </v-list-item>
            </template>
        </v-list>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { useFriendRequestStore } from '@/store/friendRequestStore';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/userStore';

const {user} = storeToRefs(useUserStore())
const {friendRequests, errors, loading} = storeToRefs(useFriendRequestStore())
const {friendRequestResponse} = useFriendRequestStore()
</script>