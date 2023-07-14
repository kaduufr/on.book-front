import BooksIndex from "@/components/screens/Book";
import {verifyToken} from "@middlewares/verifyToken";
import {GetServerSidePropsContext} from "next";

const LivrosIndex = () => <BooksIndex />;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => verifyToken(ctx)

export default LivrosIndex;
