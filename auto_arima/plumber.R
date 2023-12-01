
library(plumber)
library(forecast)
library(dplyr)
library(shroomDK)
library(jsonlite)

get_CI_intervals = function(eth_vwap){
  last_timestamp <- tail(eth_vwap$hour_, 1)
  
  additional_timestamps <- seq(
    from = last_timestamp + 3600,
    by = 3600,
    length.out = 48
  ) %>% as.POSIXct(., format = "%Y-%m-%dT%H:%M:%OS", tz = "UTC")
  
  
  ts_data <- eth_vwap %>%
    arrange(hour_) %>%
    mutate(
      lag_open = lag(x = open, n = 24),
      lag_low = lag(low, n = 24),
      lag_high = lag(high, n = 24),
      lag_volume = lag(volume, n = 24),
      lag_swaps = lag(swaps, n = 24)
    )
  
  n = nrow(ts_data)
  # exclude last 24 hrs from training
  ntrain = n - 24
  # NOTE: renamed exogenous variables in ARIMAX 
  # MUST be in same order to be transferrable
  # expect a warning 
  train_cols = c('lag_open', 'lag_low', 'lag_high', 'lag_volume', 'lag_swaps')
  final_cols = c('open', 'low', 'high', 'volume', 'swaps')
  train_ <- ts_data[1:ntrain, ]
  fit24 <- forecast::auto.arima(train_$close,
                                xreg = as.matrix(train_[, train_cols])
  )
  
  # Generate forecasts
  forecast24 <- forecast(fit24, xreg = as.matrix(ts_data[(ntrain+1):n, train_cols])) 
  
  # use the open, low, high, volume, swaps from the actual last 24 hours 
  # to serve as the exogenous variables for the 25-48 hr forecast 
  
  forecast48 <- forecast(fit24, xreg = as.matrix(ts_data[(ntrain+1):n, final_cols]))
  
  
  
  # return 
  ret = list(
    'timestamps' = additional_timestamps,
    'forecast1_24' = as.data.frame(forecast24),
    'forecast25_48' = as.data.frame(forecast48)
  )
  
  return(
    jsonlite::toJSON(ret, auto_unbox = TRUE)
  )
  
}

default_ethusd <- jsonlite::fromJSON("ethusd_ohlc.json")

#* @apiTitle Auto Arima Forecast
#* @apiDescription Structures the forecast of candle data for the eth metrics app.

#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg = "") {
    list(msg = paste0("The message is: '", msg, "'"))
}

#* Return JSON for a provided query using provided credentials
#* @get /auto_paginate_query
function(query, api_key, src, res){
  
  # Check if all parameters are provided
  if (missing(query) || missing(api_key) || missing(src)) {
    res$status <- 400
    return(list(error = "Missing parameters"))
  }
  
  # Perform the query using provided parameters
  tryCatch({
    temp_ <- shroomDK::auto_paginate_query(query = query, api_key = api_key, data_source = src)
    rownames(temp_) <- NULL  
    temp_$X__row_index <- NULL 
    res$body <- jsonlite::toJSON(temp_, auto_unbox = TRUE)
    res$status <- 200
    return(res)
  }, error = function(e) {
    res$status <- 500
    list(error = "Internal Server Error")
  })
}

#* Return auto-arima performance, forecast, and model statistics given hourly price data.
#* @post /auto_arima
function(req, res) {
  # Parse the input JSON data from the request body into a data frame
  if (nchar(req$postBody) == 0) {
    eth_vwap <- default_ethusd
  } else {
    # Parse the input JSON data from the request body into a data frame
    eth_vwap <- jsonlite::fromJSON(req$postBody)
  }
    colnames(eth_vwap) <- tolower(colnames(eth_vwap))
    
  # Ensure that the 'hour_' column is in POSIXct format
  eth_vwap$hour_ <- as.POSIXct(eth_vwap$hour_, format = "%Y-%m-%dT%H:%M:%OS", tz = "UTC")
  eth_vwap <<- eth_vwap 
  
return(get_CI_intervals(eth_vwap))

}

# Programmatically alter your API
#* @plumber
function(pr) {
    pr %>%
        # Overwrite the default serializer to return unboxed JSON
        pr_set_serializer(serializer_unboxed_json())
}
