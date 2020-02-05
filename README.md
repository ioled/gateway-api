## Routes in the Gateway

### Auth

| N°  | Query                 | Method  | Response                       |
| :-: | --------------------- | ------- | ------------------------------ |
|  1  | /auth/google          | **GET** | Google Authentication          |
|  2  | /auth/google/callback | **GET** | Google Authentication Callback |

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
|  3  | /deviceControl/device/:id/state-history  | **GET** | Last 10 states stored                  | No                      |
|  4  | /deviceControl/device/:id/config-history | **GET** | Last 10 configs stored                 | No                      |
|  5  | /deviceControl/device/:id/config         | **PUT** | Update the config of device            | No                      |
|  6  | /deviceControl/device/:id/user           | **GET** | Owner of the device's user information | No                      |
|  7  | /deviceControl/device/:id/state          | **GET** | Last state stored                      | No                      |
|  8  | /deviceControl/device/:id/config         | **GET** | Last config stored                     | No                      |
