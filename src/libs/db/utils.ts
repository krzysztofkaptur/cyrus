import { desc, asc, type PgSelect, type PgColumn } from './'

export type ColumnMap = Record<string, PgColumn>;

export function withParam<T extends PgSelect>(
  qb: T,
  p: string,
  colMap: ColumnMap
) {
  const direction = p.startsWith('-') ? 'desc' : 'asc'
  p = p.replace('-', '')
  const col = colMap[p]
  if (!col) {
    return qb
  }
  if (direction === 'desc') {
    return qb.orderBy(desc(col))
  }
  return qb.orderBy(asc(col))
}
