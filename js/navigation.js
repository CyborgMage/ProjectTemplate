
// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

  function showCarDetails(){

if(validatePersonalDetails()){    
 $("#dvPersonalDetails").hide();
 $("#personalLink").removeClass("active");
 $("#dvCarDetails").show();
 $("#carLink").addClass("active");
 $("#dvQuoteDetails").hide();
 $("#quoteLink").removeClass("active");
 $("#dvPersonalDetailsAlert").hide();
}
else
{
   var errors=""
   var errorBlock=$("#dvPersonalDetailsAlert");
   if (!validateName())
   {
      errors=errors+"Please enter your name.\n";
   } 
   if (!validateAge())
   {
      errors=errors+"Please enter your age as a number.\n";
   } 
   if (!validateGender())
   {
      errors=errors+"Please select your gender.\n";
   } 
   if (!validateTown())
   {
      errors=errors+"Please enter the town you currently live in.\n";
   } 
   if (!validateMail())
   {
      errors=errors+"Please enter your eMail address.\n";
   }  
   errorBlock.html(errors);
   errorBlock.show();
 }
};

function validatePersonalDetails() {
return validateName()&& validateAge()&& validateGender()&& validateTown()&& validateMail();
}

function showPersonalDetails() {
     $("#dvPersonalDetails").show();
     $("#personalLink").addClass("active");
     $("#dvCarDetails").hide();
     $("#carLink").removeClass("active");
     $("#dvCarDetails").hide();
     $("#quoteLink").removeClass("active");
     $("#dvCarDetailsAlert").hide;
}

  function showQuoteDetails() {

    if(validateCarDetails()){
      var age= $("#txtAge").val();
      var yearsNoClaims= $("#noclaims option:selected").val();
      var costOfCar= $("#txtValue").val();
      var carStorage= $("#storage option:selected").val();
      var gender= $("#dvPersonalDetails input:radio[name=genderInput]:checked").val();
      $.ajax({
        type: "GET",
        url: "http://lit-wrkexp-01.lit.lmig.com:8080/api/CalculateRates",
        data: {gender:gender, age:age, costOfCar:costOfCar, carStorage:carStorage, noClaimsBonus:yearsNoClaims}
        }).done(function(msg){
        $("#quoteLabel").text(msg.result.toFixed(2));

        });
    $("#dvPersonalDetails").hide();
    $("#personalLink").removeClass("active");
    $("#dvCarDetails").hide();
    $("#carLink").removeClass("active");
    $("#dvQuoteDetails").show();
    $("#quoteLink").addClass("active");
    $("#dvCarDetailsAlert").hide();
    }
  else {var errors=""
   var errorBlock=$("#dvCarDetailsAlert");
    if (!validateManufacture())
    {
      errors=errors+"Please select your car's manufacturer.\n";
    } 
    if (!validateModel())
    {
      errors=errors+"Please enter your car's model.\n";
    } 
    if (!validateCarAge())
    {
      errors=errors+"Please enter your car's age as a number.\n";
    } 
    if (!validateEngine())
    {
      errors=errors+"Please enter the size of your car's engine.\n";
    } 
    if (!validateStorage())
    {
      errors=errors+"Please select where you store your car.\n";
    } 
    if (!validateValue()) 
    {
      errors=errors+"Please enter the approximate value of your car.\n";
    }
   errorBlock.html(errors);
   errorBlock.show();
  
  }
}

  function validateCarDetails() {
    return validateManufacture()&& validateModel()&& validateCarAge()&& validateEngine()&& validateStorage()&& validateValue();
  }

  function getQuote() {

    // Perform validation to test that all data has been entered
}

 function validateName()  {

  return $("#txtName").val() != "";
}  

 function validateAge()  {

 return $("#txtAge").val() != "";
} 

 function validateGender()  {

 return $("input[name=genderInput]:checked","#personalForm").val()!=undefined;
} 

 function validateTown() {

 return $("#txtTown").val() != "";
 }  

 function validateMail() {

 return $("#txtMail").val() != "";
}

function validateManufacture() {
  return $("#manufacturer :selected").text() != "Select";
}

function validateModel() {
  return $("#txtModel").val() != "";
}

function validateCarAge() {
  return $("#txtCarAge").val() != "";
}

function validateEngine() {
  return $("#txtEngine").val() != "";
}

function validateStorage() {
  return $("#storage :selected").text() != "Select";
}

function validateValue() {
  return $("#txtVaue").val() != "";
}

/*    if (/* Page is Valid /)
    {

      // Get the values from the page elements that you need to create your JSON

      $.ajax({
          type: "GET",
          url: "http://localhost:53753/api/rating/CalculateRates",
          data: { }
        }).done(function(msg) {
          // Put the return value into Label created on quote details
          // Hide the Car Details section
          // Display the quote details page
      })
  }*/

//################################# Helper Functions - look at these when validating and changing section #########################################

  // Use this function to "Reset" the form and hide all 3 error sections whenever you make a section transition
  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  // This function will control the top navigation and set the active tab when you make a section transition
  // You will need to call it and pass in the tab that needs to be made active
  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }
