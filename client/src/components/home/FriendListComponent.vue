<template>
    <v-col cols="12" sm="3" class="flex-grow-1 flex-shrink-0 h-100 W-25">
        <v-list class="h-100 scrollbar">
              <v-item-group>
                <v-list-item :value="friend.id" v-for="friend in friendsList" :key="friend.id" :active="friend.id === selected" @click="selected = {name: friend.name, id: friend.id}">
                    <template class="d-flex w-100 justify-start align-center overflow-x-auto scrollbar" >
                        <v-avatar icon="mdi-face-man-profile">
                        <v-icon icon="$vuetify">
                        </v-icon>
                        </v-avatar>

                        <div class="mx-2 flex-grow-1">
                        <h4>
                            {{friend.name}}
                        </h4>
                        <v-list-item-subtitle>
                            {{friend.email}}
                        </v-list-item-subtitle>
                        </div>
                        <v-badge
                        color="info"
                        content="v2"
                        inline
                        ></v-badge>
                    </template>
                    <v-divider class="my-2"></v-divider>
                </v-list-item>
              </v-item-group>
          </v-list>
          {{ selected }}
    </v-col>
</template>

<script setup lang="ts">
import { useFriendShipStore } from '@/store/friendshipStore';
import { storeToRefs } from 'pinia';
import {ref} from 'vue'

const {friendsList} = storeToRefs(useFriendShipStore())
const selected = ref();

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