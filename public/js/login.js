// function to handle login of users
const handleLogin = () => {
    // student form
    const studentForm = document.querySelector('form.student-form');
    studentForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        try {
            // assign user details to variables
            let email = studentForm.email.value;
            let password = studentForm.password.value;

            // get error elements
            const emailError = studentForm.querySelector('.student .email .error.email-error');
            const passwordError = studentForm.querySelector('.student .password .error.password-error');

            // assign error elements values to null after every form submittion
            emailError.innerHTML = '';
            passwordError.innerHTML = '';

            // send user details to backend for processing
            const res = await fetch('/login_student', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            console.log(data)

            if (data.user) {

                location.assign('/profile.html');
            }

            if (data.errors) {
                emailError.innerHTML = `${data.errors.email}`;
                passwordError.innerHTML = `${data.errors.password}`;
            }

        } catch (error) {
            console.log(error)
        }
    })

    // facilitator form
    const facilitatorForm = document.querySelector('form.facilitator-form');
    facilitatorForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        try {
            // assign user details to variables
            let email = facilitatorForm.email.value;
            let password = facilitatorForm.password.value;

            // get error elements
            const emailError = facilitatorForm.querySelector('.facilitator .email .error.email-error');
            const passwordError = facilitatorForm.querySelector('.facilitator .password .error.password-error');

            // assign error elements values to null after every form submittion
            emailError.innerHTML = '';
            passwordError.innerHTML = '';

            // send user details to backend for processing
            const res = await fetch('/login_facilitator', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            console.log(data)

            if (data.user) {

                location.assign('/profile.html');
            }

            if (data.errors) {
                emailError.innerHTML = `${data.errors.email}`;
                passwordError.innerHTML = `${data.errors.password}`;
            }

        } catch (error) {
            console.log(error)
        }
    })


}

handleLogin();