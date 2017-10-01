import React from 'react';
import { createComponent } from 'react-fela';

const e404 = () => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	flex: '1 1 auto',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
});
const statusCode = ({ theme: { colors: { error } } }) => ({
	color: error,
	fontSize: '64px',
	lineHeight: '64px',
});

const $e404 = createComponent(e404);
const $StatusCode = createComponent(statusCode);


const NotFound = () => (
	<$e404 >
		<div >
			Not found.
		</div >
		<$StatusCode >
			404
		</$StatusCode >
		<div >
			Obviously.
		</div >
	</$e404 >
);

NotFound.propTypes = {};

export default NotFound;
