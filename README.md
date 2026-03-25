# inbank-loan-decision

## Overview

This project is a simple loan decision system that deliver whether a customer is eligible for a loan based on their personal code, requested loan amount, and loan period.

It includes:

- Backend API built with Node.js and Express
- Simple frontend UI to test the functionality
- Decision engine with scoring logic

## How it works

The system calculates a credit score using:

score = (creditModifier / loanAmount) \* loanPeriod

A loan is approved if:

- score >= 1

### Decision logic:

1. First, try the requested loan period
2. Iterate loan amounts from 10000 down to 2000 (step 100)
3. If no valid result is found:
   - Try other periods from 60 down to 12
4. Return the best possible loan offer

## Get started

### 1.Install dependencies

cd backend
npm install

### 2.Run the server

npm start

### 3.Open the application

http://localhost:5000

## API endpoint

POST /api/loan

Request body
{
"personalCode": "49002010987",
"amount": 4000,
"period": 24
}

Response
{
"decision": "positive",
"amount": 4000,
"period": 24
}

## Validation Rules

1. Amount must be between 2000 and 10000
2. Period must be between 12 and 60 months
3. Only whole numbers are accepted

## Design decision

1. Kept backend and decision logic separate for better structure
2. Used step-based iteration for simplicity and performance
3. Implemented minimal frontend to focus on core logic
4. Added validation to ensure correct input handling

## Improvements

1. Add unit tests for decision logic
2. Improve UI/UX for better user experience
3. Add logging levels instead of console logs

## Author

Hasini Wickramasinghe
