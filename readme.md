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
   Create tasks with details like title, description, due date, priority, and category.

2. **View Tasks**  
   Display all your tasks in a clean, organized list for easy tracking and management.

3. **Edit Tasks**  
   Modify existing tasks to update their details.

4. **Mark Tasks as Completed**  
   Easily mark tasks as done to track your progress.

5. **Delete Tasks**  
   Remove tasks that are no longer needed.

6. **Filter Tasks**  
   Filter tasks by:
   - **Status**: View completed or incomplete tasks  
   - **Priority**: Filter by urgency level (Normal, High, Critical)  
   - **Category**: Group tasks based on user-defined categories

7. **Prioritize Tasks**  
   Assign priority levels to tasks to help focus on what's important.

8. **Login & Logout with JWT**  
   Secure authentication using JSON Web Tokens (JWT). Only logged-in users can view and manage their tasks.

9. **Responsive Design**  
   Optimized layout that works smoothly on both desktop and mobile devices.

10. **Data Persistence**  
    Tasks are stored in a SQLite database for reliable, long-term storage.


---

## Usage

Users can interact with the application by:

1. **Register / Login**  
   Access the app by signing up or logging in with your credentials.

2. **Create a Task**  
   Click on "+ Add New Task" and fill in details such as title, due date, priority, etc.

3. **View Tasks**  
   All tasks are shown on the dashboard, organized by date and status.

4. **Filter by Category, Status, or Priority**  
   Use the filter bar to view specific tasks relevant to your needs.

5. **Edit Existing Tasks**  
   Use the edit icon to change task details anytime.

6. **Track Completion**  
   Tick the checkbox to mark a task as completed — real-time progress is shown with stats.

7. **Delete Irrelevant Tasks**  
   Remove tasks permanently using the delete button.

8. **Logout**  
   End your session by clicking the logout button (token will be cleared from storage).


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
├── Controllers/
│   ├── UsersController.cs
│   ├── TodoItemsController.cs
├── Data/
│   ├── TodoDbContext.cs
├── Models/
│   ├── AppUser.cs
│   ├── TodoItem.cs
├── Migrations/
│   ├── SeededData.Designer.cs
├── Program.cs
├── appsettings.json
├── appsettings.Development.json
```

### Frontend (`todo-frontend`)
```plaintext
todo-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskItem.tsx
│   │   ├── hooks/
│   │   │   ├── useTasks.ts
│   │   │   ├── types.ts
│   │   ├── edit-task/
│   │   │   ├── [id]/page.tsx
│   │   ├── signup/
│   │   │   ├── page.tsx
│   │   ├── login/
│   │   │   ├── page.tsx
│   ├── axiosConfig.ts
├── public/
├── package.json
├── tsconfig.json
```

