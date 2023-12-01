

setwd("data/")
lapply(list.files(), function(x){
  
  temp_name = gsub(pattern = '.csv',replacement = '.json',x = x, fixed = TRUE)
  temp_obj =  read.csv(x)
  temp_json = toJSON(temp_obj, dataframe = "rows")
  write(temp_json, temp_name)
  })

setwd('..')