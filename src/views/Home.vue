<template>
  <div class="h-screen flex flex-col items-center">
    <Header />
    <div class="mt-4 px-2 w-full flex flex-col items-center justify-center">
      <form
        action="get"
        class="flex flex-row items-center justify-center ring ring-primary-500 ring-opacity-50 rounded text-md p-1 w-11/12 sm:w-9/12 md:w-7/12 text-gray-700 focus:outline-none hover:shadow-xl focus:shadow-xl transition duration-500 ease-in-out"
        v-on:submit="
          (e) => {
            e.preventDefault();
            getBooks();
          }
        "
      >
        <input
          type="text"
          role="search"
          id="searcher"
          name="searcher"
          v-model="search"
          placeholder="What book do you want to look for today?"
          class="w-full focus:outline-none"
        />
        <button type="submit" class="w-6 h-6 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </form>
      <div
        class="grid gap-2 md:grid-cols-2 lg:grid-cols-4 lg:px-4 md:gap-4 w-full mt-4"
        v-if="(Object.keys(books).length === 0) === false"
      >
        <div
          v-for="book in books"
          v-bind:key="book.id + book.etag"
          class="hover:shadow-xl bg-gray-50 p-2 h-auto transition duration-500 ease-in-out"
        >
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
            class="overflow-hidden text-justify"
            style="
               {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
              }
            "
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
