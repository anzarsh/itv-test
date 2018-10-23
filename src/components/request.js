class Request {
    get(url, success, error) {
        this.send(url, 'GET', success, error);
    }
    head(url, success, error) {
        this.send(url, 'HEAD', success, error);
    }
    send(url, method, success, error) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        
        xhr.onload = function(e) {
            if(typeof success === 'function') success(this);
        };
        
        xhr.onerror = function(e) {
            if(typeof error === 'function') error(this.status + " : " + this.statusText);
        };
        
        xhr.send();
    }
}
let request = new Request();

export default request;