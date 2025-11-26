#!/usr/bin/env python3
"""
Setup script for Google Cloud Storage configuration for UnifyO News Scraper
"""

import os
import json
import sys
from pathlib import Path

def create_credentials_template():
    """Create a template for Google Cloud credentials"""
    template = {
        "type": "service_account",
        "project_id": "your-project-id",
        "private_key_id": "your-private-key-id",
        "private_key": "-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n",
        "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
        "client_id": "your-client-id",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com"
    }

    credentials_path = Path(__file__).parent / "credentials.json"
    if not credentials_path.exists():
        with open(credentials_path, 'w') as f:
            json.dump(template, f, indent=2)
        print(f"✅ Created credentials template at {credentials_path}")
        print("⚠️  Please replace the template values with your actual Google Cloud credentials")
    else:
        print(f"ℹ️  Credentials file already exists at {credentials_path}")

def create_env_file():
    """Create .env file with required environment variables"""
    env_content = """# Google Cloud Configuration
GCS_BUCKET_NAME=unifyo-news-images
GCS_CREDENTIALS_PATH=credentials.json

# Optional: Override API settings
# NEWS_API_URL=http://localhost:8000
"""

    env_path = Path(__file__).parent / ".env"
    if not env_path.exists():
        with open(env_path, 'w') as f:
            f.write(env_content)
        print(f"✅ Created .env file at {env_path}")
    else:
        print(f"ℹ️  .env file already exists at {env_path}")

def update_requirements():
    """Update requirements.txt with Google Cloud dependencies"""
    requirements_path = Path(__file__).parent / "requirements.txt"
    google_cloud_deps = [
        "google-cloud-storage>=2.7.0",
        "google-auth>=2.17.0"
    ]

    if requirements_path.exists():
        with open(requirements_path, 'r') as f:
            existing = f.read()

        missing_deps = []
        for dep in google_cloud_deps:
            if dep.split('>=')[0] not in existing:
                missing_deps.append(dep)

        if missing_deps:
            with open(requirements_path, 'a') as f:
                f.write('\n# Google Cloud dependencies\n')
                for dep in missing_deps:
                    f.write(f'{dep}\n')
            print("✅ Added Google Cloud dependencies to requirements.txt")
        else:
            print("ℹ️  Google Cloud dependencies already in requirements.txt")
    else:
        with open(requirements_path, 'w') as f:
            f.write("# UnifyO News Scraper Requirements\n")
            for dep in google_cloud_deps:
                f.write(f'{dep}\n')
        print("✅ Created requirements.txt with Google Cloud dependencies")

def create_bucket_setup_script():
    """Create a script to help set up the Google Cloud Storage bucket"""
    setup_script = '''#!/usr/bin/env python3
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

        print(f"\\n🎉 Google Cloud Storage setup complete!")
        print(f"📍 Bucket: {bucket_name}")
        print(f"🌐 Public URL: https://storage.googleapis.com/{bucket_name}/")

    except Exception as e:
        print(f"❌ Error setting up bucket: {e}")
        print("\\n📖 Setup Instructions:")
        print("1. Go to https://console.cloud.google.com/")
        print("2. Create a new project or select existing")
        print("3. Enable Google Cloud Storage API")
        print("4. Create a service account with Storage Admin role")
        print("5. Download the JSON key file")
        print("6. Place it as 'credentials.json' in this directory")
        print("7. Set GCS_BUCKET_NAME in .env file")

if __name__ == "__main__":
    setup_bucket()
'''

    script_path = Path(__file__).parent / "setup_bucket.py"
    with open(script_path, 'w') as f:
        f.write(setup_script)

    # Make executable on Unix-like systems
    try:
        os.chmod(script_path, 0o755)
    except:
        pass

    print(f"✅ Created bucket setup script at {script_path}")

def main():
    """Main setup function"""
    print("🚀 Setting up Google Cloud Storage for UnifyO News Scraper")
    print("=" * 60)

    create_credentials_template()
    create_env_file()
    update_requirements()
    create_bucket_setup_script()

    print("\\n" + "=" * 60)
    print("📋 Next Steps:")
    print("1. Get Google Cloud credentials from https://console.cloud.google.com/")
    print("2. Replace template values in credentials.json")
    print("3. Run: python setup_bucket.py")
    print("4. Start the server: python main.py")
    print("\\n📚 Documentation: https://cloud.google.com/storage/docs/quickstart")
    print("=" * 60)

if __name__ == "__main__":
    main()
