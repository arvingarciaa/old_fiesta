
// Prototype functions

Array.prototype.pushIfNotExist = function(element) {
    // string
    if(element.constructor == String && element.trim() != '' && this.indexOf(element) == -1){
        this.push(element);
        element = '';
    }
    // object
    else if(element.constructor == Object){
      // check if exist

      // add if not
      var el = jQuery.extend(true, {}, element);
      this.push(el);
    }
};
