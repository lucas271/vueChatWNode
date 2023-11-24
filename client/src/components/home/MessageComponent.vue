<template>
    <v-hover :key="message.id">
        <template v-slot:default="{isHovering, props: hover}" >
            <div  class="d-flex w-100 my-4">

                <v-menu class="h-100">
                    <template #activator="{isActive, props}">
                        <v-chip  dark v-bind="props" :class="`h-auto overflow-hidden rounded-xl px-3 py-0 responsive-chip ${message.senderId === user.id ? 'ml-auto bg-blue' : 'mr-auto'}`"  prepend-icon="mdi-chevron-down" >
                            <div v-bind="hover">
                                <v-list  class="bg-transparent d-flex w-100 pa-0 ma-0 flex-sm-row flex-column">
                                    <v-list-item class="flex-shrink-1 flex-grow-1 text-wrap">
                                        {{ message.message }}
                                    </v-list-item>
                                    <v-list-item class="mx-1 pa-0 text-wrap responsive-time">
                                        <sub>
                                            {{ sinceWhen(message.createdAt) }}
                                            <v-icon v-if='isHovering || isActive' size="small" icon="mdi-chevron-down">
                                            </v-icon>
                                        </sub>

                                    </v-list-item>
                                </v-list>
                            </div>
                        </v-chip>
                    </template>
                    <v-card class="w-auto ml-auto">
                        <v-list>
                            <v-list-item>remover</v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </div>
        </template>
    </v-hover>
</template>


<script setup lang="ts">
import {sinceWhen} from '@/util/timeHandling'
import { MessageInterface } from '@/store/messagesStore';
import { UserInterface } from '@/store/userStore'

defineProps<{user: UserInterface, message: MessageInterface}>()

//define props user here for performance basically, calling the store again would be "expensiver".

</script>

<style>
.responsive-chip {
  max-width: 75% !important;
}

.responsive-chip .responsive-time {
  max-width: 50%;
}

@media (max-width: 599px) {
  .responsive-chip {
    max-width: 95% !important;
    height: fit-content;
  }

  .responsive-chip .responsive-time {
    max-width: 100%;
    height: 30px !important;

  }
}
</style>
