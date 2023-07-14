import { verifyTokenAdmin } from '@middlewares/verifyTokenAdmin'
import { GetServerSidePropsContext } from 'next'
import ShowCategory from '@/components/screens/Category/ShowCategory'

const MostrarCategoria = () => <ShowCategory />

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => verifyTokenAdmin(ctx)

export default MostrarCategoria
