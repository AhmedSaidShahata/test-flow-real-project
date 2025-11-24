<template>
    <img v-bind="$attrs" :src="`/assets/images/${name}`" />
</template>
<script lang="js" setup>
defineProps(['name']);
</script>