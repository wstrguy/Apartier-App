Documentation for Apartier API

Introduction:
Apartier is a platform that enables users to book short-term apartments online. This API documentation provides details on how to use the API to perform various functions. Authentication and authorization have been implemented using Oauth2 with Authorization code grant types. MySQL has been used as the database management system, with the database hosted on AWS database service.

Authentication:
Authentication is required to access the API endpoints. OAuth2 has been implemented to authenticate users. Users can obtain access tokens by sending a request to the /oauth/token endpoint with their credentials. Access tokens should be included in the Authorization header of all requests as a bearer token.

Social Logins:
Social logins have been implemented using Google authentication. Users can sign in using their Google account by sending a request to the /oauth/google endpoint. Access tokens obtained through Google authentication should also be included in the Authorization header of all requests as a bearer token.

Endpoint Details:
1. Endpoint to fetch all available shortlets paginated to fetch only 10 at a time
2. Endpoint: /shortlets
3. Method: GET
4. Description: This endpoint retrieves all available shortlets in the system, and returns them in a paginated format with 10 shortlets per page.
5. Request Headers:
* Authorization: Bearer Access-Token
* Content-Type: application/json
Response Body:

{
    "shortlets": [
        {
            "id": 1,
            "name": "Shortlet 1",
            "description": "This is a shortlet apartment.",
            "state": "Lagos",
            "city": "Ikoyi",
            "address": "123, ABC street",
            "price_per_night": 5000,
            "available_nights": 5
        },
        ...
    ],
    "total": 20,
    "page": 1,
    "per_page": 10
}


2. Endpoint to upload new shortlets and make it only accessible to anyone with “ROLE_ADMIN”
3. Endpoint: /shortlets
4. Method: POST
5. Description: This endpoint is used to upload new shortlets. Only users with the ROLE_ADMIN role are allowed to access this endpoint.
6. Request Headers:
* Authorization: Bearer Access-Token
* Content-Type: multipart/form-data
Request Body:

{
    "name": "Shortlet 1",
    "description": "This is a shortlet apartment.",
    "state": "Lagos",
    "city": "Ikoyi",
    "address": "123, ABC street",
    "price_per_night": 5000,
    "available_nights": 5
}

3. Endpoint to book payment and process payment with Paystack, on successful transaction
4. Endpoint: /booking
5. Method: POST
6. Description: This endpoint is used to book a shortlet and process payment using Paystack. The endpoint requires the following details:
* Shortlet ID
* Start date
* End date
* Number of nights
* On successful payment, the endpoint returns a status code of 200 and the name of the apartment.
* Request Headers:
* Authorization: Bearer Access-Token
* Content-Type: application/json
Request Body:
{
    "shortlet_id": 1,
    "start_date": "2023-05-01",
    "end_date": "2023-05-05",
    "number_of_nights": 5
}

Response Body:

{
    "status": "success",
    "message": "Payment successful. You have booked Shortlet 1."
}


4. Fetch number of all available shortlets
5. Endpoint: /shortlets/count
6. Method: GET
7. Description: This endpoint returns the total number of available shortlets in the system.
Request Headers:
* Authorization: Bearer Access-Token
* Content-Type: application/json
Response Body:

{
    "count": 20
}

5. To fetch apartment by State
6. Endpoint: /shortlets/state/{state}
7. Method: GET
8. Description: This endpoint is used to fetch all available shortlets in a particular state. The state parameter should be included in the URL path.
9. Request Headers:
* Authorization: Bearer Access-Token
* Content-Type: application/json
Response Body:


{
    "shortlets": [
        {
            "id": 1,
            "name": "Shortlet 1",
            "description": "This is a shortlet apartment.",
            "state": "Lagos",
            "city": "Ikoyi",
            "address": "123, ABC street",
            "price_per_night": 5000,
            "available_nights": 5
        },
        ...
    ],
    "total": 5,
    "page": 1,
    "per_page": 10
}


Conclusion:
This API documentation provides details on the various endpoints available on the Apartier platform. Authentication has been implemented using OAuth2 with Authorization code grant types, and social logins have been integrated using Google authentication. The API uses MySQL as the database management system, with the database hosted on AWS database service.



