#!/bin/bash

make run/proxy RPC_HOST="123.123.123.123:5005" > proxy.log &

make run API_HOST="123.123.123.123:5010"
