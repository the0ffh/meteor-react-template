import React, { PureComponent } from 'react';
import { createComponent } from 'react-fela';
import { Redirect } from 'react-router-dom';

import Dialog from './Dialog';


const notLoggedIn = ({ theme: { colors } }) => ({
	backgroundColor: colors.lightSecondary,
	borderRadius: '2px',
});

const $NotLoggedIn = createComponent(notLoggedIn);

export default class NotLoggedIn extends PureComponent {
	state = {
		openDialog: null,
	};

	handleDialogOpen = (e) => {
		this.setState({
			openDialog: e.target.value,
		});
	};

	handleDialogClose = () => {
		this.setState({
			openDialog: null,
		});
	};

	render() {
		const { openDialog } = this.state;
		if (Meteor.userId() !== null) {
			return <Redirect to={'/'} />;
		}
		return (
			<$NotLoggedIn >
				<div className="mdc-card">
					<section className="mdc-card__primary">
						<h1 className="mdc-card__title mdc-card__title--large">
							You are not logged in.
						</h1 >
						<h2 className="mdc-card__subtitle">Please log in or register</h2 >
					</section >
					<section className="mdc-card__supporting-text" />
					<section className="mdc-card__actions">
						<button
							className="mdc-button mdc-button--compact mdc-card__action"
							value="notLoggedIn"
							onTouchTap={this.handleDialogOpen}
						>
							Log in
						</button >
						<button
							className="mdc-button mdc-button--compact mdc-card__action"
							value="registration"
							onTouchTap={this.handleDialogOpen}
						>
							Register
						</button >
					</section >
				</div >
				{openDialog && (
					<Dialog
						dialogType={openDialog}
						handleDialogClose={this.handleDialogClose}
					/>)
				}
			</$NotLoggedIn >
		);
	}
}
