## Routes in the Gateway

### Auth

| N°  | Query                         | Method  | Response  |
| :-: | ----------------------------- | ------- | --------- |
|  1  | /auth/google                  | **GET** | JWT token |

### User

| N°  | Query                         | Method  | Response                                             |
| :-: | ----------------------------- | ------- | ---------------------------------------------------- |
|  1  | /user/currentUser             | **GET** | Returns the current authenticated user               |
|  2  | /user/devices                 | **GET** | List all the registered devices for the current user |


### History

| N°  | Query                  | Method  | Response                  |
| :-: | ---------------------- | ------- | ------------------------- |
|  1  | /history/day/:device   | **GET** | History data of the day   |
|  2  | /history/week/:device  | **GET** | History data of the week  |
|  3  | /history/month/:device | **GET** | History data of the month |

### Dashboard

| N°  | Query                                | Method  | Response                               |
| :-: | ------------------------------------ | ------- | -------------------------------------- |
|  1  | /dashboard/registry                  | **GET** | All registries in the project          |
|  2  | /dashboard/devices                   | **GET** | All devices in the registry            |
|  3  | /dashboard/devices/:id/state-history | **GET** | Last 10 states stored                  |
|  4  | /dashboard/devices/:id/state-config  | **GET** | Last 10 configs stored                 |
|  5  | /dashboard/devices/:id/config        | **PUT** | Update the config of device            |
|  6  | /dashboard/devices/:id/user          | **GET** | Owner of the device's user information |
|  7  | /dashboard/devices/:id/state         | **GET** | Last state stored                      |
|  8  | /dashboard/devices/:id/config        | **GET** | Last config stored                     |
