# drive_distance_api
Drive Distance API

To calculate distance between point (x0, y0) and street (line) 
I used algorithm described on: 
http://paulbourke.net/geometry/pointlineplane/ - 
'Minimum Distance between a Point and a Line'

Tested case:

![Screenshot](test_case.png)


# Local run with yarn
- Copy .env.exmaple into .env file.
- Install node modules:
```
yarn install
```
- Build the application
```
yarn build
```
- Run application server locally:
```
yarn dev
```
API should  be reachable on http://localhost:3000
#Running unit tests
To ran unit test on local machine just run below commands:
```
yarn pretest
yarn test
```
# cURL - sample request
- street
```
curl --location --request POST 'http://localhost:3000/api/street' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "Street7",
	"start": [0, 5],
	"end": [1, 4]
}'
```
- closest
```
curl --location --request GET 'http://localhost:3000/api/closest?x=1&y=1' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1ODgxMDg4NzcsImV4cCI6MTU4ODEwOTE3N30.bXxdI_-04PR3tTulpeLn8kU8_G1A5-D8skpwcgiln58' \
--data-raw ''
```
