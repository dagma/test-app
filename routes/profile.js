var bodyParser = require('body-parser'); 
var cookieParser = require('cookie-parser'); 
var csurf = require('csurf'); 
var express = require('express'); 
var extend = require('xtend'); 
var forms = require('forms');
var ManagementClient = require('auth0').ManagementClient; 
var User = require('../models');

var profileForm = forms.create({
	nickname: forms.fields.string({ required: true })
});

function renderForm(req, res, locals) {
	res.render('profile', extend({
		title: 'My Profile', 
		csrfToken: req.csrfToken(), 
		nickname: req.user.nickname 
	}, locals || {})); 
}

module.exports = function profile() { 
	var router = express.Router();
	
	router.use(cookieParser());
	router.use(bodyParser.urlencoded({ extended: true }));
	router.use(csurf({ cookie: true }));

	router.all('/', function(req, res) {
		profileForm.handle(req, {
			success: function(form) {
				var management = new ManagementClient({
               	 	token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJVRkRPRGhDUlVReE5VSTBPRGRDTmtKRk9EYzJNRVUyT1VVMlFrSkNNa1ExUXpnNU1URTNPUSJ9.eyJpc3MiOiJodHRwczovL2tvZGlsbGEuZXUuYXV0aDAuY29tLyIsInN1YiI6IjNkQlVUNHlMV0JiMU5qbzBJVjk1SHh5dnoxSk1kcFJwQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2tvZGlsbGEuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE0OTk4MDA3NzAsImlhdCI6MTQ5OTcxNDM3MCwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IifQ.muNGWf732laZG57b9h0DSvrM3IQjHDtAdehMRhoT0C_a0DGjfRcN79jRV_tEstBBIHI8DI_nFxk_yMrdOarC1UVUMKUmIkJ7CDNjgABIHbxfCY15t2GD7QbhUtb74GNe25gs5a16bh_SELc54s5W7HyPjuqVsqN27MVhnV8z8gl0QdlyZDybhSR5ZrWeWqZg5v_dsCbXj5e5hLv14VqTODxGG1zW2dRnJXpwT8hVWFFI1FxHRJPJOTnbyYIB_E5TQ-IeAHoxdcv80YUFxh06qwCtteg5Ud8YYK-DdspUukDP71r76o8TmdplZqqYfSqfdndt5aLz0q1Kk6z1Z8_tYQ',
                	domain: 'https://kodilla.eu.auth0.com/oauth/token'
            	});

				var user = new User();
				user.nickname = form.data.nickname;
				user.save(function(err) {
				    if (err) {
				        console.log(err);
				    }
				    res.json('User added to DB');
				});

				 console.log(user);
			}, 
			empty: function() {
				renderForm(req, res); 
			}
		}); 
	});
	return router;
};