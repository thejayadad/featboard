# Part 1 — Create the project

We’ll start by creating the application and confirming that it runs locally. We’ll add the database, authentication, and features in separate steps.

In the terminal, navigate to your Desktop:

```bash
cd Desktop
```

Create a directory for the project, then move into it:

```bash
mkdir featureboard
cd featureboard
```

Run the Next.js project generator:

```bash
npx create-next-app@latest .
```

The dot tells the generator to create the application in the current directory.

If prompted to install the generator, enter `y`. Choose the recommended defaults.

Once installation finishes, open the project in Visual Studio Code:

```bash
code .
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see the Next.js starter page.

If the terminal reports a different port, use the address it provides.

Leave the server running while you work. Next.js updates the browser as you save changes.

<!-- Add your starter-page screenshot here. -->

## Checkpoint

The starter page loads without errors. Our project is ready.

Next, we’ll save this starting point with Git and connect it to GitHub.