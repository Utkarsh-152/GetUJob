# GetUJob Backend

This is the backend for the GetUJob platform, built with Node.js, Express, and MongoDB.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the root directory with the following variables:
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=10d
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

3.  **Run the Server**
    - Development (with hot reload):
      ```bash
      npm run dev
      ```
    - Production:
      ```bash
      npm start
      ```

## API Documentation

### Employer Endpoints

#### 1. Register Employer
Create a new employer account.

- **URL**: `https://<backend_url>/api/employer/register`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

**Form Data Fields:**

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullname` | String | Yes | Full name of the employer representative |
| `username` | String | Yes | Unique username |
| `email` | String | Yes | Personal email address |
| `password` | String | Yes | Account password |
| `companyName` | String | Yes | Name of the company |
| `companyEmail` | String | Yes | Official company email |
| `companyWebsite` | String | No | URL of the company website |
| `profilePhoto` | File | No | Profile picture (image file) |

  {
    "statusCode": 201,
    "data": {
      "user": {
        "_id": "...",
        "username": "...",
        "email": "...",
        "companyName": "...",
        ...
      }
    },
    "message": "Employer registered Successfully",
    "success": true
  }
  ```

**Error Response:**
- **Code**: 400 Bad Request
  - Missing required fields.
- **Code**: 409 Conflict
  - User with email or username already exists.
