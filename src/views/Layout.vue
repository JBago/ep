
<template>
    <v-app>
        <v-app-bar class="app-bar" app>
            <v-toolbar-title>Placeholder</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text rounded @click="this.login">
                Login
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container>
                <slot></slot>
            </v-container>
        </v-main>
        <v-footer app>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: "Layout",
        data: () => ({

             }),
        methods: {
            login: function() {
                this.$router.push({name: "login"});
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>