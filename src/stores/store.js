import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    list_of_roles: [],
    list_of_names: [],
    mafsum: -1,
    citysum: 0,
    night_data: { kills: [], status: false },
    gravestone:[],
    turn:0,
  }),
  getters: {
    double: (state) => state.count * 2,
},
actions: {
    incrementturn() {
        this.turn++;
    },
    checkrole(rolename){
        for (let player of this.list_of_names){
            console.log(player.role.name)
            if(player.role.name==rolename && player.role.status!="dead")
            return true;
        }
        return false;
    }
},
});
