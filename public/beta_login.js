window.onload=function () {
    render();
  };
  function render() {
      window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
      recaptchaVerifier.render();
  }
  function phoneAuth() {
    if(document.getElementById('mobile_number').value!=""){
      //get the number
      var number=document.getElementById('mobile_number').value;
      //phone number authentication function of firebase
      //it takes two parameter first one is number,,,second one is recaptcha
      firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
          //s is in lowercase
          window.confirmationResult=confirmationResult;
          coderesult=confirmationResult;
          console.log(coderesult);
          alert("Message sent");
          document.getElementById('mobile').style.display='none';
          document.getElementById('code').style.display = 'block';
      }).catch(function (error) {
          alert(error.message);
      });
    }else{
      alert("Please enter a valid number");
    }
  }
  function codeverify() {
      var code=document.getElementById('verificationCode').value;
      coderesult.confirm(code).then(function (result) {

          location.replace("beta_map");
          var user=result.user;
          console.log(user);
          alert("Welcome, "+firebase.auth().currentUser.phoneNumber+" !")
      }).catch(function (error) {
          alert(error.message);
      });
  }
