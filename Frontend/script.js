const firebaseConfig = {
    apiKey: "AIzaSyB9x65AlX0J10jFOJwEZTyD5XiQ22PcDP0",
    authDomain: "math-quiz-772ba.firebaseapp.com",
    databaseURL: "https://math-quiz-772ba-default-rtdb.firebaseio.com",
    projectId: "math-quiz-772ba",
    storageBucket: "math-quiz-772ba.appspot.com",
    messagingSenderId: "337652649137",
    appId: "1:337652649137:web:e34abbfaaa9797c583a690",
    measurementId: "G-BXH5WJKNEZ"
};


firebase.initializeApp(firebaseConfig);



function toggleSignInWIthPopup() {
    if (!firebase.auth().currentUser) {
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
            if (result.credential) {
                let token = result.credential.accessToken;
                console.log(`Token: ${token}`);
            } else {
                console.log(`Token: Not Found`);
            }
            let user = result.user;
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
            } else {
                console.error(error);
            }
        });
    } else {
        firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in').disabled = true;

}

const initApp = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userDetailsString =
                `{"displayName": "${user.displayName}",
                "email": "${user.email}",
                "emailVerified": "${user.emailVerified}",
                "isAnonymous": "${user.isAnonymous}",
                "uid": "${user.uid}"}`
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-sign-in').style.textAlign = 'center';
            

            
            document.getElementById('quickstart-sign-in').style.backgroundColor = 'hsl(0, 100%, 30%)'
            document.querySelector('.start').style.display='block'
            // document.getElementsByClass('start').style.display='block'
            // document.getElementById('quickstart-sign-in').style.padding = '1rem'
            // document.getElementById('quickstart-sign-in').style.display='flex'
            // document.getElementById('quickstart-sign-in').style.justifyContent = 'center'
            

            const userDetails = JSON.parse(userDetailsString);
            const providerData = user.providerData;
            console.log(userDetails);
            console.log(providerData);
            console.log(`${user.photoURL}`);

            const username = (user.email).replace('@gmail.com', '');


            document.querySelector("#user-avatar").src = user.photoURL;

            const content = document.querySelector(".content");
            content.innerHTML = `
        <h1>Hi, ${user.displayName}!</h1>
            <p><span>DisplayName</span>: ${user.displayName}</p>
            <p><span>email ID</span>: ${user.email}</p>`;
        } else {
            console.log("Not Signed In");
            document.getElementById('quickstart-sign-in').innerHTML = `<p>Sign in with google</p> <span id="google-icon-span">

            <svg xmlns="http://www.w3.org/2000/svg" width="24.43" height="25" preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262" id="google-icon">
                <path fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                <path fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                <path fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" />
                <path fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
            </svg>`;
            document.getElementById('quickstart-sign-in').style.backgroundColor = '#222';
            document.querySelector(".content").innerHTML = `<h2>Hi there! Get ready for an amazing quiz</h2>`;
            document.querySelector("#user-avatar").src = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Manishdutta`
            document.querySelector('.start').style.display='none'
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });

    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignInWIthPopup, false);
}

window.onload = () => {
    initApp();
};
