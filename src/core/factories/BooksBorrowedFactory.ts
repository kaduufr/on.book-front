type DataApi = {
  id: number;
  title: string;
  due_date: string;
  created_at: string;
  active: boolean;
  quantity: number;
}

export interface IBookBorrowFactory {
  id: number;
  title: string;
  dueDate: string;
  createdAt: string;
  active: boolean;
  quantity: number;
  status?: string;
}


export class BooksBorrowedFactory {
  static builder(data: DataApi[]) : IBookBorrowFactory[] {
    return data?.map((item) => {
      const date = new Date(item.due_date)
      const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      return {
        id: item.id,
        title: item.title,
        dueDate: formatedDate,
        createdAt: item.created_at,
        active: item.active,
        quantity: item.quantity,
        status: item.active ? item.due_date > new Date().toISOString() ? 'Emprestado' : 'Atrasado' : 'Devolvido'
      }
    }) || []
  }
}
