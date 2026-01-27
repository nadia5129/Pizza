
//option to write annonymous function
// document.getElementById("pizza-form").onsubmit = () => {
// function validate(){
//     alert("hello");
// }


document.getElementById("pizza-form").onsubmit = validate;
function validate(){

    clearErrors();

    let isValid = true;

     // first name validation
    let fname = document.getElementById("fname").value.trim();
    if(!fname){
        document.getElementById("err-fname").style.display="block";
        isValid =false;
    }
    //last name validation
      let lname = document.getElementById("lname").value.trim();
    if(!lname){
        document.getElementById("err-lname").style.display="block";
        isValid =false;
    }
    //email validation
       let email = document.getElementById("email").value.trim();
    if(!email){
        document.getElementById("err-email").style.display="block";
        isValid =false;
    }
    return isValid;

}

function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for(let i=0; i<errors.length; i++){
        errors[i].style.display="none";
    }
}







