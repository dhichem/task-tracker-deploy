<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="tasks"
  />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async addTask(task) {
      const res = await fetch("api/taskAdd", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      this.tasks = [...this.tasks, data];
    },
    async deleteTask(_id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/taskDelete/${_id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task._id !== _id))
          : alert("Error deleting task");
      }
    },
    async toggleReminder(_id) {
      const taskToToggle = await this.fetchTask(_id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
      const res = await fetch(`api/taskUpdate/${_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });
      const resAll = await fetch("api/taskDisplay");
      const data = await resAll.json();
      this.tasks = data;
    },
    async fetchTasks() {
      const res = await fetch("api/taskDisplay");
      const data = await res.json();
      return data;
    },
    async fetchTask(_id) {
      const res = await fetch(`api/taskFind/${_id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>