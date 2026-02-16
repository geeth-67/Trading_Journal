const API_URL = "http://127.0.0.1:8000";

// 1. Handle Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop page from reloading
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                document.getElementById("message").innerText = "Registration Successful! Redirecting...";
                setTimeout(() => window.location.href = "login.html", 1500);
            } else {
                const data = await response.json();
                document.getElementById("message").innerText = "Error: " + data.detail;
            }
        } catch (error) {
            document.getElementById("message").innerText = "Connection failed.";
        }
    });
}

// 2. Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Save the wristband (Token) in the browser's pocket
                localStorage.setItem("token", data.access_token);
                document.getElementById("message").innerText = "Login Successful!";
                setTimeout(() => window.location.href = "dashboard.html", 1000); // Redirect to Dashboard
            } else {
                document.getElementById("message").innerText = "Invalid credentials.";
            }
        } catch (error) {
             document.getElementById("message").innerText = "Connection failed.";
        }
    });
}

// ... existing code ...

// 3. Handle Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        // Throw away the ID Card
        localStorage.removeItem("token");
        // Go back to login page
        window.location.href = "login.html";
    });
}
// 4. Handle Forgot Password
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const message = document.getElementById("message");

        try {
            message.innerText = "Sending...";
            
            // Call the API
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            
            if (response.ok) {
                message.innerText = data.message;
                
                // 🕵️‍♂️ DEBUG TRICK: Show the token so we can test without checking email
                if (data.debug_token) {
                    console.log("DEBUG TOKEN:", data.debug_token);
                    message.innerText += " (Redirecting to Reset Page in 3s...)";
                    
                    // AUTOMATION: Go directly to the reset page! 🚀
                    setTimeout(() => {
                        window.location.href = `reset_password.html?token=${data.debug_token}`;
                    }, 3000);
                }
            } else {
                message.innerText = "Error: " + data.detail;
            }
        } catch (error) {
            message.innerText = "Connection failed.";
        }
    });
}

// 5. Handle Reset Password
const resetPasswordForm = document.getElementById("resetPasswordForm");
if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // 1. Get the Token from the URL (Browser Bar)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        
        const new_password = document.getElementById("new_password").value;
        const message = document.getElementById("message");

        if (!token) {
            message.innerText = "Error: Missing reset token in URL.";
            return;
        }

        try {
            message.innerText = "Resetting...";
            // 2. Send Token + New Password to Backend
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, new_password }),
            });

            const data = await response.json();
            
            if (response.ok) {
                message.innerText = "Password Reset Successful!";
                // Show the "Go to Login" link
                const loginLink = document.getElementById("loginLink");
                if (loginLink) loginLink.style.display = "block";
                
                // Extra Automation: Go to login after 2 seconds
                setTimeout(() => {
                   window.location.href = "login.html"; 
                }, 2000);
            } else {
                message.innerText = "Error: " + data.detail;
            }
        } catch (error) {
            message.innerText = "Connection failed.";
        }
    });
}