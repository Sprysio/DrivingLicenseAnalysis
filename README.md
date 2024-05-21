# DrivingLicenseAnalysis

application to analyze the statistics of new driving license
#Running

# First start

# 1. Install repository

cd /project-directory

git init

git remote add origin https://github.com/Sprysio/DrivingLicenseAnalysis

git pull origin main

# Albo po prostu jakos z github desktop ogarnijcie ale tak mozna komendami w linuxie (i chyba w windowsie jak ma sie git bash pobrane)

file -> clone repository -> url 

tak powinno byc w github desktop

# 2. Make .env file in /server:

MONGODB_URI="mongodb+srv://SprysioU:B6GqkQ666KDbE3wh@lab5.aapvkj9.mongodb.net/?retryWrites=true&w=majority&appName=lab5"

JWTPRIVATEKEY=abcdefg

SALT=10

# 3. Installing node_modules

Go into /server and run `npm install`

Go into /client and run `npm install`

# 4. Starting app:

Go into /server and run `npm start`

Go into /client and run `npm start`
