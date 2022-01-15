<template>
  <Table :data="tableData" :headerList="propsList"></Table>
</template>

<script>
import { ref } from "vue";
import Table from "@/components/Table";
import { dessertList } from "@/mock/dessertList";
export default {
  name: "App",
  components: { Table },
  setup() {
    const propsList = getObjectPropsList(dessertList),
      tableData = ref(dessertList);

    function getObjectPropsList(data) {
      return Object.keys(data[0]);
    }

    return {
      propsList,
      tableData,
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
