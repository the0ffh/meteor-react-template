import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


import { MDCTextfield as Beep } from '@material/textfield/dist/mdc.textfield';


class MDCTextfield extends PureComponent {
	state = {
		registeredTextfields: [],
	};

	componentDidMount = () => {
		const { registeredTextfields } = this.state;

		document.querySelectorAll('.mdc-textfield').forEach((v) => {
			registeredTextfields.push(
				new Beep(v),
			);
		});

		this.setState({
			registeredTextfields,
		});
	};

	componentWillUnmount = () => {
		const { registeredTextfields } = this.state;

		while (registeredTextfields.length !== 0) {
			registeredTextfields.pop().destroy();
		}
		this.setState({
			registeredTextfields,
		});
	};

	render() {
		const { id, className, onChange, type, text } = this.props;
		return (
			<div className={classnames('mdc-textfield', className)}>
				<input
					id={id}
					className="mdc-textfield__input"
					onChange={onChange}
					type={type}
				/>
				<label
					htmlFor={id}
					className="mdc-textfield__label"
				>{text}</label >
			</div >
		);
	}
}

MDCTextfield.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default MDCTextfield;
