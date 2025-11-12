(function() {
  emailjs.init({
    publicKey: "kx0S0MVlBLS5w45Wr",
  });
})();

const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



window.onload = () => {
    let form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
 
    e.preventDefault();
    
    
    let name = document.getElementById('name').value;
    let message = document.getElementById('message').value;
    let mail = document.getElementById('email').value;
    
   
    if(!name){
        Swal.fire({
              icon: 'error',
                title: 'Please enter your name',
            });
    } else if(!mail){
         Swal.fire({
              icon: 'error',
                title: 'Email Address is required',
            });
    } else if(!mailRegex.test(mail)){
       Swal.fire({
         icon: 'error',
            title: 'Invalid Email Address',
         });
    } else if(!message){
            Swal.fire({
              icon: 'error',
                title: 'Message is required',
            });
    } else {
        
        Swal.fire({
          title: 'Sending Message...',
          text: 'Please wait while we send your message',
         
        });
        
        emailjs.sendForm('service_v3ys3i9', 'template_v21wawn', form)
          .then(() => {
            console.log('SUCCESS!');
            
            
            Swal.fire({
              icon: 'success',
              title: 'Message Sent!',
              text: 'Thank you for contacting us! We\'ll get back to you soon.',
              confirmButtonText: 'Done',
              confirmButtonColor: '#10b981', 
            
            });
            
           
            form.reset();
            
          }, (error) => {
            
            
            Swal.fire({
              icon: 'error',
              title: 'Oops... Something went wrong!',
              text: 'Failed to send your message. Please try again or contact us directly.',
              confirmButtonText: 'Try Again',
              confirmButtonColor: '#ef4444', 
              footer: '<a href="mailto:contact@abqarstore.com">Or email us directly</a>'
            });
          });
    }
  });

};


