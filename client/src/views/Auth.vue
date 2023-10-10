<template>
    <v-app> 
        <div class="absolute-icon" style="z-index: 10;">
            <v-btn class="bg-blue rounded-pill" to="/">
                <v-icon icon="mdi-arrow-left"></v-icon>
            </v-btn>
        </div>

        <v-container class="h-100 w-100 d-flex"> 
            <v-card class="w-100 elevation-6 my-auto responsive-height">
                <v-window v-model="step" class="h-100">
                    <v-window-item :value="1" class="h-100">
                        <LoginComponent :step="step" @changeToLogin="step = 2; reset()"/>
                    </v-window-item>
                    <v-window-item :value="2" class="h-100 ">
                        <RegisterComponent @changeToRegister="step = 1; reset()"/>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RegisterComponent from '@/components/auth/RegisterComponent.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import { useUserStore } from '@/store/userStore';
const {reset} = useUserStore()
const step = ref<1 | 2>(1)
</script>
<style>
.absolute-icon{
    position: absolute;
    top: 10px;
    left: 10px
}
.responsive-height{
    height: 75%;
}
.responsive-height-2{
    height: 100%;
}
@media (max-width: 600px){
    .responsive-height{
        height: 100%;
    }
            .responsive-height-2{
    height: 100%;
}
}
</style>