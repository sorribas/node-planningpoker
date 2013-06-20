var db = require('../db').db;

var forms = require('forms'),
    fields = forms.fields,
    validators = forms.validators;

var regForm = forms.create({
  email: fields.email({required: true}),
  password: fields.password({required: true}),
  confirm: fields.password({
    required: true, 
    validators:[validators.matchField('password')]
  })
});

exports.create = function(req, res) {
  regForm.handle(req.body, {
    success: function(frm) {
      db.users.save(req.body, function(err, doc) {
        req.session.user = doc;
        res.redirect("/");
      });
    },
    error: function(frm) {
      res.render('userform', {form: frm});
    }
  });
};

exports.createForm = function(req, res) {
  res.render('userform', {form: regForm} );
};
