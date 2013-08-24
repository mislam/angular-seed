/* global define */

define({
	appName: 'PhoneBook',
	appDir: '/js/app',
	libDir: '/js/lib',
	routes: {
		'/contacts' : 'contact/Contact',
		'/contact/:id' : 'contact/ContactDetail'
	},
	defaultRedirect: '/contacts'
});