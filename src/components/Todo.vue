<template>
  <b-container class="container">
    <header>
      <h1>Todo List</h1>
      <b-button @click="openModal()" class="add-button" variant="success"
        >Add</b-button
      >
    </header>

    <b-card-group deck class="todo-list">
      <b-card
        @click="edit(index)"
        class="card"
        v-for="(todo, index) in todoList"
        :key="index"
        :title="todo.title"
        tag="article"
      >
        <b-card-text>
          {{ todo.description }}
        </b-card-text>

        <template #footer>
          <div class="footer">
            <small class="text-muted"
              >{{ todo.date | date }} {{ todo.time }}</small
            >
            <b-button
              @click.stop="remove(index)"
              class="remove"
              size="sm"
              variant="link"
            >
              <b-icon-trash></b-icon-trash>
            </b-button>
          </div>
        </template>
      </b-card>
    </b-card-group>

    <b-modal
      @ok="save()"
      @hide="closed()"
      size="lg"
      ref="modal"
      title="New todo item"
      :hide-header-close="true"
      :ok-disabled="invalid"
    >
      <b-form @submit.prevent>
        <b-form-group :validated="true" class="mb-3">
          <b-form-input
            v-model="form.title"
            placeholder="Title"
            required
          ></b-form-input>
        </b-form-group>

        <div class="mb-3">
          <b-form-textarea
            v-model="form.description"
            placeholder="Description"
          ></b-form-textarea>
        </div>

        <div class="date-controls">
          <b-form-datepicker
            class="picker"
            v-model="form.date"
          ></b-form-datepicker>
          <b-form-timepicker
            class="ms-sm-3 picker"
            v-model="form.time"
            locale="de"
          ></b-form-timepicker>
        </div>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import { storageService } from "../services";

const NEW_TODO = {
  title: "",
  description: "",
  date: new Date(),
  time: ""
};

export default {
  name: "Todo",
  data() {
    return {
      todoList: storageService.load(),
      form: { ...NEW_TODO },
      editingIndex: null
    };
  },
  computed: {
    invalid: function() {
      return !this.form.title;
    }
  },
  methods: {
    closed() {
      this.editingIndex = null;
    },
    openModal: function() {
      if (this.editingIndex === null) {
        this.form = { ...NEW_TODO };
      }

      this.$refs["modal"].show();
    },
    save: function() {
      if (this.editingIndex !== null) {
        storageService.save(this.form, this.editingIndex);
      } else {
        storageService.create(this.form);
      }

      this.todoList = storageService.load();
    },
    remove(index) {
      storageService.remove(index);
      this.todoList = storageService.load();
    },
    edit(index) {
      this.form = { ...this.todoList[index] };
      this.editingIndex = index;
      this.openModal();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 24px;
}

header {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
}

.add-button {
  position: absolute;
  right: 20px;
}

.todo-list {
  display: flex;
}

.card {
  cursor: pointer;
  width: 300px;
  margin: 16px;
}

.date-controls {
  display: flex;
  justify-content: space-between;
}

.picker {
  display: flex;
  align-items: center;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove {
  color: #9fa5aa;
}
</style>
