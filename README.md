A simple sentiment analysis tool for twitter posts using existing open source modules
~~which certainly wasn't written in 3 hours in the middle of the night so I could have code to submit for an interview~~

Installation:

```
npm install assert config sentiment twitter
```
- If you would like to store your results in mongo (optional) ensure mongodb server and npm are installed
  - download server from https://www.mongodb.org/
```  
 npm install mongodb
```

- Copy config/default.json.sample to config/default.json
  - Edit twitter and mongo sections appropriately
  - Get twitter api credentials at https://apps.twitter.com/app/new
  - Mongo section is currently configured for a default localhost install

Use:

To use without storing results:
  -  Ensure store_results is false in the config
  -  invoke with: node sentiment.js keyword
  -  (eg: node sentiment.js potus )

To store results:
  - Ensure store_results is true in the config
  - invoke with node sentiment.js keyword db collection
  - (eg: node sentiment.js potus twitter_data presidental_sentiment )
  - given the above query, you can view your results in mongo with:
    - mongo twitter_data
    - db.presidental_sentiment.find().pretty();

Either of the above can work with display_results true or false.
  - when true, results will be displayed on stdout
  
TODO: 
  - modularize sentiment engine, and sample other options
