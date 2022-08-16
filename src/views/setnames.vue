<template>

  <section
    class="text-right"
    dir="rtl"
    style="background-color: #e2d5de"
    id="main_section"
  >

    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 15px">
            <div class="card-body p-5">
              <h6 class="mb-3" style="font-weight: 900; font-size: 3.5vh">
                لیست بازیکنان
              </h6>

              <form
                onsubmit="return false;"
                class="d-flex justify-content-center align-items-center mb-4"
              >
                <div class="form-outline flex-fill">
                  <input
                    type="text"
                    id="inputname"
                    class="form-control form-control-md"
                    placeholder="نام"
                    v-model="inputname"
                    @keydown.enter="addname"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-success btn-sm ms-2"
                  @click="addname"
                >
                  +
                </button>
              </form>

              <ul
                class="list-group mb-0"
                v-for="(player, index) in list_of_names"
                :key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                >
                  <div class="d-flex align-items-center" id="name">
                    {{ index + 1 }}- {{ player.name }}
                  </div>
                  <button
                    type="button"
                    class="btn-close ُ"
                    aria-label="Close"
                    style="color: red"
                    @click="remove_name"
                  ></button>
                </li>
              </ul>

              <button
                v-if="list_of_names.length > 3"
                type="button"
                class="btn btn-primary mt-3"
              >
                <router-link to="/roles" style="text-decoration: none; color: white"> انتخاب نقش ها</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import {useCounterStore} from "../stores/store.js"
export default {
  setup() {
    let store = useCounterStore()
    let list_of_names = ref(store.list_of_names);
    let inputname = ref("");
    function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele.name != value;
      });
    }
    function addname() {
      store.list_of_names = list_of_names
      ////console.log("add");
      if (inputname.value != "") {
        if (
          !list_of_names.value.find((element) => element.name == inputname.value)
        ) {
          ////console.log(inputname.value);
          list_of_names.value.push(JSON.parse(`{ "name":"${inputname.value}","role":"" }`));
          store.count= list_of_names.value.length
        } else {
          alert("نام تکراری وارد نکنید");
        }
        inputname.value = "";
      }
    }
    function remove_name(e) {
      store.list_of_names = list_of_names
      ////console.log(e.target.parentNode);
      ////console.log("remove");
      let name = e.target.parentNode.children[0].innerHTML.substr(
        e.target.parentNode.children[0].innerHTML.indexOf("-") + 2
      );
        list_of_names.value = arrayRemove(list_of_names.value,name)
        store.count= list_of_names.value.length

    }
    return {
      addname,
      inputname,
      list_of_names,
      remove_name,
    };
  },
};
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
#main_section {
  min-height: 100vh;
}
</style>
