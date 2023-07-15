type DataApi = {
  id: number
  title: string
  due_date: string
  created_at: string
  active: boolean
  quantity: number
  user: string
}

export interface IBorrowedByBookFactory {
  id: number
  title: string
  dueDate: string
  createdAt: string
  active: boolean
  quantity: number
  status?: string
  user: string
}

export class BorrowedByBookFactory {
  static builder(data: DataApi[]): IBorrowedByBookFactory[] {
    return (
      data?.map((item) => {
        const date = new Date(item.due_date)
        const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        const createdAt = new Date(item.created_at)
        const formatedCreatedAt = `${createdAt.getDate()}/${
          createdAt.getMonth() + 1
        }/${createdAt.getFullYear()}`
        return {
          id: item.id,
          title: item.title,
          dueDate: formatedDate,
          createdAt: formatedCreatedAt,
          active: item.active,
          quantity: item.quantity,
          status: item.active
            ? item.due_date > new Date().toISOString()
              ? 'Emprestado'
              : 'Atrasado'
            : 'Devolvido',
          user: item.user,
        }
      }) || []
    )
  }
}
