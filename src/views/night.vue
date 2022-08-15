<template>
  <section
    class="text-right"
    dir="rtl"
    style="background-color: #00012a"
    id="main_section"
  >
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 15px">
            <div class="card-body p-5">
              <h6 class="mb-3" style="font-weight: 900; font-size: 3.5vh">
                شب {{ Math.floor(turn / 2 + 1) }}
              </h6>

              <ul
                class="list-group mb-0"
                v-for="(turn, index) in night_states"
                :key="index"
              >
                <li
                  v-if="turn.ingame"
                  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                >
                  <div class="d-flex" id="name">
                    {{ turn.turn }}
                  </div>
                  <div v-if="turn.needlist" class="col-8 btn-group">
                    <ul class="list-group mb-0" style="text-decoration: none">
                      <li
                        v-for="(player, index2) in players"
                        :key="index2"
                        class="d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 rounded-0 mb-2"
                      >
                        <div v-if="player.role.status == 'alive'">
                          <div v-if="turn.turn == 'دکتر لکتر'">
                            <div
                              v-if="player.role.side == 'mafia'"
                              class="d-flex align-items-center btn-group"
                            >
                              <input
                                class="form-check-input me-2"
                                type="radio"
                                value=""
                                name="flexRadioDefault1"
                                id="flexRadioDefault1"
                                @change="rdiochange"
                              />
                              <span
                                :style="'color:' + player.role.color + ';'"
                                >{{ player.name }}</span
                              ><span
                                :style="'color:' + player.role.color + ';'"
                                v-if="player.role.name == 'دکتر لکتر'"
                                >(خودش)</span
                              >
                            </div>
                          </div>
                          <div v-else class="d-flex align-items-center">
                            <div>
                              <input
                                class="form-check-input me-2"
                                type="radio"
                                value=""
                                name="flexRadioDefault2"
                                id="flexRadioDefault2"
                                @change="rdiochange"
                              />
                              <span
                                :style="'color:' + player.role.color + ';'"
                                >{{ player.name }}</span
                              >
                              <span
                                :style="'color:' + player.role.color + ';'"
                                v-if="player.role.name == turn.turn"
                                >(خودش)</span
                              >
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <div>
                      <div>
                        <div>
                          <div
                            class="d-flex align-items-center"
                            v-if="turn.turn == 'جان سخت'"
                          >
                            <input
                              class="form-check-input me-2"
                              type="checkbox"
                              value=""
                              aria-label="..."
                              @change="rdiochange"
                            />
                            <span>استعلام</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <button
                type="button"
                class="btn btn-primary mt-3"
                @click="endnight"
              >
                پایان شب
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
import { useCounterStore } from "../stores/store.js";
import router from '../router/index.js';
export default {
  setup() {
    let players = ref(useCounterStore().list_of_names);
    useCounterStore().incrementturn();
    let turn = ref(useCounterStore().turn);
    console.log(turn.value, "turn");
    var result = {
      attaked: "",
      attacked2: "",
      mafsaved: "",
      docsave: "",
      detective: "",
      sniper: "",
      status: false,
    };
    function check_gmae_result() {
      console.log(useCounterStore());
      if (useCounterStore().citysum <= useCounterStore().mafsum) {
        alert("مافیا برنده شد ");
        window.location.href = "/names";
      } else if (useCounterStore().mafsum == 0) {
        alert("شهروند برنده شد ");
        window.location.href = "/names";
      }
    }
    check_gmae_result();
    let night_states = [
      {
        turn: "مافیا",
        needlist: true,
        ingame:
          useCounterStore().checkrole("مافیا ساده") ||
          useCounterStore().checkrole("پدرخوانده") ||
          useCounterStore().checkrole("دکتر لکتر"),
      },
      {
        turn: "دکتر لکتر",
        needlist: true,
        ingame: useCounterStore().checkrole("دکتر لکتر"),
      },
      {
        turn: "دکتر",
        needlist: true,
        ingame: useCounterStore().checkrole("دکتر"),
      },
      {
        turn: "کارآگاه",
        needlist: true,
        ingame: useCounterStore().checkrole("کارآگاه"),
      },
      {
        turn: "حرفه ای",
        needlist: true,
        ingame: useCounterStore().checkrole("حرفه ای"),
      },
      {
        turn: "جان سخت",
        needlist: false,
        ingame: useCounterStore().checkrole("جان سخت"),
      },
    ];
    console.log(night_states);
    let inputname = ref("");
    function findplayer(name) {
      for (let player of players.value) {
        if (player.name == name) return player;
      }
      return -1;
    }
    function findrole(name) {
      for (let player of players.value) {
        if (player.role.name == name) {
          console.log(player.role.ability);
          return player;
        }
      }
      return -1;
    }
    function handleevents(role, target) {
      console.log(role, target);
      switch (role) {
        case "مافیا":
          result.attaked = findplayer(target);
          if (
            result.attaked.role.name == "جان سخت" &&
            result.attaked.role.ability.buuletproof > 0
          ) {
            result.attaked.role.ability.buuletproof--;
            result.attaked = "";
          }
          break;
        case "دکتر لکتر":
          result.mafsaved = findplayer(target);
          if (result.mafsaved.role.name == "دکتر لکتر") {
            if (result.mafsaved.role.ability.selfsave > 0) {
              result.mafsaved.role.ability.selfsave--;
            } else {
              alert("دکتر لکتر فقط یکبار خودش را سیو میکند ");
              result.mafsaved=""
            }
          }

          break;
        case "دکتر":
          console.log("eeee");
          result.docsave = findplayer(target);
          if (result.docsave.role.name == "دکتر") {
            if (result.docsave.role.ability.selfsave > 0) {
              result.docsave.role.ability.selfsave--;
            } else {
              alert("دکتر فقط یکبار خودش را سیو میکند ");
              result.docsave=""
            }
          }
          break;
        case "کارآگاه":
          result.detective = findplayer(target);
          if (
            result.detective.role.side == "city" ||
            result.detective.role.name == "پدرخوانده"
          ) {
            alert("استعلام منفی است");
          } else {
            alert("استعلام مثبت است");
          }
          break;
        case "حرفه ای":
          result.sniper = findplayer(target);
          if (result.sniper.role.side == "city") {
            result.attacked2 = findrole(role);
          } else {
            result.attacked2 = result.sniper;
          }
          break;
        case "جان سخت":
          if (findrole(role).role.ability.status > 0) {
            console.log("die hard");
            result.status = true;
            findrole(role).role.ability.status--;
          }
          break;
      }
    }
    function rdiochange(e) {
      let role =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].innerHTML.substr(
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].innerHTML.indexOf(
            "-"
          ) + 1
        );
      let target = e.target.parentNode.children[1].innerHTML;
      if (target == "استعلام") {
        role =
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].innerHTML.substr(
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].innerHTML.indexOf(
              "-"
            ) + 1
          );
      }
      handleevents(role, target);
    }
    function endnight() {
      useCounterStore().night_data.kills = [];
      if (result.attaked == "") {
        console.log();
      } else if (result.attaked == result.docsave) {
        result.attaked = "";
      } else {
        result.attaked.role.status = "dead";
        useCounterStore().night_data.kills.push(result.attaked);
        useCounterStore().gravestone.push(result.attaked);

        if (result.attaked.role.side == "mafia") {
          useCounterStore().mafsum--;
        } else {
          useCounterStore().citysum--;
        }
      }
      if (result.attacked2 == "") {
        console.log();
      } else if (result.attacked2 == result.mafsaved) {
        result.attacked2 = "";
      } else {
        console.log(result.attacked2);
        result.attacked2.role.status = "dead";
        useCounterStore().night_data.kills.push(result.attacked2);
        useCounterStore().gravestone.push(result.attacked2);

        if (result.attacked2.role.side == "mafia") {
          useCounterStore().mafsum--;
        } else {
          useCounterStore().citysum--;
        }
      }
      console.log(useCounterStore().list_of_names);
      if (result.status == true) useCounterStore().night_data.status = true;
      else {
        useCounterStore().night_data.status = false;
      }
      console.log(useCounterStore().night_data);
      check_gmae_result();
      router.push("/day")
    }
    return {
      inputname,
      players,
      night_states,
      rdiochange,
      endnight,
      turn,
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
