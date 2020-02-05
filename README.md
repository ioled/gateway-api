## Routes in the Gateway

### Auth

| N°  | Query                         | Method  | Response  |
| :-: | ----------------------------- | ------- | --------- |
|  1  | /auth/user/:id/device/:device | **GET** | JWT token |

### History

| N°  | Query                  | Method  | Response                  | Only available to admin |
| :-: | ---------------------- | ------- | ------------------------- | ----------------------- |
|  1  | /history/day/:device   | **GET** | History data of the day   | No                      |
|  2  | /history/week/:device  | **GET** | History data of the week  | No                      |
|  3  | /history/month/:device | **GET** | History data of the month | No                      |

### Device Control

| N°  | Query                                    | Method  | Response                               | Only available to admin |
| :-: | ---------------------------------------- | ------- | -------------------------------------- | ----------------------- |
|  1  | /deviceControl/registry                  | **GET** | All registries in the project          | Yes                     |
|  2  | /deviceControl/devices                   | **GET** | All devices in the registry            | Yes                     |
|  3  | /deviceControl/devices/:id/state-history | **GET** | Last 10 states stored                  | No                      |
|  4  | /deviceControl/devices/:id/state-config  | **GET** | Last 10 configs stored                 | No                      |
|  5  | /deviceControl/devices/:id/config        | **PUT** | Update the config of device            | No                      |
|  6  | /deviceControl/devices/:id/user          | **GET** | Owner of the device's user information | No                      |
|  7  | /deviceControl/devices/:id/state         | **GET** | Last state stored                      | No                      |
|  8  | /deviceControl/devices/:id/config        | **GET** | Last config stored                     | No                      |
