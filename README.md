## Getting Started

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).


### Unit Tests

Navigate to the admin directory
```
cd admin
```

And run
```
npm test
```



### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
- `/holdingsReport` generates report and sends to /investments/exports on the investments service

### Questions
**How might you make this service more secure?**
* We can secure internal microservice communication by using HTTPS instead of HTTP which will use TLS to encrypt the communication. Additional authentication can also be added in the form of JSON Web Tokens or a 3rd party solution like OAuth2.

* For external traffic we can do the same as above, making sure we only use HTTPS and integrating authentication via OAuth2. It would also make sense to use an API Gateway behind a firewall that would prevent malicious access to each service.

* Another option would be to use a sidecar technique and have authentication on each individual microservice. Depending on the required level of security, we could also implement this method with an API gateway as well.

**How would you make this solution scale to millions of records?**
* To deal with millions of records we could redesign the investments API in such a way that it allows for pagination. This was we can request a reasonable amount of data from the investments endpoint, process it and then make another call to get the next batch of data. 

* Another use case to consider would be when we don’t actually want all of the data. We could add parameters to the endpoint that would allow filtering of the results and not return any unwanted investment objects.

* It would be reasonable to assume that the number of financial companies would grow at a smaller rate than the total number of investments. The retrieval of the company data could be cached to reduce latency on the call to the /companies endpoint.

**What else would you have liked to improve given more time?**
* Create a more in depth testing suite
* Convert from CommonJS to ES Modules

### Additional Changes
* Removed the deprecated `request` and installed `axios` to handle HTTP requests
* Removed the deprecated `bodyParser` and instead used `express.json`



