import React, { PureComponent } from 'react';
import { createComponent } from 'react-fela';
import PropTypes from 'prop-types';
import MDCTextfield from '../../#components/MDCTextfield';


const styles = {
	dialog: ({ theme: { colors } }) => ({
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: colors.darkPrimary,
	}),
	surface: () => ({
		minWidth: '420px',
		width: '320px',
		maxWidth: '640px',
	}),
	mdcIcon: ({ theme: { colors: { correct, error } }, valid }) => ({
		color: valid
			? correct
			: error,
	}),
};

const $Dialog = createComponent(styles.dialog);
const $Surface = createComponent(styles.surface);
const $MDCIcon = createComponent(styles.mdcIcon);

export default class Dialog extends PureComponent {
	state = {
		email: '',
		password: '',
		passwordCheck: '',
		firstName: '',
		lastName: '',
	};

	handleInputChange = ({ target: { id, value } }) => {
		switch (id) {
		case 'in-email':
			this.setState({ email: value });
			break;
		case 'in-password':
			this.setState({ password: value });
			break;
		case 'in-password-check':
			this.setState({ passwordCheck: value });
			break;
		case 'in-first-name':
			this.setState({ firstName: value });
			break;
		case 'in-last-name':
			this.setState({ lastName: value });
			break;
		default:
			break;
		}
	};

	handleSubmitLogin = () => {
		const { email, password } = this.state;
		Meteor.loginWithPassword(email, password, (e) => {
			if (e) {
				console.error(e);
			} else {
				this.handleLoginSuccessful();
			}
		});
	};

	handleSubmitRegistration = () => {
		const { handleDialogClose } = this.props;
		const { email, password, firstName, lastName } = this.state;

		if (email.length !== 0 && password.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
			const username = firstName + lastName;
			const profile = {
				contacts: [],
				messages: [],
				img: 'profile.png',
			};
			Accounts.createUser({ username, email, password, profile });
			handleDialogClose();
		} else {
			// TODO correct..
			console.log('correct the entered data');
		}
	};


	handleLoginSuccessful = () => {
		const { handleDialogClose } = this.props;
		const { email } = this.state;

		console.log(`login successful for ${email}`);
		handleDialogClose();
	};

	render() {
		const { dialogType, handleDialogClose } = this.props;
		const { email, password, passwordCheck, firstName, lastName } = this.state;

		return (
			<$Dialog className="mdc-dialog mdc-dialog--open">
				<$Surface className="mdc-dialog__surface">
					<header className="mdc-dialog__header">
						<h2
							id="mdc-dialog-default-label"
							className="mdc-dialog__header__title"
						>
							{dialogType === 'login' && 'Log in'}
							{dialogType === 'registration' && 'Register'}
						</h2 >
					</header >
					<div
						id="mdc-dialog-default-description"
						className="mdc-dialog__body"
					>
						<ul className="mdc-list">
							<li className="mdc-list-item">
								<MDCTextfield
									className="mdc-textfield--fullwidth"
									onChange={this.handleInputChange}
									id="in-email"
									text="e-mail"
									type="email"
								/>
								<$MDCIcon
									className="mdc-list-item__end-detail material-icons"
									valid={email.length !== 0}
								>
									{email.length === 0 && 'warning'}
									{email.length !== 0 && 'done'}
								</$MDCIcon >
							</li >
							<li className="mdc-list-item">
								<MDCTextfield
									onChange={this.handleInputChange}
									id="in-password"
									text="password"
									type="password"
								/>
								<$MDCIcon
									className="mdc-list-item__end-detail material-icons"
									valid={password.length !== 0}
								>
									{password.length === 0 && 'warning'}
									{password.length !== 0 && 'done'}
								</$MDCIcon >
							</li >
							{dialogType === 'registration' && (
								<li className="mdc-list-item">
									<MDCTextfield
										onChange={this.handleInputChange}
										id="in-password-check"
										text="retype password"
										type="password"
									/>
									<$MDCIcon
										className="mdc-list-item__end-detail material-icons"
										valid={passwordCheck.length !== 0}
									>
										{(passwordCheck !== password) && 'warning'}
										{(passwordCheck === password) && (passwordCheck.length !== 0) && 'done'}
									</$MDCIcon >
								</li >)
							}
							{dialogType === 'registration' && (
								<li className="mdc-list-item">
									<MDCTextfield
										onChange={this.handleInputChange}
										id="in-first-name"
										text="first name"
										type="text"
									/>
									<$MDCIcon
										className="mdc-list-item__end-detail material-icons"
										valid={firstName.length !== 0}
									>
										{firstName.length === 0 && 'warning'}
										{firstName.length !== 0 && 'done'}
									</$MDCIcon >
								</li >)
							}
							{dialogType === 'registration' && (
								<li className="mdc-list-item">
									<MDCTextfield
										onChange={this.handleInputChange}
										id="in-last-name"
										text="last name"
										type="text"
									/>
									<$MDCIcon
										className="mdc-list-item__end-detail material-icons"
										valid={lastName.length !== 0}
									>
										{lastName.length === 0 && 'warning'}
										{lastName.length !== 0 && 'done'}
									</$MDCIcon >
								</li >)
							}
						</ul >
					</div >
					<footer className="mdc-dialog__footer">
						<button
							className="mdc-dialog__footer__button mdc-button"
							onTouchTap={handleDialogClose}
						>
							Cancel
						</button >
						{dialogType === 'login' &&
						<button
							className="mdc-dialog__footer__button mdc-button mdc-button--primary"
							onTouchTap={this.handleSubmitLogin}
						>
							Continue
						</button >}
						{dialogType === 'registration' &&
						<button
							className="mdc-dialog__footer__button mdc-button mdc-button--primary"
							onTouchTap={this.handleSubmitRegistration}
						>
							Continue
						</button >}
					</footer >
				</$Surface >
			</$Dialog >
		);
	}
}


Dialog.contextTypes = {};

Dialog.propTypes = {
	dialogType: PropTypes.string.isRequired,
	handleDialogClose: PropTypes.func.isRequired,
};
