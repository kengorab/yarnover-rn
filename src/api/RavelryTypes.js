// Types for the Ravelry API are written in Flow, since it's built into RN by default.

import Paginator from './domain/Paginator'
import Pattern from './domain/Pattern'
import QueuedProjectDetails from './domain/QueuedProjectDetails'

// Enums

export type SortOrder
  = 'best'
  | 'recently-popular'
  | 'name'
  | 'popularity'
  | 'projects'
  | 'favorites'
  | 'queues'
  | 'date'
  | 'created'
  | 'rating'
  | 'difficulty'
  | 'yarn'

export type Availability
  = 'free'
  | 'online'
  | 'inprint'
  | 'ravelry'
  | 'library'

export type LibraryQueryType
  = 'patterns'
  | 'tags'

export type LibrarySourceType
  = 'book'
  | 'magazine'
  | 'booklet'
  | 'pattern'
  | 'pdf'

// Domain objects without classes (others are defined as classes in the api/domain dir)

export type CurrentUser = {
  username: string
}

// Request/Response types

export type SearchLibraryRequest = {
  query: string | null,
  queryType: LibraryQueryType,
  type: LibrarySourceType,
  sort: SortOrder,
  page: number,
  pageSize: number
}

export type SearchPatternsRequest = {
  query: string,
  page: number,
  pageSize: number,
  hasPhoto: boolean,
  sort: SortOrder,
  availability: Availability
}

export type SearchPatternsFilters = {
  craft: string | null
}

export type SearchQueueRequest = {
  patternId: number | null,
  query: string | null,
  queryType: LibraryQueryType,
  page: number,
  pageSize: number
}

export type PaginatedPatternsResponse = {
  paginator: Paginator,
  patterns: Pattern[]
}

export type PaginatedQueueResponse = {
  paginator: Paginator,
  queuedProjects: QueuedProjectDetails[]
}

