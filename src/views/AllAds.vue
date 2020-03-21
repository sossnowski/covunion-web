<template>
  <div class="main-wrapper">
    <div class="row">
      <div class="col-2 user-panel text-left">
        <router-link class="nav-link" to="/"><b-icon-play-fill></b-icon-play-fill> All Advertisements</router-link><br />
        <router-link class="nav-link" to="/myAds"><b-icon-play-fill></b-icon-play-fill>Your Advertisements</router-link><br />
        <router-link class="nav-link" to="/myAdsTaken"><b-icon-play-fill></b-icon-play-fill>Taken Advertisements</router-link><br />
        <router-link class="nav-link" to="/takenBySomebody"
        ><b-icon-play-fill></b-icon-play-fill>My Ads Taken By Somebody</router-link
        >
      </div>
      <div class="col-5 left-side">
        <div class="searchInput">
          <b-form-input
                  id="input-11"
                  v-model="localization"
                  type="email"
                  required
                  placeholder="Enter your localization"
                  @keyup="filterAds"
          ></b-form-input>
          <b-icon-search class="searchIcon"></b-icon-search>
        </div>
        <div class="legend">
          <span class="blue-legend"></span><span>Needed Help</span>
          <span class="green-legend"></span><span> Want to Help</span>
        </div>
        <div
          :class="(ad.needHelp === true) ? ' adlist-wrapper blue' : 'adlist-wrapper green'"
          v-for="ad in advertisements"
          :key="ad._id"
          @mouseover="showAd(ad)"
        >
          <p>{{ ad.title }}</p>
          <span class="span-user">{{ ad.user }}</span>
          <span class="span-address"
            >{{ ad.localization }} ul. {{ ad.address }}</span
          >
          <div class="separator"></div>
        </div>
        <p style="margin-top: 100px; font-size: 20px" v-if="!advertisements.length">There is no advertisements.</p>
      </div>
      <div class="col-5 right-side">
        <div class="adWrapper" v-if="choosenAd.title != undefined">
          <h3 class="adWrapper-header">{{ choosenAd.title }}</h3>
          <p class="adWrapper-description">{{ choosenAd.description }}</p>
          <div class="adWrapper-details">
            <p class="adWrapper-insideParagraph">
              <span class="insideSpan-1">Contact </span
              ><span class="insideSpan-2">{{ choosenAd.userTelephone }}</span>
            </p>
            <p class="adWrapper-insideParagraph">
              <span class="insideSpan-1">Owner </span
              ><span class="insideSpan-2">{{ choosenAd.user }}</span>
            </p>
            <p class="adWrapper-insideParagraph">
              <span class="insideSpan-1">Localization </span
              ><span class="insideSpan-2"
                >{{ choosenAd.localization }} {{ choosenAd.address }}</span
              >
            </p>
            <button @click="getTask()" class="getTaskButton">I get it</button>
            <div v-if="getIt">
              <b-form-group id="input-group-11" description="Give your telephone number to communicate" label-for="input-11">
                <b-form-input
                        id="input-11"
                        v-model="executorTelephone"
                        type="email"
                        required
                        placeholder="Enter your telephone number"
                ></b-form-input>
              </b-form-group>
              <button class="getTaskButton" @click="confirmed()">Ok</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addNewAdWrapper">
      <b-button @click="$bvModal.show('addAd')">Add new advertisement</b-button>
    </div>
    <b-modal id="addAd" hide-footer>
      <template v-slot:modal-title>
        <div class="text-center">
          <h3>Add new advertisement</h3>
        </div>
      </template>
      <div class="d-block text-left">
        <b-form>
          <b-form-group id="input-group-1" label="Title:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.title"
              type="email"
              required
              placeholder="Enter title"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Description"
            label-for="input-2"
          >
            <b-form-textarea
              id="input-2"
              v-model="form.description"
              required
              placeholder="Enter description"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="Localization"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="form.localization"
              required
              placeholder="Enter city"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-4" label="" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.address"
              required
              placeholder="Enter address"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-5" label="Contact" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="form.userTelephone"
              required
              placeholder="Enter telephone number"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-6"
            description="If you want to help uncheck a box"
          >
            <b-form-checkbox v-model="form.needHelp"
              >I need Help</b-form-checkbox
            >
          </b-form-group>
        </b-form>
      </div>
      <button class="mt-3 addAdButtonConfirmed" block @click="sendAdd">Add</button>
    </b-modal>
    <div class="alert alert-success actionSuccess" v-if="success">
      <p>Success!</p>
    </div>
  </div>
</template>

<script>
import apiRequest from "../../api";
import endpoints from "../../endpoints";

export default {
  name: "AllAds",
  data() {
    return {
      notFilteredAds: [],
      advertisements: [],
      choosenAd: {},
      getIt: false,
      executorTelephone: "",
      form: {
        title: "",
        description: "",
        localization: "",
        address: "",
        userTelephone: "",
        needHelp: true
      },
      success: false,
      localization: ''
    };
  },
  created() {
    this.getAdvertisementsFromDb();
  },
  methods: {
    async getAdvertisementsFromDb() {
      let result = await apiRequest(endpoints.getAllAdvertisements, "GET");
      console.log(result);
      this.advertisements = result.ads;
      this.notFilteredAds = result.ads
    },

    showAd(ad) {
      this.choosenAd = ad;
    },

    getTask() {
      this.getIt = true;
    },

    async confirmed() {
      const task = {
        advertisementId: this.choosenAd._id,
        owner: this.choosenAd.user,
        ownerTelephone: this.choosenAd.userTelephone,
        executorTelephone: this.executorTelephone
      };
      try {
        await apiRequest(endpoints.createTask, "POST", task);
        await apiRequest(
          endpoints.checkAdInactive + `/${this.choosenAd._id}`,
          "PATCH"
        );
        this.getAdvertisementsFromDb();
        this.getIt = false;
        this.showSuccessMsg();
      } catch (error) {
        console.log(error);
      }
      console.log(task);
    },

    async sendAdd() {
      this.$bvModal.hide("addAd");
      try {
        await apiRequest(endpoints.addAd, "POST", this.form);
        this.getAdvertisementsFromDb();
        this.showSuccessMsg();
      } catch (error) {
        console.log(error);
      }
    },

    showSuccessMsg() {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 3000);
    },

    filterAds() {
      this.advertisements = this.notFilteredAds
      this.advertisements =  this.advertisements.filter(ad => {
        return ad.localization.includes(this.localization) || ad.address.includes(this.localization)
      })
    }
  }
};
</script>

<style lang="css" scoped>
@import "../assets/styles/views/main.css";
</style>
