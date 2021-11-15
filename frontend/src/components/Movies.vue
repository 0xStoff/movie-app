<template>
  <div>
    <h1 class="m-5">Movie App</h1>
    <div style="margin: 0 auto" class="form-group w-50">
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
          class="btn btn-primary m-3"
          v-if="!isEditing"
          @click.prevent="addFilm"
        >
          Add Movie
        </button>
        <button
          class="btn btn-secondary m-3"
          v-if="!isEditing"
          @click.prevent="request"
          type="button"
        >
          Request
        </button>
        <button
          class="btn btn-primary mb-5"
          v-if="isEditing"
          @click.prevent="updateMovie"
          type="button"
        >
          Update
        </button>
      </form>
      <button class="btn btn-danger m-1" @click="fetchData('new', 'GET')">
        Fetch
      </button>
    </div>

    <ul>
      <li
        class="card m-3"
        style="width: 27rem"
        v-for="(movie, index) in movies"
        :key="index"
      >
        <div class="card-body">
          <h5 class="card-title">{{ index }} - {{ movie.title }}</h5>
          <h6 class="card-subtitle mb-2">{{ movie.director }}</h6>
          <p
            class="card-text w-75 center mb-2"
            style="text-align: justify; margin: 0 auto"
          >
            {{ movie.description }}
          </p>

          <button class="btn btn-primary m-1" @click="editMovie(movie)">
            edit
          </button>
          <button class="btn btn-danger m-1" @click="deleteConfirmation(index)">
            X
          </button>
          <button class="btn btn-danger m-1" @click="fetchData(index, 'GET')">
            Fetch
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
      // titleInput: "",
      // directorInput: "",
      // descriptionInput: "",
      movies: [],
      isEditing: false,
      updatedMovie: null,
      // addedMovie: null,
      config: {
        method: "delete",
        url: "http://localhost:1338/movies/",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MTcwOTY3LCJleHAiOjE2Mzc3NjI5Njd9.fk8vfoJ7kkCLzfX0-RRGWJZBdeKq6Ip2L0DoodoC31w",
        },
        auth: {
          username: "admin",
          password: "Abcd1234",
        },
      },
    };
  },

  methods: {
    async request() {
      const axios = require("axios");

      const movie = {
        title: "testtitle",
        director: "testd",
        description: "Lorem ipsum",
      };

      const loginInfo = {
        identifier: "admin",
        password: "Abcd1234",
      };

      const user = await axios.post("http://localhost:1338/movies", {
        auth: {
          username: "admin",
          password: "Abcd1234",
        },
        data: movie,
      });

      console.log(user);

      const config = {
        method: "post",
        url: "http://localhost:1338/movies",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
        // auth: {
        //   identifier: "admin",
        //   password: "Abcd1234",
        // },
        // headers: {
        //   Authorization:
        //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MTcwOTY3LCJleHAiOjE2Mzc3NjI5Njd9.fk8vfoJ7kkCLzfX0-RRGWJZBdeKq6Ip2L0DoodoC31w",
        //   "Content-Type": "application/json",
        // },
        data: movie,
      };
      axios(config)
        .then((response) => {
          console.log("Auth successful " + response);
        })
        .catch((error) => {
          console.log("Auth error " + error);
        });
    },

    async fetchData(index, method, data) {
      const axios = require("axios");
      let id = "";
      if (!isNaN(index)) {
        id = this.movies[index].id;
      }

      console.log(id);
      const response = await axios({
        url: "http://localhost:1338/movies/" + id,
        method: method,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MTcwOTY3LCJleHAiOjE2Mzc3NjI5Njd9.fk8vfoJ7kkCLzfX0-RRGWJZBdeKq6Ip2L0DoodoC31w",
        },
        data: data,
      });
      return response;
    },

    async addFilm() {
      const axios = require("axios");
      let missingInput = new Boolean(false);
      console.log(test);
      // console.log(this.movies);
      // How to add a key properly? Vue component is not rerendering when adding film, this is why window.location was used.
      // this.addedMovie = this.movies;

      // this.addedMovie.title = this.input.titleInput;
      // this.addedMovie.director = this.input.directorInput;
      // this.addedMovie.description = this.input.descriptionInput;

      //   const movie = {
      //     title: this.addedMovie.title,
      //     director: this.addedMovie.director,
      //     description: this.addedMovie.description,
      //   };
      const movie = {
        title: this.input.titleInput,
        director: this.input.directorInput,
        description: this.input.descriptionInput,
      };
      let test = await this.fetchData(4, "POST");

      for (const property in movie) {
        if (`${movie[property]}` == "") {
          this.$swal(`${property}`, "is missing", "error");
          // alert(`${property}` + " is missing.");
          missingInput = true;
        }
      }

      if (missingInput == false) {
        // const loginInfo = {
        //   username: "stoff",
        //   password: "Abcd1234",
        // };
        // globale variable? data? andere möglichkeit?

        // var session_url = "http://localhost:1338/movies";
        // var username = "stoff";
        // var password = "Abcd1234";
        // var credentials = btoa(username + ":" + password);
        // var basicAuth = "Basic " + credentials;
        // await axios
        //   .post(
        //     session_url,
        //     {},
        //     {
        //       auth: {
        //         username: username,
        //         password: password,
        //       },
        //     }
        //   )
        //   .then(function (response) {
        //     console.log("Authenticated ->" + response);
        //   })
        //   .catch(function (error) {
        //     console.log("Error on Authentication ->" + error);
        //   });

        // axios
        //   .post(
        //     "http://localhost:1338/movies",
        //     {
        //       title: "POST Test title",
        //       director: "POST Test director",
        //       description: "POST Test description",
        //     },
        //     {
        //       body: {
        //         auth: {
        //           identifier: "admin",
        //           password: "Abcd1234",
        //         },
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     console.log("SUCCCESSSSSS " + response);
        //   })
        //   .catch(() => {
        //     console.log("ERROR GAGDASGASG");
        //   });

        // fetch ok? bessere möglichkeit?
        // object destructuring? besserer weg?

        const config = {
          method: "post",
          url: "http://localhost:1338/movies",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MTcwOTY3LCJleHAiOjE2Mzc3NjI5Njd9.fk8vfoJ7kkCLzfX0-RRGWJZBdeKq6Ip2L0DoodoC31w",
            "Content-Type": "application/json",
          },
          data: movie,
        };
        axios(config)
          .then((response) => {
            this.movies.push(movie);
            this.addedMovie = null;
            this.input.titleInput = "";
            this.input.directorInput = "";
            this.input.descriptionInput = "";
            this.$swal
              .fire({
                icon: "success",
                title: response.data.title + " has been created!",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  this.$swal.showLoading();
                },
              })
              .then((result) => {
                if (result.isConfirmed) {
                  console.log("success");
                  this.id += 1;
                }
              });
            // .then(
            //   () => window.location.reload()
            // );
            // Reload von window sehr unschön
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    deleteConfirmation(index) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success m-2",
          cancelButton: "btn btn-danger m-2",
        },
        buttonsStyling: false,
      });
      const axios = require("axios");
      let id = this.movies[index].id;
      let title;
      const config = {
        method: "delete",
        url: "http://localhost:1338/movies/" + id,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MTcwOTY3LCJleHAiOjE2Mzc3NjI5Njd9.fk8vfoJ7kkCLzfX0-RRGWJZBdeKq6Ip2L0DoodoC31w",
        },
      };
      axios
        .get("http://localhost:1338/movies/" + id)
        .then((response) => {
          title = response.data.title;
        })
        .then(() => {
          swalWithBootstrapButtons
            .fire({
              title: `Are you sure? ${title}`,
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                axios(config)
                  .then((response) => {
                    swalWithBootstrapButtons.fire({
                      icon: "error",
                      title: response.data.title + " has been deleted!",
                      timer: 2000,
                      timerProgressBar: true,
                      didOpen: () => {
                        this.$swal.showLoading();
                      },
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                this.movies.splice(index, 1);
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === this.$swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  "Your Movie is safe :)",
                  "error"
                );
              }
            });
        });
    },

    deleteMovie(index) {
      const axios = require("axios");
      let id = this.movies[index].id;
      const config = {
        method: "delete",
        url: "http://localhost:1338/movies/" + id,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MTcwOTY3LCJleHAiOjE2Mzc3NjI5Njd9.fk8vfoJ7kkCLzfX0-RRGWJZBdeKq6Ip2L0DoodoC31w",
        },
      };

      axios(config)
        .then((response) => {
          this.$swal(response.data.title, "Deleted successfully!", "error");
        })
        .catch((error) => {
          console.log(error);
        });

      this.movies.splice(index, 1);
    },
    editMovie(movie) {
      this.isEditing = true;
      this.updatedMovie = movie;
      this.input.titleInput = movie.title;
      this.input.directorInput = movie.director;
      this.input.descriptionInput = movie.description;
    },
    updateMovie() {
      const axios = require("axios");
      let id = this.updatedMovie.id;

      // let { titleUpdated, directorUpdated, descriptionUpdated } =
      //   this.updatedMovie;

      // console.log(titleUpdated, directorUpdated, descriptionUpdated);

      this.updatedMovie.title = this.input.titleInput;
      this.updatedMovie.director = this.input.directorInput;
      this.updatedMovie.description = this.input.descriptionInput;

      // titleUpdated = this.titleInput;
      // directorUpdated = this.directorInput;
      // descriptionUpdated = this.descriptionInput;

      const movie = {
        title: this.updatedMovie.title,
        director: this.updatedMovie.director,
        description: this.updatedMovie.description,
      };

      const config = {
        method: "put",
        url: "http://localhost:1338/movies/" + id,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM1MTcwOTY3LCJleHAiOjE2Mzc3NjI5Njd9.fk8vfoJ7kkCLzfX0-RRGWJZBdeKq6Ip2L0DoodoC31w",
        },
        data: movie,
      };

      axios(config)
        .then((response) => {
          this.isEditing = false;
          this.updatedMovie = null;
          this.input.titleInput = "";
          this.input.directorInput = "";
          this.input.descriptionInput = "";
          this.$swal(response.data.title, "Updated successfully!", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const axios = require("axios");
    axios
      .get("http://localhost:1338/movies")
      .then((response) => {
        this.movies = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
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
