# Flexternship Todo Application

## Project Title & Description
The **Flexternship Todo Application** is a full-stack task management application designed to help users organize their daily tasks efficiently. It includes features like adding, editing, deleting, and marking tasks as completed, ensuring better productivity and time management. The backend is built using **ASP.NET Core** with **Entity Framework**, while the frontend is developed using **Next.js** for a responsive and interactive user interface.

---

## Installation Instructions

### Backend Setup (TodoApi)
1. Clone the repository:
    ```bash
    git clone https://github.com/gh-kaja-kumar/todo_Kaja.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd flexternship-todo/TodoApi
    ```
3. Restore NuGet packages:
    ```bash
    dotnet restore
    ```
4. Apply migrations and seed data:
    ```bash
    dotnet ef database update
    ```
5. Run the backend server:
    ```bash
    dotnet run
    ```
    The backend will be available at `http://localhost:5025` (change the port if yours is different).

---

### Frontend Setup (todo-frontend)
1. Navigate to the frontend directory:
    ```bash
    cd flexternship-todo/todo-frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

> ℹ️ Note: All API URLs in the frontend are currently hardcoded to `http://localhost:5025/api`.  
> If your backend runs on a **different port**, replace the port number in those URLs accordingly.  
> (In most cases, the default port `5025` will remain the same.)

---

## How to Run the Project

1. Start the backend server by running `dotnet run` in the [TodoApi] directory.
2. Start the frontend server by running `npm run dev` in the [todo-frontend] directory.
3. Open your browser and navigate to `http://localhost:3000` to interact with the application.

---

## Features

1. **Add New Tasks**  
   Users can create tasks with title, description, due date, priority, and category.

2. **View Tasks**  
   Tasks are displayed in a user-friendly list with filtering and progress tracking.

3. **Edit & Delete Tasks**  
   Users can edit or delete their own tasks. Admins can manage all tasks.

4. **Mark Tasks as Completed**  
   Users can track task completion via checkboxes.

5. **Filter & Sort Tasks**  
   Filter tasks by:
   - **Status** (completed, incomplete, overdue)
   - **Priority** (Low, Normal, High)
   - **Category** (e.g., Work, Personal)  
   Tasks are also sorted by **Due Date** by default.

6. **Overdue Highlight**  
   Overdue tasks are visually marked with a red “Overdue” label for quick recognition.

7. **Prioritize Tasks**  
   Toggle between priority levels using the star icon.

8. **Multi-User Support**  
   Each user has their own tasks. JWT-based login ensures only authenticated users access their data.

9. **Admin Mode**  
   Admins can:
   - View and manage tasks of any user via `/admin/{userId}`
   - Edit or delete any task (without restrictions)
   - Assign tasks to other users

10. **Authentication (JWT)**  
    Secure login and logout with JSON Web Tokens.

11. **Responsive UI**  
    Clean, mobile-friendly layout using Tailwind CSS.

12. **Persistent Storage**  
    All data is stored in a SQLite database using a .NET backend.

---

## Usage

Users can interact with the application by:

1. **Register / Login**  
   Sign up or log in to access your personalized task dashboard. Auth is handled via JWT.

2. **Create a Task**  
   Click on "+ Add New Task" and enter task details like title, due date, category, and priority.

3. **View Tasks**  
   Your tasks are listed and sorted by due date with clear status and priority indicators.

4. **Filter by Status, Category, or Priority**  
   Use the filter bar to quickly find tasks based on your preferences.

5. **Track Completion**  
   Mark tasks as completed using the checkbox. Progress is displayed via a progress bar.

6. **Edit & Delete Tasks**  
   You can edit or delete your own tasks anytime. Admins can manage tasks for any user.

7. **Overdue Tasks**  
   Tasks past their due date are automatically labeled as **Overdue** for visibility.

8. **Admin Actions**  
   Admins can access `/admin/{userId}` to manage another user’s tasks fully.

9. **Logout**  
   End your session securely using the logout button, which clears your token from local storage.

---

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: ASP.NET Core, Entity Framework Core
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)

---

## How GitHub Copilot Was Used

GitHub Copilot was instrumental in the development process by:
- Auto-generating boilerplate code for controllers, models, and components.
- Suggesting efficient function implementations for task management and filtering.
- Improving code readability and naming conventions.
- Speeding up repetitive tasks like creating state management logic and API endpoints.

---

## Project Structure

### Backend (`TodoApi`)
```plaintext
TodoApi/
├── .github/                # GitHub workflows and configurations
├── Controllers/            # API controllers
│   ├── UsersController.cs  # Handles user-related endpoints
│   ├── TodoItemsController.cs # Handles task-related endpoints
├── Data/                   # Database context and configurations
│   ├── TodoDbContext.cs    # Entity Framework database context
├── DTOs/                   # Data Transfer Objects
│   ├── RegisterDto.cs      # DTO for user registration
│   ├── LoginDto.cs         # DTO for user login
├── Migrations/             # EF Core migrations
│   ├── SeededData.Designer.cs # Migration for seeded data
├── Models/                 # Database models
│   ├── AppUser.cs          # User model
│   ├── TodoItem.cs         # Task model
├── Services/               # Business logic services
│   ├── IUserService.cs     # Interface for user service
│   ├── UserService.cs      # Implementation of user service
├── appsettings.json        # Application settings
├── appsettings.Development.json # Development-specific settings
├── Program.cs              # Entry point for the backend application
├── TodoApi.csproj          # Project file for the backend
├── todo.db                 # SQLite database file
```

### Frontend (`todo-frontend`)
```plaintext
todo-frontend/
├── .next/                  # Next.js build output
├── public/                 # Static assets
├── src/                    # Source code
│   ├── app/                # Application pages and components
│   │   ├── components/     # Reusable UI components
│   │   │   ├── TaskList.tsx # Component for displaying task lists
│   │   │   ├── TaskItem.tsx # Component for individual task items
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useTasks.ts # Hook for fetching tasks
│   │   │   ├── types.ts    # Type definitions
│   │   ├── edit-task/      # Edit task page
│   │   │   ├── [id]/page.tsx # Dynamic route for editing tasks
│   │   ├── signup/         # Signup page
│   │   │   ├── page.tsx    # Signup form
│   │   ├── login/          # Login page
│   │   │   ├── page.tsx    # Login form
│   ├── axiosConfig.ts      # Axios configuration for API requests
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
```

