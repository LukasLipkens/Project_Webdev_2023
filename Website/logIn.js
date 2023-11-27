//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")

template.innerHTML = /*html*/`

<!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
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
</div>-->

<style>
  *{
    margin :0;
    padding: 0;
    box-sizing :border-box;
    font-family 'Montserrat', sans-serif;
  }
  body{
    background-color: #c9d6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction :colomn;
    height: 100vh;
  }
  .container{
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0,0,0, 0.35);
    position: relative;
    overflow: hidden;
    width : 768px;
    max-width: 100%;
    min-height: 480px;
  }
  .container p{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
  }

  .container span{
    font-size: 12px;
  }

  .container a{
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
   
  }

  .container button{
    background-color: #512da8;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
  }

  .container button.hidden{
    background-color: transparent;
    border-color: #fff;
  }

  .container form{
    background-color: #fff;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
  }

  .container input{
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
  }

  .form-container{
    position: absolute;
    top: 0;
    height: 100M;
    transition: all 0.6s ease-in-out;
  }

  .sign-in{
    left:0;
    width: 50%;
    z-index:2;
  }

  .container.active .sign-in{
    transform:translateX(100%);
  }
  
  .sign-up{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.active .sign-up{
    transform: translateX(100%);
    opacity: 1;
    z-index:5;
    animation: move 0.6s;
  }

  @keyframes move{
    0%, 49.99%{
      opacity: 0;
      z-index: 1;
    }
    50%, 100%{
      opacity: 1;
      z-index:5;
    }
  }

  .toggle-container{
    position: absolute;
    top:0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 0 150px 100px 0;
    z-index: 1000;
  }

  .container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 150px 0 0 100px;

  }

  .toggle{
    background-color: #512da8;
    height: 100%;
    color: #fff;
    position: relative;
    left: -100%;
    position: relative;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
  }

  .container.active .toggle{
    transform: translateX(50%);
  }

  .toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
  }

  .toggle-left{
    transform: translateX(-200%);
  }

  .container.active .toggle-left{
    transform: translateX(0);
  }
  .toggle-right{
    right: 0;
    transform: translateX(0);
  }
  .container.active .toggle-right{
    transform: translateX(200%);
  }
</style>

<div class = "container" id="container">
  <div class = "form-container sign-up"> 
    <form>
      <h1>Create Account</h1>
        <span>use your email for registration</span>
        <input type="text" placeholder = "Put here your name">
        <input type = "email" placeholder = "Put here youre email">
        <input type = "password" placeholder = "Put here youre password">
        <button>Sign Up</button>
    </form>
  <div>
  <div class = "form-container sign-in"> 
  <form>
    <h1>Sign In</h1>
      <span>use your email and password to login</span>
      <input type = "email" placeholder = "Put here youre email">
      <input type = "password" placeholder = "Put here youre password">
      <a href="#">Forgot Your Password?</a>
      <button>Sign In</button>
  </form>
<div>
</div>
<div class="toggle-container">
  <div class="toggle">
    <div class="toggle-panel toggle-left">
      <h1>Welcome Back!</h1>
      <p>Enter your personal details to use all of site features</p>
      <button class="hidden" id ="login">Sign In</button>
    </div>
    <div class="toggle-panel toggle-right">
      <h1>Welcome Back!</h1>
      <p>Register with your personal details to use all of site features</p>
      <button class="hidden" id ="register">Sign In</button>
    </div>
  </div>
</div>
</body>
</div>
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
                this.IsLoggedIn = this.CheckLogin("");
                console.log(this.IsLoggedIn);
                if(this.IsLoggedIn == 1){
                  this.ChangePageEvent("myGames");
                }
            }

        });

        //animatie voor de login en sign up:
        this.container= this.shadow.getElementById("container");
        this.registerBtn = this.shadow.getElementById("register");
        this.loginbtn = this.shadow.getElementById("login");

        this.registerBtn.addEventListener("click", ()=>{
          this.container.classList.add("active");
        });

        this.loginBtn.addEventListener("click", ()=>{
          this.container.classList.remove("active");
        });

      }
      CheckLogin(str) {
          let modus;
          if(str ==""){
            modus = 0;
          }
          else{
            modus = 1;
          }
          str += "&modus=" + modus;
            const xhttp = new XMLHttpRequest();
            xhttp.addEventListener("load", ()=> {
                console.log(xhttp.responseText);
                //We moeten nu dit nog aanpassen dat er als er een andere user wilt inloggen
                  this.ChangePageEvent("myGames");

            });
            xhttp.open("GET", "login.php?"+str);
            xhttp.send();
            console.log(xhttp);
          }
          ChangePageEvent(id){
            this.dispatchEvent(new CustomEvent("ChangePageEvent", {
                bubbles: true,
                composed: true,
                detail: id
            }))
        }
          
}


customElements.define('login-comp', app);





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


