<template>
  <div class="h-screen flex flex-col items-center">
    <Header />
    <div
      class="mt-4 px-2 w-full flex flex-col flex-wrap items-center justify-center"
    >
      <input
        type="text"
        role="search"
        id="searcher"
        name="searcher"
        v-model="search"
        @input="getBooks"
        placeholder="What book do you want to look for today?"
        class="ring ring-primary-500 ring-opacity-50 rounded text-md p-1 w-11/12 sm:w-9/12 md:w-7/12 text-gray-700 focus:outline-none hover:shadow-xl focus:shadow-xl transition duration-500 ease-in-out"
      />
      <img
        src="../assets/images/empty.svg"
        alt="empty"
        width="500"
        height="500"
        class="mt-6"
      />
      <h1 class="font-medium text-xl sm:text-2xl lg:text-3xl mt-2">
        There are no books to show you
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import * as dotenv from "dotenv";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header,
  },
  setup() {
    dotenv.config();

    let search = ref("");
    async function getBooks() {
      let apiKey = process.env.API_KEY;
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search.value}&key=${apiKey}`
      );
    }
    return {
      search,
      getBooks,
    };
  },
});
</script>
