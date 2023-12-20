# Blade Test Management System

## Installation
### Prerequisites:
Node.js 18 or later

### Steps
clone the repository to the desired directory
```bash
  git clone https://github.com/cs-23-sw-3-10/p3_Frontend_Typescript
```
Direct to the root of the repository and run the following command to install dependencies and run the program

```bash
  npm I
  npm start
```
## Configuration
The default port the server will run on is `http://localhost:8080` make sure your backend aligns with this.
If not, navigate to `src/api/client.ts` and update the URI in the `httpLink` and `wsLink` to the appropriate ports.
