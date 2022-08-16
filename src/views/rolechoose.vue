<template>
  <section
    class="text-right"
    dir="rtl"
    style="background-color: #cc8888"
    id="main_section"
  >
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 15px">
            <div class="card-body p-5">
              <h6 class="mb-4" style="font-weight: 900; font-size: 3.5vh">
                انتخاب نقش ها
              </h6>

              <ul class="list-group mb-0">
                <div v-for="role in list_of_roles" :key="role.name">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                  >
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      data-type="minus"
                      style="font-weight: 700"
                      @click="decrement"
                    >
                      -
                    </button>

                    <div
                      class="d-flex align-items-center"
                      id="name"
                      style="font-size: 2vh; font-weight: 500"
                      :style="'color:' + role.color"
                    >
                      {{ role.number }} x {{ role.name }}
                    </div>
                    <button
                      type="button"
                      class="btn btn-sm btn-success"
                      style="font-weight: 700"
                      @click="increment"
                    >
                      +
                    </button>
                  </li>
                </div>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                >
                  <div
                    class="d-flex align-items-center"
                    id="name"
                    style="font-size: 2vh; font-weight: 500"
                  >
                    مجموع نقش ها
                  </div>
                  <div
                    class="d-flex align-items-center"
                    id="name"
                    style="font-size: 2vh; font-weight: 500"
                  >
                    {{ sum_of_roles }}
                  </div>
                </li>
              </ul>

              <button
                v-if="sum_of_roles == playersum && playersum != 0"
                type="button"
                class="btn btn-success mt-3"
                @click="shufle_roles"
                style="text-decoration: none; color: white"
              >شروع بازی
                <!-- <router-link
                  :to="destination"
                  style="text-decoration: none; color: white"
                  >شروع بازی</router-link
                > -->
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import router from "../router/index.js";
import { useCounterStore } from "../stores/store.js";
export default {
  setup() {
    let playersum = ref(useCounterStore().count);
    let destination = ref("/")
    let list_of_roles = ref([
      {
        name: "مافیا ساده",
        number: 0,
        color: "red",
        status: "alive",
        side: "mafia",
        ability: {},
      },
      {
        name: "پدرخوانده",
        number: 0,
        color: "red",
        status: "alive",
        side: "mafia",
        ability: {
        },
      },
      {
        name: "دکتر لکتر",
        number: 0,
        color: "red",
        status: "alive",
        side: "mafia",
        ability: {
          selfsave: 1,
        },
      },
      {
        name: "دکتر",
        number: 0,
        color: "green",
        status: "alive",
        side: "city",
        ability: {
          selfsave: 1,
        },
      },
      {
        name: "کارآگاه",
        number: 0,
        color: "green",
        status: "alive",
        side: "city",
        ability: {
        },
      },
      {
        name: "حرفه ای",
        number: 0,
        color: "green",
        status: "alive",
        side: "city",
        ability: {
        },
      },
      {
        name: "جان سخت",
        number: 0,
        color: "green",
        status: "alive",
        side: "city",
        ability: {
          status: 2,
          buuletproof: 1,
        },
      },
      {
        name: "شهردار",
        number: 0,
        color: "green",
        status: "alive",
        side: "city",
        ability: {
          targt: 1,
        },
      },
      {
        name: "شهروند ساده",
        number: 0,
        color: "green",
        status: "alive",
        side: "city",
        ability: {},
      },
    ]);
    useCounterStore().list_of_roles = list_of_roles;
    let sum_of_roles = computed(() => {
      let sum = 0;
      for (let role of list_of_roles.value) {
        sum += role.number;
      }
      return sum;
    });
    function increment(e) {
      ////console.log("increament");
      let name = e.target.parentNode.children[1].innerHTML.substr(
        e.target.parentNode.children[1].innerHTML.indexOf("x") + 2
      );
      if (sum_of_roles.value >= useCounterStore().count)
        alert("تعداد نقش ها بیشتر از تعداد بازی کن ها است");
      else list_of_roles.value.find((element) => element.name == name).number++;
      ////console.log(list_of_roles.value);
    }
    function decrement(e) {
      ////console.log("decrement");
      ////console.log(e.target.parentNode.children[1].innerHTML);
      let number = e.target.parentNode.children[1].innerHTML.substr(
        0,
        e.target.parentNode.children[1].innerHTML.indexOf(" ")
      );
      let name = e.target.parentNode.children[1].innerHTML.substr(
        e.target.parentNode.children[1].innerHTML.indexOf("x") + 2
      );
      if (number == 0) {
        alert("مقدار وارد شده معتبر نیست");
        return;
      }
      ////console.log(number);
      list_of_roles.value.find((element) => element.name == name).number--;
    }
    function shufle_roles() {
      let tmp = [];
      for (let role of list_of_roles.value) {
        if (role.number > 0) tmp.push(role);
        ////console.log(role);
      }
      ////console.log(tmp);
      ////console.log(list_of_roles.value);
        var mafsum = 0;
        var citysum = 0;
      for (
        let index = 0;
        index < useCounterStore().list_of_names.length;
        index++
      ) {
        let role = Math.floor(Math.random() * tmp.length);
        ////console.log(role);
        if (tmp[role].number > 0) {
          useCounterStore().list_of_names[index].role = tmp[role];
          if (tmp[role].side == "mafia") {
            mafsum++;
          } else {
            citysum++;
          }

          tmp[role].number--;
          if (tmp[role].number <= 0) {
            ////console.log("slice");
            tmp.splice(role, 1);
            ////console.log(JSON.stringify(tmp));
          }
        } else {
          ////console.log("else slice");

          tmp.splice(role, 1);
        }
      }
        useCounterStore().mafsum = mafsum;
        useCounterStore().citysum = citysum;
        //console.log(mafsum,citysum,"maf","city")
        router.push('/night')
      ////console.log(useCounterStore().list_of_names);
    }
    return {
      increment,
      list_of_roles,
      decrement,
      sum_of_roles,
      playersum,
      shufle_roles,
      destination,
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
