export const emailRules: ReadonlyArray<(value:string) => string | true> = [
    (value) => {
        if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return true
        return "Email invalido"
    }
]

export const passwordRules: ReadonlyArray<(value: string) => string | true> = [
    (value) => {
        if (value) return true;
        return "Campo senha vazio"
    },
    (value) => {
        if (value.length >= 6) return true;
        return "Senha deve ter no minimo 6 caracteres"
    },
    (value) => {
        if(value.length <= 40) return true
        return "Senha pode no maximo ter 40 digitos..."
    },
    (value) => {
        if(value) return true
        return "Senha pode no maximo ter 40 digitos..."
    },
    (value) => {
        if(value.match(/[A-Z]/g)?.length || 0 > 0) return true
        return "senha deve conter ao menos uma letra maiscula"
    },
    (value) => {
        if(value.match(/[a-z]/g)?.length || 0 > 0) return true
        return "senha deve conter ao menos uma letra minuscula"
    }
]

export const nameRules: ReadonlyArray<(value:string) => string | true> = [
    (value) => {
        if(value) return true
        return "Campo nome está vazio."
    },
    (value) => {
        if(!/[^a-zA-Z]/.test(value)) return true
        return 'Campo nome só pode ter letras.'
    }
]