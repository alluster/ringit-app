import React, { useContext } from 'react';
import Layout from '../layouts/LayoutNoNavigation';
import styled from 'styled-components';
import Link from 'next/link';
import { AppContext } from  '../context/Context';


const HomeContainer = styled.div`
	text-align: center;
	margin-top: 100px;
	padding-left: 10px;
	padding-right: 10px;


`



const RegisterButton = styled.button `
	background-color: ${props => props.theme.colors.brand.primary};
	color: white;
	-webkit-text-fill-color: white;
	height: 40px; 
	border-radius: 20px;
	text-align: center;
	line-height: 40px;
	font-weight: bold;
	font-size: 20px;
	padding-left: auto;
	padding-right: auto;
	margin-top: 50px;
	width: 500px;
	@media (max-width: ${props => props.theme.screenSize.tablet}) {
		width: 100%;
    }
`;

const SignInButton = styled.button `
	background-color: transparent;
	color: ${props => props.theme.colors.brand.primary};
	-webkit-text-fill-color: ${props => props.theme.colors.brand.primary};
	height: 40px; 
	border-radius: 20px;
	// border: 2px solid ${props => props.theme.colors.brand.primary};
	text-align: center;
	line-height: 40px;
	font-weight: bold;
	font-size: 14px;
	padding-left: auto;
	padding-right: auto;
	width: 500px;
	@media (max-width: ${props => props.theme.screenSize.tablet}) {
		width: 100%;
    }
`;
const Home = () => {
	const context = useContext(AppContext)

	
		return(
			<Layout title="Home" >
				<HomeContainer>
					<h1 style={{
						fontSize: '120px', 
						textAlign: 'center', 
						margin:'0px'}}>
						😍
					</h1>
					<h1 style={{
						textAlign: 'center'}}>
							Tervetuloa Ringit.fi palveluun.
					</h1>
					<p style={{
						textAlign: 'center',
						margin: '0px;'}}>
							Olet vain pienen askeleen päässä oman ringin rakentamisesta. Voit vilkaista lisätietoa palvelustamme
					</p>
					<Link href="/about">
						<a >
							<p style={{
							color: '#275EFE', 
							textAlign: 'center',
							textDecoration: 'underline',
							fontWeight: 'bold',
							margin: '0px;'
							}}>Tästä</p>
						</a>
					</Link>
					<div>
						<RegisterButton onClick={() => context.login({ returnTo: process.env.AUTHO_REDIRECT_URI })}>Rekisteröidy </RegisterButton>
					</div>
					<div>
						<SignInButton onClick={() => context.login({ returnTo: process.env.AUTHO_REDIRECT_URI })}>Tai kirjaudu sisään</SignInButton>
					</div>

				</HomeContainer>
			</Layout>
		)
}

export default Home;
