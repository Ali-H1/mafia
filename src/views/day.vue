<template>
  <section
    class="text-right"
    dir="rtl"
    style="background-color: #b3ccff"
    id="main_section"
  >
    <button type="button" class="btn btn-warning mt-4 col-6">
      <router-link to="/statuspage" style="text-decoration: none; color: white">
        مشاهده نقش ها</router-link
      >
    </button>

    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 15px">
            <div class="card-body p-5">
              <h4 class="mb-3" style="font-weight: 950; font-size: 3.7vh">
                روز {{ turn / 2 }}
              </h4>

              <ul class="list-group mb-0">
                <li
                  class="list-group-item justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom-2 rounded-0 mb-2"
                >
                  <h4 class="d-flex">اتفاقات شب:</h4>
                  <h6 class="d-flex">
                    جان سخت استعلام
                    <span
                      :style="
                        'border-bottom:solid ' +
                        (night_data.status ? 'green' : 'red') +
                        ' 1px; color:' +
                        (night_data.status ? 'green;' : 'red;')
                      "
                    >
                      {{ night_data.status ? " گرفت " : " نکرفت " }}</span
                    >
                  </h6>
                  <h5 class="d-flex">کشته های شب</h5>
                  <ol class="">
                    <li
                      class="d-flex"
                      v-for="dead in night_data.kills"
                      :key="dead.name"
                      :style="
                        'color:' +
                        (dead.role.side == 'city' ? 'green;' : 'red;')
                      "
                    >
                      - {{ dead.name }} ({{ dead.role.name }})
                    </li>
                  </ol>
                </li>
                <li
                  v-if="night_data.status"
                  class="list-group-item justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom-2 rounded-0 mb-2"
                >
                  <h4 class="d-flex">استعلام جان سخت</h4>
                  <ul class="d-flex list-group">
                    <li
                      class="d-flex"
                      v-for="dead in graveyard"
                      :key="dead.name"
                      :style="
                        'color:' +
                        (dead.role.side == 'city' ? 'green;' : 'red;')
                      "
                    >
                      - {{ dead.role.name }} ({{ dead.name }})
                    </li>
                  </ul>
                </li>
                <li
                  class="list-group-item justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom-2 rounded-0 mb-2"
                >
                  <h5 class="d-flex">نتیجه رای گیری در روز</h5>
                  <ul class="list-group mb-0">
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                      v-for="(player, index) in list_of_names"
                      :key="index"
                    >
                      <div v-if="player.role.status == 'alive'">
                        <input
                          class="form-check-input me-2"
                          type="radio"
                          value=""
                          name="flexRadioDefault2"
                          id="flexRadioDefault2"
                          @change="rdiochange"
                        />
                        <span :style="'color:' + player.role.color + ';'">{{
                          player.name
                        }}</span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>

              <button
                type="button"
                class="btn btn-primary mt-3"
                @click="endnight"
              >
                <router-link
                  to="/night"
                  style="text-decoration: none; color: white"
                >
                  پایان روز</router-link
                >
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
export default {
  setup() {
    let store = useCounterStore();
    let list_of_names = ref(store.list_of_names);
    let night_data = ref(useCounterStore().night_data);
    let graveyard = ref(useCounterStore().gravestone);
    useCounterStore().incrementturn();
    let turn = ref(useCounterStore().turn);
    function check_gmae_result() {
      console.log(useCounterStore());
      if (useCounterStore().citysum <= useCounterStore().mafsum) {
        alert("مافیا برنده شد ");
        window.location.href = "/";
      } else if (useCounterStore().mafsum == 0) {
        console.log(useCounterStore().mafsum);
        alert("شهروند برنده شد ");
        window.location.href = "/";
      }
    }
    function findplayer(name) {
      for (let player of list_of_names.value) {
        if (player.name == name) return player;
      }
      return -1;
    }

    function rdiochange(e) {
      let name = e.target.parentNode.children[1].innerHTML;
      findplayer(name).role.status = "dead";
      useCounterStore().gravestone.push(findplayer(name));
      if (findplayer(name).role.side == "mafia") {
          useCounterStore().mafsum--;
        } else {
          useCounterStore().citysum--;
        }

      //console.log(findplayer(name))
    }
    check_gmae_result();

    return {
      turn,
      night_data,
      graveyard,
      list_of_names,
      rdiochange,
    };
  },
};
</script>

<style></style>
