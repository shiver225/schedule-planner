<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
<div>
    <div class="home">
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        <p>Here you can find information about the project.</p>
    </div>
    <div>
        <RouterLink
        :to="'/users'"
        class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
        Users
        </RouterLink>
    </div>
</div>
</template>