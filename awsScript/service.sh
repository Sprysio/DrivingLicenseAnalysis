#!/bin/bash

# Replace these variables with your own values
SSH_KEY="key_pair.pem"
EC2_USER="ec2-user"
EC2_INSTANCE="ec2-13-60-38-162.eu-north-1.compute.amazonaws.com"
LOCAL_PORT=3307
DB_HOST="drivingstatisticsdb.cdkcc4q6susr.eu-north-1.rds.amazonaws.com"
DB_PORT=5432

# Establish SSH tunnel
#ssh -i "$SSH_KEY" -L "$LOCAL_PORT":"$DB_HOST":"$DB_PORT" "$EC2_USER@$EC2_INSTANCE" -N

ssh -i "$SSH_KEY" "$EC2_USER@$EC2_INSTANCE" -L "$LOCAL_PORT":"$DB_HOST":"$DB_PORT" -N -vv
