# college-sports-app

To start app:
```bash
cd college-sports-app
npx expo start
```

Things to note:
to edit any of the tabs' layouts, go to /app/(tabs)/{sport_name}.tsx

in /app/(tabs) , the tsx files (the tabs) are named by their sport
except for football, which is index.tsx, bc for some reason the home
screen tab file has to be called index


For backend as of now:
```
cd flask-server
pip install flask
pip install requests
python3 server.py
```


http://localhost:5000/football/data
