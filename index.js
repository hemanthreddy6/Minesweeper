document.getElementById("signInText").addEventListener("click",function(e){
    signin();
});
document.getElementById("signUpText").addEventListener("click",function(e){
    signup();
});
function signin()
{
    document.getElementById("signUpForm").style.display="none";
    document.getElementById("signUpForm").style.zIndex=0;
    document.getElementById("signInForm").style.display="flex";
    document.getElementById("signInForm").style.zIndex=1;
}
function signup()
{
    document.getElementById("signUpForm").style.display="flex";
    document.getElementById("signUpForm").style.zIndex=1;
    document.getElementById("signInForm").style.display="none";
    document.getElementById("signInForm").style.zIndex=0;
}