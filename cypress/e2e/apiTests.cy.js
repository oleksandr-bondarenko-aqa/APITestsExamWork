import user from '../fixtures/user.json';
import {generateJsonBody, generateRandomEmail, generateRandomNumber, generateRandomText} from "../support/helper";
import postEntity from "../fixtures/postEntity.json";

describe('BE part: API tests', () => {
    it('Get all posts', () => {
        cy.request('GET', '/posts').then(response => {
            expect(response.status).to.be.eq(200);
            expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
        })
    })

    it('Get first 10 posts', () => {
        cy.request('GET', '/posts?_limit=10').then(response => {
            expect(response.status).to.be.eq(200);
            expect(response.body.length).to.eq(10);
        })
    })

    it('Get posts with id 55 and 60', () => {
        cy.request('GET', '/posts?id=55&id=60').then(response => {
            expect(response.status).to.be.eq(200);
            expect(response.body.length).to.eq(2);
            expect(response.body[0].id).to.be.eq(55);
            expect(response.body[1].id).to.be.eq(60);
        })
    })

    it('Create as post and verify status', () => {
        cy.request({
            method: 'POST',
            url: `/664/posts`,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.eq(401);
        })
    })

    it('Create post with access token', () => {
        user.email = generateRandomEmail();
        cy.request({
            method: 'POST',
            url: `/register`,
            body: {
                "email": `${user.email}`,
                "password": `${user.password}`
            }
        }).then(response => {
            const authToken = 'Bearer ' + response.body.accessToken;
            cy.request({
                method: 'POST',
                url: `/664/posts`,
                headers: {'Authorization': authToken}
            }).then(response => {
                expect(response.status).to.be.eq(201);
            })
        })
    })

    it('Create post entity', () => {
        postEntity.userId = generateRandomNumber(11, 99);
        postEntity.id = generateRandomNumber(101, 9999);
        postEntity.title = generateRandomText(38);
        postEntity.body = generateRandomText(200);
        cy.request({
            method: 'POST',
            url: `/posts`,
            body: {
                "userId": `${postEntity.userId}`,
                "id": `${postEntity.id}`,
                "title": `${postEntity.title}`,
                "body": `${postEntity.body}`
            }
        }).then(response => {
            expect(response.status).to.be.eq(201);
            expect(response.body.userId).to.eq(`${postEntity.userId}`);
            expect(response.body.id).to.be.eq(`${postEntity.id}`);
            expect(response.body.title).to.be.eq(`${postEntity.title}`);
            expect(response.body.body).to.be.eq(`${postEntity.body}`);
        })
        cy.request({
            method: 'GET',
            url: `/posts/${postEntity.id}`,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.eq(200);
        })
    })

    it('Update non-existing entity', () => {
        const post = generateJsonBody();
        cy.request({
            method: 'PUT',
            url: `/posts`,
            failOnStatusCode: false,
            body: post
        }).then(response => {
            expect(response.status).to.be.eq(404);
        })
    })

    it('Create and Update post', () => {
        postEntity.userId = generateRandomNumber(11, 99);
        postEntity.id = generateRandomNumber(101, 9999);
        postEntity.title = generateRandomText(38);
        postEntity.body = generateRandomText(200);
        cy.request({
            method: 'POST',
            url: `/posts`,
            body: {
                "userId": `${postEntity.userId}`,
                "id": `${postEntity.id}`,
                "title": `${postEntity.title}`,
                "body": `${postEntity.body}`
            }
        }).then(response => {
            expect(response.status).to.be.eq(201);
            expect(response.body.userId).to.eq(`${postEntity.userId}`);
            expect(response.body.id).to.be.eq(`${postEntity.id}`);
            expect(response.body.title).to.be.eq(`${postEntity.title}`);
            expect(response.body.body).to.be.eq(`${postEntity.body}`);
        }).then(response => {
            postEntity.userId = generateRandomNumber(11, 99);
            postEntity.title = generateRandomText(38);
            postEntity.body = generateRandomText(200);
            cy.request({
                method: 'PUT',
                url: `/posts/${postEntity.id}`,
                body: {
                    "userId": `${postEntity.userId}`,
                    "id": `${postEntity.id}`,
                    "title": `${postEntity.title}`,
                    "body": `${postEntity.body}`
                }
            }).then(response => {
                expect(response.status).to.be.eq(200);
                expect(response.body.id).to.be.eq(`${postEntity.id}`);
                expect(response.body.title).to.be.eq(`${postEntity.title}`);
                expect(response.body.body).to.be.eq(`${postEntity.body}`);
            })
        })
        cy.request({
            method: 'GET',
            url: `/posts/${postEntity.id}`,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.be.eq(200);
            expect(response.body.id).to.be.eq(`${postEntity.id}`);
            expect(response.body.title).to.be.eq(`${postEntity.title}`);
            expect(response.body.body).to.be.eq(`${postEntity.body}`);
        })
    })

    it('Delete non-existing entity', () => {
        const post = generateJsonBody();
        cy.request({
            method: 'DELETE',
            url: `/posts`,
            failOnStatusCode: false,
            body: post
        }).then(response => {
            expect(response.status).to.be.eq(404);
        })
    })

    it('Create, Update and Delete post', () => {
        postEntity.userId = generateRandomNumber(11, 99);
        postEntity.id = generateRandomNumber(101, 9999);
        postEntity.title = generateRandomText(38);
        postEntity.body = generateRandomText(200);
        cy.request({
            method: 'POST',
            url: `/posts`,
            body: {
                "userId": `${postEntity.userId}`,
                "id": `${postEntity.id}`,
                "title": `${postEntity.title}`,
                "body": `${postEntity.body}`
            }
        }).then(response => {
            expect(response.status).to.be.eq(201);
            expect(response.body.userId).to.eq(`${postEntity.userId}`);
            expect(response.body.id).to.be.eq(`${postEntity.id}`);
            expect(response.body.title).to.be.eq(`${postEntity.title}`);
            expect(response.body.body).to.be.eq(`${postEntity.body}`);
        }).then(response => {
            postEntity.userId = generateRandomNumber(11, 99);
            postEntity.title = generateRandomText(38);
            postEntity.body = generateRandomText(200);
            cy.request({
                method: 'PUT',
                url: `/posts/${postEntity.id}`,
                body: {
                    "userId": `${postEntity.userId}`,
                    "id": `${postEntity.id}`,
                    "title": `${postEntity.title}`,
                    "body": `${postEntity.body}`
                }
            }).then(response => {
                expect(response.status).to.be.eq(200);
                expect(response.body.id).to.be.eq(`${postEntity.id}`);
                expect(response.body.title).to.be.eq(`${postEntity.title}`);
                expect(response.body.body).to.be.eq(`${postEntity.body}`);
            }).then(response => {
                cy.request({
                    method: 'DELETE',
                    url: `/posts/${postEntity.id}`
                }).then(response => {
                    expect(response.status).to.be.eq(200);
                })
                cy.request({
                    method: 'GET',
                    url: `/posts/${postEntity.id}`,
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.be.eq(404);
                })
            })
        })
    })
})