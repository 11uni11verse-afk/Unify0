/**
 * Google Apps Script for Waitlist Form Backend
 * 
 * Instructions:
 * 1. Go to your Google Sheet
 * 2. Click Extensions → Apps Script
 * 3. Paste this code
 * 4. Save and deploy as Web App
 * 5. Copy the Web App URL and use it in your .env file
 */

function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Append the data as a new row
    // Order: Timestamp, Full Name, Email, Current Country, Dream Destination, Field of Study, Current Status, Expectations, Source
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
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Log error for debugging
    Logger.log('Error in doPost: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Test function to verify the setup
 * Run this from the Apps Script editor to test if everything works
 */
function test() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test User',
    email: 'test@example.com',
    currentCountry: 'India',
    dreamDestination: 'UK',
    fieldOfStudy: 'Computer Science',
    currentStatus: 'planning',
    expectations: 'This is a test entry',
    source: 'test'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}


















