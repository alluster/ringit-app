import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from  '../../context/Context';
import axios from 'axios';
import { withRouter } from '../../node_modules/next/router';
import PropTypes from 'prop-types';



    


const Input = styled.input`
	padding: 10px; 
	width: 90%;
	margin-top: 20px;
	border: 1px solid ${props => props.theme.colors.brand.border}; 
	-webkit-border-radius: 5px;
	border-radius: 5px;
	background-color: white;
	:focus {
		border-color:#333;
	}
	::placeholder {
		color: ${props => props.theme.colors.brand.disabled}
		font-size: 10px;
		font-weight: 400;
	}
	
		
	}`

const SubmitButton = styled.button `
	background-color: ${props => props.theme.colors.brand.primary};
	color: white;
	-webkit-text-fill-color: white;
	height: 40px; border-radius: 20px;
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


const AddRinki = (props) => {
	const initialState = {
		owner: "",
		created: Date.now(),
		name: "",
		location: "",
		image: "",
		description: ""
	}
	const [{ created, name, location, image, description }, setState] = useState(initialState);
	const context = useContext(AppContext)  
	const inputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};
	const clearState = () => {
		setState({ ...initialState });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			return await axios.get('/api/addrinki',  {
				params: {
					owner: context.user.email,
					created: created,
					name: name,
					location: location,
					image: image,
					description: description
					
				}	
			})
			.then(res => {
				axios.get('/api/addusertorinki', {
					params: {
						id_user: context.user.sub,
						id_rinki: res.data.insertId,	
						user_email: context.user.email	
					}
				})

			} )
			.then(clearState())
			.then(alert("Uusi rinki on lisätty"))
			.then(props.router.push('/profile'))
		} 
		catch (error) {
			console.error(error)
		}
	}
	return(
		<div>
			
				<form onSubmit={handleSubmit} >
					<Input placeholder="Ringin nimi" name="name" value={name} onChange={inputChange} type="text" />
					<Input placeholder="Ringin kuvaus" name="description" value={description} onChange={inputChange} type="text" />	
					<Input placeholder="Missä rinki sijaitsee" name="location" value={location} onChange={inputChange} type="text" />
					<SubmitButton onClick={e => handleSubmit(e)}>Lisää rinki</SubmitButton>
				</form>
        </div>
    )
}
AddRinki.propTypes = {
	props: PropTypes.any,
	router: PropTypes.any,

 };
export default withRouter(AddRinki);
