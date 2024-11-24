<script setup lang="ts">
import Tweet from '@/components/Tweet.vue';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
</script>

<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <!--  -->
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Tweet id="1860134630911017450" />
    </CardFooter>
  </Card>
</template>
