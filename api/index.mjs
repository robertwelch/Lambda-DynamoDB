import Fastify from 'fastify'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import dotenv from 'dotenv'
import awsLambdaFastify from '@fastify/aws-lambda'
import esMain from 'es-main'
import { v4 as uuidv4 } from 'uuid'

dotenv.config() // Load environment variables

const fastify = Fastify()

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})
const ddbDocClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.DYNAMODB_TABLE_NAME

// Create (POST)
fastify.post('/items', async (request, reply) => {
    const data = request.body
    const params = {
        TableName: tableName,
        Item: {
            id: uuidv4(), // Generate a UUID for the id
            ...data
        }
    }

    try {
        await ddbDocClient.send(new PutCommand(params))
        reply.code(201).send({ message: 'Item created successfully' })
    } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({ error: 'Could not create item' })
    }
})

// Read (GET)
fastify.get('/items/:id', async (request, reply) => {
    const params = {
        TableName: tableName,
        Key: {
            id: request.params.id
        }
    }

    try {
        const data = await ddbDocClient.send(new GetCommand(params))
        reply.code(200).send(data.Item)
    } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({ error: 'Could not retrieve item' })
    }
})

// Read All (GET)
fastify.get('/items', async (request, reply) => {
    const params = {
        TableName: tableName
    }

    try {
        const data = await ddbDocClient.send(new ScanCommand(params))
        reply.code(200).send(data.Items)
    } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({ error: 'Could not retrieve items' })
    }
})

// Update (PUT)
fastify.put('/items/:id', async (request, reply) => {
    const data = request.body
    const updateExpressions = []
    const expressionAttributeNames = {}
    const expressionAttributeValues = {}

    for (const [key, value] of Object.entries(data)) {
        updateExpressions.push(`#${key} = :${key}`)
        expressionAttributeNames[`#${key}`] = key
        expressionAttributeValues[`:${key}`] = value
    }

    const params = {
        TableName: tableName,
        Key: {
            id: request.params.id
        },
        UpdateExpression: `set ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'UPDATED_NEW'
    }

    try {
        const result = await ddbDocClient.send(new UpdateCommand(params))
        reply.code(200).send(result.Attributes)
    } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({ error: 'Could not update item' })
    }
})

// Delete (DELETE)
fastify.delete('/items/:id', async (request, reply) => {
    const params = {
        TableName: tableName,
        Key: {
            id: request.params.id
        }
    }

    try {
        await ddbDocClient.send(new DeleteCommand(params))
        reply.code(200).send({ message: 'Item deleted successfully' })
    } catch (error) {
        fastify.log.error(error)
        reply.code(500).send({ error: 'Could not delete item' })
    }
})

// Start the server locally
const start = async () => {
    try {
        await fastify.listen({ host: '0.0.0.0', port: 3000 })
        fastify.log.info(`Server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
    console.log("Running via lambda...")
} else {
    console.log("Running locally...")
    start()
}

// // Check if running locally or as a Lambda function
// if (esMain(import.meta)) {
//     start()
// }

export const handler = awsLambdaFastify(fastify)
