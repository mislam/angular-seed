/* global define */

define({
	appName: 'PhoneBook',
	appDir: '/js/app',
	libDir: '/js/lib',
	routes: {
		'/contacts' : 'contact/Contact',
		'/contact/edit/:id' : 'contact/ContactEdit',
		'/foo/bar' : 'FooBar'
	}
});