import CategoriesScreen from '@/components/screens/Category'
import { verifyTokenAdmin } from '@middlewares/verifyTokenAdmin'
import { GetServerSidePropsContext } from 'next'

const Categories = () => <CategoriesScreen />

export default Categories
