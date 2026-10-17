# Part 2 — Save the project with Git and GitHub

Our application runs locally. Now we’ll save its starting point with Git and upload it to GitHub.

Git tracks changes to our code. GitHub hosts the repository so we can share the project and access its history online.

Open a second terminal in the project folder. Leave the development server running in the first terminal.

Check the repository:

```bash
git status
```

In this build, Git reports that we’re on the `master` branch. That means the repository is already initialized.

If you receive a “not a git repository” message instead, initialize it:

```bash
git init
```

Before staging files, open `.gitignore` in the project root.

Confirm that it excludes these files and directories. Keep the other existing entries:

```gitignore
node_modules/
.next/
out/
.env*
```

These rules exclude installed dependencies, generated build files, and environment files that may contain credentials.

Review what Git sees:

```bash
git status --short
```

Stage the project files:

```bash
git add .
```

Review the staged changes:

```bash
git diff --cached --stat
```

Create the checkpoint:

```bash
git commit -m "chore: initialize Next.js project"
```

If Git reports that there’s nothing to commit, the generator may have already created the initial commit. Continue to the next step.

Rename the current branch to `main`:

```bash
git branch -M main
```

## Create the GitHub repository

Open https://github.com/new.

Name the repository `featureboard`.

Choose Public if you want viewers to follow along. Leave the README, .gitignore, and license options unchecked because we’re uploading an existing project.

Connect the local repository to GitHub. Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/featureboard.git
```

Upload the main branch:

```bash
git push -u origin main
```

The `-u` option sets the upstream branch. Future uploads from this branch can use `git push`.

Refresh the repository page on GitHub. You should see the application files.

<!-- Add your GitHub repository screenshot here. -->

## Create a feature branch

Create a branch for our first UI changes:

```bash
git switch -c feat/app-shell
```

We’ll build the shared layout on this branch and merge it into `main` after checking that it works.

Confirm the current branch:

```bash
git branch --show-current
```

## Checkpoint

The project is visible on GitHub, and our current branch is `feat/app-shell`.

Next, we’ll install DaisyUI and establish the application’s base styling.