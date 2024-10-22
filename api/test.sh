#!/bin/bash

remote_local="$1"

if [[ -f .env ]]; then
  echo "Importing .env..."
  export $(cat .env | xargs)
fi

if [[ "$remote_local" == "local" ]]; then
  Url="http://localhost:3000/items"
  Authorization="no-auth-necessary"
elif [[ "$remote_local" == "remote" ]]; then
  Url="$AWS_API_GATEWAY_URL"
  Authorization="$AWS_AUTHORIZATION_KEY"
else
  echo "ERROR: Must provide either 'remote' or 'local' as an argument"
  exit 1
fi

ScanFinanceTracker() {
  curl --silent \
    --request GET \
    --header "Authorization: $Authorization" \
    $Url
}

PostFinanceTracker() {
  data="$1"
  [[ -z "$data" ]] && exit 1
  curl --silent \
    --request POST \
    --header "Authorization: $Authorization" \
    --header "Content-Type: application/json" \
    --data "$data" \
    $Url
}

GetFinanceTracker() {
  id="$1"
  [[ -z "$id" ]] && exit 1
  curl --silent \
    --request GET \
    --header "Authorization: $Authorization" \
    $Url/$id
}

DeleteFinanceTracker() {
  id="$1"
  [[ -z "$id" ]] && exit 1
  curl --silent \
    --request DELETE \
    --header "Authorization: $Authorization" \
    $Url/$id
}

echo "==== Scan ===="
ScanResult=$(ScanFinanceTracker)
echo "$ScanResult"

echo ""
echo "==== Post ===="
# generated random data using https://www.jsongenerator.io/ with template (make sure there are no ' characters in the JSON string):
# {
#     "result": [
#         "repeat(10)", {
#             "userId": "guid()",
#             "category": "product()",
#             "name": "productName()",
#             "description": "productDescription()",
#             "price": "price()",
#             "issuer": "creditCardIssuer()",
#             "payee": "firstName() lastName()",
#             "date": "date()"
#         }
#     ]
# }
PostResult=$(PostFinanceTracker '{"userId": "8f152f43-66ea-466a-85e0-c2bf76c5ca8a","category": "Shirt","name": "Practical Fresh Car","description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients","price": "669.00","issuer": "maestro","payee": "Georgiana Gislason","date": "Tue May 07 2013 18:36:35 GMT-0500 (Central Daylight Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "49d32eea-a760-48b2-9f92-aa84c9a4261b","category": "Chair","name": "Rustic Frozen Salad","description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals","price": "143.00","issuer": "jcb","payee": "Lauriane Goodwin","date": "Thu Apr 26 1979 00:04:36 GMT-0600 (Central Standard Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "7147c563-b869-48fc-82d8-10b07ff10b3a","category": "Table","name": "Electronic Frozen Keyboard","description": "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles","price": "568.00","issuer": "american_express","payee": "Katlyn Okuneva","date": "Sat Jan 26 1974 16:30:58 GMT-0500 (Central Daylight Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "e96de75e-c537-412d-97ef-b68a3be5e1c4","category": "Chips","name": "Bespoke Plastic Salad","description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit","price": "677.00","issuer": "jcb","payee": "Mercedes Blanda","date": "Fri May 03 2002 04:47:29 GMT-0500 (Central Daylight Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "67104e59-4b5e-47e7-9533-50f195574f5e","category": "Bacon","name": "Generic Rubber Table","description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive","price": "847.00","issuer": "american_express","payee": "Linwood Kemmer","date": "Wed Mar 08 1978 05:11:59 GMT-0600 (Central Standard Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "6398d460-5c41-4665-a070-2fdc28b39f20","category": "Towels","name": "Fantastic Concrete Hat","description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016","price": "8.00","issuer": "visa","payee": "Florencio Funk","date": "Tue Aug 31 2021 15:44:09 GMT-0500 (Central Daylight Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "30b62569-4fd0-4da7-97c9-4b01a63d6120","category": "Pants","name": "Tasty Rubber Shoes","description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J","price": "643.00","issuer": "american_express","payee": "Marcellus Cronin","date": "Mon Dec 18 2023 18:56:34 GMT-0600 (Central Standard Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "5c713b06-2249-4a46-8783-2a9f71bd2ac1","category": "Chair","name": "Elegant Bronze Pants","description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016","price": "510.00","issuer": "diners_club","payee": "Lulu Muller","date": "Tue Jul 18 1972 17:39:43 GMT-0500 (Central Daylight Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "d3066856-c12c-4a01-b64c-4f52af1caa32","category": "Keyboard","name": "Ergonomic Steel Car","description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive","price": "893.00","issuer": "maestro","payee": "Michel Schulist","date": "Wed Jan 21 1976 03:04:24 GMT-0600 (Central Standard Time)"}')
PostResult=$(PostFinanceTracker '{"userId": "9cd2c7ec-c853-4fb0-8ce5-20119138b8e1","category": "Shirt","name": "Gorgeous Granite Sausages","description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016","price": "347.00","issuer": "jcb","payee": "Ruben Medhurst","date": "Wed Jul 31 2024 11:36:58 GMT-0500 (Central Daylight Time)"')

echo ""
echo "==== Scan Again ===="
ScanResult=$(ScanFinanceTracker)
echo "$ScanResult"

echo ""
echo "==== Get Second ===="
id=$(jq -r '.[1].id' <<<"$ScanResult")
GetResult=$(GetFinanceTracker "$id")
echo "$GetResult"

echo ""
echo "==== Delete First ===="
id=$(jq -r '.[0].id' <<<"$ScanResult")
DeleteResult=$(DeleteFinanceTracker "$id")
echo "$DeleteResult"

echo ""
echo "==== Delete All ===="
ScanResult=$(ScanFinanceTracker)
jq -r '.[].id' <<<"$ScanResult" | while read -r id; do
  DeleteResult=$(DeleteFinanceTracker "$id")
  echo "$DeleteResult"
done
