import Head from 'next/head'
const Header = (props) => {
	return (
        <Head>
            {props.children}
        </Head>
	)
}
export default Header