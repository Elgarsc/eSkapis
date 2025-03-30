
# eSkapis

**eSkapis** is a web application designed to help users organize and manage their wardrobe. The platform allows users to upload clothing items, categorize them, and create personalized outfits. With a simple interface and powerful functionality, eSkapis helps you keep track of what you own and easily create stylish outfits from your wardrobe.

## Features

- **Clothing Management:** Add, edit, and remove clothing items with details such as name, type (top, bottom, shoes), color, and image.
- **Personalized Outfits:** Create outfits by selecting clothing items from your wardrobe.
- **User Authentication:** Sign up and sign in securely with Clerk authentication.
- **Dark Mode Support:** Toggle between light and dark themes for better usability in different environments.

## Technologies Used

- **Next.js**: A React framework used for server-side rendering (SSR) and building static websites.
- **Clerk**: A modern authentication service for managing user accounts, including sign-ups and log-ins.
- **Tailwind CSS**: A utility-first CSS framework for building responsive designs.
- **Lucide Icons**: A library for icons used in the UI.
- **Next-Themes**: A simple way to implement theme switching (light/dark mode).

## For visual representation of project view :
https://miro.com/welcomeonboard/Skd2ZWxtd0JoZmZRUjN6N1Rmd09OWkYzbndrUTJ0WFZUQjRzZDlPU1d3a25pMDVhSXdtNjl1L0xsUEplOUlWc0pxajl6K2tKMWpKdkdKbytaWFN6MjF1RElhemxuRkFvZFRjd2NUNUpPcG5mK2dwLzFTa3daTVMwdmV5RkFQTDBQdGo1ZEV3bUdPQWRZUHQzSGl6V2NBPT0hdjE=?share_link_id=110350518009

## Installation

To get the project up and running locally, follow these steps:

**Clone the repository:**
   ```bash
   git clone https://github.com/Elgarsc/eSkapis.git
   ```

Install the dependencies:

```bash
cd eSkapis
npm install
```
Set up environment variables:
Create a .env.local file in the root directory and add your Clerk API keys and other necessary environment variables. Example:

```env
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api-key
CLERK_API_KEY=your-clerk-api-key
```
Run the development server:

```bash
npm run dev
```
This will start the app in development mode. Open your browser and go to http://localhost:3000.

Usage
Once the project is running:

Sign Up/Sign In:
Use the Clerk authentication to sign up or log in.

Manage Your Wardrobe:
Add clothing items, categorize them (top, bottom, shoes), and upload images.

Create Outfits:
Browse through your wardrobe and create outfits by selecting different clothing items.

Toggle Themes:
Switch between light and dark modes using the theme toggle button in the header.
