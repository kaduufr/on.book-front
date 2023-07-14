import EditCategory from '@/components/screens/Category/Edit'
import { verifyTokenAdmin } from '@middlewares/verifyTokenAdmin'
import { GetServerSidePropsContext } from 'next'

const EditarCategory = () => <EditCategory />

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => verifyTokenAdmin(ctx)

export default EditarCategory
