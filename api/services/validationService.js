module.exports = {
    nameValidation:(name)=>{
     return /^[a-z ,.'-]+$/i.test(name);


    },
    numericValidation:(contact)=>{
        return /^\d{10}$/.test(contact);
    },
    emailValidation:(email)=>{
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
}