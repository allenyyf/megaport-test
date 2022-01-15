<template>
  <input
    type="text"
    placeholder="please input search text"
    v-model="searchText"
  />

  <Table :data="tableData" :headerList="propsList"></Table>
</template>

<script>
import { ref, watch } from "vue";
import Table from "@/components/Table";
import { dessertList } from "@/mock/dessertList";
export default {
  name: "App",
  components: { Table },
  setup() {
    const propsList = getObjectPropsList(dessertList),
      tableData = ref(dessertList),
      searchText = ref("");

    function getObjectPropsList(data) {
      return Object.keys(data[0]);
    }

    watch(searchText, (newVal) => {
      filterDataBySearchText(newVal);
    });

    /**
     * @params {string} searchText - input search text
     * @retrun {array} - return filted array
     */
    function filterDataBySearchText(searchText) {
      let matchReg = new RegExp(searchText, "i"),
        toMatchKeys = propsList; // match data key is setting here
      tableData.value = dessertList.filter((data) => {
        for (let key of toMatchKeys) {
          if (matchReg.test(data[key])) {
            return true;
          }
        }
        return false;
      });
    }

    return {
      propsList,
      tableData,
      searchText,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
