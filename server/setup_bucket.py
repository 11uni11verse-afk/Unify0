#!/usr/bin/env python3
"""
Google Cloud Storage Bucket Setup Script
Run this after configuring your credentials to create the bucket
"""

import os
from google.cloud import storage
from google.oauth2 import service_account

def setup_bucket():
    bucket_name = os.getenv("GCS_BUCKET_NAME", "unifyo-news-images")
    credentials_path = os.getenv("GCS_CREDENTIALS_PATH", "credentials.json")

    try:
        # Initialize client
        if os.path.exists(credentials_path):
            credentials = service_account.Credentials.from_service_account_file(credentials_path)
            client = storage.Client(credentials=credentials)
        else:
            client = storage.Client()

        # Check if bucket exists
        try:
            bucket = client.get_bucket(bucket_name)
            print(f"✅ Bucket '{bucket_name}' already exists")
        except:
            # Create bucket
            bucket = client.create_bucket(bucket_name, location="us-central1")
            print(f"✅ Created bucket '{bucket_name}'")

        # Set CORS policy for web access
        cors_policy = [{
            "origin": ["*"],
            "method": ["GET"],
            "responseHeader": ["Content-Type"],
            "maxAgeSeconds": 3600
        }]

        bucket.cors = cors_policy
        bucket.update()
        print("✅ Configured CORS policy for bucket")

        print(f"\n🎉 Google Cloud Storage setup complete!")
        print(f"📍 Bucket: {bucket_name}")
        print(f"🌐 Public URL: https://storage.googleapis.com/{bucket_name}/")

    except Exception as e:
        print(f"❌ Error setting up bucket: {e}")
        print("\n📖 Setup Instructions:")
        print("1. Go to https://console.cloud.google.com/")
        print("2. Create a new project or select existing")
        print("3. Enable Google Cloud Storage API")
        print("4. Create a service account with Storage Admin role")
        print("5. Download the JSON key file")
        print("6. Place it as 'credentials.json' in this directory")
        print("7. Set GCS_BUCKET_NAME in .env file")

if __name__ == "__main__":
    setup_bucket()
