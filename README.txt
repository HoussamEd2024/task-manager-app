# Setup Instructions

## 1. Backend (Node.js)

### Prerequisites:
- Install [Node.js](https://nodejs.org/)
- Install [Express.js](https://expressjs.com/)
- Install [Firebase SDK](https://firebase.google.com/docs/admin/setup)

### Steps:
1. Clone the repository:
   
   git clone <repository-url>
   cd backend
   

2. Install dependencies:
   bash
   npm install
   

3. Set up Firebase:
   - Configure Firestore and Firebase Admin SDK credentials:
     1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
     2. Enable Firestore: In the Firebase Console, navigate to "Firestore Database" and click "Create Database."
     3. Generate Firebase Admin SDK credentials:
        - Go to Project Settings > Service Accounts.
        - Click "Generate New Private Key" to download the JSON file.
     4. Initialize Firebase Admin SDK in Node.js:
        - Create a `config` folder containing `firebaseAdmin.js` and the JSON credentials file.

        // firebaseAdmin.js
        const admin = require('firebase-admin');
         const serviceAccount = require('./path-to-your-firebase-adminsdk.json');

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });

        const db = admin.firestore();
        module.exports = db;
        

4. Start the server:
   npm start
   

---

## 2. Frontend (Ionic)

### Prerequisites:
- Install [Ionic CLI](https://ionicframework.com/docs/cli) globally:
  
  npm install -g @ionic/cli
  

### Steps:
1. Navigate to the Ionic app directory:
   cd frontend
   

2. Install dependencies:
   npm install
   

3. Serve the application:
   
   ionic serve
   

### Android APK Build:
1. Build the Android APK:
   ionic capacitor build android
   

2. Follow [Ionic Capacitor's documentation](https://capacitorjs.com/docs/android) to configure the APK.

---

## 3. Docker Setup

### Prerequisites:
- Install [Docker](https://www.docker.com/)
- Install [Docker Compose](https://docs.docker.com/compose/)

### Steps:
1. Build and run the container:
   docker-compose up --build
   

2. The backend API will be available at `http://localhost:5000`.

---

## 4. Installing the Android APK

1. Install Android Studio (no further configuration needed).
2. Run the following commands in the terminal:
   ionic build
   npm install @capacitor/android
   npx cap add android
   npx cap open android
   

3. In Android Studio:
   - Click the "Build" tab, then select "Build Bundle(s) / APK(s)" and choose "Build APK(s)."
   - Once the build is complete, click "Locate."
   - Inside the "debug" folder, find the `.apk` file and install it on your phone.

---

## Notes:
- ionic capacitor sync android: Synchronizes the Ionic project’s web assets and plugins with the native Android project.
- ionic capacitor build android: Compiles the Ionic web app, syncs it with the Android project, and builds the native Android app (APK or AAB).

---

## Additional Information

- Project Structure:
  - task-app-backend/: Contains the Node.js and Express app along with Docker setup files.
  - task-app-frontend/: Contains the Ionic app.

- Design Choices:
  - Firebase Firestore was chosen for real-time updates and ease of integration.
  - Docker was used to containerize the backend for simplified deployment.