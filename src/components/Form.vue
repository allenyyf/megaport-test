<template>
  <div class="form-container">
    <form>
      <div v-for="label in labelList" :key="label" class="input-item">
        <label :for="label">{{ label }}:</label>
        <input
          type="text"
          :id="label"
          name="fname"
          v-model="formData[label]"
          :placeholder="`please input ${label} value`"
        />
      </div>
    </form>
    <div class="tips-container">
      {{ !isDataValidate ? "Please input all data first" : "" }}
    </div>
    <button class="button" @click="addData">Add</button>
  </div>
</template>
<script>
import { reactive, toRef, ref } from "vue";
export default {
  name: "form",
  props: {
    labelList: Array,
  },
  setup(props, { emit }) {
    let lableList = toRef(props, "labelList"),
      formData = reactive(initFormData(lableList.value)),
      isDataValidate = ref(true);

    function initFormData(lableList) {
      let initData = {};
      for (let val of lableList) {
        initData[val] = "";
      }
      return initData;
    }

    function recoverFormData() {
      for (let val of lableList.value) {
        formData[val] = "";
      }
    }

    function checkFormData() {
      for (let val of lableList.value) {
        if (!formData[val]) {
          return false;
        }
      }
      return true;
    }

    function addData() {
      let data = JSON.parse(JSON.stringify(formData));
      isDataValidate.value = checkFormData();
      if (isDataValidate.value) {
        emit("addData", data);
        recoverFormData();
      }
    }

    return {
      formData,
      isDataValidate,
      addData,
    };
  },
};
</script>
