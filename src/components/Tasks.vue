<template>
  <div :key="task._id" v-for="task in tasks">
    <Task
      @toggle-reminder="$emit('toggle-reminder', task._id)"
      :task="task"
      @delete-task="$emit('delete-task', task._id)"
    />
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "Tasks",
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
  emits: ["delete-task", "toggle-reminder"],
};
</script>
