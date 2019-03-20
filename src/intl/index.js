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
					search: 'Search for people..'
				}
			},
			srb: {
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
					search: 'Pretrazi ljude, konverzacije...'
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
