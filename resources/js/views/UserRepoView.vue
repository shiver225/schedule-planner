<script setup>
import axios from 'axios';

export default{
    name: "UserList",
    data(){
        return{
            users: []
        }
    },
    created(){
        this.fetchUsers();
    },
    methods: {
        async fetchUsers(){
            try{
                const response = await axios.get('/users');
                this.users = response.data;
            } catch(error){
                console.error('Error fetching users: ', error);
            }
        },
    },
};


</script>

<template>
    <div>
        <h2>User list(test)</h2>
        <ul v-if="users.length">
            <li v-for="user in users" :key="user.id">
                {{ user.name }} - {{ user.email }}
            </li>
        </ul>
        <p v-else>Loading users...</p>
    </div>
</template>