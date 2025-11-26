# 📊 Google Sheets Waitlist Backend Setup Guide

This guide will help you connect your waitlist form to Google Sheets to automatically save all signups.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "UnifyO Waitlist" or "Study Link World Waitlist"
4. Set up the header row in Row 1 with these columns:
   ```
   Timestamp | Full Name | Email | Current Country | Dream Destination | Field of Study | Current Status | Expectations | Source
   ```

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste the following code:

function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Append the data as a new row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.email || '',
      data.currentCountry || '',
      data.dreamDestination || '',
      data.fieldOfStudy || '',
      data.currentStatus || '',
      data.expectations || '',
      data.source || 'website_waitlist'
    ]);
    
    // Get position in waitlist
    const position = sheet.getLastRow() - 1; // Subtract header row
    
    // Optional: Send confirmation email
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: "Welcome to UnifyO Waitlist! 🎉",
        htmlBody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3B82F6, #14B8A6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1>🎉 You're on the UnifyO Waitlist!</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p>Hi ${data.fullName},</p>
              <p>Thank you for joining UnifyO! We're excited to have you as part of our community.</p>
              <div style="background: white; padding: 20px; border-left: 4px solid #3B82F6; margin: 20px 0;">
                <strong>Your Position:</strong> #${position}<br>
                <strong>Total Waitlist:</strong> ${position} students
              </div>
              <h3>What Happens Next?</h3>
              <ul>
                <li>✓ We'll email you when we launch (estimated: February 2025)</li>
                <li>✓ Early access for first 5,000 users</li>
                <li>✓ Exclusive launch benefits</li>
              </ul>
              <h3>While You Wait:</h3>
              <ul>
                <li>📱 Follow us on <a href="https://www.instagram.com/uni_fyo">Instagram</a></li>
                <li>💼 Connect on <a href="https://www.linkedin.com/company/uni-verse11/">LinkedIn</a></li>
                <li>🐦 Follow on <a href="https://x.com/Uni_fyO">Twitter</a></li>
              </ul>
              <p>Have questions? Just reply to this email!</p>
              <p>Best regards,<br><strong>The UnifyO Team</strong></p>
            </div>
            <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
              <p>© 2025 UnifyO. All rights reserved.</p>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.log('Email sending failed (optional):', emailError);
      // Continue even if email fails
    }
    
    // Return success response with position
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      position: position,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Return error response
    console.error('Error in doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify setup
function test() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test User',
    email: 'test@example.com',
    currentCountry: 'India',
    dreamDestination: 'UK',
    fieldOfStudy: 'Computer Science',
    currentStatus: 'planning',
    expectations: 'Test entry',
    source: 'test'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

4. Click **Save** (💾 icon) or press `Ctrl+S` / `Cmd+S`
5. Give your project a name (e.g., "Waitlist Handler")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Waitlist Form Handler" (optional)
   - **Execute as**: **Me** (your email address)
   - **Who has access**: **Anyone** (important for public forms)
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts:
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
6. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```
   ⚠️ **Important**: Save this URL - you'll need it in the next step!

## Step 4: Configure Your Website

### Option A: Using Environment Variable (Recommended)

1. Create a `.env` file in the root of your project:
   ```bash
   VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
   ```
   Replace `YOUR_ACTUAL_SCRIPT_ID` with the script ID from Step 3.

2. Restart your development server:
   ```bash
   npm run dev
   ```

### Option B: Direct Code Update

If you prefer not to use environment variables, you can directly edit `src/components/WaitlistForm.tsx`:

Find this line:
```typescript
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL || 
  'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

Replace it with:
```typescript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
```

## Step 5: Test the Integration

1. Make sure your development server is running
2. Fill out the waitlist form on your website
3. Submit the form
4. Check your Google Sheet - you should see a new row with the submitted data!

## Troubleshooting

### Form shows success but data doesn't appear in sheet
- Verify the script URL is correct
- Check that the Web App is deployed with "Anyone" access
- Check the Apps Script execution logs: **Executions** → View logs
- Make sure the header row in your sheet matches the expected format

### Getting CORS errors
- This is normal when using `no-cors` mode
- The data is still being saved even if you see CORS warnings
- Check your Google Sheet to verify data is being saved

### Authorization errors
- Make sure you authorized the script when deploying
- Try redeploying and re-authorizing

### Script not executing
- Check **Executions** in Apps Script to see error messages
- Make sure the script is saved and deployed
- Verify the `doPost` function exists and is named correctly

## Bonus: Email Notifications for New Signups

Add this function to get notified when someone joins:

```javascript
function sendAdminNotification(data, position) {
  const adminEmail = '11astitvajha@gmail.com'; // Your email
  
  MailApp.sendEmail({
    to: adminEmail,
    subject: `New Waitlist Signup #${position} - ${data.fullName}`,
    htmlBody: `
      <h2>New Waitlist Signup!</h2>
      <p><strong>Position:</strong> #${position}</p>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Country:</strong> ${data.currentCountry}</p>
      <p><strong>Destination:</strong> ${data.dreamDestination}</p>
      <p><strong>Field:</strong> ${data.fieldOfStudy}</p>
      <p><strong>Status:</strong> ${data.currentStatus}</p>
      <p><strong>Expectations:</strong> ${data.expectations}</p>
      <p><a href="https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}">View Sheet</a></p>
    `
  });
}
```

Then call it in `doPost` after appending the row:
```javascript
sendAdminNotification(data, position);
```

## Security Notes

- The Web App URL is publicly accessible - anyone with the URL can submit data
- Consider adding basic validation or rate limiting in the Apps Script
- For production, consider adding a simple API key check
- Email sending has limits: 100 emails/day for free Gmail accounts

## Next Steps

- Set up email notifications when new signups arrive
- Add data validation in the Apps Script
- Create charts and analytics in Google Sheets
- Set up automated backups

## Additional Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Web Apps Guide](https://developers.google.com/apps-script/guides/web)

---

**Need Help?** Check the Apps Script execution logs or review the code in `src/components/WaitlistForm.tsx`


















