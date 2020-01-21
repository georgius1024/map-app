<i18n>
{
  "en": {
    "marker-list-header": "Markers",
    "marker-object-name": "Marker",
    "markers-empty-list": "Click map to add markers"
  },
  "ru": {
    "marker-list-header": "Маркеры",
    "marker-object-name": "Маркер",
    "markers-empty-list": "Щелкните по карте для добавления маркеров"
  }
}
</i18n>

<template>
  <MapComponent />
</template>

<script>
import MapComponent from './components/map-component'

export default {
  name: 'App',

  components: {
    MapComponent
  },

  data: () => ({
    //
  })
}
</script>
<style>
  body, html, * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 16px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
