import httpx
from backend.app.core.config import settings

class EmailService:

    def __init__(self):
        self.api_key = settings.BREVO_API_KEY
        self.sender_email = settings.SENDER_EMAIL
        self.api_url = "https://api.brevo.com/v3/smtp/email"

    async def send_reset_email(self, to_email: str, reset_link: str):

        headers = {
            "accept": "application/json",
            "api-key": self.api_key,
            "content-type": "application/json"
        }

        payload = {
            "sender": {"email": self.sender_email},
            "to": [{"email": to_email}],
            "subject": "Password Reset Request",
            "htmlContent": f"""
                <html>
                    <body>
                        <h1>Reset Your Password</h1>
                        <p>Click the link below to reset your password:</p>
                        <a href="{reset_link}">Reset Password</a>
                        <p>If you didn't ask for this, ignore this email.</p>
                    </body>
                </html>
            """
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(self.api_url, json=payload, headers=headers)
            
            if response.status_code != 201:
                print(f"Error sending email: {response.text}")
                return False
            return True

email_service = EmailService()
