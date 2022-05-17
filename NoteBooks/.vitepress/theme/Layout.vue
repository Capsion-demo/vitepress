<script setup>
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #sidebar-top>
      123123123 My custom sidebar top content
    </template>
  </Layout>
</template>
