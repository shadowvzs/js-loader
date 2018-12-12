class Service {
    static loadContent(url) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.responseType = "text";
        xhr.send();   
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(this.responseText);
                    } else {
                        reject(`Unable to load: ${url}`);
                    }
                }
            };       
        });
    }
}