# The API / Backend for WritSandbox - AKA my Character/Novel Writing APP

- This API is now deployed on Heroku and is best interacted with via something like Insomnia.

- The Front End Repo for this project can be found here: https://github.com/KiaMorelos/Captsone2_NovelCharacterWritingApp and is currently being tested but will be deployed soon.

# Technologies

This backend was built with Express, Node, Sequelize, JSON. Passwords are encrypted with bcrypt

# Data Sources

The API currently only contains questionaire and question data which has been sourced from the following places:

The Write Practice's
post [Proust Questionnaire: 35 Questions To Ask Your Characters From
Marcel Proust](https://thewritepractice.com/proust-questionnaire/), [Bernard Pivot, and James Lipton questionaires from the Deschutes Library](https://www.deschuteslibrary.org/files/uploads/Bernard%20Pivot%20and%20James%20Lipton%20Questionnaires.pdf), as well as a character analysis sheet from a great site called [MousePawMedia](https://mousepawmedia.com/downloads/writing/CharacterAnalysis.pdf).

# BASE URL

The base URL is for requests is: `https://writ-sandbox-back.herokuapp.com/api/`

A token is required in the header, for all routes, which is signed and verified.

# Routes

## Authentication Routes

Signup a new user and get a token:

POST
`/signup`

The request body should contain, please note the password must be at least 8 characters long:

```
{
"username": "exampleUsername",
"email": "example@e.com"},
"password": "min8charPass"
}
```

To authenticate an existing user and get a token:

POST
`/authenticate`

```
{
"username": "exampleUsername,
"password": "min8charPass"
}
```

### The following routes require a valid token in the request header:

## Questionaire Routes

GET `/questionaires` returns a list of available questionaires

Expected example output:

```
{
	"questionaires": [
		{
			"id": 1,
			"name": "Marcel Proust",
			"questionaireType": "character analysis"
		},
		{
			"id": 2,
			"name": "Bernard Pivot",
			"questionaireType": "character analysis"
		},
	]
}
```

## Question Routes

GET `/questions` returns a list of available questions.

Expected example output:

```
{
	"questions": [
		{
			"id": 1,
			"questionaireId": 1,
			"question": "What is your idea of perfect happiness?",
			"questionCategory": "psychological information"
		},
		{
			"id": 2,
			"questionaireId": 1,
			"question": "What is your greatest fear?",
			"questionCategory": "psychological information"
		},
}
```

The `/questions` route accepts query parameters to help narrow down question results, `questionaireId` and ` questionCategory`, if no results are found it returns an object with an empty array `{ "questions": [] }`.

## Character Routes

GET `/characters`

Returns a list of the authenticated user's characters. If there are none it returns an object with an empty array `{ "characters": [] }`.

Otherwise the example output looks like:

```
{
   "characters": [
    {
			"id": 1,
			"name": "Jean Grey",
			"characterPhotoUrl": "",
			"userId": 1,
			"createdAt": "2022-12-22T08:07:56.750Z",
			"updatedAt": "2022-12-23T08:37:55.660Z"
		},
		{
			"id": 2,
			"name": "Scott Lang",
			"characterPhotoUrl": "",
			"userId": 1,
			"createdAt": "2022-12-25T05:36:43.251Z",
			"updatedAt": "2022-12-25T05:36:43.251Z"
		},
   ]
}
```

POST `/characters`

Expects, at minimum a `name` in the body to create a new character, the `characterPhotoUrl` does not have to be present, but if it is present it must contain data:

```
{
    "name" : "Steve Rogers",
    "characterPhotoUrl: "https://imagehost.com/img"
}
```

A successful POST request to `/characters` will return the created character object.

GET `/characters/:characterId`

Returns the character that belongs to the id if it exists and belongs to the authenticated user:

```
{
	"character": {
		"id": 1,
		"name": "Jean Grey",
		"characterPhotoUrl": "",
		"userId": 1,
		"createdAt": "2022-12-30T06:20:06.206Z",
		"updatedAt": "2022-12-30T06:20:06.206Z"
	}
}
```

PATCH `/characters/:characterId`

Expects again, at mininium a `name` in the body of the request to update and for the character to belong to the user making the request:

`{ "name": "Phoenix" }`

DELETE `/characters/:characterId`

Deletes character if it exists and belongs to the user and the request is successful, returns `{ "deleted": 1}`

## Answer Routes

- Answers are very much linked to characters

GET `/characters/:characterId/answers`

Returns answers for that character the specified character
and the question and questionaire the answer belongs to

```
{
	"answers": [
		{
			"id": 2,
			"questionId": 5,
			"characterId": 1,
			"answer": "My dog",
			"createdAt": "2022-12-25T07:56:03.686Z",
			"updatedAt": "2022-12-27T07:35:38.952Z",
			"Question": {
				"question": "Which living person do you most admire?",
				"questionCategory": "psychological information",
				"Questionaire": {
					"name": "Marcel Proust"
				}
			}
		},
     {...
    ]
}
```

POST `/characters/:characterId/answers`

Expects an array of one or more answer objects in the request body:

```
{
	"answers": [
	{
	"questionId": 22,
	"answer": "chocolate"
	},
]
}
```

A successful post request returns an array of the created answer(s)

PATCH `/characters/:characterId/answers/:answerId`

Expects an answer object in reqest body:
`{
	"answer": "chocolate"
}`

Returns something like:

```
{
	"updated": {
		"id": 22,
		"answer": "chocolate"
	}
}
```

DELETE `/characters/:characterId/answers/:answerId`

Deletes answer if it exists and belongs to the user/character. If the request is successful, returns `{ "deleted": 1}`

## User Routes

GET `/users/:userId`

Returns something like the following if the user being requested is the same as logged in user, otherwise returns an unauthorized error:

```
{
	"user": {
		"username": "Black Widow",
		"email": "budapest@avenger.com"
	}
}
```

PATCH `/users/:userId`

Expects request body to contain a username, an email, correct existing password, and optionally a new password

```
{
    "username": "Natasha Romanoff",
    "email" : "soulStone@avenger.com,
    "password": "password"
    "newPassword" : "BETTERpassword!!"
}
```

# Tests

Test are in the tests folder and can be run with `npm test`
