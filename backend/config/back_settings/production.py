import os
from datetime import timedelta
from pathlib import Path

import environ
# from config.logging import *
from config.back_settings.base import *

env = environ.Env()
environ.Env.read_env()

ENVIRONMENT = env

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

DOMAIN = os.environ.get('DOMAIN')

ALLOWED_HOSTS = ['*']

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')

if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

DATABASES = {
    'default': env.db('DATABASE_URL'),
}
DATABASES['default']['ATOMIC_REQUESTS'] = True

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

BT_ENVIRONMENT = os.environ.get('BT_ENVIRONMENT')
BT_MERCHANT_ID = os.environ.get('BT_MERCHANT_ID')
BT_PUBLIC_KEY = os.environ.get('BT_PUBLIC_KEY')
BT_PRIVATE_KEY = os.environ.get('BT_PRIVATE_KEY')

DEFAULT_FROM_EMAIL = 'Cinfacol - Academia de Software <cinfacol@gmail.com>'
EMAIL_BACKEND = env('EMAIL_BACKEND')
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_USE_TLS = env('EMAIL_USE_TLS')
