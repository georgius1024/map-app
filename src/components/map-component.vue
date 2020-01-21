<template>
  <div class="wrapper">
    <div class="toolbar">
      <div class="header">
        {{ $t('marker-list-header') }}
      </div>
      <MarkerList
        :list="markers"
        :highlight="highlight"
        @select="centerMarker"
        @remove="removeMarker"
      />
    </div>
    <l-map
      class="map"
      :zoom="zoom"
      :center="center"
      @click="mapClick"
    >
      <l-marker
        v-for="(point, index) in markers"
        :key="index"
        :lat-lng="point"
        draggable
        @click="highlightMarker(index)"
        @update:latLng="moveMarker($event, index)"
      />
      <l-tile-layer :url="url" />
    </l-map>
    <div class="grant-attribute">
      Icons made by <a
        href="https://www.flaticon.com/authors/freepik"
        target="_blank"
        title="Freepik"
      >Freepik</a> from <a
        href="https://www.flaticon.com/"
        target="_blank"
        title="Flaticon"
      > www.flaticon.com</a>
    </div>
    <div class="locale">
      <img
        :src="usaFlag"
        @click="setLocale('en')"
      >
      <img
        :src="russiaFlag"
        @click="setLocale('ru')"
      >
    </div>
    <transition name="fade">
      <div
        v-if="markers.length"
        class="fab"
        @click="showFloatPanel"
      >
        <img :src="plusSign">
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="floatPanel && markers.length"
        class="float-panel"
        @click.stop="hideFloatPanel"
      >
        <div class="panel-body">
          <MarkerList
            :list="markers"
            :highlight="highlight"
            @select="centerMarker"
            @remove="removeMarker"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import usaFlag from '../assets/united-states.svg'
import russiaFlag from '../assets/russia.svg'
import plusSign from '../assets/plus.svg'
import MarkerList from './marker-list'
export default {
  name: 'HelloWorld',
  components: {
    MarkerList
  },
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 17,
      center: [56.826647, 60.594728],
      markers: [],
      highlight: -1,
      usaFlag,
      russiaFlag,
      plusSign,
      floatPanel: false
    }
  },
  created () {
    this.$i18n.locale = 'en'
  },
  methods: {
    mapClick (event) {
      this.markers.push(event.latlng)
      this.highlight = this.markers.length - 1
    },
    moveMarker (latLng, index) {
      this.markers = this.markers.map((elem, i) => i === +index ? latLng : elem)
      this.highlight = index
    },
    centerMarker (index) {
      this.center = this.markers[index]
      this.highlight = index
      this.hideFloatPanel()
    },
    removeMarker (index) {
      this.markers = this.markers.filter((elem, i) => i !== +index)
      this.highlight = -1
      this.hideFloatPanel()
    },
    highlightMarker (index) {
      this.highlight = index
    },
    setLocale (locale) {
      this.$i18n.locale = locale
    },
    showFloatPanel () {
      this.floatPanel = true
    },
    hideFloatPanel () {
      this.floatPanel = false
    }

  }
}
</script>
<style lang="scss">
  $mobile: 480px;
  $tablet: 960px;
  $z-index: 1000;
  $primary: #0099ff;
  .wrapper {
    height: 100vh;
    display: flex;
    .toolbar {
      width: 300px;
      @media screen and (max-width: $tablet) {
        width: 200px;
      }
      @media screen and (max-width: $mobile) {
        display: none;
      }
      height: 100vh;
      overflow-y: auto;
      border: 1px solid $primary;
      z-index: $z-index + 1;
      .header {
        color: #fff;
        background-color: $primary;
        font-weight: 600;
        padding: 12px;
      }
    }
    .map {
      width: calc(100% - 300px);
      height: 100vh;
      @media screen and (max-width: $tablet) {
        width: calc(100% - 200px);
      }
      @media screen and (max-width: $mobile) {
        width: 100%;
      }
      border: 1px solid $primary;
      border-left: none;
    }
    .fab {
      display: none;
      @media screen and (max-width: $mobile) {
        display: block;
      }
      z-index: $z-index;
      position: fixed;
      right: 24px;
      bottom: 48px;
      border-radius: 50%;
      background-color: $primary;
      color: #fff;
      padding: 8px;
      line-height: 0;
      img {
        width: 24px;
        height: auto;
        margin: 6px;
        transform: rotate(45deg);
      }
    }
    .float-panel {
      display: none;
      @media screen and (max-width: $mobile) {
        display: flex;
      }
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: $z-index;
      background-color: rgba(0, 0, 0, 0.8);
      align-content: center;
      justify-content: center;
      .panel-body {
        min-width: calc(100% - 96px);
        margin: 48px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: rgba(255, 255, 255, 0.8);
        max-height: calc(100% - 96px);
        overflow-y: auto;
      }
    }
    .locale {
      position: fixed;
      top: 12px;
      right: 12px;
      z-index: $z-index;
      img {
        width: 32px;
        height: auto;
        margin: 6px;
        cursor: pointer;
      }
    }
    .grant-attribute {
      position: fixed;
      bottom: 12px;
      left: 0;
      right: 0;
      text-align: center;
      z-index: $z-index - 1;
      color: #000;
      opacity: 0.5;
      a, a:visited, a:link, a:hover {
        color: #000;
        cursor: pointer;
        font-size: inherit;
      }
      @media screen and (max-width: $tablet) {
        font-size: 12px;
        bottom: 0px;
      }
    }
  }
</style>
