import aiosmtplib
from pathlib import Path
from email.mime.text import MIMEText
from jinja2 import Template
from app.config import Config



async def send_mail(receiver_email, original_subject, text):
    with open(Path(Config.EMAIL_TEMPLATES_DIR) / "base.html") as f:
        template_str = f.read()

    subject = 'Task manager - ' + original_subject
    html = Template(template_str).render(header=subject, body=text)
    msg = MIMEText(html, 'html')
    msg['From'] = Config.Mail.EMAIL
    msg['To'] = receiver_email
    msg['Subject'] = subject

    await aiosmtplib.send(
        msg,
        hostname=Config.Mail.SMTP_SERVER,
        port=Config.Mail.SMTP_PORT,
        username=Config.Mail.USERNAME,
        password=Config.Mail.PASSWORD
    )


async def send_mails(receiver_emails, subject, text):
    for receiver_email in receiver_emails:
        await send_mail(receiver_email, subject, text)
