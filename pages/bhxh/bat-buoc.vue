<template>
  <card>
    <h5 slot="header" class="title">Đăng ký bảo hiểm bắt buộc</h5>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">CMTND/CCCD</label>
        <div class="col-sm-10">
          <input
            type="number"
            class="form-control"
            v-model="citizen.identityNumber"
            placeholder="Nhập số CMTND/CCCD"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Tên đầy đủ</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="citizen.fullName"
            placeholder="Nhập tên đầy đủ"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Doanh nghiệp</label>
        <div class="col-sm-10">
          <input
            list="my-list-id2"
            type="text"
            class="form-control"
            v-model="citizen.enterprise"
            placeholder="Nhập doanh nghiệp"
            required
          />
          <datalist id="my-list-id2">
            <option v-for="(size, index) in allEnterPrise" :key="index">
              {{ size.id + "-" + size.name }}
            </option>
          </datalist>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Địa chỉ</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="citizen.address"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Bảo hiểm</label>
        <div class="col-sm-10">
          <input
            list="my-list-id"
            class="form-control"
            v-model="citizen.socialInsuranceId"
            placeholder="Nhập bảo hiểm"
            required
          />
          <datalist id="my-list-id">
            <option v-for="(size, index) in allBhxh" :key="index">
              {{ size.id + "-" + size.name }}
            </option>
          </datalist>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Loại lao động</label>
        <div class="col-sm-10">
          <b-form-select
            v-model="type"
            :options="options"
            class="form-control"
          ></b-form-select>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Lương</label>
        <div class="col-sm-10">
          <b-form-input
            type="number"
            v-model="salary"
            class="form-control"
            placeholder="Nhập lương"
            required
          ></b-form-input>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Doanh nghiệp phải đóng</label>
        <div class="col-sm-10">
          <b-form-input
            type="number"
            v-model="dn"
            class="form-control"
            disabled
          ></b-form-input>
        </div>
      </div>

      <button class="btn btn-primary" @click="add">Submit</button>
      <div v-if="errors.length">
        <div class="validation-error mb-3" style="color: red">
          <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
        </div>
      </div>
    </form>
  </card>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      citizen: {
        identityNumber: "",
        address: "",
        fullName: "",
        socialInsuranceId: "",
        enterprise: "",
      },
      salary: 0,
      dn: 0,
      type: null,
      options: [
        {value: null, text: 'Chọn loại lao động'},
        { value: 1, text: "Lao động trong nước" },
        { value: 2, text: "Lao động nước ngoài" },
      ],
      errors: [],
      l: [1490000, 29800000],
    };
  },
  watch: {
    salary: function (val) {
      if (this.type === 2) {
        this.dn = (val * 8) / 100;
      } else {
        this.dn = (val * 32) / 100;
      }
    },
  },
  computed: {
    ...mapGetters({
      allBhxh: "bhxh/getAll",
      allEnterPrise: "bhxh/getAllE",
    }),
    ...mapState({}),
  },
  mounted() {
    this.getAllBhxh();
    this.getAllEnterprise();
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.citizen.identityNumber) {
        this.errors.push("Số CMTND/CCCD là bắt buộc.");
      }
      if (!this.citizen.fullName) {
        this.errors.push("Tên đầy đủ là bắt buộc.");
      }
      if (!this.citizen.address) {
        this.errors.push("Địa chỉ là bắt buộc.");
      }
      if (!this.citizen.enterprise) {
        this.errors.push("Doanh nghiệp là bắt buộc.");
      }
      if (!this.citizen.socialInsuranceId) {
        this.errors.push("Bảo hiểm là bắt buộc.");
      }
      if (!this.salary) {
        this.errors.push("Mức lương đóng bảo hiểm là bắt buộc.");
      }
      if (this.errors && this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
      e.preventDefault();
    },
    async add() {
      if (this.checkForm()) {
        let data = {
          identityNumber: this.citizen.identityNumber,
          fullName: this.citizen.fullName,
          address: this.citizen.address,
          socialInsurance: {
            id: this.citizen.socialInsuranceId.split("-")[0],
          },
          enterprise: {
            id: this.citizen.enterprise.split("-")[0],
          },
          user: {
            id: 1,
          },
          l: this.salary,
          pc1: 0,
          pc2: 0,
          pc3: 0,
          pc4: 0,
          pc5: 0,
          pc6: 0,
          pc7: 0,
          type: this.type,
          isPayment: 0
        };

        await this.$axios.$post("citizen/create", data).then((response) => {
          if (response.code == 201) {
            this.$bvToast.toast(`Đăng ký bảo hiểm tự nguyện thành công!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "success",
            });
          } else {
            this.$bvToast.toast(
              `Lỗi mạng hoặc đã tồn tại thông tin bảo hiểm!`,
              {
                title: "Thông báo",
                autoHideDelay: 5000,
                variant: "danger",
              }
            );
          }
        });
      }
    },
    async getAllBhxh() {
      await this.$axios.$get("social-insurance/get-all").then((response) => {
        if (response.code === 200) {
          this.$store.dispatch("bhxh/getBhxhs", response);
        }
      });
    },
    async getAllEnterprise() {
      await this.$axios.$get("enterprise/get-all").then((response) => {
        if (response.code === 200) {
          this.$store.dispatch("bhxh/getE", response);
        }
      });
    },
  },
};
</script>
