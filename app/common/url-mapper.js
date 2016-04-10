angular.module('common').provider('UrlMapperProvider', UrlMapperProvider);

function UrlMapperProvider(){
    var provider = this;
    var configProviderURL;

    provider.$get = UrlMapper;
    provider.setConfigProviderURL = setConfigProviderURL;

    function setConfigProviderURL(url){
        setConfigProviderURL = url;
    }

    function UrlMapper(){
        //function
    }
}