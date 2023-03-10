# Team mitglieder
Balint Taschner
Raphael Michl

# Topic idea
we will have a scraper that gets data from skyscanner and pushes it into the "trips" topic for now. <br>
We have not planned any more replicas then 1 for now. <br>
We are following a rule of thumb of using 10 partitions.

# Install packages for the TestKafkaNodeJS
Switch directory: <br>
```cd TestKafkaNodeJS```
install with npm: <br>
```npm install```

# start docker 
Switch directory: <br>
```cd TestKafkaNodeJS```
compose docker file: <br>
## On windows
Have docker desktop open and type into the command line:
```docker-compose up -d```