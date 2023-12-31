/* eslint-disable import/no-duplicates */
import '@styles/index.scss';
import './styles.scss';
import '@components/common/logo/Logo';
import '@components/common/text-field/TextField';

// eslint-disable-next-line import/no-duplicates
import { TextField } from '@components/common/text-field/TextField';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { FIREBASE_AUTH } from '@/firebase';

// Nodes
const EMAIL = document.querySelector('#email') as TextField;
const PASSWORD = document.querySelector('#password') as TextField;
const FORM = document.querySelector('#form-login') as HTMLFormElement;
const INPUTS_CONTAINER = Array.from(
	document.querySelectorAll('text-field') as NodeListOf<TextField>
);

const wrongCredentials = () => {
	INPUTS_CONTAINER.forEach((textField) => {
		textField?.container?.classList.add('is-invalid');
	});
};

FORM.addEventListener('submit', (event) => {
	event.preventDefault();

	const USER_EMAIL = EMAIL.input?.value;
	const USER_PASSWORD = PASSWORD.input?.value;

	if (!USER_PASSWORD || !USER_EMAIL) return;

	signInWithEmailAndPassword(FIREBASE_AUTH, USER_EMAIL, USER_PASSWORD)
		.then((userCredential) => {
			INPUTS_CONTAINER.forEach((textField) => {
				textField?.container?.classList.remove('is-invalid');
			});
			console.log(userCredential.user);
		})
		.catch((error) => {
			wrongCredentials();
			console.error(error);
		});
});
