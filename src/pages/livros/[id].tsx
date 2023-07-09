import ShowBookComponent from '@/components/screens/Book/ShowBookComponent'
import { GetServerSidePropsContext } from 'next'
import BookService from '@services/BookService'

const Livros = (props) => <ShowBookComponent {...props} />

export async function getServerSideProps(props: GetServerSidePropsContext) {
  const { id } = props.query

  if (id) {
    return BookService.getBook(Number(id)).then((data) => {
      return {
        props: {
          book: data[0].books[0],
        },
      }
    })
  }

  return {
    props: {},
  }
}

export default Livros
