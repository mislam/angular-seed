/* global define */

define({
	appName: 'PhoneBook',
	routes: {
		'/contacts' : 'contact/Contact',
		'/contact/edit/:id' : 'contact/ContactEdit',
		'/foo/bar' : 'FooBar'
	}
});