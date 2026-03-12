export function validateForm(data){
    console.log("server side validation happens here");
    console.log(data);

    /* data object
    {
    fname: 'nadia',
    lname: 'i',
    email: 'nadia@gmail.com',
    method: 'pickup',
    toppings: [ 'pepperoni', 'mushrooms', 'olives', 'spinach' ],
    size: 'small',
    comments: ''
    }
    */

    //Store error message in an array called errors
    let errors = [];

    //validate first name
    if(data.fname.trim() === ''){
        errors.push("First name is required");
    }
    //validate last name
     if(data.lname.trim() === ''){
        errors.push("Last name is required");
    }
    //validate email
     if(data.email.trim() === ''){
        errors.push("Email is required");
    }
   //validate method
   const validMethods = ['pickup', 'delivery'];
   if(!validMethods.includes(data.method)){
    errors.push("Method must be pickup or delivery");
   }

//validate size 
const validSizes = ['small', 'medium', 'large'];
if(!validSizes.includes(data.size)){
    errors.push("size must be small, medium, or large");
}
  
    console.log(errors);
    return{
        isValid: errors.length === 0,
        errors 
    }
}

