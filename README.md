# cakephp-ajaxPostLinks
Extend cakephp's Postlink with so that the form is submitted via ajax


### use

```js
$(selector).ajaxPostLink({
    errorCallback: function(errorMessage) {},
    successCallback: function(message, element) {},
    errorMessage: 'defaulterrormessage'
});
```

### options:
- successCallback: function executed, after servers response = true
- errorCallback: function executed, on error