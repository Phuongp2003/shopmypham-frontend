<template>
  <div class="p-4">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
          <div class="flex gap-2">
            <UButton
              icon="i-heroicons-adjustments-horizontal"
              :label="isFilterActive ? 'Đang lọc' : 'Bộ lọc'"
              :color="isFilterActive ? 'primary' : 'gray'"
              variant="soft"
              @click="showAdvancedFilters = !showAdvancedFilters"
            />
            <DateRangeSelector v-model="dateFilter" :number-of-months="1" :maxDays="365" />
            <UInput
              v-model="search"
              icon="i-heroicons-magnifying-glass"
              placeholder="Tìm kiếm bài viết..."
              class="w-64"
              @keyup.enter="handleSearch"
            />
            <UButton
              icon="i-heroicons-plus"
              label="New Article"
              color="primary"
              @click="navigateToCreate"
            />
          </div>
        </div>

        <!-- Advanced filters section with improved layout -->
        <UCollapseTransition>
          <div
            v-if="showAdvancedFilters"
            class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div class="flex flex-col gap-4">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Bộ lọc nâng cao</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Status filter with select menu -->
                <div>
                  <UFormGroup label="Trạng thái" help="Lọc theo trạng thái bài viết">
                    <USelectMenu
                      v-model="selectedStatuses"
                      :items="statusOptions"
                      value-key="value"
                      multiple
                      placeholder="Chọn trạng thái"
                      searchable
                    >
                    </USelectMenu>
                  </UFormGroup>
                </div>

                <!-- Additional filters can be added here -->
                <div>
                  <!-- Placeholder for future filters -->
                </div>

                <div>
                  <!-- Placeholder for future filters -->
                </div>
              </div>

              <!-- Filter actions -->
              <div
                class="flex justify-end gap-2 pt-2 border-t border-gray-200 dark:border-gray-700 mt-2"
              >
                <UButton
                  label="Đặt lại"
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-arrow-path"
                  @click="resetFilters"
                />
                <UButton
                  label="Áp dụng bộ lọc"
                  color="primary"
                  icon="i-heroicons-funnel"
                  @click="applyFilters"
                />
              </div>
            </div>
          </div>
        </UCollapseTransition>
      </template>

      <UTable
        v-model:sorting="sorting"
        :data="articles"
        :columns="columns"
        :loading="loading"
        sort-mode="multi"
        class="w-full"
      >
        <template #actions-data="{ row }">
          <UDropdownMenu :items="getRowItems(row)">
            <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis-vertical" />
          </UDropdownMenu>
        </template>
      </UTable>
      <template #footer>
        <div class="flex justify-between items-center mt-4">
          <div class="text-sm text-gray-500">
            Hiển thị {{ articles.length }} / {{ totalItems }} bài viết
          </div>
          <UPagination
            v-model:page="currentPage"
            :total="totalItems"
            :items-per-page="itemsPerPage"
            @update:page="onPageChange"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import DateRangeSelector from '@/components/DateRangeSelector.vue'
import LazyConfirmDialog from '@/components/ConfirmDialog.vue'
import type { Blog } from '@/types'
import type { Row, Column } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import { onMounted, h, resolveComponent, ref, watch, computed } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  type: string
  categoryPath: string
}>()

const router = useRouter()
const {
  articles,
  loading,
  fetchArticles,
  deleteArticle,
  currentPage,
  totalItems,
  itemsPerPage,
  goToPage,
  searchArticles,
  searchKeyword,
  convertSortingFormat,
} = useArticles()

const toast = useToast()
const sorting = ref([{ id: 'title', desc: false }])
const search = ref('')
const searchDebounceTimeout = ref<NodeJS.Timeout | null>(null)

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UPagination = resolveComponent('UPagination')

const dateFilter = shallowRef({
  start: undefined,
  end: undefined,
})

// Advanced filter related
const showAdvancedFilters = ref(false)
const selectedStatuses = ref<string[]>([])

const statusOptions = [
  { value: 'PUBLISHED', label: 'Công khai' },
  { value: 'UNPUBLISHED', label: 'Ẩn' },
  { value: 'DRAFT', label: 'Nháp' },
]

const isFilterActive = computed(() => {
  return selectedStatuses.value.length > 0
})

// Helper function to get status param for API
const getStatusParam = (): string | undefined => {
  if (selectedStatuses.value.length === 0) return undefined
  return selectedStatuses.value.join(',')
}

// Reset filters
const resetFilters = () => {
  selectedStatuses.value = []
  applyFilters()
}

// Apply filters
const applyFilters = () => {
  const sortParam = convertSortingFormat(sorting.value)
  const statusParam = getStatusParam()

  if (search.value) {
    searchArticles(props.type, search.value, 1, itemsPerPage.value, sortParam, statusParam)
  } else {
    fetchArticles(
      props.type,
      1,
      itemsPerPage.value,
      search.value || undefined,
      sortParam,
      statusParam,
    )
  }
}

function getRowItems(row: Row<Blog>) {
  return [
    {
      label: `Sửa bài viết`,
      icon: 'i-heroicons-pencil-square',
      to: `/articles/${props.categoryPath}/edit/${row.original.slug}`,
    },
    {
      label: 'Sao chép ID',
      icon: 'i-heroicons-document-duplicate',
      onSelect: () => {
        navigator.clipboard.writeText(String(row.original.id))
        toast.add({
          title: 'ID bài viết đã được sao chép vào clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Xoá bài viết',
      icon: 'i-heroicons-trash',
      color: 'error',
      onSelect: () => confirmDelete(row.original),
    },
  ]
}

const columns: TableColumn<Blog>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => getHeader(column, 'Tiêu đề'),
    enableSorting: true,
  },
  {
    accessorKey: 'createdDate',
    header: ({ column }) => getHeader(column, 'Thời gian tạo'),
    enableSorting: true,
    cell: ({ row }) => {
      return new Date(row.getValue('createdDate')).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    },
  },
  {
    accessorKey: 'viewCount',
    header: ({ column }) => getHeader(column, 'Lượt xem'),
    enableSorting: true,
    cell: ({ row }) => row.getValue('viewCount'),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => getHeader(column, 'Trạng thái'),
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.getValue('status')
      const statusConfig = {
        PUBLISHED: { label: 'Công khai', color: 'success' },
        UNPUBLISHED: { label: 'Ẩn', color: 'neutral' },
        DRAFT: { label: 'Nháp', color: 'warning' },
      }
      const config = statusConfig[status as keyof typeof statusConfig] || {
        label: status,
        color: 'neutral',
      }

      return h('div', {}, [
        h(resolveComponent('UBadge'), {
          color: config.color,
          label: config.label,
          variant: 'subtle',
          size: 'lg',
        }),
      ])
    },
  },
  {
    id: 'actions',
    header: '',
    enableSorting: false,
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            items: getRowItems(row),
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
            }),
        ),
      )
    },
  },
]

function getSortIcon(isSorted: false | 'asc' | 'desc') {
  if (!isSorted) return 'i-lucide-arrow-up-down'
  return isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow'
}

function getHeader(column: Column<Blog>, label: string) {
  const isSorted = column.getIsSorted()

  return h(
    UDropdownMenu,
    {
      content: {
        align: 'start',
      },
      items: [
        {
          label: 'Tăng',
          type: 'checkbox',
          icon: 'i-lucide-arrow-up-narrow-wide',
          checked: isSorted === 'asc',
          onSelect: () => {
            if (isSorted === 'asc') {
              column.clearSorting()
            } else {
              column.toggleSorting(false)
            }
          },
        },
        {
          label: 'Giảm',
          icon: 'i-lucide-arrow-down-wide-narrow',
          type: 'checkbox',
          checked: isSorted === 'desc',
          onSelect: () => {
            if (isSorted === 'desc') {
              column.clearSorting()
            } else {
              column.toggleSorting(true)
            }
          },
        },
      ],
    },
    () =>
      h(UButton, {
        color: isSorted ? 'primary' : 'neutral',
        variant: 'ghost',
        label,
        icon: getSortIcon(isSorted),
        class: '-mx-2.5 data-[state=open]:bg-(--ui-bg-elevated)',
      }),
  )
}

const navigateToCreate = () => {
  router.push(`/articles/${props.categoryPath}/create`)
}

const overlay = useOverlay()
const confirmDelete = async (article: Blog) => {
  const modal = overlay.create(LazyConfirmDialog)
  await modal.open({
    title: 'Xác nhận xoá',
    message: `Bạn có chắc chắn muốn xoá bài viết "${article.title}"?`,
    confirmLabel: 'Xoá',
    cancelLabel: 'Huỷ',
    async onConfirm() {
      try {
        await deleteArticle(article.slug)
        toast.add({
          title: 'Thành công',
          description: 'Bài viết đã được xoá thành công',
        })
        // Refresh with current pagination
        fetchArticles(props.type, currentPage.value, itemsPerPage.value)
        modal.close()
      } catch {
        toast.add({
          title: 'Lỗi',
          description: 'Xoá thất bại',
          color: 'error',
        })
      }
    },
    onCancel() {
      modal.close()
    },
  })
}

// Update existing watchers and functions to include status parameter
watch(sorting, (newSorting) => {
  const sortParam = convertSortingFormat(newSorting)
  const statusParam = getStatusParam()

  if (search.value) {
    searchArticles(
      props.type,
      search.value,
      currentPage.value,
      itemsPerPage.value,
      sortParam,
      statusParam,
    )
  } else {
    fetchArticles(
      props.type,
      currentPage.value,
      itemsPerPage.value,
      search.value || undefined,
      sortParam,
      statusParam,
    )
  }
})

function handleSearch() {
  if (searchDebounceTimeout.value) {
    clearTimeout(searchDebounceTimeout.value)
  }

  searchDebounceTimeout.value = setTimeout(() => {
    const sortParam = convertSortingFormat(sorting.value)
    const statusParam = getStatusParam()
    searchArticles(props.type, search.value, 1, itemsPerPage.value, sortParam, statusParam)
  }, 300)
}

onMounted(() => {
  search.value = searchKeyword.value
  const sortParam = convertSortingFormat(sorting.value)
  const statusParam = getStatusParam()

  fetchArticles(
    props.type,
    1,
    itemsPerPage.value,
    search.value || undefined,
    sortParam,
    statusParam,
  )
})

const onPageChange = (page: number) => {
  goToPage(page)
  const sortParam = convertSortingFormat(sorting.value)
  const statusParam = getStatusParam()

  if (search.value) {
    searchArticles(props.type, search.value, page, itemsPerPage.value, sortParam, statusParam)
  } else {
    fetchArticles(
      props.type,
      page,
      itemsPerPage.value,
      search.value || undefined,
      sortParam,
      statusParam,
    )
  }
}
</script>
