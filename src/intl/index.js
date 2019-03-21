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
					nesto: 'Something new',
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
					typeMsg: 'Write message..'
				}
			},
			rs: {
				translations: {
					wellcome: 'Dobrodosli u FOOD ORDER aplikaciju',
					nesto: 'Nesto novo',
					profileInfo: 'Informacije o profilu',
					notFoundPage: 'Stranica nije pronadjena',
					myProfile: 'Moj Profil',
					logout: 'Izloguj se',
					security: 'Sigurnost',
					userInfo: 'Informacije',
					updateChanges: 'Azuriraj promene',
					changePasswordMsg:
						'Molimo Vas unesite podatke ukoliko zelite da promenite lozinku',
					password: 'Lozinka',
					rePassword: 'Ponovi Lozinku',
					changePassword: 'Promeni lozinku',
					addChat: 'Dodaj',
					conversations: 'Konverzacije',
					users: 'Korisnici',
					search: 'Pretrazi ljude, konverzacije...',
					returnBack: 'Vratite se na pocetnu stranicu.',
					rooms: 'Sobe',
					inbox: 'Sanduce',
					products: 'Produkti',
					invoices: 'Fakture',
					customers: 'Musterije',
					chatroom: 'Caskanje',
					calendar: 'Kalendar',
					settings: 'Podesavanja',
					registerMsg: 'Molimo Vas popunite polja da bi ste se ulogovali.',
					loginMsg: 'Dobrodosli nazad! Molimo vas ulogujte se na Vas nalog.',
					firstName: 'Ime',
					lastName: 'Prezime',
					username: 'Korisnicko ime',
					email: 'Email',
					signUp: 'Registruj se',
					alreadyHaveAcc: 'Vec imate nalog? Ulogujte se.',
					rememberMe: 'Zapamti me',
					forgotPass: 'Zaboravili ste lozinku?',
					login: 'Ulogujte se',
					dontHaveAcc: 'Nemate nalog? Registrujte se besplatno.',
					forgotPassMsg: 'Upisite email u polje, da bi ste dobili lozinku.',
					sendReq: 'Posaljite zahtev',
					passwordReq: 'Lozinka je neophodna',
					newGroup: 'Nova Grupa',
					groupName: 'Ime grupe',
					findUsers: 'Pronadji korisnika',
					typeMsg: 'Napisi poruku..'
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
