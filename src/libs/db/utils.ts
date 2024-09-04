import { desc, asc, type PgSelect, type PgColumn } from './'

export type ColumnMap = Record<string, PgColumn>;

export function withParam<T extends PgSelect>(
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
