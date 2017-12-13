curl \
--header "Content-type: application/json" \
--request POST \
--data '{"firstname": "Nebras",
"lastname": "Othman",
"birthdate": "1993-11-06",
"phone": "015752215445",
"city": "Berlin",
"street": "sprengelstrasse 6",
"email": "nebras.z.othman@gmail.com",
"active": "0"}' \
http://localhost:4000/user