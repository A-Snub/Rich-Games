/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/

   /*-----------------------------------------*/
  // fb_readError(error)
  // DB read record failed
  // Input:  error message returned from firebase
  /*-----------------------------------------*/
  function fb_readError(error) {
    console.log("There was an error reading the message");
    console.error(error);
    HTML_OUTPUT.innerHTML = error;
}