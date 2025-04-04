### **Social Media Analytics Frontend**  

This is a **React-based social media analytics web application** that consumes a test server API to analyze **users, posts, and comments**.  

---

## **🚀 Features**  

- **Feed Page** → Displays latest posts from users.  
- **Top Users Page** → Lists users with high engagement.  
- **Trending Posts Page** → Shows most discussed posts.  

---

## **⚙️ Installation & Setup**  

1️⃣ **Clone the Repository:**  
```bash
git clone https://github.com/Tusharedith/NewRepo.git  
cd NewRepo  
```

2️⃣ **Install Dependencies:**  
```bash
npm install  
```

3️⃣ **Start the Development Server:**  
```bash
npm start  
```
Runs the app at **http://localhost:3000**  

---

## **💼 API Integration**  

The app connects to a test server for fetching data. Ensure you have the correct **API base URL** configured in your environment file (`.env`).  

- **Users API:** `GET /evaluation-service/users`  
- **User Posts API:** `GET /evaluation-service/users/:userId/posts`  
- **Post Comments API:** `GET /evaluation-service/posts/:postId/comments`  

---

## **📌 Deployment**  

To deploy the app, run:  
```bash
npm run build  
```
This will generate an optimized production build inside the **`build/`** folder.  

---

## **🛠️ Contributing**  

1. Fork the repo  
2. Create a new branch: `git checkout -b feature-branch`  
3. Commit changes: `git commit -m "Added new feature"`  
4. Push to GitHub: `git push origin feature-branch`  
5. Open a **Pull Request**  

---
