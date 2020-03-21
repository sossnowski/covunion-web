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
        <div class="legend">
          <span class="blue-legend"></span><span>Owner mark as done</span>
          <span class="green-legend"></span><span>Owner not market as done</span>
        </div>
        <div
          class="adlist-wrapper"
          v-for="ad in advertisements"
          :key="ad._id"
          @mouseover="showAd(ad)"
        >
          <p :class="(ad.ownerDecision === true) ? ' adlist-wrapper blue' : 'adlist-wrapper green'">{{ ad.advertisement.title }}</p>
          <span class="span-user">{{ ad.advertisement.user }}</span>
          <div class="iconCheckWrapper" v-if="ad.executorDecision">
            <b-icon-check-circle></b-icon-check-circle>
          </div>
          <span class="span-address"
            >{{ ad.advertisement.localization }} ul.
            {{ ad.advertisement.address }}</span
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
            <div class="checkAsFinished">
              <b-button
                class=""
                :disabled="choosenTaskFinished"
                @click="checkAsFinished"
                >{{
                  choosenTaskFinished === false
                    ? "Check as Finished"
                    : "Finished"
                }}</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alert alert-success actionSuccess" v-if="success">
      <p>Success!</p>
    </div>
  </div>
</template>

<script>
import apiRequest from "../../api";
import endpoints from "../../endpoints";

export default {
  name: "MyTakenAds",
  data() {
    return {
      advertisements: [],
      choosenAd: {},
      choosenTaskId: "",
      choosenTaskFinished: false,
      success: false
    };
  },
  created() {
    this.getAdvertisementsFromDb();
  },
  methods: {
    async getAdvertisementsFromDb() {
      try {
        let result = await apiRequest(endpoints.takenAds, "GET");
        this.advertisements = result.tasks;
      } catch (error) {
        console.log(error);
      }
    },

    showAd(ad) {
      this.choosenAd = ad.advertisement;
      this.choosenTaskId = ad._id;
      this.choosenTaskFinished = ad.executorDecision;
    },

    async checkAsFinished() {
      try {
        await apiRequest(
          endpoints.checkAdFinishedAsExecutor + `${this.choosenTaskId}`,
          "PATCH"
        );
        this.showSuccessMsg();
        this.choosenTaskFinished = true;
        this.advertisements.map(ad => {
          if (ad._id === this.choosenTaskId)
            return (ad.executorDecision = true);
        });
      } catch (error) {
        console.log(error);
      }
    },

    showSuccessMsg() {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 3000);
    }
  }
};
</script>

<style lang="css" scoped>
@import "../assets/styles/views/main.css";
</style>
