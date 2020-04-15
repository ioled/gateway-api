## Routes in the Gateway

### Auth

| N°  | Query                 | Method  | Response                       |
| :-: | --------------------- | ------- | ------------------------------ |
|  1  | /auth/google          | **GET** | Google Authentication          |
|  2  | /auth/google/callback | **GET** | Google Authentication Callback |

### User

| N°  | Query              | Method   | Response                                             | Only available to admin |
| :-: | ------------------ | -------- | ---------------------------------------------------- | ----------------------- |
|  1  | /user/currentUser  | **GET**  | Returns the current authenticated user               | No                      |
|  2  | /user/devices      | **GET**  | List all the registered devices for the current user | No                      |
|  3  | /user/allDevices   | **GET**  | All devices in the registry                          | Yes                     |
|  4  | /user/saveDevice   | **POST** | Save device to the database                          | No                      |
|  5  | /user/changeDevice | **POST** | Change configuration in Firestore DB                 | No                      |

### History

| N°  | Query                  | Method  | Response                  | Only available to admin |
| :-: | ---------------------- | ------- | ------------------------- | ----------------------- |
|  1  | /history/day/:device   | **GET** | History data of the day   | No                      |
|  2  | /history/week/:device  | **GET** | History data of the week  | No                      |
|  3  | /history/month/:device | **GET** | History data of the month | No                      |

### Device Control

| N°  | Query                           | Method  | Response                      | Only available to admin |
| :-: | ------------------------------- | ------- | ----------------------------- | ----------------------- |
|  1  | /deviceControl/registry         | **GET** | All registries in the project | Yes                     |
|  1  | /deviceControl/device           | **GET** | All devices in the project    | Yes                     |
|  4  | /deviceControl/device/:id       | **PUT** | Update the config of device   | No                      |
|  5  | /deviceControl/device/:id/state | **GET** | Last state stored             | No                      |

### Mailer

| N°  | Query     | Method   | Response      |
| :-: | --------- | -------- | ------------- |
|  1  | /sendMail | **POST** | Mailer status |
