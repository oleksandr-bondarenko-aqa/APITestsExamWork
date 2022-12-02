import postEntity from '../fixtures/postEntity.json';

export function generateRandomEmail() {
    const randomValue = Date.now()
    return `Alex_${randomValue}@test.email`;
}

export function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomText(length) {
    let result;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function generateJsonBody() {
    postEntity.userId = generateRandomNumber(11, 99);
    postEntity.id = generateRandomNumber(101, 9999);
    postEntity.title = generateRandomText(38);
    postEntity.body = generateRandomText(200);
    return `{
                "userId": "${postEntity.userId}",
                "id": "${postEntity.id}",
                "title": "${postEntity.title}",
                "body": "${postEntity.body}"
            }`
}