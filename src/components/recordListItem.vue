<template>
  <div class="record-item card">
    <div class="row">
      <p>Observer :</p>
      <p>{{observerName}}</p>
    </div>
    <div class="row">
      <p>Method :</p>
      <p>{{method}}</p>
    </div>
    <div class="row">
      <p>Date :</p>
      <p>{{new Date(startDate).toDateString()}}</p>
    </div>
    <div v-if="count" class="row">
      <p>Count :</p>
      <p>{{count}}</p>
    </div>
    <div class="row">
      <p>Accuracy :</p>
      <p>{{accuracy}} m</p>
    </div>
    <div class="row">
      <p>Project Id :</p>
      <p>{{projectId}}</p>
    </div>
    <div class="row">
      <p>Distance :</p>
      <p>{{(distance * 1000).toFixed()}} m</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    observerName: {
      type: String,
      default () { return 'John Doe'; },
    },
    method: {
      type: String,
      default () { return 'Seen'; },
    },
    startDate: {
      type: Number,
      default () { return 0; },
    },
    count: {
      type: Number,
      default () { return 0; },
    },
    accuracy: {
      type: Number,
      default () { return 10; },
    },
    projectId: {
      type: Number,
      default () { return 1234; },
    },
    distance: {
      type: Number,
      default () { return 0.4567; },
    },
  },
};
</script>

<style scoped>

.card {
  background: #fff;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  padding: 2px;
  margin: 3px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  box-sizing: border-box;
}

.card:nth-child(even) {
  background: #f7f7f7;
}
.row {
  display: flex;
  justify-content: space-between;
}
</style>
