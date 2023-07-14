import { GetServerSidePropsContext } from 'next'
import { verifyTokenAdmin } from '@middlewares/verifyTokenAdmin'
import EditBook from '@/components/screens/Book/Edit'

const EditarLivro = () => <EditBook />

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => verifyTokenAdmin(ctx)

export default EditarLivro
