import { defineStore } from "pinia";
import { ref } from "vue";

export const useIsDarkModeStore = defineStore('isDarkMode', () => {
    const isDarkMode = ref<boolean>(false)

    function ChangeMode(){
        isDarkMode.value = !isDarkMode.value
    }

    return {isDarkMode, ChangeMode}
})