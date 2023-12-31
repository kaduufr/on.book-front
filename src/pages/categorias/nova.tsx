import { verifyTokenAdmin } from '@middlewares/verifyTokenAdmin'
import { GetServerSidePropsContext } from 'next'
import CreateCategory from '@/components/screens/Category/Create'

const NovaCategoria = () => <CreateCategory />

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => verifyTokenAdmin(ctx)

export default NovaCategoria
