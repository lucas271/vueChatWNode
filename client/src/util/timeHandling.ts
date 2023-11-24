export const sinceWhen = (messageTime: Date): String => {
    const messagePostedTime = new Date(messageTime)
    const currentTime = new Date()

    const timeDiffInYears: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60 / 60 / 24 / 365

    if(timeDiffInYears >= 1) return `Há ${Math.floor(timeDiffInYears)} ${Math.floor(timeDiffInYears) > 1 ? 'anos': 'ano'} atrás`

    const timeDiffInMonths: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60 / 60 / 24 / 30

    if(timeDiffInMonths >= 1) return `Há ${Math.floor(timeDiffInMonths)} ${Math.floor(timeDiffInMonths) > 1 ? 'meses': 'mês'} atrás`

    const timeDiffInDays: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60 / 60 / 24

    if(timeDiffInDays >= 1) return `Há ${Math.floor(timeDiffInDays)} ${Math.floor(timeDiffInDays) > 1 ? 'dias': 'dia'} atrás`

    const timeDiffInHours: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60 / 60 

    if(timeDiffInHours >= 1) return `Há ${Math.floor(timeDiffInHours)} ${Math.floor(timeDiffInHours) > 1 ? 'horas': 'hora'} atrás`

    const timeDiffInMinutes: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000 / 60

    if(timeDiffInMinutes >= 1) return `Há ${Math.floor(timeDiffInMinutes)} ${Math.floor(timeDiffInMinutes) > 1 ? 'minutos': 'minuto'} atrás`
    
    const timeDiffInSecs: number = (currentTime.getTime() - messagePostedTime.getTime()) / 1000
    
    return `Há ${Math.floor(timeDiffInSecs)} ${Math.floor(timeDiffInSecs) > 1 ? 'segundos': 'segundo'} atrás`
}