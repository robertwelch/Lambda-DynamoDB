import dotenv from 'dotenv'

dotenv.config()

let apiUrl, authorizationHeader

if (process.argv[2] && process.argv[2] === 'remote') {
    apiUrl = process.env.AWS_API_GATEWAY_URL + '/items'
    authorizationHeader = { 'Authorization': process.env.AWS_AUTHORIZATION_KEY }
} else {
    apiUrl = 'http://127.0.0.1:' + process.env.LOCAL_PORT + '/items'
    authorizationHeader = 'no-auth-necessary'
}

const scanItems = async () => {
    const response = await fetch(`${apiUrl}`, {
        headers: {
            ...authorizationHeader
        }
    })
    const data = await response.json()

    return data
}

const createItem = async (item) => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authorizationHeader
        },
        body: JSON.stringify(item)
    })
    const data = await response.json()

    return data
}

const readItem = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`, {
        headers: {
            ...authorizationHeader
        }
    })
    const data = await response.json()

    return data
}

const updateItem = async (id, updatedItem) => {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...authorizationHeader
        },
        body: JSON.stringify(updatedItem)
    })
    const data = await response.json()

    return data
}

const deleteItem = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            ...authorizationHeader
        }
    })
    const data = await response.json()

    return data
}

const testCrudOperations = async () => {
    console.log("-".repeat(80))
    console.log("Scan...")
    const scanResult = await scanItems()
    console.log(scanResult)
    console.log("-".repeat(80))

    console.log("Create...")
    const newItem = { name: 'Test Item', value: '123' }
    const createResult = await createItem(newItem)
    console.log(createResult)
    console.log("-".repeat(80))

    console.log("Read...")
    const readResult = await readItem(createResult.id)
    console.log(readResult)
    console.log("-".repeat(80))

    console.log("Update...")
    const updatedItem = { name: 'Updated Test Item', value: '456' }
    const updateResult = await updateItem(createResult.id, updatedItem)
    console.log(updateResult)
    console.log("-".repeat(80))

    console.log("Delete...")
    const deleteResult = await deleteItem(createResult.id)
    console.log(deleteResult)
    console.log("-".repeat(80))
}

testCrudOperations().catch(console.error)