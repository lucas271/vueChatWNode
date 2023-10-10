<template>
    <v-row class="d-flex justify-center align-center ma-0 h-100">
        <v-col cols="12" sm="6">
            <v-card-title class="text-center">Login</v-card-title>
            <v-form class="w-75 mx-auto" validate-on="submit lazy" @submit.prevent v-model="isValidInputs" @submit="submitForm" v-if="!loading">
                <v-alert v-if="errors.length > 0" title="ERROR" color="red" :text="errors.join(', ')">
                </v-alert>
                <v-text-field
                label="Email"
                :rules="emailRules"
                color="blue"
                class="mt-16"
                v-model="email"
                />
                <v-text-field
                label="Password"
                outlined
                dense
                color="blue"
                :rules="passwordRules"
                autocomplete="false"
                type="password"
                v-model="password"
                />
                <v-checkbox
                label="Remember Me"
                class="mt-n1"
                color="blue"
                ></v-checkbox>
                <span class="caption blue--text">Forgot password?</span>
                <v-btn color="blue" type="submit" dark block>Log in</v-btn>
                <div class="text-center w-100 my-10 d-sm-none">Não tem uma conta? <br> <v-btn tile outlined dark @click="$emit('changeToLogin')">Registre-se</v-btn></div>
            </v-form>
            <div v-else class="d-flex align-center justify-center" >
                <v-progress-circular indeterminate width="12" size="100"></v-progress-circular>            
            </div>
        </v-col>
        <v-col cols="6" class="bg-blue rounded-bs-circle rounded-ts-circle h-100 d-none d-sm-flex flex-column justify-center">
            <article>
                <h3 class="text-center">Ainda não tem uma conta???</h3>
                <h6
                class="text-center"
                >Comece criando a sua própria conta para fazer parte<br> da experiencia do chat</h6>
            </article>
            <div class="text-center my-5">
                <v-btn tile outlined dark @click="$emit('changeToLogin')">Registre-se</v-btn>
            </div>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { emailRules, passwordRules } from './inputRules';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import router from '@/router';

const password = ref('')
const email = ref('')
const isValidInputs = ref<boolean | undefined>(undefined)

const {login} = useUserStore()
const {errors, loading} = storeToRefs(useUserStore())

async function submitForm(){
    if(!isValidInputs.value) return

    await login(email.value, password.value)
    if(errors.value.length > 0) return
    router.push('/')

}

defineEmits(["changeToLogin"])


</script>

<style scoped>
</style>