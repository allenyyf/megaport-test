<template>
  <div class="container">
    <input
      class="search-input"
      type="text"
      placeholder="please input search text"
      v-model="searchText"
    />

    <Table
      class="table-container"
      :data="tableData"
      :headerList="propsList"
    ></Table>
    <Form
      class="form-container"
      :labelList="propsList"
      @addData="addData"
    ></Form>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Table from "@/components/Table";
import Form from "@/components/Form";
import { dessertList } from "@/mock/dessertList";
export default {
  name: "App",
  components: { Table, Form },

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

    /**
     * @params {object} data - same data structure as the object in the init array data
     */
    function addData(data) {
      tableData.value.push(data);
    }

    return {
      propsList,
      tableData,
      searchText,
      addData,
    };
  },
};
</script>
<style scoped>
.container .search-input {
  margin-top: 20px;
  margin-bottom: 10px;
}

.container .table-container {
  height: 60vh;
  overflow-y: auto;
}
.container .form-container {
  margin: 20px 0;
}
@media only screen and (min-width: 768px) {
  .container {
    min-width: 768px;
    max-width: 60vw;
    margin: auto;
  }
}
@media only screen and (max-width: 768px) {
  .container {
    width: 100%;
    margin: auto;
  }
}
</style>
