import { GetServerSidePropsContext } from 'next'
import CreateBooks from '@/components/screens/Book/Create'
import { verifyTokenAdmin } from '@middlewares/verifyTokenAdmin'

const CadastrarLivros = () => <CreateBooks />

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => verifyTokenAdmin(ctx)

export default CadastrarLivros
