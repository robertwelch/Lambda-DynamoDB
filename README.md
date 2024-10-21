## Fork GitHub Repository
1. Open `https://github.com/robertwelch/Lambda-DynamoDB`
2. Click `Fork`

## Create DynamoDB Database
1. Navigate to [DynamoDB dashboard](https://us-east-1.console.aws.amazon.com/dynamodbv2/home#service)
2. Click `Create table`
3. Table name: `Lambda-DynamoDB`
4. Partition key: `id` (String)
5. Table settings: Leave default
6. Click `Create table`

## Create Lambda API Function
1. Navigate to [Lambda dashboard](https://us-east-1.console.aws.amazon.com/lambda/home)
2. Click `Create function`
3. Author from scratch
4. Function name: `Lambda-DynamoDB-LambdaAPI`
5. Runtime: Node.js 20.x
6. Change default execution role
   1. Create a new role from AWS policy templates
   2. Role name: `Lambda-DynamoDB-LambdaAPI`
   3. Policy templates: `Simple microservices permissions`
7.  Click `Create function`

## Create Lambda Authorizer Function
1. Navigate to [Lambda dashboard](https://us-east-1.console.aws.amazon.com/lambda/home)
2. Click `Create function`
3. Author from scratch
4. Function name: `Lambda-DynamoDB-LambdaAuthorizer`
5. Runtime: Node.js 20.x
6. Click `Create function`

## Create API Gateway
1. Navigate to the [API Gateway Dashboard](https://us-east-1.console.aws.amazon.com/apigateway/main/apis)
2. Click `Create API`
3. Choose `HTTP API`
4. Add integration
   1. Choose `Lambda`
   2. Find and select the new lambda function
   3. API name: `Lambda-DynamoDB-LambdaAPI`
5. Configure routes
   1.  GET /items -> Lambda-DynamoDB-LambdaAPI (integration)
   2.  POST /items -> Lambda-DynamoDB-LambdaAPI (integration)
   3.  GET /items/{id} -> Lambda-DynamoDB-LambdaAPI (integration)
   4.  PUT /items/{id} -> Lambda-DynamoDB-LambdaAPI (integration)
   5.  DELETE /items/{id} -> Lambda-DynamoDB-LambdaAPI (integration)
6.  Add authorizer
	1. Navigate to `Authorization`
	2. Open the tab named `Manage authorizers`
	3. Click `Create`
	4. Choose `Lambda`
	5. Name: `Lambda-DynamoDB-LambdaAuthorizer`
	6. Lambda function: `Lambda-DynamoDB-LambdaAuthorizer`
	7. Click `Create`
	8. Open the tab named `Attach authorizers to routes`
	9. Click each route, select the authorizer we just created and click `Attach authorizer`
7.  Stage name: `$default`
8.  Click `Create`
9.  Go to `API mappings`
10. Click `Configure API mappings`
11. Click `Add new mapping`
12. Select this API and stage
13. Click `Save`

## Add GitHub Secrets
1. AWS_ACCESS_KEY_ID
2. AWS_SECRET_ACCESS_KEY
3. AWS_REGION
4. AWS_API_GATEWAY_URL
5. AWS_AUTHORIZATION_KEY
6. DYNAMODB_TABLE_NAME
7. LAMBDA_FUNCTION_NAME

## Kickoff GitHub Actions workflow
1. Navigate to your github repo actions
2. Click the job named `Build and deploy to Lambda`
3. Click `Run workflow`
4. Make sure branch is set to `main` and click `Run workflow`
5. This workflow will test locally using the AWS security credentials you provided in the secrets

## Testing locally
1. Create a file named `api/.env`
2. Add the same environment variables as your GitHub repository secrets
3. i.e.:
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
DYNAMODB_TABLE_NAME=
```