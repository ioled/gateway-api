## Routes in the Gateway

### Auth

| N°  | Query                 | Method  | Response                       |
| :-: | --------------------- | ------- | ------------------------------ |
|  1  | /auth/google          | **GET** | Google Authentication          |
|  2  | /auth/google/callback | **GET** | Google Authentication Callback |

### User

| N°  | Query                            | Method   | Response                                             | Only available to admin |
| :-: | -------------------------------- | -------- | ---------------------------------------------------- | ----------------------- |
|  1  | /user/currentUser                | **GET**  | Returns the current authenticated user               | No                      |
|  2  | /user/devices                    | **GET**  | List all the registered devices for the current user | No                      |
|  3  | /user/saveDevice                 | **POST** | Save device to the database                          | No                      |
|  4  | /user/linkUser/:userId/:deviceID | **PUT**  | Set device user                                      | Yes                     |
|  5  | /user/allDevices                 | **GET**  | All devices in the registry                          | Yes                     |
|  6  | /user/device/:id/user            | **GET**  | Owner of the device's user information               | Yes                     |

### History

| N°  | Query                  | Method  | Response                  | Only available to admin |
| :-: | ---------------------- | ------- | ------------------------- | ----------------------- |
|  1  | /history/day/:device   | **GET** | History data of the day   | No                      |
|  2  | /history/week/:device  | **GET** | History data of the week  | No                      |
|  3  | /history/month/:device | **GET** | History data of the month | No                      |

### Device Control

| N°  | Query                                    | Method  | Response                      | Only available to admin |
| :-: | ---------------------------------------- | ------- | ----------------------------- | ----------------------- |
|  1  | /deviceControl/registry                  | **GET** | All registries in the project | Yes                     |
|  2  | /deviceControl/device/:id/state-history  | **GET** | Last 10 states stored         | No                      |
|  3  | /deviceControl/device/:id/config-history | **GET** | Last 10 configs stored        | No                      |
|  4  | /deviceControl/device/:id/config         | **PUT** | Update the config of device   | No                      |
|  5  | /deviceControl/device/:id/state          | **GET** | Last state stored             | No                      |
|  6  | /deviceControl/device/:id/config         | **GET** | Last config stored            | No                      |

### Mailer

| N°  | Query     | Method   | Response      |
| :-: | --------- | -------- | ------------- |
|  1  | /sendMail | **POST** | Mailer status |
