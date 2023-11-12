<template>
    <v-row class="d-flex justify-center align-center h-100 ma-0">
        <v-col cols="12" sm="6">
            <v-card-title class="text-center">Register</v-card-title>
            <v-form validate-on="submit lazy" @submit.prevent v-model="isValidInputs" @submit="submitForm" class="w-75 mx-auto" v-if="!loading">
                <v-alert v-if="errors.length > 0" title="ERROR" color="red" :text="errors.join(', ')"/>

                <v-text-field
                label="Email"
                outlined
                dense
                color="blue"
                autocomplete="false"
                class="mt-16"
                :rules="emailRules"
                v-model="email"
                />
                <v-text-field
                label="Name"
                outlined
                dense
                color="blue"
                autocomplete="false"
                type="text"
                :rules="nameRules"
                v-model="name"
                />
                <v-text-field
                label="Password"
                outlined
                dense
                color="blue"
                autocomplete="false"
                type="password"
                :rules="passwordRules"
                v-model="password"
                />
                <v-text-field
                label="Repeat password"
                outlined
                dense
                color="blue"
                autocomplete="false"
                type="password"
                :rules="[...passwordRules, (value) => value === password ? true : 'senhas não são iguais']"
                v-model="repeatPassword"
                />
                <v-checkbox
                label="Remember Me"
                class="mt-n1"
                color="blue"
                ></v-checkbox>
                <span class="caption blue--text">Forgot password?</span>
                <v-btn color="blue" type="submit" dark block tile>Sign up</v-btn>
                <div class="text-center w-100 my-10 d-sm-none">Já tem uma conta? <br> <v-btn tile outlined dark @click="$emit('changeToRegister')">Entre</v-btn></div>
            </v-form>
            <div v-else class="d-flex align-center justify-center" >
                <v-progress-circular indeterminate width="12" size="100"></v-progress-circular>            
            </div>
        </v-col>
        <v-col cols="6" class="bg-blue rounded-bs-circle rounded-ts-circle h-100 d-none d-sm-flex flex-column justify-center">
            <article class="white--text">
                <h3 class="text-center ">Já tem uma conta???</h3>
                <h6
                class="text-center"
                >Entre nela clicando no botão e Aproveite o nosso chat</h6>
            </article>
            <div class="text-center my-5">
                <v-btn tile outlined dark @click="$emit('changeToRegister')">Entrar</v-btn>
                
            </div>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { emailRules, nameRules, passwordRules} from './inputRules';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import router from '@/router';

const isValidInputs = ref<boolean | undefined>(undefined)
const password = ref<string>('')
const name = ref<string>('')
const repeatPassword = ref<string>('') 
const email = ref<string>('')
const {register} = useUserStore()
const {errors, loading} = storeToRefs(useUserStore())

async function submitForm(){
    if(!isValidInputs.value) return

    const response = await register(email.value, password.value, name.value)
    if(response.errors && response.errors.length > 0) return
    router.push('/')

}


defineEmits(['changeToRegister'])
</script>

<style scoped>

</style>