<template>
  <div class="h-screen flex flex-col items-center">
    <Header />
    <div class="mt-4 px-2 w-full flex flex-col items-center justify-center">
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
      <div
        class="grid gap-2 md:grid-cols-2 lg:grid-cols-4 lg:px-4 md:gap-4 w-full mt-4"
        v-if="(Object.keys(books).length === 0) === false"
      >
        <div
          v-for="book in books"
          v-bind:key="book.id + book.etag"
          class="hover:shadow-xl bg-gray-50 p-2 transition duration-500 ease-in-out"
        >
          <div class="flex items-center justify-center">
            <img
              :src="book.volumeInfo.imageLinks.thumbnail"
              :alt="book.volumeInfo.title"
            />
          </div>
          <h1 class="text-center font-medium text-lg">
            {{ book.volumeInfo.title }}
          </h1>
          <div class="flex flex-col text-center">
            <span
              v-for="author in book.volumeInfo.authors"
              v-bind:key="author"
              class="text-gray-500"
              >{{ author }}</span
            >
          </div>
          <p
            class="max-h-16 overflow-hidden text-justify"
            v-if="book.volumeInfo.description"
          >
            {{ book.volumeInfo.description }}
          </p>
          <p v-else class="italic">No description</p>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center w-full">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const books = computed(() => store.state.books);
    let search = ref("");
    async function getBooks() {
      let apiKey = "AIzaSyCLVo8YcNFwmuF2KmF5NaTJ6erZoXYR-pg";
      try {
        if (search.value !== "") {
          const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${search.value}&key=${apiKey}`
          );
          store.commit("setBooks", res.data.items);
        } else {
          store.commit("setBooks", {});
        }
      } catch (error) {
        console.log(error);
      }
    }
    return {
      search,
      getBooks,
      books,
    };
  },
});
</script>
