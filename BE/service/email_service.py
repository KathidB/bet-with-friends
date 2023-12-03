from email.message import EmailMessage
import ssl
import smtplib
import os
import re
from configuration.configuration_manager import ConfigurationManager

configuration = ConfigurationManager.get_instance()

password = configuration.get_config_by_key('smtp.password')
email = configuration.get_config_by_key('smtp.email')

def send_activation_mail(reciver:str):
    directory = os.path.dirname(__file__)
    directory = os.path.abspath(os.path.join(directory, os.pardir))
    file_path = os.path.join(directory, 'resources', 'templates', 'activation', 'index.html')
    with open(file_path, "r", encoding='utf-8') as f:
        body= f.read()
    body = setUrl(body)
    em = EmailMessage()
    em['From'] = email
    em['To'] = reciver
    em['Subject'] = 'Aktywuj swoje konto w portalu Bet With Friends'
    em.add_alternative(body, subtype='html')

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com',465, context=context) as smtp:
        smtp.login(email,password)
        smtp.sendmail(email,reciver,em.as_string())



def setUrl(body:str):
    template = re.compile(r'\(url\)')
    new_url = configuration.get_config_by_key('external.url')
    return template.sub(new_url, body)
