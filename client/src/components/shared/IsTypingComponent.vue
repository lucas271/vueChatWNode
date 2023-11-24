<template>
    <v-card-title class="" v-if="isTyping">{{text}}</v-card-title>
</template>
<script setup lang="ts">

defineProps<{isTyping: boolean, text: string}>()
</script>

<style>

</style>