import Profile from '@/components/screens/User/Profile'
import {verifyToken} from "@middlewares/verifyToken";
import {GetServerSidePropsContext} from "next";

const Perfil = () => <Profile />

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => verifyToken(ctx)

export default Perfil
