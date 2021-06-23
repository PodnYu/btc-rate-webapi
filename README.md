## Web API using koa and jwt!
`npm run start`
### routes:
#### POST /user/create
#### input: {
#### login, 
#### password
#### }
#### output: {
#### token
#### }
#### POST /user/login
#### input: {
#### login,
#### password
#### }
#### output: {
#### token
#### }
#### GET /btcRate
#### headers: {
#### Authorization: Bearer \<jwtToken\>
#### }
#### output: {
#### sell,
#### buy
#### }