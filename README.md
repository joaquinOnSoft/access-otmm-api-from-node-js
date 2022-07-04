# Access to OpenText Media Management REST API from node.js (example)

Example project to show how to access to OpenText Media Managment (OTMM) REST API
from `node.js`

## Local environment setup

 - 1) Clone this repository
 
```shell
git clone https://github.com/joaquinOnSoft/access-to-otmm-api-from-node-js.git
``` 

 - 2) Change the working folder

```shell
cd access-to-otmm-api-from-node-js.git
``` 

 - 3) Update your `.env` file with your instance information
 
 ```shell
OTMM_API_URL=<OTMM-API-URL>/otmmapi
OTMM_USER=<USER>
OTMM_PASSWORD=<PASSWORD>
 ```
 
 - 4) Install `npm` required packages
 
```shell
npm install
 ```
 
 - 5) Run the script `otmmapi.js`
 
```shell
node otmmapi.js
 ```
 
> **NOTE** There are two implementation one based in js functions (`otmmapi.js`)
> and a second one based on classes (`otmmapiv2.js`)
 
 