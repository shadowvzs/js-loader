# js-loader


## My custom js loader

### Requirement:
* modern browser (atleast ES7)
* set which js file is the initial (lodar.js => entrypoint variable)

### How to use?
* simple declare on top which file and function/class/variable you need from that file
    * ` import { Root } from "js/Root"; // this import Root class from ./js/Root.js `
    * ` import { A, B, C } from "js/Something"; //import A, B, C from ./js/Something.js `
* if you use **class** and **extends** then declare the parent class in same file than your class  
    
### How it work in background
* system find with regex where is the import parameters and collect the **keys** and **file paths**
* when we got file path we load content with xhr (ajax)
* when we got content then we store/add/append key/content in array/object and go to step 1 and load files
* if not exist more import url then we create a script element
* insert loaded content between parentheses into script element and append it into head
* insert and entrypoint content into another script tag into body 
* pass everything what we need with a global object to 2nd script and destructure it
* remove script element and what was used for importing so code became ~clean
