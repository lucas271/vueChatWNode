import { defineStore } from "pinia"

export const useMessageStore =  defineStore('user', () => {
    const message: string = ''
    const messageId: string = '' 
    const chatId: string = ''
    const errors: String[] = []
})