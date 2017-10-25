// Types for the Ravelry API are written in Flow, since it's built into RN by default.

import Paginator from './domain/Paginator'
import Pattern from './domain/Pattern'

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

// Domain objects without classes (others are defined as classes in the api/domain dir)

export type CurrentUser = {
  username: string
}

// Request/Response types

export type SearchPatternsRequest = {
  page: number,
  pageSize: number,
  hasPhoto: boolean,
  sort: SortOrder,
  availability: Availability
}

export type PaginatedPatternsResponse = {
  paginator: Paginator,
  patterns: Pattern[]
}

