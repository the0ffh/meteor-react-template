import React from 'react';
import { createRenderer } from 'fela';
import { createComponent, Provider, ThemeProvider } from 'react-fela';
import { BrowserRouter } from 'react-router-dom';
import 'material-components-web/dist/material-components-web.css';

import Routes from './components/_routes/routes';
import theme from './_theme/theme';

const renderer = createRenderer();

const root = ({ theme: { fonts } }) => ({
	width: '100vw',
	height: '100vh',
	display: 'flex',
	flex: '1 1 auto',
	flexDirection: 'column',
	justifyContent: 'space-around',
	alignItems: 'center',
	fontFamily: fonts.RobotoLight,
});

const $Root = createComponent(root);

export default () => (
	<BrowserRouter >
		<Provider renderer={renderer}>
			<ThemeProvider theme={theme}>
				<$Root >
					<Routes />
				</$Root >
			</ThemeProvider >
		</Provider >
	</BrowserRouter >
);

/* TODO
is it a better convention to:
1. move the code from within this file to ~/client/Home.jsx?
2. leave as is, to contain most of the logic in the '~/imports' directory?
*/
