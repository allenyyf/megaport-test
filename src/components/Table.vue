<template>
  <div class="container">
    <table class="table-container">
      <thead>
        <tr>
          <th
            class="header-cell"
            v-for="headerItem in tableHead"
            :key="headerItem"
          >
            <span>
              {{ headerItem }}
            </span>
            <span class="sort-panel">
              <div
                :class="isActiveTriangle(headerItem, 'ascend')"
                class="top-triangle triangle"
                @click="sortByKey(headerItem, 'ascend')"
              ></div>
              <div
                :class="isActiveTriangle(headerItem, 'descend')"
                class="bottom-triangle triangle"
                @click="sortByKey(headerItem, 'descend')"
              ></div>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rowData, index) in tableData" :key="`${index}`">
          <td v-for="(val, key) in rowData" :key="key">
            {{ val }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { toRef, ref } from "vue";
export default {
  props: {
    data: Array,
    headerList: Array,
  },
  setup(props) {
    const tableData = toRef(props, "data");
    const tableHead = toRef(props, "headerList");
    const activeTriangle = ref("");

    /**
     * @params {string} key - value in tableHead
     * @parmms {ascend | descend} type - how to sort
     */
    function isActiveTriangle(key, type) {
      return activeTriangle.value == `${key}-${type}` ? "active" : "";
    }

    /**
     * @params {string} key - value in headerList
     * @parmms {ascend | descend} type - how to sort
     */
    function sortByKey(key, type) {
      activeTriangle.value = `${key}-${type}`;
      tableData.value.sort((a, b) => {
        let firstVal = a[key],
          nextVal = b[key];
        if (type === "ascend") {
          return soryByAscend(firstVal, nextVal);
        } else {
          return sortByDescend(firstVal, nextVal);
        }
      });
    }

    function soryByAscend(firstVal, nextVal) {
      if (typeof firstVal === "number" && typeof nextVal === "number") {
        return firstVal - nextVal;
      } else {
        if (firstVal < nextVal) {
          return -1;
        } else if (firstVal > nextVal) {
          return 1;
        } else {
          return 0;
        }
      }
    }

    function sortByDescend(firstVal, nextVal) {
      if (typeof firstVal === "number" && typeof nextVal === "number") {
        return nextVal - firstVal;
      } else {
        if (firstVal < nextVal) {
          return 1;
        } else if (firstVal > nextVal) {
          return -1;
        } else {
          return 0;
        }
      }
    }

    return {
      tableData,
      tableHead,
      isActiveTriangle,
      sortByKey,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.table-container {
  width: 100%;
  border-collapse: collapse;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
}

.table-container thead .header-cell {
  height: 50px;
  font-size: 18px;
}

.table-container tbody tr:nth-child(odd) {
  background: #f4f6f9;
}
.table-container tbody tr:nth-child(even) {
  background: #e6e8ec;
}
.table-container tbody tr:hover {
  background: #cbd0d8;
}

thead {
  background-color: #36304a;
  color: #fff;
}

.table-container td,
.table-container th {
  width: 100px;
  padding: 5px 10px;
}
.table-container th {
  text-transform: uppercase;
  font-weight: bolder;
}
.sort-panel {
  margin-left: 10px;
  position: relative;
}

.sort-panel .triangle {
  cursor: pointer;
  width: 0;
  height: 0;
  display: inline-block;
  border: 5px solid;
}

.sort-panel .top-triangle {
  position: absolute;
  top: 0px;
  border-color: transparent transparent #fff transparent;
}
.sort-panel .bottom-triangle {
  position: absolute;
  bottom: 0px;
  border-color: #fff transparent transparent transparent;
}
.top-triangle.active {
  border-color: transparent transparent #5e9cea transparent;
}
.bottom-triangle.active {
  border-color: #5e9cea transparent transparent transparent;
}
</style>
