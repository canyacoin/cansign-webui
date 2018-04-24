(function(global){
  var ErrorControl = function(){}

  ErrorControl.prototype.display = function(err){
    if (err.responseText == undefined) {
      var error = err;
    } else {
      var error = JSON.parse(err.responseText);
    }
    console.log(error);
    var field = error.FIELD;
    // Sometimes, the field is a compound field so the element does not exists as is
    if ($('[name=' + field + ']').length == 0) {
      $('#' + field).after('<small class="help-block text-danger">' + error.ERROR + '</small>');
      $('#' + field).find('.form-group').removeClass('has-success has-warning').addClass('has-error');
    } else {
      $('[name=' + field + ']')
        .closest('.form-group')
        .addClass('has-error')
        .append('<small class="help-block">' + error.ERROR + '</small>');
    }
  }

  ErrorControl.prototype.clear = function(){
    $('.help-block').remove();
  }

  global.ErrorControl = ErrorControl;
})(window);
