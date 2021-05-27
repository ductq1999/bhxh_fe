<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Tên</th>
        <th scope="col">Số CMTND</th>
        <th scope="col">Doanh nghiệp</th>
        <th scope="col">Tháng</th>
        <th scope="col">Số tiền</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Đóng tiền</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in allC" :key="index">
        <th scope="row">{{ item.fullName }}</th>
        <td>{{ item.identityNumber }}</td>
        <td>
          <div v-if="item.enterprise !== null">{{ item.enterprise.name }}</div>
          <div v-else>Cá nhân</div>
        </td>
        <td>5</td>
        <td>
          <div v-if="item.type === 1">
            {{ (item.identityNumber * 32) / 100 }}
          </div>
          <div v-else>{{ (item.identityNumber * 8) / 100 }}</div>
        </td>
        <td>
          <div v-if="item.isPayment === 1">Đã đóng tiền</div>
          <div v-else>Chưa đóng tiền</div>
        </td>
        <td>
          <b-button v-if="item.isPayment === 0" @click="update(item)"
            >Đóng tiền</b-button
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      allC: "bhxh/getAllC",
    }),
    ...mapState({}),
  },
  mounted() {
    this.getAllCitizen();
  },
  methods: {
    async getAllCitizen() {
      await this.$axios.$get("citizen/get-all").then((response) => {
        if (response.code === 200) {
          this.$store.dispatch("bhxh/getC", response);
        }
      });
    },
    async update(citizen) {
      let data;
      if (citizen.enterprise !== null) {
        data = {
          id: citizen.id,
          identityNumber: citizen.identityNumber,
          fullName: citizen.fullName,
          address: citizen.address,
          socialInsurance: {
            id: citizen.socialInsurance.id,
          },
          enterprise: {
            id: citizen.enterprise.id,
          },
          user: {
            id: 1,
          },
          l: citizen.l,
          pc1: 0,
          pc2: 0,
          pc3: 0,
          pc4: 0,
          pc5: 0,
          pc6: 0,
          pc7: 0,
          type: citizen.type,
          isPayment: 1,
        };
      } else {
        data = {
          id: citizen.id,
          identityNumber: citizen.identityNumber,
          fullName: citizen.fullName,
          address: citizen.address,
          socialInsurance: {
            id: citizen.socialInsurance.id,
          },
          user: {
            id: 1,
          },
          l: citizen.l,
          pc1: 0,
          pc2: 0,
          pc3: 0,
          pc4: 0,
          pc5: 0,
          pc6: 0,
          pc7: 0,
          type: citizen.type,
          isPayment: 1,
        };
      }
      await this.$axios.$patch("citizen/update", data).then((response) => {
        console.log(data);
        if (response.code == 200) {
          this.getAllCitizen();
          this.$bvToast.toast(`Đóng tiền thành công!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "success",
          });
        } else {
          this.$bvToast.toast(`Lỗi mạng hoặc đã có lỗi xảy ra!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "danger",
          });
        }
      });
    },
  },
};
</script>
