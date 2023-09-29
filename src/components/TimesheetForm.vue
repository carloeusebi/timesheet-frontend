<script lang="ts" setup>
import { Project, Timesheet } from "@/assets/interfaces";
import { useAuthStore } from "@/stores";
import { computed, ref, onMounted } from "vue";
import AppAlert from "./AppAlert.vue";
import axiosInstance from "@/assets/axios";
import { localizeTime } from "@/assets/helpers";

interface Props {
  timesheet?: Timesheet;
  errors: { [field: string]: string };
}
const props = defineProps<Props>();
const userProjects = ref<Project[] | null>();

// all the form's field, with defaults based on the timesheet prop
const selectedProjectId = ref<number | null>(
  props.timesheet?.project?.id || null
);
const selectedActivityId = ref<number | null>(
  props.timesheet?.activity?.id || null
);
const description = ref(props.timesheet?.description || "");

/**
 * Format a date in the format `yyyy-MM-ddThh:mm` for the input type=datetime-local
 */
const formatDateForDatetimeLocal = (datetime: string | undefined) => {
  if (!datetime) return "";
  const date = localizeTime(datetime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Get the time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// sets default datetime start to now
const activityStart = ref(
  formatDateForDatetimeLocal(props.timesheet?.activityStart)
);

// set default datetime end to 8 hours from now
const activityEnd = ref(
  formatDateForDatetimeLocal(props.timesheet?.activityEnd)
);

const emit = defineEmits(["form-submit"]);

const fetchProjects = async () => {
  const { data } = await axiosInstance.get("projects");
  userProjects.value = data;
};

/**
 * Calculates the activities based on the current selected project
 */
const projectActivities = computed(() => {
  if (!userProjects.value) return [];
  const selectedProject = userProjects.value.find(
    ({ id }) => id === selectedProjectId.value
  );
  return selectedProject?.activities;
});
const thereAreErrors = computed(() => Object.keys(props.errors).length > 0);

/**
 * Builds the form and emits the form submission event.
 */
const handleFormSubmission = () => {
  const fromLocalToUTC = (datetime: string) => {
    const localDate = new Date(datetime);

    return localDate.toISOString().slice(0, 19).replace("T", " ");
  };

  const userId = useAuthStore().user?.id;

  const form = {
    id: props.timesheet?.id ?? null,
    userId,
    projectId: selectedProjectId.value,
    activityId: selectedActivityId.value,
    description: description.value,
    activityStart: fromLocalToUTC(activityStart.value),
    activityEnd: fromLocalToUTC(activityEnd.value),
  };
  // todo frontend validation

  emit("form-submit", form);
};

onMounted(async () => {
  fetchProjects();
});
</script>

<template>
  <!-- FORM -->
  <form @submit.prevent="handleFormSubmission">
    <!-- ALERT -->
    <AppAlert :show="thereAreErrors" type="warning">
      <ul class="list-unstyled">
        <li v-for="error in errors" :key="error">
          {{ error }}
        </li>
      </ul>
    </AppAlert>

    <div class="d-flex gap-3">
      <!-- PROJECT -->
      <div>
        <label for="project">Project:</label>
        <select id="project" class="form-select" v-model="selectedProjectId">
          <option
            v-for="project in userProjects"
            :key="project.id"
            :value="project.id"
            :selected="project.id == timesheet?.project?.id"
          >
            {{ project.name }}
          </option>
        </select>
      </div>
      <!-- ACTIVITY -->
      <div>
        <label for="activity">Activity:</label>
        <select id="activity" class="form-select" v-model="selectedActivityId">
          <option
            v-for="activity in projectActivities"
            :key="activity.id"
            :value="activity.id"
            :selected="activity.id == timesheet?.activity?.id"
          >
            {{ activity.name }}
          </option>
        </select>
      </div>
      <!-- DATE -->
      <div>
        <label for="date">Activity Begin Hour:</label>
        <input
          id="date"
          type="datetime-local"
          class="form-control"
          v-model="activityStart"
        />
      </div>
      <!-- HOURS -->

      <div>
        <label for="date">Activity End Hour:</label>
        <input
          id="date"
          type="datetime-local"
          class="form-control"
          v-model="activityEnd"
        />
      </div>
    </div>
    <!-- DESCRIPTION -->
    <div class="my-3">
      <label for="description">Description:</label>
      <div class="mb-3">
        <textarea
          class="form-control"
          id="description"
          rows="3"
          v-model="description"
          :class="{ 'is-invalid': errors.description }"
        ></textarea>
        <div class="invalid-feedback">
          {{ errors.description }}
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-success px-5">Save</button>
    </div>
  </form>
</template>

<style scoped></style>
