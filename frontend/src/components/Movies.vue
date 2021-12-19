<template>
  <div>
    <div v-if="isLoggedIn" style="margin: 0 auto" class="form-group w-50">
      <form>
        <input
          class="form-control mb-3"
          v-model="input.titleInput"
          type="text"
          placeholder="Title"
          required
        />
        <input
          class="form-control mb-3"
          v-model="input.directorInput"
          type="text"
          placeholder="Director"
          required
        />
        <textarea
          class="form-control mb-3"
          v-model="input.descriptionInput"
          rows="3"
          placeholder="Description"
          required
        ></textarea>
        <button
          type="submit"
          class="btn btn-warning m-3"
          v-if="!isEditing"
          @click.prevent="addFilm"
        >
          Add Movie
        </button>
        <button
          class="btn btn-warning mb-5"
          v-if="isEditing"
          @click.prevent="updateMovie"
          type="button"
        >
          Update
        </button>
      </form>
    </div>

    <ul>
      <li
        class="card m-3"
        style="width: 27rem"
        v-for="(movie, index) in movies"
        :key="index"
      >
        <div class="card-body">
          <h5 class="card-title">
            {{ index }} - {{ movie.id }} - {{ movie.title }}
          </h5>
          <h6 class="card-subtitle mb-2">{{ movie.director }}</h6>
          <p
            class="card-text w-75 center mb-2"
            style="text-align: justify; margin: 0 auto"
          >
            {{ movie.description }}
          </p>

          <button class="btn btn-warning m-1" @click="editMovie(movie)">
            edit
          </button>
          <button
            class="btn btn-danger m-1"
            @click="deleteConfirmation(movie.id, index)"
          >
            X
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      input: {
        titleInput: "",
        directorInput: "",
        descriptionInput: "",
      },

      movies: [],
      isLoggedIn: false,
      isEditing: false,
      updatedMovie: null,
      responseAuth: {},
    };
  },
  async mounted() {
    const axios = require("axios");
    const auth = {
      identifier: "admin",
      password: "Abcd1234",
    };
    
    try {
      this.responseAuth = await axios({
        url: "http://localhost:1338/auth/local",
        method: "POST",
        data: auth,
      });

      this.isLoggedIn = true;
      const fetch = await this.authUserAndFetch("GET");
      this.movies = fetch.response.data;
    } catch (err) {
      // this.input
      this.isLoggedIn = false;
      console.log("Please Login");
      // catches errors both in fetch and response.json
      console.log(err);
    }
  },

  methods: {
    // Async function for axios queries, pass index, method and data (optional)
    async authUserAndFetch(id, method, data) {
      const axios = require("axios");

      // let id = "";
      if (isNaN(id)) {
        id = "";
      }
      const response = await axios({
        url: "http://localhost:1338/movies/" + id,
        method: method,
        headers: {
          Authorization: `Bearer ${this.responseAuth.data.jwt}`,
        },
        data: data,
      });

      return { response };
    },

    // async isLoggedIn() {
    //   // const axios = require("axios");

    //   console.log("test");
    // },

    // Add a film to backend and Array, do a success alert
    async addFilm() {
      const movie = {
        title: this.input.titleInput,
        director: this.input.directorInput,
        description: this.input.descriptionInput,
      };

      const swal = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-warning m-2",
          cancelButton: "btn btn-danger m-2",
        },
        buttonsStyling: false,
      });

      let missingInput = new Boolean(false);
      let propertyArr = [];
      for (const property in movie) {
        if (`${movie[property]}` == "") {
          propertyArr.push(` ${property}`);
          missingInput = true;
        }
      }

      if (missingInput == true) {
        swal.fire(`${propertyArr}`, "is missing", "error");
      } else {
        const fetch = await this.authUserAndFetch(NaN, "POST", movie);

        this.movies.push(movie);

        this.addedMovie = null;
        this.input.titleInput = "";
        this.input.directorInput = "";
        this.input.descriptionInput = "";
        swal.fire({
          icon: "success",
          title: fetch.response.data.title + " has been created!",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            swal.showLoading();
            this.id += 1;
            // console.log(this.id)
          },
          willClose: () => {
            // console.log(this.movies[fetch.response.index].id)
            // console.log(this.movies[this.movies.length-1]);
            // let id = this.movies[fetch.response.index].id;
            /************ SEEEEEHR UNSCHÖNN ***********/
            window.location.reload();
            // this.$set(this.movies, fetch.response.data.index, movie);
          },
        });
      }
    },

    // delete a film by passed index, ask for confirmation, show delete succeed alert,
    async deleteConfirmation(id, index) {
      const swal = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-warning m-2",
          cancelButton: "btn btn-danger m-2",
        },
        buttonsStyling: false,
      });

      const fetch = await this.authUserAndFetch(id, "DELETE");

      swal
        .fire({
          title: `Are you sure you want to delete ${fetch.response.data.title}?`,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swal.fire({
              icon: "error",
              title: fetch.response.data.title + " has been deleted!",
              timer: 1000,
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.showLoading();
              },
            });

            this.movies.splice(index, 1);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swal.fire("Cancelled", "Your Movie is safe :)", "error");
          }
        });
    },

    editMovie(movie) {
      this.isEditing = true;
      this.updatedMovie = movie;
      this.input.titleInput = movie.title;
      this.input.directorInput = movie.director;
      this.input.descriptionInput = movie.description;
    },
    async updateMovie() {
      const swal = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-warning m-2",
          cancelButton: "btn btn-danger m-2",
        },
        buttonsStyling: false,
      });
      let id = this.updatedMovie.id;

      this.updatedMovie.title = this.input.titleInput;
      this.updatedMovie.director = this.input.directorInput;
      this.updatedMovie.description = this.input.descriptionInput;

      const movie = {
        title: this.updatedMovie.title,
        director: this.updatedMovie.director,
        description: this.updatedMovie.description,
      };

      const fetch = await this.authUserAndFetch(id, "PUT", movie);

      this.isEditing = false;
      this.updatedMovie = null;
      this.input.titleInput = "";
      this.input.directorInput = "";
      this.input.descriptionInput = "";
      swal.fire(fetch.response.data.title, "Updated successfully!", "success");
    },
  },
};
</script>

<style scoped>
li span {
  margin-right: 1rem;
}
li {
  list-style-type: none;
}

ul {
  width: 90vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

h1 {
  font-size: 4em;
}
</style>
