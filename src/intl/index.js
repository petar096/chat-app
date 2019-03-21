import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		// we init with resources
		resources: {
			en: {
				translations: {
					wellcome: 'Wellcome to FOOD ORDER aplication',
					profileInfo: 'User information',
					notFoundPage: 'Page not found',
					myProfile: 'My Profile',
					logout: 'Log out',
					security: 'Security',
					userInfo: 'User info',
					updateChanges: 'Update changes',
					changePasswordMsg:
						'Please fill the form in order to change current password',
					password: 'Password',
					rePassword: 'Re Password',
					changePassword: 'Change Password',
					addChat: 'Add chat',
					conversations: 'Conversations',
					users: 'Users',
					search: 'Search for people..',
					returnBack: 'Return back to home page',
					rooms: 'Rooms',
					inbox: 'Inbox',
					products: 'Products',
					invoices: 'Invoices',
					customers: 'Customers',
					chatroom: 'Chat room',
					calendar: 'Calendar',
					settings: 'Settings',
					registerMsg: 'Please complete to create your account',
					loginMsg: 'Welcome back!Please login to your account.',
					firstName: 'First name',
					lastName: 'Last name',
					username: 'Username',
					email: 'Email',
					signUp: 'Sign up',
					alreadyHaveAcc: 'Already have account? Sign in.',
					rememberMe: 'Remeber me',
					forgotPass: 'Forgot password?',
					login: 'Login',
					dontHaveAcc: "Don't have account? Sign up for free.",
					forgotPassMsg: 'Fill in your email, to recive your password.',
					sendReq: 'Send request',
					passwordReq: 'Password is required',
					newGroup: 'New Group',
					groupName: 'Group Name',
					findUsers: 'Find user',
					typeMsg: 'Write message..',
					footer: 'Terms of use. Privacy policy.'
				}
			},
			rs: {
				translations: {
					wellcome: 'Dobrodošli u FOOD ORDER aplikaciju',
					profileInfo: 'Informacije o profilu',
					notFoundPage: 'Stranica nije pronađena',
					myProfile: 'Moj Profil',
					logout: 'Izloguj se',
					security: 'Sigurnost',
					userInfo: 'Informacije',
					updateChanges: 'Ažuriraj promene',
					changePasswordMsg:
						'Molimo Vas unesite podatke ukoliko želite da promenite lozinku',
					password: 'Lozinka',
					rePassword: 'Ponovi Lozinku',
					changePassword: 'Promeni lozinku',
					addChat: 'Dodaj',
					conversations: 'Konverzacije',
					users: 'Korisnici',
					search: 'Pretraži ljude, konverzacije...',
					returnBack: 'Vratite se na početnu stranicu.',
					rooms: 'Sobe',
					inbox: 'Sanduče',
					products: 'Proizvodi',
					invoices: 'Fakture',
					customers: 'Mušterije',
					chatroom: 'Ćaskanje',
					calendar: 'Kalendar',
					settings: 'Podešavanja',
					registerMsg: 'Molimo Vas popunite polja da bi ste se ulogovali.',
					loginMsg: 'Dobrodošli nazad! Molimo vas ulogujte se na Vaš nalog.',
					firstName: 'Ime',
					lastName: 'Prezime',
					username: 'Korisničko ime',
					email: 'Email',
					signUp: 'Registruj se',
					alreadyHaveAcc: 'Već imate nalog? Ulogujte se.',
					rememberMe: 'Zapamti me',
					forgotPass: 'Zaboravili ste lozinku?',
					login: 'Ulogujte se',
					dontHaveAcc: 'Nemate nalog? Registrujte se besplatno.',
					forgotPassMsg: 'Upišite email u polje, da bi ste dobili lozinku.',
					sendReq: 'Pošaljite zahtev',
					passwordReq: 'Lozinka je neophodna',
					newGroup: 'Nova Grupa',
					groupName: 'Ime grupe',
					findUsers: 'Pronađi korisnika',
					typeMsg: 'Napiši poruku..',
					footer: 'Uslovi koriscenja. Pravila privatnosti.'
				}
			}
		},
		fallbackLng: 'en',
		debug: true,

		// have a common namespace used around the full app
		ns: ['translations'],
		defaultNS: 'translations',

		keySeparator: false, // we use content as keys

		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
