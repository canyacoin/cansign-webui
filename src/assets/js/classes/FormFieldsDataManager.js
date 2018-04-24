(function(global){

  // Private vars
  var formFieldsToSend = [];
  var validationFields = [];
  var areValidFields = false;
  var parentData = {};

  // Private funcs
  function buildDataObjArray(){
    var formFieldsData = {};
    formFieldsToSend.forEach(function(field){
      formFieldsData[field] = parentData[field];
    });
    return formFieldsData;
  }

  // Class init
  var FormFieldsDataManager = function(field){
    this.field = field || '';
  }

  FormFieldsDataManager.prototype.setFormFieldData = function(fieldData, field){
    return parentData[field] = fieldData;
  }

  FormFieldsDataManager.prototype.setParentData = function($parentData){
    parentData = $parentData;
    return parentData;
  }

  FormFieldsDataManager.prototype.addFormField = function(field){
    if (field) {
      return formFieldsToSend.push(field);
    }
  }

  FormFieldsDataManager.prototype.addFieldValidators = function(validators, $field){
    validationFields.push($field);
    var field = $field || this.field;
    if (validators.length > 0) {
      validators.forEach(function(validator){
        var $validators = { validators: {} };
        $validators.validators[validator] = formValidators[validator];
        fv.addField(field, $validators);
      });
    }
  }

  FormFieldsDataManager.prototype.validateFields = function(){
    var areValid = false;
    validationFields.some(function(fieldName){
      fv.revalidateField(fieldName);
      if (!fv.isValidField(fieldName)) {
        return areValid = false;
      } else {
        areValid = true;
      }
    });
    return areValidFields = areValid;
  }

  FormFieldsDataManager.prototype.post = function(){
    if (areValidFields) {
      return new Promise(function(resolve, reject){
        var data = buildDataObjArray();
        $.ajax({
          url: '',
          method: 'POST',
          data: data,
          dataType: 'json',
          success: function(res){
            resolve(res);
          },
          error: function(error){
            resolve(error);
          },
        });
      });
    }
  }


  global.FormFieldsDataManager = FormFieldsDataManager;
})(window);


