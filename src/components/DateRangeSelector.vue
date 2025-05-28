<template>
  <UPopover>
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      <template v-if="modelValue.start">
        <template v-if="modelValue.end">
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} -
          {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
        </template>
        <template v-else>
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
        </template>
      </template>
      <template v-else> Lọc theo ngày </template>
    </UButton>

    <template #content>
      <div class="p-2">
        <div class="mb-2 text-sm">
          <div class="flex justify-between items-center">
            <span v-if="dateRange.start && dateRange.end">
              Đã chọn: <strong>{{ selectedDays }} ngày</strong>
            </span>
            <span v-else> Hãy chọn ngày bắt đầu/kết thúc </span>
            <UButton
              size="xs"
              color="error"
              variant="soft"
              icon="i-lucide-x"
              @click="dateRange = { start: undefined, end: undefined }"
              :disabled="!dateRange.start && !dateRange.end"
            >
              Xóa
            </UButton>
          </div>
        </div>

        <UCalendar
          v-model="dateRange"
          class="p-2"
          :number-of-months="numberOfMonths"
          :is-date-disabled="isDateDisabled"
          @update:start-value="onStartValueChange"
          range
        />

        <div class="text-xs text-gray-500 my-2">
          Bạn chỉ được chọn tối đa {{ props.maxDays }} ngày
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date'

interface DateRange {
  start: DateValue | undefined
  end: DateValue | undefined
}

const firstPick = ref<DateValue | undefined>(undefined)

const props = defineProps({
  modelValue: {
    type: Object as PropType<DateRange>,
    required: true,
  },
  numberOfMonths: {
    type: Number,
    default: 1,
  },
  maxDays: {
    type: Number,
    default: 365 * 10,
  },
})

// Format dates for display
const df = new DateFormatter('vi-VN', {
  dateStyle: 'medium',
})

const emit = defineEmits(['update:modelValue'])

const dateRange = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const selectedDays = computed(() => {
  if (dateRange.value.start && dateRange.value.end) {
    // Calculate days between start and end dates
    const startDate = dateRange.value.start.toDate(getLocalTimeZone())
    const endDate = dateRange.value.end.toDate(getLocalTimeZone())
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end days
    return diffDays
  }
  return 0
})

const isDateDisabled = (date: DateValue) => {
  // If no date is picked yet, don't disable any dates
  if (!firstPick.value) return false

  // Calculate the allowed date range (30 days * number of months in each direction)
  const minDate = firstPick.value.subtract({ days: props.maxDays - 1 })
  const maxDate = firstPick.value.add({ days: props.maxDays - 1 })

  // Disable dates outside the allowed range
  return date < minDate || date > maxDate
}

const onStartValueChange = (value: DateValue | undefined) => {
  firstPick.value = value
}
</script>
