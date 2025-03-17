
# **GradLink 🚀**  

Welcome to **GradLink!** This guide will help you clone, set up, and contribute to the project.  


## **📥 Getting Started**  

Follow these steps to get the project running on your local machine.  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/Ellvius/GradLink.git
cd frontend
```

### **2️⃣ Install Dependencies**  
Make sure **Node.js** (preferably the latest LTS version) is installed. Then, install the required dependencies:  
```sh
npm install
# or
yarn install
# or
pnpm install
```

### **3️⃣ Run the Development Server**  
```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```
Now, open [http://localhost:3000](http://localhost:3000) in your browser to check out the app! 🎉  

### **⚙️ Environment Variables**  
If the project requires environment variables, create a `.env.local` file in the root directory and add them like this:  
```sh
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgres://user:password@host:port/database
```

---

## **🤝 Contribution Guidelines**  

### **🌿 Branching Strategy**  
Please work on a **separate branch** for each feature or bug fix. Use this naming convention:  
- `feature/your-feature-name` → For new features  
- `bugfix/your-bug-description` → For fixing bugs  
- `hotfix/your-fix-name` → For urgent fixes  

Example:  
```sh
git checkout -b feature/user-authentication
```

### **📝 Making Changes & Committing**  
- Keep commits **small and meaningful**.  
- Follow this format for commit messages:  
  ```
  [Type] Brief description of changes
  ```
  Example:  
  ```
  [Feature] Added login functionality with JWT authentication
  ```

### **📌 Raising a Pull Request (PR)**  
1. Ensure your code follows the project’s style and standards.  
2. Before creating a PR, **pull the latest changes** from `main` and resolve conflicts.  
3. Push your branch:  
   ```sh
   git push origin feature/your-feature-name
   ```
4. Create a **Pull Request (PR)** to merge your branch into `main`.  
5. In the PR description, **clearly explain** the changes you made.  

### **🛠 Code Review & Merging**  
- The **admin will review** your PR.  
- If any changes are needed, update your branch and push the changes.  
- Once approved, the **admin will merge the PR** into `main`.  

### **✅ Best Practices**  
✔️ Write clean, maintainable code.  
✔️ Add comments where necessary.  
✔️ Stick to the project’s coding style.  
✔️ Test your code before submitting a PR.  

---

### **🎯 Let’s build something awesome together! 🚀**  
