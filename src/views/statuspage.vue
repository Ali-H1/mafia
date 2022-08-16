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

              <ul
                class="list-group mb-0"
                v-for="(player, index) in list_of_names"
                :key="index"
              >
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                  :style="'color:' + player.role.color + ';text-decoration: '+(player.role.status=='dead' ? 'line-through':'none')+' ;'"
                >
                  <div class="d-flex align-items-center ms-1 me-1" id="name">
                    {{ index + 1 }}- {{ player.name }}
                  </div>
                  <div class="d-flex align-items-center ms-1 me-1" id="name">
                    {{ player.role.name }}
                  </div>
                  <div
                    v-for="ability in Object.getOwnPropertyNames(
                      player.role.ability
                    )"
                    :key="ability"
                  >
                    <div class="d-flex align-items-center ms-1 me-1" id="name">
                      {{ abilities[ability] }}:{{ player.role.ability[ability] }}
                    </div>
                  </div>

                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    style="color: red"
                    @click="remove_name"
                  ></button>
                </li>
              </ul>

              <button type="button" class="btn btn-primary mt-3" @click="go_back">
                ادامه بازی
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useCounterStore } from "../stores/store";
import router from '../router';
export default {
  setup() {
    let abilities = ref({
      selfsave: "نجات دادن خودش",
      status: "استعلام",
      buuletproof: "جان اضافه",
      targt: "قضاوت",
    });
    let list_of_names = ref(useCounterStore().list_of_names);
    function go_back(){
        router.go(-1)
    }

    return { list_of_names, abilities,go_back };
  },
};
</script>

<style></style>
