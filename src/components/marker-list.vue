<template>
  <transition-group
    v-if="list.length"
    name="fade"
    tag="ul"
    class="marker-list"
  >
    <li
      v-for="(point, index) in list"
      :key="point"
      :class="{'highlight': index==highlight}"
      @click="select(index)"
    >
      <div
        class="delete"
        @click.stop="remove(index)"
      >
        &times;
      </div>
      <div
        class="caption"
        v-text="$t('marker-object-name') + ' #' + (index + 1)"
      />
      <div
        class="text"
        v-text="point"
      />
    </li>
  </transition-group>
  <div
    v-else
    class="empty"
    v-text="$t('markers-empty-list')"
  />
</template>
<script>
export default {
  name: 'MarkerList',
  props: {
    list: {
      type: Array,
      required: true
    },
    highlight: {
      type: Number,
      required: true
    }
  },
  methods: {
    select (index) {
      this.$emit('select', index)
    },
    remove (index) {
      this.$emit('remove', index)
    }
  }
}
</script>
<style lang="scss" scoped>
  .marker-list {
    list-style-type: none;
    li {
      padding: 6px;
      cursor: pointer;
      border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
      &.highlight {
        background-color: rgba(1, 1, 1, 0.1)
      }
      .caption {
        font-weight: 600;
      }
      .text {
        font-size: 12px;
        color: #333;
      }
      .delete {
        float: right;
        cursor: pointer;
      }
    }
  }
  .empty {
    text-align: center;
    padding: 16px 0;
    border: none;
  }
</style>
