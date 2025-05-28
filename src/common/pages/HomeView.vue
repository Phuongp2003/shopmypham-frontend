<template>
  <div class="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-900 mb-10">
    <!-- Banner -->
    <section
      class="w-full h-[60vh] flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 dark:from-gray-800 dark:to-gray-900"
    >
      <UCard
        class="w-full h-full flex items-center justify-center bg-transparent shadow-none border-none dark:bg-transparent"
      >
        <img
          class="object-cover w-full h-full"
          src="https://placehold.co/1920x600?text=Banner"
          alt="Banner"
        />
      </UCard>
    </section>

    <!-- Featured Cosmetics Slider -->
    <section
      class="w-full h-[50vh] flex flex-col items-center justify-center bg-white dark:bg-gray-800 py-8 mb-10"
    >
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Featured Cosmetics</h2>
      <UCarousel
        :items="groupedCosmetics"
        class="w-3/4"
        :autoplay="{ delay: 2000 }"
        loop
        :ui="{
          item: 'basis-[70%] transition-opacity [&:not(.is-snapped)]:opacity-10',
          controls: 'absolute top-1/2 -translate-y-1/2 inset-x-12',
        }"
        class-names
        arrows
      >
        <template #default="{ item: group }">
          <div class="flex gap-4 w-full">
            <div v-for="cosmetic in group" :key="cosmetic.id" class="flex-1">
              <div
                class="flex flex-col items-center p-4 mx-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow"
              >
                <img
                  :src="cosmetic.img"
                  :alt="cosmetic.name"
                  class="w-40 h-40 object-cover rounded-lg mb-2"
                />
                <div class="font-medium text-center text-gray-800 dark:text-gray-100">
                  {{ cosmetic.name }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </UCarousel>
    </section>

    <!-- Top Blog Section -->
    <section
      class="w-full h-[60vh] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-4 mb-10"
    >
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Top Blog</h2>
      <div class="grid grid-cols-2 gap-6 w-3/4 h-full">
        <!-- Blog 1: 2 rows, 1 col, vertical split -->
        <div
          class="row-span-2 flex flex-col p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow h-full"
        >
          <div class="flex flex-col h-full">
            <div class="flex-3/4 flex items-center justify-center overflow-hidden">
              <img
                src="https://placehold.co/600x300?text=Blog+1"
                alt="Blog 1"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="flex-1/4 flex flex-col justify-center px-4 py-2">
              <div class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                Blog Title 1
              </div>
              <div class="text-gray-600 dark:text-gray-300 text-sm">
                This is a short description for Blog 1. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </div>
            </div>
          </div>
        </div>
        <!-- Blog 2: 1 row, 1 col, horizontal split -->
        <div
          class="flex flex-row items-stretch p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow h-full"
        >
          <div class="flex-1 flex items-center justify-center overflow-hidden">
            <img
              src="https://placehold.co/300x300?text=Blog+2"
              alt="Blog 2"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="flex-1 flex flex-col justify-center px-4 py-2">
            <div class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
              Blog Title 2
            </div>
            <div class="text-gray-600 dark:text-gray-300 text-sm">
              This is a short description for Blog 2. Pellentesque habitant morbi tristique
              senectus.
            </div>
          </div>
        </div>
        <!-- Blog 3: 1 row, 1 col, horizontal split -->
        <div
          class="flex flex-row items-stretch p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow h-full"
        >
          <div class="flex-1 flex items-center justify-center overflow-hidden">
            <img
              src="https://placehold.co/300x300?text=Blog+3"
              alt="Blog 3"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="flex-1 flex flex-col justify-center px-4 py-2">
            <div class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
              Blog Title 3
            </div>
            <div class="text-gray-600 dark:text-gray-300 text-sm">
              This is a short description for Blog 3. Etiam porta sem malesuada magna mollis
              euismod.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const cosmetics = [
  { id: 1, name: 'Cosmetic 1', img: 'https://placehold.co/300x300?text=Cosmetic+1' },
  { id: 2, name: 'Cosmetic 2', img: 'https://placehold.co/300x300?text=Cosmetic+2' },
  { id: 3, name: 'Cosmetic 3', img: 'https://placehold.co/300x300?text=Cosmetic+3' },
  { id: 4, name: 'Cosmetic 4', img: 'https://placehold.co/300x300?text=Cosmetic+4' },
  { id: 5, name: 'Cosmetic 5', img: 'https://placehold.co/300x300?text=Cosmetic+5' },
  { id: 6, name: 'Cosmetic 6', img: 'https://placehold.co/300x300?text=Cosmetic+6' },
  { id: 7, name: 'Cosmetic 7', img: 'https://placehold.co/300x300?text=Cosmetic+7' },
  { id: 8, name: 'Cosmetic 8', img: 'https://placehold.co/300x300?text=Cosmetic+8' },
  { id: 9, name: 'Cosmetic 9', img: 'https://placehold.co/300x300?text=Cosmetic+9' },
]
// Group cosmetics into arrays of 3
const groupedCosmetics = computed(() => {
  const groups = []
  for (let i = 0; i < cosmetics.length; i += 3) {
    groups.push(cosmetics.slice(i, i + 3))
  }
  return groups
})
</script>
