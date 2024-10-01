import { desc, asc } from './'
import type { SQLiteSelect, SQLiteColumn } from 'drizzle-orm/sqlite-core'

export type ColumnMap = Record<string, SQLiteColumn>

export function withParam<T extends SQLiteSelect>(
  qb: T,
  order: string,
  colMap: ColumnMap
) {
  if (!order) {
    return qb
  }

  const direction = order.startsWith('-') ? 'desc' : 'asc'
  order = order.replace('-', '')
  const col = colMap[order]
  if (!col) {
    return qb
  }
  if (direction === 'desc') {
    return qb.orderBy(desc(col))
  }
  return qb.orderBy(asc(col))
}
