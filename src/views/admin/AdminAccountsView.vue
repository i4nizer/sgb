<template>
    <v-container class="">
        <v-row dense>
            <v-col cols="12">
                <h4 class="text-grey-darken-1">Accounts</h4>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12" sm="12" lg="8">
                <v-data-table
                    class="border"
                    striped="even"
                    density="compact"
                    :headers
                    :items="users"
                    :loading="isFetchingUsers"
                    :header-props="{ class: `bg-accent py-3` }"
                    :items-per-page="-1"
                >
                    <template #item.name="{ item }">
                        <strong>
                            <span>{{ item.name }} &nbsp;</span>
                            <span class="text-grey">{{ authStore.user?.id == item.id ? "(You)" : "" }}</span>
                        </strong>
                    </template>
                    <template #item.actions="{ item }">
                        <v-btn
                            size="x-small"
                            icon="mdi-pencil-outline"
                            class="text-blue bg-transparent"
                            elevation="0"
                        ></v-btn>
                        <v-btn
                            size="x-small"
                            icon="mdi-close"
                            class="text-red bg-transparent"
                            elevation="0"
                            :disabled="authStore.user?.id == item.id"
                        ></v-btn>
                    </template>
                    <template #bottom></template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { api } from "@/plugins/api"
import { UserSchema, type UserCreateSchema, type UserUpdateSchema } from "@/schemas/UserSchema";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref, reactive } from 'vue';
import type { DataTableHeader } from "vuetify";

//

// --- Auth
const authStore = useAuthStore()

// --- Table
const headers = reactive<DataTableHeader[]>([
    { title: "Name", value: "name", width: "65%" },
    { title: "Actions", value: "actions", width: "35%" },
])

// --- Users
const users = reactive<UserSchema[]>([])
const isFetchingUsers = ref(false)

const getUsers = async () => {
    const res = await api.get<UserSchema[]>("/api/user")
    users.splice(0, users.length)
    users.push(...res.data.map((r) => UserSchema.parse(r)))
    return res.data
}

const postUser = async (data: UserCreateSchema) => {
    const res = await api.post<UserSchema>("/api/user", data)
    const parsed = UserSchema.parse(res.data)
    users.push(parsed)
    return parsed
}

const patchUser = async (id: number, data: UserUpdateSchema) => {
    const res = await api.patch<UserSchema>(`/api/user/${id}`, data)
    const parsed = UserSchema.parse(res.data)
    const index = users.findIndex(u => u.id == id)
    if (index != -1) users.splice(index, 1, parsed)
    return parsed
}

const deleteUser = async (id: number, ) => {
    await api.delete<UserSchema>(`/api/user/${id}`)
    const index = users.findIndex(u => u.id == id)
    if (index != -1) users.splice(index, 1)
}

//

const onMountedCb = async () => {
    isFetchingUsers.value = true
    await getUsers()
    isFetchingUsers.value = false
}

onMounted(onMountedCb)

//

</script>

<style scoped>

</style>