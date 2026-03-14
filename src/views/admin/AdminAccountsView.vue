<template>
    <v-container class="">
        <v-row dense align="center">
            <v-col cols="12">
                <h4 class="text-grey-darken-1">Accounts</h4>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12" sm="12" lg="8">
                <v-data-table
                    class="border"
                    striped="even"
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
                            size="small"
                            icon="mdi-pencil-outline"
                            class="text-blue bg-transparent"
                            elevation="0"
                            @click="onClickUpdateUser(item)"
                        ></v-btn>
                        <v-btn
                            size="small"
                            icon="mdi-close"
                            elevation="0"
                            :class="`text-${authStore.user?.id == item.id ? `grey` : `red`} bg-transparent`"
                            :disabled="authStore.user?.id == item.id"
                        ></v-btn>
                    </template>
                    <template #bottom></template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog v-model="showCreateUserDialog">
            <v-card class="py-5">
                <v-card-title class="text-center font-weight-bold">Create User</v-card-title>
                <UserCreateForm
                    :disabled="isCreatingUser"
                    @submit="onSubmitCreateUser"
                ></UserCreateForm>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showUpdateUserDialog">
            <v-card class="py-5">
                <v-card-title class="text-center font-weight-bold">Update User</v-card-title>
                <UserUpdateForm
                    :user="userToUpdate"
                    :disabled="isUpdatingUser"
                    @submit="onSubmitUpdateUser"
                ></UserUpdateForm>
            </v-card>
        </v-dialog>
        <v-fab
            icon
            style="z-index: 999"
            color="accent"
            class="position-fixed bottom-0 right-0 mb-16 mr-5"
            location="right bottom"
            transition="fade"
        >
            <v-icon>mdi-plus-circle-outline</v-icon>
            <v-speed-dial activator="parent">
                <v-btn 
                    key="1"
                    color="accent" 
                    icon="mdi-account-plus"
                    @click="showCreateUserDialog = true"
                ></v-btn>
                <v-btn 
                    key="1"
                    color="accent" 
                    icon="mdi-file-delimited"
                ></v-btn>
            </v-speed-dial>
        </v-fab>
    </v-container>
</template>

<script setup lang="ts">
import { api } from "@/plugins/api"
import { UserSchema, type UserCreateSchema, type UserUpdateSchema } from "@/schemas/UserSchema";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref, reactive } from 'vue';
import type { DataTableHeader } from "vuetify";
import type { SubmissionContext } from 'vee-validate';
import useToast from "@/composables/use-toast";

//

// --- Utils
const toastCmp = useToast()
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

// --- User Create
const isCreatingUser = ref(false)
const showCreateUserDialog = ref(false)

const onSubmitCreateUser = async (
    values: UserCreateSchema,
    ctx: SubmissionContext<{ [K in keyof UserCreateSchema]?: unknown }>
) => {
    isCreatingUser.value = true
    const { res, err } = await postUser(values)
        .then((res) => ({ res, err: undefined }))
        .catch((err) => ({ res: undefined, err }))
        .finally(() => isCreatingUser.value = false)

    if (err) return toastCmp.error(err?.message || "Something went wrong.")
    ctx.resetForm()
    toastCmp.success("User created successfully.")
    showCreateUserDialog.value = false
}

// --- User Update
const userToUpdate = ref<UserSchema>()
const isUpdatingUser = ref(false)
const showUpdateUserDialog = ref(false)

const onClickUpdateUser = (user: UserSchema) => {
    userToUpdate.value = user
    showUpdateUserDialog.value = true
}

const onSubmitUpdateUser = async (
    values: UserUpdateSchema,
    ctx: SubmissionContext<{ [K in keyof UserUpdateSchema]?: unknown }>
) => {
    if (!userToUpdate.value) return
    isUpdatingUser.value = true

    const { res, err } = await patchUser(userToUpdate.value.id, values)
        .then((res) => ({ res, err: undefined }))
        .catch((err) => ({ res: undefined, err }))
        .finally(() => isUpdatingUser.value = false)

    if (err) return toastCmp.error(err?.message || "Something went wrong.")
    ctx.resetForm()
    toastCmp.success("User updated successfully.")
    showUpdateUserDialog.value = false
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