//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")

template.innerHTML = /*html*/`

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<main>
<div class="container d-flex flex-column align-items-center">

<body>
<img src="images/logo.svg" class="w-25 mb-3" alt="">

    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control <?php echo $nameErr ? 'is-invalid' : null; ?> " id="name" name="name" placeholder="Enter your name">
        <div class="invalid-feedback">
        </div>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control <?php echo $emailErr ? 'is-invalid' : null; ?>" id="password" name="password" placeholder="Enter your password">
        <div class="invalid-feedback">
        </div>
    </div>


<div class="mb-3">
<button id="btnLogin" value="Login" class="btn btn-dark w-100 h-25">Login</button>
</div>
</body>
</div>
<div id = "response">Hallooooooo</div>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
`

class app extends HTMLElement
{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: "open"}) // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        this.shadow.append(template.content.cloneNode(true))
        
        }
    connectedCallback(){
      this.IsLoggedIn = false;

        this.loginbtn = this.shadow.querySelector("#btnLogin");
        this.name = this.shadow.querySelector("#name");
        this.password = this.shadow.querySelector("#password");
        this.respons = this.shadow.querySelector("#response");
        this.loginbtn.addEventListener("click", ()=>{
            //Hier moet gewoon dan de naam en het passwoord worden doorgegeven via een string, we kunnen deze splitsen achteraf met split
            //Er moet ook nog een element worden aangemaakt voor het eindresultaat uit te voeren.
            //We moeten nog toevoegen dat we niet zomaar lege velden kunnen doorvoeren
            if(empty(this.name.value)){
                this.respons.innerHTML = "geef een naam in";
            }
            else if(empty(this.password.value)){
                this.respons.innerHTML = "geef een passwoord in";
            }
            else{
                this.CheckLogin("name="+this.name.value +"&password="+ this.password.value);
                // this.ChangePageEvent("myGames");
                console.log(this.IsLoggedIn);
                if(this.IsLoggedIn){
                  this.ChangePageEvent("myGames");
                }
            }

        })
    }
        CheckLogin(str) {
            let res = this.respons;
            let login;
            if (str == "") {
              this.respons.innerHTML = "";
              return;
            }
            const xhttp = new XMLHttpRequest();
            xhttp.onload = ()=> {
                console.log(xhttp.responseText);
                res.innerHTML= xhttp.responseText;
                if(!empty(xhttp.responseText)){
                  this.IsLoggedIn = true;
                }
            }
            xhttp.open("GET", "login.php?"+str);
            xhttp.send();
            this.IsLoggedIn = login;
          }
          ChangePageEvent(id){
            this.dispatchEvent(new CustomEvent("ChangePageEvent", {
                bubbles: true,
                composed: true,
                detail: id
            }))
        }
          
}
const empty = (data) => {
    // Check if data is a number or boolean, and return false as they're never considered empty
    if (typeof data === 'number' || typeof data === 'boolean') {
      return false;
    }
    
    // Check if data is undefined or null, and return true as they're considered empty
    if (typeof data === 'undefined' || data === null) {
      return true;
    }
  
    // Check if data has a length property (e.g. strings, arrays) and return true if the length is 0
    if (typeof data.length !== 'undefined') {
      return data.length === 0;
    }
  
    // Check if data is an object and use Object.keys() to determine if it has any enumerable properties
    if (typeof data === 'object') {
      return Object.keys(data).length === 0;
    }
  
    // Return false for any other data types, as they're not considered empty
    return false;
  };


customElements.define('login-comp', app)